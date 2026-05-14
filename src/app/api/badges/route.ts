import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  // Check if already has pending request
  const { data: existing } = await supabase
    .from('badge_requests')
    .select('id')
    .eq('user_id', profile.id)
    .eq('badge_type', body.badge_type)
    .eq('status', 'pending')
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Je hebt al een openstaand verzoek' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('badge_requests')
    .insert({
      user_id: profile.id,
      badge_type: body.badge_type,
      motivation: body.motivation,
      website: body.website,
      social_links: body.social_links,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
