'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Eye, Heart, Play } from 'lucide-react'
import { formatCount, formatDuration } from '@/lib/utils'
import type { Video } from '@/types'

export default function VideoCard({ video }: { video: Video }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/video/${video.id}`}
      className="group bg-surface border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-border2 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Thumbnail */}
      <div className="relative aspect-video bg-surface2 overflow-hidden">
        {video.cf_thumbnail ? (
          <Image src={video.cf_thumbnail} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-blue/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Play size={20} className="text-white/60 ml-0.5" />
            </div>
          </div>
        )}

        {/* Play overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-brand/85 flex items-center justify-center shadow-lg shadow-accent/30">
              <Play size={22} className="text-bg ml-0.5" fill="#06060a" />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="badge-ai">AI</span>
          {video.view_count > 1_000_000 && <span className="badge-trending">TRENDING</span>}
        </div>

        {/* Duration */}
        {video.cf_duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-display">
            {formatDuration(video.cf_duration)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex gap-2.5">
          {/* Avatar */}
          {video.uploader?.avatar_url ? (
            <Image src={video.uploader.avatar_url} alt={video.uploader.display_name} width={28} height={28} className="rounded-full flex-shrink-0 mt-0.5" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple to-blue flex items-center justify-center text-[10px] font-display font-bold flex-shrink-0 mt-0.5">
              {video.uploader?.display_name?.slice(0, 2).toUpperCase() ?? '??'}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm leading-tight truncate mb-1">{video.title}</div>
            <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5">
              <span>{video.uploader?.display_name}</span>
              {video.uploader?.verified && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#a855f7"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              )}
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted">
              <span className="flex items-center gap-1"><Eye size={10} />{formatCount(video.view_count)}</span>
              <span className="flex items-center gap-1"><Heart size={10} />{formatCount(video.like_count)}</span>
              <span className="bg-surface2 px-1.5 py-0.5 rounded text-[9px]">{video.genre}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
