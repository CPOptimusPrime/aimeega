import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getPlayerUrl } from '@/lib/cloudflare'
import { formatCount, formatDuration, timeAgo } from '@/lib/utils'
import VideoActions from '@/components/video/VideoActions'
import CommentSection from '@/components/video/CommentSection'
import VideoCard from '@/components/video/VideoCard'
import Image from 'next/image'

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: video } = await supabase
    .from('videos')
    .select('*, uploader:profiles(*)')
    .eq('id', id)
    .single()

  if (!video) notFound()

  const { data: related } = await supabase
    .from('videos')
    .select('*, uploader:profiles(id,username,display_name,avatar_url,verified)')
    .eq('genre', video.genre)
    .eq('status', 'live')
    .neq('id', id)
    .limit(4)

  const playerUrl = video.cf_uid ? getPlayerUrl(video.cf_uid) : null

  return (
    <div className="px-8 py-7 pb-16">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-7 items-start">
        <div>
          <div className="relative rounded-xl overflow-hidden bg-surface2 aspect-video border border-border">
            {playerUrl ? (
              <iframe src={playerUrl} className="absolute inset-0 w-full h-full" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-2xl text-muted mb-2">WORDT VERWERKT</div>
                  <div className="text-sm text-muted/60">FORGE transcodeert je film...</div>
                </div>
              </div>
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="badge-ai">AI GEGENEREERD</span>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="font-display text-4xl tracking-wide leading-none mb-3">{video.title}</h1>
            <div className="flex items-center gap-4 flex-wrap mb-5">
              <span className="text-muted text-sm">{formatCount(video.view_count)} weergaven</span>
              <span className="bg-surface2 border border-border text-muted text-xs px-3 py-1 rounded-full">{video.genre}</span>
              <span className="text-muted text-xs">{timeAgo(video.created_at)}</span>
            </div>
            <VideoActions video={video} />
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between mt-5">
            <div className="flex items-center gap-3">
              {video.uploader?.avatar_url ? (
                <Image src={video.uploader.avatar_url} alt={video.uploader.display_name} width={44} height={44} className="rounded-full" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-blue flex items-center justify-center font-display text-sm text-white">
                  {video.uploader?.display_name?.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold text-base">{video.uploader?.display_name}</div>
                <div className="text-xs text-muted">{formatCount(video.uploader?.follower_count ?? 0)} volgers</div>
              </div>
            </div>
            <button className="btn-primary text-sm py-2 px-5">+ Volgen</button>
          </div>

          <div className="mt-4 border border-brand/15 rounded-xl p-4">
            <div className="text-[9px] font-bold text-brand tracking-widest mb-3">EU AI ACT — DISCLOSURE</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {([['AI Tool', video.ai_tool], ['Genre', video.genre], ['Muziek', video.music_source || 'n.v.t.'], ['Stemmen', video.voice_source || 'n.v.t.']] as [string,string][]).map(([k, v]) => (
                <div key={k}>
                  <div className="text-[9px] text-muted tracking-wider mb-1">{k}</div>
                  <div className="text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {related && related.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl tracking-wide mb-5">MEER {video.genre.toUpperCase()}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(related as any[]).map((v) => <VideoCard key={v.id} video={v} />)}
              </div>
            </div>
          )}
        </div>
        <CommentSection videoId={video.id} commentCount={video.comment_count} />
      </div>
    </div>
  )
}
