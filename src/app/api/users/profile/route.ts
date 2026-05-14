import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
