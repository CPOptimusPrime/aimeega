import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  // Get clerk session from cookie
  const sessionToken = req.cookies.get('__session')?.value || 
                       req.cookies.get('__client_uat')?.value

  // For now, get all cookies and find clerk session
  const allCookies = req.cookies.getAll()
  const clerkCookie = allCookies.find(c => c.name.includes('__session'))
  
  if (!clerkCookie) {
    return NextResponse.json({ error: 'Not authenticated', profile: null, videos: [] })
  }

  // Decode the session to get userId
  try {
    const parts = clerkCookie.value.split('.')
    if (parts.length >= 2) {
      const payload = JSON.parse(atob(parts[1]))
      const userId = payload.sub
      
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
    }
  } catch (e) {
    return NextResponse.json({ error: 'Session parse error', profile: null, videos: [] })
  }
  
  return NextResponse.json({ profile: null, videos: [] })
}
