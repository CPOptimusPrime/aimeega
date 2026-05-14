import { currentUser } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase'
import { formatCount } from '@/lib/utils'
import Image from 'next/image'
import VideoCard from '@/components/video/VideoCard'

export default async function ProfilePage() {
  const clerkUser = await currentUser()
  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_id', clerkUser?.id)
    .single()

  const { data: videos } = await supabase
    .from('videos')
    .select('*, uploader:profiles(id,username,display_name,avatar_url,verified)')
    .eq('uploader_id', profile?.id)
    .order('created_at', { ascending: false })

  if (!profile) return <div className="p-8 text-muted">Profiel niet gevonden.</div>

  return (
    <div className="pb-16">
      <div className="h-44 bg-gradient-to-br from-purple/15 via-bg to-blue/8 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand/6 rounded-full blur-3xl" />
      </div>
      <div className="px-8">
        <div className="flex justify-between items-end -mt-8 mb-6">
          <div className="flex items-end gap-4">
            <div className="border-4 border-bg rounded-full">
              {clerkUser?.imageUrl ? (
                <Image src={clerkUser.imageUrl} alt={profile.display_name} width={80} height={80} className="rounded-full" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple to-blue flex items-center justify-center font-display text-2xl">
                  {profile.display_name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-3xl tracking-wide">{profile.display_name}</h1>
                {profile.verified && <svg width="18" height="18" viewBox="0 0 24 24" fill="#a855f7"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
              </div>
              <div className="text-muted text-sm">@{profile.username} · AI Filmmaker</div>
            </div>
          </div>
          <button className="btn-ghost text-sm">Profiel bewerken</button>
        </div>
        <div className="flex gap-8 pb-6 mb-6 border-b border-border">
          {[["Volgers", formatCount(profile.follower_count)], ["Volgend", formatCount(profile.following_count)], ["Films", profile.video_count], ["Views", formatCount(profile.total_views)]].map(([l, v]) => (
            <div key={l}>
              <div className="font-display text-2xl text-brand">{v}</div>
              <div className="text-xs text-muted">{l}</div>
            </div>
          ))}
        </div>
        {profile.bio && <p className="text-sm text-muted leading-relaxed mb-6 max-w-lg">{profile.bio}</p>}
        <h2 className="font-display text-2xl tracking-wide mb-5">MIJN FILMS</h2>
        {!videos?.length ? (
          <div className="py-16 text-center text-muted border border-border rounded-xl">
            <div className="text-4xl mb-3">🎬</div>
            <div className="font-display text-xl mb-2">NOG GEEN FILMS</div>
            <div className="text-sm mb-5">Upload je eerste AI-film</div>
            <a href="/upload" className="btn-primary inline-flex">Film uploaden</a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        )}
      </div>
    </div>
  )
}
