import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

// Cloudflare Stream calls this webhook when a video finishes processing
export async function POST(req: NextRequest) {
  const body = await req.json()

  // Verify it's from Cloudflare (in production add signature verification)
  if (!body.uid) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

  const supabase = createAdminClient()

  if (body.readyToStream) {
    await supabase
      .from('videos')
      .update({
        cf_ready_to_stream: true,
        cf_duration: body.duration ?? null,
        cf_thumbnail: body.thumbnail ?? null,
        status: 'live', // auto-approve (add SENTINEL check here in production)
      })
      .eq('cf_uid', body.uid)
  }

  return NextResponse.json({ ok: true })
}
