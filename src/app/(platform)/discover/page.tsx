import { Suspense } from 'react'
import VideoFeed from '@/components/video/VideoFeed'
import { GENRES } from '@/lib/utils'

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; search?: string; feed?: string }>
}) {
  const params = await searchParams

  return (
    <div className="pb-16">
      <div className="relative bg-gradient-to-br from-purple/10 via-bg to-blue/5 px-8 py-10 border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple/10 rounded-full blur-3xl pointer-events-none" />
        <div className="text-[10px] font-bold text-brand tracking-widest mb-3">ONTDEKKEN · AI CINEMA</div>
        <h1 className="font-display text-5xl leading-none mb-3 max-w-md">
          AI FILMS DOOR <span className="brand-text">CREATORS.</span><br />VOOR IEDEREEN.
        </h1>
        <p className="text-muted text-sm max-w-sm leading-relaxed">Ontdek AI-gegenereerde films van creators wereldwijd.</p>
      </div>

      <div className="px-8 pt-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {['Alle', 'Trending', ...GENRES].map(g => (
            <a key={g} href={`/discover?genre=${g === 'Alle' ? '' : g}`}
              className={`tag text-sm px-3 py-1.5 rounded-full border transition-all cursor-pointer ${(params.genre ?? '') === (g === 'Alle' ? '' : g) ? 'border-brand text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
              {g}
            </a>
          ))}
        </div>

        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{Array(8).fill(0).map((_, i) => (<div key={i} className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse"><div className="bg-surface2 aspect-video" /><div className="p-3 space-y-2"><div className="h-3 bg-surface2 rounded w-3/4" /><div className="h-2 bg-surface2 rounded w-1/2" /></div></div>))}</div>}>
          <VideoFeed genre={params.genre} search={params.search} />
        </Suspense>
      </div>
    </div>
  )
}
