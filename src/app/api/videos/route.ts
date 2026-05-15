import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase'

// GET /api/videos — fetch feed
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const feed = searchParams.get('feed') ?? 'all'
  const genre = searchParams.get('genre')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') ?? '1')
  const per_page = parseInt(searchParams.get('per_page') ?? '20')
  const offset = (page - 1) * per_page

  const supabase = createAdminClient()

  let query = supabase
    .from('videos')
    .select(`*, uploader:profiles(id,username,display_name,avatar_url,verified)`, { count: 'exact' })
    .eq('status', 'live')
    .range(offset, offset + per_page - 1)

  if (feed === 'trending') query = query.order('view_count', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  if (genre && genre !== 'all') query = query.eq('genre', genre)

  if (search) query = query.textSearch('title', search, { type: 'websearch', config: 'dutch' })

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    data,
    count,
    page,
    per_page,
    has_more: (count ?? 0) > offset + per_page,
  })
}

// POST /api/videos — create video after upload
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const supabase = createAdminClient()

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('videos')
    .insert({
      uploader_id: profile.id,
      title: body.title,
      description: body.description,
      genre: body.genre,
      ai_tool: body.ai_tool,
      music_source: body.music_source,
      voice_source: body.voice_source,
      has_real_people: body.has_real_people,
      has_brand_ip: body.has_brand_ip,
      cf_uid: body.cf_uid,
      status: 'pending', // goes to SENTINEL review
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}
