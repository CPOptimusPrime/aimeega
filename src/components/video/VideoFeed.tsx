'use client'

import { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import type { Video, PaginatedResponse } from '@/types'

interface Props {
  genre?: string
  search?: string
  feed?: string
}

export default function VideoFeed({ genre, search, feed = 'all' }: Props) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)

  const fetchVideos = async (p = 1, append = false) => {
    const params = new URLSearchParams({
      feed,
      page: String(p),
      per_page: '16',
      ...(genre ? { genre } : {}),
      ...(search ? { search } : {}),
    })

    const res = await fetch(`/api/videos?${params}`)
    const data: PaginatedResponse<Video> = await res.json()

    setVideos(prev => append ? [...prev, ...data.data] : data.data)
    setHasMore(data.has_more)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setPage(1)
    fetchVideos(1)
  }, [genre, search, feed])

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchVideos(next, true)
  }

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse">
          <div className="bg-surface2 aspect-video" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-surface2 rounded w-3/4" />
            <div className="h-2 bg-surface2 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )

  if (!videos.length) return (
    <div className="py-20 text-center text-muted">
      <div className="text-4xl mb-4">🎬</div>
      <div className="font-display text-2xl mb-2">GEEN FILMS GEVONDEN</div>
      <div className="text-sm">Probeer een andere zoekterm of genre</div>
    </div>
  )

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map(v => <VideoCard key={v.id} video={v} />)}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button className="btn-ghost px-8 py-3" onClick={loadMore}>Meer laden</button>
        </div>
      )}
    </div>
  )
}
