import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    // Decode JWT session token to get user ID
    const sessionToken = req.cookies.get('__session')?.value
    if (!sessionToken) return NextResponse.json({ profile: null, videos: [], debug: 'no session token' })

    // JWT has 3 parts: header.payload.signature
    const parts = sessionToken.split('.')
    if (parts.length < 2) return NextResponse.json({ profile: null, videos: [], debug: 'invalid jwt' })

    // Decode base64url payload
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'))
    
    const userId = payload.sub
    if (!userId) return NextResponse.json({ profile: null, videos: [], debug: 'no sub in jwt', payload })

    const supabase = createAdminClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', userId)
      .single()

    if (!profile) return NextResponse.json({ profile: null, videos: [], debug: 'no profile for ' + userId })

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
