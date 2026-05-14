import VideoFeed from '@/components/video/VideoFeed'
import { GENRES } from '@/lib/utils'

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; search?: string }>
}) {
  const params = await searchParams

  return (
    <div className="pb-16">
      <div className="px-8 py-10 border-b border-border">
        <h1 className="font-display text-5xl leading-none mb-3">
          AI FILMS DOOR <span className="brand-text">CREATORS.</span>
        </h1>
        <p className="text-muted text-sm">Ontdek AI-gegenereerde films van creators wereldwijd.</p>
      </div>
      <div className="px-8 pt-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {['Alle', ...GENRES].map(g => (
            <a key={g} href={'/discover?genre=' + (g === 'Alle' ? '' : g)}
              className="tag text-sm px-3 py-1.5 rounded-full border border-border text-muted hover:border-brand hover:text-brand transition-all cursor-pointer">
              {g}
            </a>
          ))}
        </div>
        <VideoFeed genre={params.genre} search={params.search} />
      </div>
    </div>
  )
}
