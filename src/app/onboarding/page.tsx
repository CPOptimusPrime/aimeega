'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { ArrowRight, Check, X, Loader2 } from 'lucide-react'
import { GENRES, AI_TOOLS } from '@/lib/utils'

const ROLES = [
  { id: 'creator', label: 'AI Filmmaker', desc: 'Ik maak en upload AI-films' },
  { id: 'viewer', label: 'Film Fan', desc: 'Ik ben hier om te ontdekken' },
  { id: 'studio', label: 'Studio / Team', desc: 'We produceren professioneel' },
]

const STEPS_TOTAL = 4

export default function OnboardingPage() {
  const router = useRouter()
  const { isLoaded } = useAuth()
  const [step, setStep] = useState(0)
  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')
  const [usernameStatus, setUsernameStatus] = useState<'idle'|'checking'|'available'|'taken'|'invalid'>('idle')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    if (!isLoaded) return
    fetch('/api/users/profile')
      .then(r => r.json())
      .then(data => { if (data?.profile?.username) router.replace('/discover') })
      .catch(() => {})
  }, [isLoaded, router])
  const [tools, setTools] = useState<string[]>([])

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const checkUsername = useCallback(async (val: string) => {
    if (!val || val.length < 3) { setUsernameStatus('idle'); return }
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(val)) { setUsernameStatus('invalid'); return }
    setUsernameStatus('checking')
    const res = await fetch(`/api/users/check-username?username=${encodeURIComponent(val)}`)
    const data = await res.json()
    if (data.available) {
      setUsernameStatus('available')
      setSuggestions([])
    } else {
      setUsernameStatus('taken')
      setSuggestions(data.suggestions ?? [])
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => checkUsername(username), 500)
    return () => clearTimeout(timer)
  }, [username, checkUsername])

  const finish = async () => {
    if (usernameStatus !== 'available') return
    await fetch('/api/users/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, username, genres, tools }),
    })
    router.push('/discover')
  }

  const statusIcon = () => {
    if (usernameStatus === 'checking') return <Loader2 size={16} className="animate-spin text-muted" />
    if (usernameStatus === 'available') return <Check size={16} className="text-green" />
    if (usernameStatus === 'taken' || usernameStatus === 'invalid') return <X size={16} className="text-red" />
    return null
  }

  const statusText = () => {
    if (usernameStatus === 'available') return <span className="text-green text-xs">Beschikbaar!</span>
    if (usernameStatus === 'taken') return <span className="text-red text-xs">Al in gebruik</span>
    if (usernameStatus === 'invalid') return <span className="text-red text-xs">Alleen letters, cijfers, _ en - toegestaan (3-30 tekens)</span>
    return null
  }

  const STEPS = [
    // Step 0: Wie ben je?
    <div key="role" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">WIE BEN JIJ?</h2>
      <p className="text-muted text-sm mb-8">Help ons je ervaring te personaliseren.</p>
      <div className="space-y-3">
        {ROLES.map(r => (
          <div key={r.id} onClick={() => { setRole(r.id); setTimeout(() => setStep(1), 200) }}
            className={`p-5 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${role === r.id ? 'border-brand bg-brand/6' : 'border-border bg-surface2 hover:border-border2'}`}>
            <div>
              <div className="font-bold text-base mb-1">{r.label}</div>
              <div className="text-sm text-muted">{r.desc}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${role === r.id ? 'border-brand bg-brand' : 'border-border'}`}>
              {role === r.id && <Check size={11} className="text-white" />}
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Step 1: Gebruikersnaam
    <div key="username" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">KIES JE NAAM</h2>
      <p className="text-muted text-sm mb-8">Dit is je unieke gebruikersnaam op Aimeega. Je kunt hem later niet meer wijzigen.</p>
      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-bold">@</span>
          <input className="input pl-8 pr-10 text-lg font-bold" placeholder="jouwgebruikersnaam"
            value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
            maxLength={30} autoFocus />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{statusIcon()}</div>
        </div>
        <div className="mt-2 h-4">{statusText()}</div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-muted mb-2">Suggesties:</p>
          <div className="flex gap-2 flex-wrap">
            {suggestions.map(s => (
              <button key={s} onClick={() => setUsername(s)}
                className="bg-brand/10 border border-brand/30 text-brand text-sm px-3 py-1.5 rounded-lg hover:bg-brand/20 transition-all">
                @{s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-surface2 border border-border rounded-xl p-4 mb-6 text-xs text-muted space-y-1">
        <div>• Alleen letters, cijfers, underscores (_) en koppeltekens (-)</div>
        <div>• Minimaal 3, maximaal 30 tekens</div>
        <div>• Eenmaal gekozen, niet meer te wijzigen</div>
      </div>

      <div className="flex gap-3">
        <button className="btn-ghost flex-1" onClick={() => setStep(0)}>← Terug</button>
        <button className={`flex-[2] flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${usernameStatus === 'available' ? 'btn-primary' : 'bg-surface2 border border-border text-muted cursor-not-allowed'}`}
          onClick={() => usernameStatus === 'available' && setStep(2)}
          disabled={usernameStatus !== 'available'}>
          Volgende <ArrowRight size={14} />
        </button>
      </div>
    </div>,

    // Step 2: Genres
    <div key="genres" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">JOUW GENRES</h2>
      <p className="text-muted text-sm mb-8">Welke AI-films spreken jou aan?</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {GENRES.map(g => (
          <span key={g} onClick={() => toggle(genres, setGenres, g)}
            className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${genres.includes(g) ? 'border-brand text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
            {g}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="btn-ghost flex-1" onClick={() => setStep(1)}>← Terug</button>
        <button className="btn-primary flex-[2] flex items-center justify-center gap-2" onClick={() => setStep(3)}>
          Volgende <ArrowRight size={14} />
        </button>
      </div>
    </div>,

    // Step 3: AI Tools + finish
    <div key="tools" className="animate-fade-up max-w-lg w-full">
      <h2 className="font-display text-5xl tracking-wide mb-2">JOUW AI TOOLS</h2>
      <p className="text-muted text-sm mb-8">Welke tools gebruik je?</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {AI_TOOLS.map(t => (
          <span key={t} onClick={() => toggle(tools, setTools, t)}
            className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${tools.includes(t) ? 'border-brand text-brand bg-brand/8' : 'border-border text-muted hover:border-border2 hover:text-white'}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-brand/6 border border-brand/20 rounded-xl p-4 mb-6">
        <span className="text-2xl flex-shrink-0">🎬</span>
        <div>
          <div className="font-bold text-sm mb-0.5">Uploaden is altijd gratis</div>
          <div className="text-xs text-muted">Geen abonnement. Geen limiet.</div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn-ghost flex-1" onClick={() => setStep(2)}>← Terug</button>
        <button className="btn-primary flex-[2] flex items-center justify-center gap-2 py-3.5 text-base" onClick={finish}>
          Platform betreden <ArrowRight size={16} />
        </button>
      </div>
    </div>,
  ]

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8 relative">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-border">
        <div className="h-full transition-all duration-500" style={{ width: `${(step / STEPS_TOTAL) * 100}%`, background: 'linear-gradient(135deg,#7b2fff,#00b4ff)' }} />
      </div>
      <div className="mb-12 self-start max-w-xl w-full">
        <div className="font-display text-2xl" style={{ background: 'linear-gradient(135deg,#7b2fff,#00b4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Aimeega
        </div>
      </div>
      <div className="flex gap-2 mb-10 self-start max-w-xl w-full">
        {Array(STEPS_TOTAL).fill(0).map((_, i) => (
          <div key={i} className="h-0.5 flex-1 rounded-full transition-all duration-300"
            style={{ background: i <= step ? '#7b2fff' : '#1e1e30' }} />
        ))}
      </div>
      {STEPS[step]}
    </div>
  )
}
