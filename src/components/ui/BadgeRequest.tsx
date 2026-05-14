'use client'

import { useState } from 'react'
import { Shield, ShieldCheck, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BadgeRequest() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<'verified'|'verified_plus'>('verified')
  const [motivation, setMotivation] = useState('')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!motivation.trim()) return
    setLoading(true)
    const res = await fetch('/api/badges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ badge_type: type, motivation, website }),
    })
    setLoading(false)
    if (res.ok) {
      toast.success('Aanvraag ingediend! We bekijken het zo snel mogelijk.')
      setOpen(false)
      setMotivation('')
      setWebsite('')
    } else {
      const data = await res.json()
      toast.error(data.error ?? 'Er ging iets mis')
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-ghost text-sm flex items-center gap-2">
        <Shield size={15} /> Badge aanvragen
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 animate-fade-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl tracking-wide">BADGE AANVRAGEN</h2>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-white"><X size={20}/></button>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { id: 'verified' as const, label: 'Verified', desc: 'Gratis — voor actieve creators', icon: Shield },
                { id: 'verified_plus' as const, label: 'Verified PLUS', desc: 'Premium — voor merken & pros', icon: ShieldCheck },
              ].map(opt => (
                <div key={opt.id} onClick={() => setType(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${type === opt.id ? 'border-brand bg-brand/8' : 'border-border bg-surface2 hover:border-border2'}`}>
                  <opt.icon size={18} className={type === opt.id ? 'text-brand mb-2' : 'text-muted mb-2'} />
                  <div className="font-bold text-sm mb-1">{opt.label}</div>
                  <div className="text-xs text-muted">{opt.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-5">
              <div>
                <label className="label">MOTIVATIE *</label>
                <textarea className="input" rows={3} placeholder="Waarom verdien jij deze badge? Beschrijf je werk, bereik en impact."
                  value={motivation} onChange={e => setMotivation(e.target.value)} style={{ resize: 'vertical' }} />
              </div>
              <div>
                <label className="label">WEBSITE / PORTFOLIO (optioneel)</label>
                <input className="input" placeholder="https://..." value={website} onChange={e => setWebsite(e.target.value)} />
              </div>
            </div>

            {type === 'verified_plus' && (
              <div className="bg-purple/8 border border-purple/20 rounded-lg p-3 mb-5 text-xs text-muted">
                Verified PLUS is een betaalde badge. Na goedkeuring van je aanvraag ontvang je een betaallink. Prijs wordt later vastgesteld.
              </div>
            )}

            <div className="flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setOpen(false)}>Annuleren</button>
              <button className="btn-primary flex-[2] flex items-center justify-center gap-2" onClick={submit} disabled={loading || !motivation.trim()}>
                {loading ? 'Versturen...' : 'Aanvraag indienen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
