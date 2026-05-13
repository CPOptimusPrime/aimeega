import VideoFeed from '@/components/video/VideoFeed'
import { Flame } from 'lucide-react'

export default function TrendingPage() {
  return (
    <div className="pb-16">
      <div className="px-8 py-10 border-b border-border bg-gradient-to-br from-red/8 via-bg to-bg">
        <div className="flex items-center gap-3 mb-3">
          <Flame size={24} className="text-red" />
          <h1 className="font-display text-5xl tracking-wide">TRENDING</h1>
        </div>
        <p className="text-muted text-sm">De meest bekeken AI-films van dit moment.</p>
      </div>
      <div className="px-8 pt-7">
        <VideoFeed feed="trending" />
      </div>
    </div>
  )
}
