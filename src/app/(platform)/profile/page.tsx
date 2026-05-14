import { currentUser } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase'

export default async function ProfilePage() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) return <div className="p-8 text-red-500">Niet ingelogd</div>
  
  const supabase = createAdminClient()
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_id', clerkUser.id)
    .single()

  return (
    <div className="p-8 text-white">
      <div>Clerk ID: {clerkUser.id}</div>
      <div>Profile: {profile ? profile.username : 'niet gevonden'}</div>
      <div>Error: {error ? error.message : 'geen'}</div>
    </div>
  )
}
