import { currentUser } from '@clerk/nextjs/server'

export default async function ProfilePage() {
  const clerkUser = await currentUser()
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  let fetchTest = 'niet getest'
  try {
    const res = await fetch(`${url}/rest/v1/profiles?select=username&clerk_id=eq.${clerkUser?.id}&limit=1`, {
      headers: {
        apikey: key!,
        Authorization: `Bearer ${key!}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    const data = await res.text()
    fetchTest = `status: ${res.status} — data: ${data.slice(0, 100)}`
  } catch (e: any) {
    fetchTest = `fout: ${e.message} — cause: ${JSON.stringify(e.cause)}`
  }

  return (
    <div className="p-8 text-white text-xs">
      <div>Fetch test: {fetchTest}</div>
    </div>
  )
}
