'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import VideoCard from '@/components/video/VideoCard'
import { GENRES } from '@/lib/utils'

export default function DiscoverPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [genre, setGenre] = useState('all')
  const [search, setSearch] = useState('')

  const fetchVideos = async () => {
    setLoading(true)
    const params = new URLSearchParams({ feed: 'all', per_page: '20' })
    if (genre !== 'all') params.set('genre', genre)
    if (search) params.set('search', search)
    const res = await fetch('/api/videos?' + params)
    const data = await res.json()
    setVideos(data.data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchVideos() }, [genre])

  return (
    <div className="px-8 py-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-4xl tracking-wide">ONTDEKKEN</h1>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input pl-9 py-2 text-sm w-64" placeholder="Zoek films..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchVideos()}
          />
        </div>
      </div>

      {/* Genre filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button onClick={() => setGenre('all')}
          className={`px-4 py-1.5 rounded-full text-sm border transition-all ${genre === 'all' ? 'border-brand text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
          Alles
        </button>
        {GENRES.map(g => (
          <button key={g} onClick={() => setGenre(g)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${genre === g ? 'border-brand text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="aspect-video bg-surface2 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="py-24 text-center text-muted border border-border rounded-xl">
          <div className="text-4xl mb-3">🎬</div>
          <div className="font-display text-xl mb-2">NOG GEEN FILMS</div>
          <div className="text-sm mb-5">Wees de eerste die een AI-film upload</div>
          <a href="/upload" className="btn-primary inline-flex">Film uploaden</a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
      )}
    </div>
  )
}
