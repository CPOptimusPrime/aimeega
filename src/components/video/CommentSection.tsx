'use client'

import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { timeAgo, formatCount } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import type { Comment } from '@/types'

export default function CommentSection({ videoId, commentCount }: { videoId: string; commentCount: number }) {
  const { user } = useUser()
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/videos/${videoId}/comments`)
      .then(r => r.json())
      .then(d => setComments(d.data ?? []))
  }, [videoId])

  const submit = async () => {
    if (!text.trim()) return
    setLoading(true)
    const res = await fetch(`/api/videos/${videoId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    })
    const comment = await res.json()
    setComments(c => [{ ...comment, author: { display_name: user?.firstName ?? 'Jij', avatar_url: user?.imageUrl } }, ...c])
    setText('')
    setLoading(false)
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden sticky top-20">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <span className="font-display text-lg tracking-wide">{commentCount} REACTIES</span>
      </div>

      {/* Input */}
      <div className="p-3.5 border-b border-border">
        <div className="flex gap-2.5 items-start">
          {user?.imageUrl ? (
            <Image src={user.imageUrl} alt="jij" width={28} height={28} className="rounded-full flex-shrink-0 mt-0.5" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-purple flex items-center justify-center text-[9px] font-display flex-shrink-0 mt-0.5 text-bg">JIJ</div>
          )}
          <div className="flex-1 flex gap-2">
            <input className="input text-sm py-2" placeholder="Voeg een reactie toe..." value={text} onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && submit()} />
            <button onClick={submit} disabled={loading || !text.trim()} className="btn-primary px-3 py-2 flex-shrink-0">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="overflow-y-auto max-h-[500px]">
        {comments.length === 0 ? (
          <div className="py-10 text-center text-muted text-sm">Wees de eerste die reageert!</div>
        ) : comments.map((c, i) => (
          <div key={c.id ?? i} className="flex gap-2.5 p-3.5 border-b border-border/50 last:border-0">
            {c.author?.avatar_url ? (
              <Image src={c.author.avatar_url} alt={c.author.display_name} width={26} height={26} className="rounded-full flex-shrink-0 mt-0.5" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple to-blue flex items-center justify-center text-[9px] font-display flex-shrink-0 mt-0.5">
                {c.author?.display_name?.slice(0, 2).toUpperCase() ?? '??'}
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs">{c.author?.display_name ?? 'Gebruiker'}</span>
                <span className="text-[10px] text-muted">{timeAgo(c.created_at)}</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{c.content}</p>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {formatCount(c.like_count)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
