import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import Clerk from '@clerk/clerk-sdk-node'

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY })

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('__session')?.value
    if (!sessionToken) return NextResponse.json({ profile: null, videos: [] })

    const session = await clerk.verifyToken(sessionToken)
    const userId = session.sub

    if (!userId) return NextResponse.json({ profile: null, videos: [] })

    const supabase = createAdminClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', userId)
      .single()

    if (!profile) return NextResponse.json({ profile: null, videos: [] })

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
