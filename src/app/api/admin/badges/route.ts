import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

async function isAdmin(userId: string) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('clerk_id', userId)
    .single()
  return data?.is_admin ?? false
}

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('badge_requests')
    .select('*, user:profiles(id,username,display_name,avatar_url)')
    .order('created_at', { ascending: false })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id, status, review_note } = await req.json()
  const supabase = createAdminClient()

  const { data: request } = await supabase
    .from('badge_requests')
    .update({ status, review_note, reviewed_by: userId, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*, user:profiles(id)')
    .single()

  if (status === 'approved' && request) {
    const field = request.badge_type === 'verified' ? 'verified' : 'verified_plus'
    await supabase
      .from('profiles')
      .update({ [field]: true })
      .eq('id', (request as any).user.id)
  }

  return NextResponse.json(request)
}
