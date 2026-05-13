'use client'

import { useState } from 'react'
import { Heart, Bookmark, Share2 } from 'lucide-react'
import { formatCount } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Video } from '@/types'

export default function VideoActions({ video }: { video: Video }) {
  const [liked, setLiked] = useState(video.liked_by_me ?? false)
  const [likeCount, setLikeCount] = useState(video.like_count)
  const [saved, setSaved] = useState(video.saved_by_me ?? false)

  const handleLike = async () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    await fetch(`/api/videos/${video.id}/like`, { method: liked ? 'DELETE' : 'POST' })
  }

  const handleSave = async () => {
    setSaved(!saved)
    toast.success(saved ? 'Verwijderd uit opgeslagen' : 'Opgeslagen!')
    await fetch(`/api/videos/${video.id}/save`, { method: saved ? 'DELETE' : 'POST' })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link gekopieerd!')
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${liked ? 'bg-red/10 border-red/30 text-red' : 'bg-surface border-border text-muted hover:border-border2 hover:text-white'}`}>
        <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        {formatCount(likeCount)}
      </button>
      <button onClick={handleSave} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${saved ? 'bg-brand/10 border-brand/30 text-brand' : 'bg-surface border-border text-muted hover:border-border2 hover:text-white'}`}>
        <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
        {saved ? 'Opgeslagen' : 'Opslaan'}
      </button>
      <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-muted text-sm hover:border-border2 hover:text-white transition-all">
        <Share2 size={15} /> Delen
      </button>
    </div>
  )
}
