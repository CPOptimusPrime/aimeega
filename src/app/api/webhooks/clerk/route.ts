import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) return NextResponse.json({ error: 'No webhook secret' }, { status: 500 })

  const body = await req.text()
  const headers = {
    'svix-id': req.headers.get('svix-id') ?? '',
    'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
    'svix-signature': req.headers.get('svix-signature') ?? '',
  }

  let event: any
  try {
    const wh = new Webhook(WEBHOOK_SECRET)
    event = wh.verify(body, headers)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, username, image_url } = event.data
    const email = email_addresses[0]?.email_address ?? ''
    const name = [first_name, last_name].filter(Boolean).join(' ') || username || email.split('@')[0]
    const slug = (username || email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]/g, '_')

    await supabase.from('profiles').insert({
      clerk_id: id,
      username: `${slug}_${id.slice(-4)}`, // ensure uniqueness
      display_name: name,
      avatar_url: image_url,
      role: 'creator',
    })
  }

  if (event.type === 'user.updated') {
    const { id, first_name, last_name, image_url } = event.data
    const name = [first_name, last_name].filter(Boolean).join(' ')
    if (name) {
      await supabase.from('profiles')
        .update({ display_name: name, avatar_url: image_url, updated_at: new Date().toISOString() })
        .eq('clerk_id', id)
    }
  }

  if (event.type === 'user.deleted') {
    await supabase.from('profiles').delete().eq('clerk_id', event.data.id)
  }

  return NextResponse.json({ ok: true })
}
