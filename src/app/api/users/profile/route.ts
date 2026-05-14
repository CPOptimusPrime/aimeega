import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!url || !key) return NextResponse.json({ debug: 'missing env vars', url: !!url, key: !!key })

    const sessionToken = req.cookies.get('__session')?.value
    if (!sessionToken) return NextResponse.json({ profile: null, debug: 'no session' })

    const parts = sessionToken.split('.')
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'))
    const userId = payload.sub

    const supabase = createClient(url, key, {
      auth: { persistSession: false }
    })

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', userId)
      .single()

    if (error) return NextResponse.json({ debug: error.message, code: error.code })
    
    return NextResponse.json({ profile, videos: [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack?.slice(0,200) })
  }
}
