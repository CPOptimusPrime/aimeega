import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('__session')?.value
    if (!sessionToken) return NextResponse.json({ profile: null, videos: [], debug: 'no session' })

    const parts = sessionToken.split('.')
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'))
    const userId = payload.sub

    if (!userId) return NextResponse.json({ profile: null, videos: [], debug: 'no userId' })

    // Use service role key to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', userId)
      .single()

    if (error) return NextResponse.json({ profile: null, videos: [], debug: error.message })
    if (!profile) return NextResponse.json({ profile: null, videos: [], debug: 'profile null' })

    const { data: videos } = await supabase
      .from('videos')
      .select('*, uploader:profiles(id,username,display_name,avatar_url,verified)')
      .eq('uploader_id', profile.id)
      .order('created_at', { ascending: false })

    return NextResponse.json({ profile, videos: videos ?? [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, profile: null, videos: [] })
  }
}
