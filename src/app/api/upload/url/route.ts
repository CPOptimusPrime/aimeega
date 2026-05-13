import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createDirectUploadUrl } from '@/lib/cloudflare'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { title } = await req.json()
    const result = await createDirectUploadUrl({ title: title ?? 'Untitled' })
    return NextResponse.json(result)
  } catch (err) {
    console.error('Upload URL error:', err)
    return NextResponse.json({ error: 'Failed to create upload URL' }, { status: 500 })
  }
}
