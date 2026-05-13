import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getPlayerUrl } from '@/lib/cloudflare'
import { formatCount, formatDuration, timeAgo } from '@/lib/utils'
import VideoActions from '@/components/video/VideoActions'
import CommentSection from '@/components/video/CommentSection'
import VideoCard from '@/components/video/VideoCard'
import Image from 'next/image'

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient()

  const { id } = await params

  const { data: video } = await supabase
    .from('videos')
    .select('*, uploader:profiles(*)')
    .eq('id', id)
    .single()

  if (!video) notFound()

  // Increment view count
  await supabase.rpc('increment_views', { video_id: id })

  // Related videos
  const { data: related } = await supabase
    .from('videos')
    .select('*, uploader:profiles(id,username,display_name,avatar_url,verified)')
    .eq('genre', video.genre)
    .eq('status', 'live')
    ..eq('id', id)
    .limit(4)

  const playerUrl = video.cf_uid ? getPlayerUrl(video.cf_uid) : null

  return (
    <div className="px-8 py-7 pb-16 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-7 items-start">

        {/* Left: video + info */}
        <div>
          {/* Player */}
          <div className="relative rounded-xl overflow-hidden bg-surface2 aspect-video border border-border">
            {playerUrl ? (
              <iframe src={playerUrl} className="absolute inset-0 w-full h-full" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple/20 to-bg">
                <div className="text-center">
                  <div className="font-display text-2xl text-muted mb-2">WORDT VERWERKT</div>
                  <div className="text-sm text-muted/60">FORGE is je film aan het transcoderen...</div>
                </div>
              </div>
            )}
            {/* AI badge overlay */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="badge-ai">AI GEGENEREERD</span>
              <span className="bg-black/70 text-muted text-[9px] font-semibold px-2 py-0.5 rounded">via {video.ai_tool}</span>
            </div>
          </div>

          {/* Title + actions */}
          <div className="mt-5">
            <h1 className="font-display text-4xl tracking-wide leading-none mb-3">{video.title}</h1>
            <div className="flex items-center gap-4 flex-wrap mb-5">
              <span className="text-muted text-sm flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {formatCount(video.view_count)} weergaven
              </span>
              <span className="bg-surface2 border border-border text-muted text-xs px-3 py-1 rounded-full">{video.genre}</span>
              {video.cf_duration && <span className="text-muted text-sm">{formatDuration(video.cf_duration)}</span>}
              <span className="text-muted text-xs">{timeAgo(video.created_at)}</span>
            </div>
            <VideoActions video={video} />
          </div>

          {/* Creator */}
          <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between mt-5">
            <div className="flex items-center gap-3">
              {video.uploader?.avatar_url ? (
                <Image src={video.uploader.avatar_url} alt={video.uploader.display_name} width={44} height={44} className="rounded-full" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple to-blue flex items-center justify-center font-display text-sm">
                  {video.uploader?.display_name?.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{video.uploader?.display_name}</span>
                  {video.uploader?.verified && <svg width="15" height="15" viewBox="0 0 24 24" fill="#a855f7"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                </div>
                <div className="text-xs text-muted">{formatCount(video.uploader?.follower_count ?? 0)} volgers</div>
              </div>
            </div>
            <button className="btn-primary text-sm py-2 px-5">+ Volgen</button>
          </div>

          {/* Description */}
          {video.description && (
            <div className="mt-5 bg-surface border border-border rounded-xl p-4">
              <p className="text-sm text-muted leading-relaxed">{video.description}</p>
            </div>
          )}

          {/* AI Disclosure */}
          <div className="mt-4 bg-brand/4 border border-brand/15 rounded-xl p-4">
            <div className="text-[9px] font-bold text-brand tracking-widest mb-3">EU AI ACT — VERPLICHTE DISCLOSURE</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[['AI Tool', video.ai_tool], ['Genre', video.genre], ['Muziek', video.music_source || 'Niet opgegeven'], ['Stemmen', video.voice_source || 'Niet opgegeven']].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[9px] text-muted tracking-wider mb-1">{k}</div>
                  <div className="text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related && related.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl tracking-wide mb-5">MEER {video.genre.toUpperCase()}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(v => <VideoCard key={v.id} video={v} />)}
              </div>
            </div>
          )}
        </div>

        {/* Right: comments */}
        <CommentSection videoId={video.id} commentCount={video.comment_count} />
      </div>
    </div>
  )
}
