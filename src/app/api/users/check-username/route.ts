import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  if (!username) return NextResponse.json({ available: false })

  const clean = username.toLowerCase().trim()

  // Validate format
  if (!/^[a-zA-Z0-9_-]{3,30}$/.test(clean)) {
    return NextResponse.json({ available: false, reason: 'Ongeldig formaat' })
  }

  const supabase = createAdminClient()

  // Check reserved
  const { data: reserved } = await supabase
    .from('reserved_usernames')
    .select('username')
    .eq('username', clean)
    .single()

  if (reserved) {
    return NextResponse.json({ available: false, reason: 'Gereserveerd' })
  }

  // Check taken
  const { data: existing } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', clean)
    .single()

  if (existing) {
    // Generate suggestions
    const suggestions = [
      `${clean}_`,
      `${clean}1`,
      `${clean}2`,
      `the_${clean}`,
    ]
    return NextResponse.json({ available: false, reason: 'Naam al in gebruik', suggestions })
  }

  return NextResponse.json({ available: true })
}
