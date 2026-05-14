import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { role, username, genres, tools } = await req.json()
  const supabase = createAdminClient()

  // Double-check username availability
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username.toLowerCase())
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Gebruikersnaam al in gebruik' }, { status: 400 })
  }

  const { data: reserved } = await supabase
    .from('reserved_usernames')
    .select('username')
    .eq('username', username.toLowerCase())
    .single()

  if (reserved) {
    return NextResponse.json({ error: 'Gebruikersnaam gereserveerd' }, { status: 400 })
  }

  // Upsert profile
  const { error } = await supabase
    .from('profiles')
    .upsert({
      clerk_id: userId,
      username: username.toLowerCase(),
      display_name: username,
      role: role ?? 'creator',
      genres: genres ?? [],
      ai_tools: tools ?? [],
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
