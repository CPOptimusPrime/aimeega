import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookies = req.cookies.getAll()
  return NextResponse.json({ 
    cookies: cookies.map(c => ({ name: c.name, value: c.value.slice(0,50) }))
  })
}
