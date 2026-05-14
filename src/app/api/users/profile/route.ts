import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    // Get active session context cookie
    const activeContext = req.cookies.get('clerk_active_context')?.value
    if (!activeContext) return NextResponse.json({ profile: null, videos: [], debug: 'no active context' })

    // Extract session ID from clerk_active_context (format: sess_xxx:)
    const sessionId = activeContext.split(':')[0]
    if (!sessionId) return NextResponse.json({ profile: null, videos: [], debug: 'no session id' })

    // Use Clerk REST API to get session
    const clerkRes = await fetch(`https://api.clerk.com/v1/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` }
    })
    
    if (!clerkRes.ok) return NextResponse.json({ profile: null, videos: [], debug: 'clerk api failed', status: clerkRes.status })
    
    const session = await clerkRes.json()
    const userId = session.user_id
    
    if (!userId) return NextResponse.json({ profile: null, videos: [], debug: 'no user_id in session' })

    const supabase = createAdminClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', userId)
      .single()

    if (!profile) return NextResponse.json({ profile: null, videos: [], debug: `no profile for ${userId}` })

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
