import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

async function isAdmin(userId: string) {
  const supabase = createAdminClient()
  const { data } = await supabase.from('profiles').select('is_admin').eq('clerk_id', userId).single()
  return data?.is_admin ?? false
}

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId || !(await isAdmin(userId))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const supabase = createAdminClient()
  const { data } = await supabase.from('reserved_usernames').select('*').order('created_at', { ascending: false })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId || !(await isAdmin(userId))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { username, reason } = await req.json()
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('reserved_usernames').insert({ username: username.toLowerCase(), reason }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId || !(await isAdmin(userId))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { username } = await req.json()
  const supabase = createAdminClient()
  await supabase.from('reserved_usernames').delete().eq('username', username)
  return NextResponse.json({ ok: true })
}
