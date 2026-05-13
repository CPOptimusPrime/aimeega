'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { GENRES, AI_TOOLS } from '@/lib/utils'
import AimeegaLogo from '@/components/ui/AimeegaLogo'

const ROLES = [
  { id: 'creator', label: 'AI Filmmaker', desc: 'Ik maak en upload AI-films' },
  { id: 'viewer', label: 'Film Fan', desc: 'Ik ben hier om te ontdekken' },
  { id: 'studio', label: 'Studio / Team', desc: 'We produceren professioneel' },
]

const STEPS_TOTAL = 3

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [role, setRole] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  const [tools, setTools] = useState<string[]>([])

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const finish = async () => {
    await fetch('/api/users/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, genres, tools }),
    })
    router.push('/discover')
  }

  const STEPS = [
    <div key="role" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">WIE BEN JIJ?</h2>
      <p className="text-muted text-sm mb-8">Help ons je ervaring te personaliseren.</p>
      <div className="space-y-3">
        {ROLES.map(r => (
          <div key={r.id} onClick={() => { setRole(r.id); setTimeout(() => setStep(1), 200) }}
            className={`p-5 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${role === r.id ? 'border-accent bg-brand/6' : 'border-border bg-surface2 hover:border-border2'}`}>
            <div>
              <div className="font-bold text-base mb-1">{r.label}</div>
              <div className="text-sm text-muted">{r.desc}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${role === r.id ? 'border-accent bg-brand' : 'border-border'}`}>
              {role === r.id && <Check size={11} className="text-bg" />}
            </div>
          </div>
        ))}
      </div>
    </div>,

    <div key="genres" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">JOUW GENRES</h2>
      <p className="text-muted text-sm mb-8">Welke AI-films spreken jou aan? Kies er zoveel als je wilt.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {GENRES.map(g => (
          <span key={g} onClick={() => toggle(genres, setGenres, g)}
            className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${genres.includes(g) ? 'border-accent text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
            {g}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="btn-ghost flex-1" onClick={() => setStep(0)}>← Terug</button>
        <button className="btn-primary flex-[2] flex items-center justify-center gap-2" onClick={() => setStep(2)}>
          Volgende <ArrowRight size={14} />
        </button>
      </div>
    </div>,

    <div key="tools" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">JOUW AI TOOLS</h2>
      <p className="text-muted text-sm mb-8">Welke tools gebruik je? Je kunt dit later aanpassen.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {AI_TOOLS.map(t => (
          <span key={t} onClick={() => toggle(tools, setTools, t)}
            className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${tools.includes(t) ? 'border-accent text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-brand/4 border border-brand/15 rounded-xl p-4 mb-6">
        <span className="text-2xl">🎬</span>
        <div>
          <div className="font-bold text-sm mb-0.5">Uploaden is altijd gratis</div>
          <div className="text-xs text-muted">Geen abonnement. Geen limiet. Korte clips én volledige films.</div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn-ghost flex-1" onClick={() => setStep(1)}>← Terug</button>
        <button className="btn-primary flex-[2] flex items-center justify-center gap-2 py-3.5 text-base" onClick={finish}>
          Platform betreden <ArrowRight size={16} />
        </button>
      </div>
    </div>,
  ]

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8 relative">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-border">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${(step / STEPS_TOTAL) * 100}%` }} />
      </div>
      <div className="font-display text-xl text-brand mb-12 self-start max-w-xl w-full">AIMEEGA</div>
      <div className="flex gap-2 mb-10 self-start max-w-xl w-full">
        {Array(STEPS_TOTAL).fill(0).map((_, i) => (
          <div key={i} className="h-0.5 flex-1 rounded-full transition-all duration-300"
            style={{ background: i <= step ? '#a855f7' : '#1e1e30' }} />
        ))}
      </div>
      {STEPS[step]}
    </div>
  )
}
