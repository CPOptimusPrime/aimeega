'use client'

import { useSignUp } from '@clerk/nextjs'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Check, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const { signUp, isLoaded, setActive } = useSignUp()
  const [step, setStep] = useState(0) // 0=form, 1=verify
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [usernameStatus, setUsernameStatus] = useState('idle')
  const [suggestions, setSuggestions] = useState([])

  const checkUsername = useCallback(async (val) => {
    if (!val || val.length < 3) { setUsernameStatus('idle'); return }
    if (!/^[a-z0-9_-]{3,30}$/.test(val)) { setUsernameStatus('invalid'); return }
    setUsernameStatus('checking')
    const res = await fetch(`/api/users/check-username?username=${encodeURIComponent(val)}`)
    const data = await res.json()
    if (data.available) { setUsernameStatus('available'); setSuggestions([]) }
    else { setUsernameStatus('taken'); setSuggestions(data.suggestions ?? []) }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => checkUsername(username), 500)
    return () => clearTimeout(t)
  }, [username, checkUsername])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded || usernameStatus !== 'available') return
    setLoading(true)
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || undefined,
        unsafeMetadata: { username }
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setStep(1)
    } catch (err) {
      toast.error(err.errors?.[0]?.message ?? 'Aanmelden mislukt')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        // Sla gebruikersnaam op via onboarding API
        await fetch('/api/users/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, role: 'creator', genres: [], tools: [] })
        })
        window.location.href = '/discover'
      } else {
        toast.error('Status: ' + result.status)
      }
    } catch (err) {
      toast.error(err.errors?.[0]?.message ?? 'Code onjuist')
    } finally {
      setLoading(false)
    }
  }

  const usernameIcon = () => {
    if (usernameStatus === 'checking') return <Loader2 size={16} className="animate-spin text-muted" />
    if (usernameStatus === 'available') return <Check size={16} className="text-green-500" />
    if (usernameStatus === 'taken' || usernameStatus === 'invalid') return <X size={16} className="text-red-500" />
    return null
  }

  if (step === 1) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h2 className="font-display text-4xl tracking-wide mb-2">CHECK JE EMAIL</h2>
        <p className="text-muted text-sm mb-8">We stuurden een verificatiecode naar <strong className="text-white">{email}</strong></p>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="label">VERIFICATIECODE</label>
            <input className="input text-center text-2xl font-display tracking-widest" placeholder="000000" value={code} onChange={e => setCode(e.target.value)} maxLength={6} required />
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5" disabled={loading}>
            {loading ? <div className="w-5 h-5 border-2 border-transparent border-t-bg rounded-full animate-spin" /> : <>Verifiëren <ArrowRight size={16} /></>}
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-bg">
      <div className="flex-1 flex flex-col items-center justify-center p-12 max-w-lg">
        <Link href="/" className="font-display text-2xl text-brand self-start mb-12">AIMEEGA</Link>
        <div className="w-full">
          <h1 className="font-display text-5xl tracking-wide mb-2">JOIN HET PLATFORM</h1>
          <p className="text-muted text-sm mb-8">Gratis aanmelden. Geen creditcard.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">VOLLEDIGE NAAM</label>
              <input className="input" placeholder="Jouw naam" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="label">E-MAILADRES</label>
              <input className="input" type="email" placeholder="jij@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">WACHTWOORD</label>
              <div className="relative">
                <input className="input pr-10" type={showPass ? 'text' : 'password'} placeholder="Minimaal 8 tekens" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">GEBRUIKERSNAAM</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-bold">@</span>
                <input className="input pl-8 pr-10" placeholder="jouwgebruikersnaam"
                  value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  maxLength={30} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">{usernameIcon()}</div>
              </div>
              {usernameStatus === 'available' && <p className="text-green-500 text-xs mt-1">Beschikbaar!</p>}
              {usernameStatus === 'taken' && <p className="text-red-500 text-xs mt-1">Al in gebruik</p>}
              {usernameStatus === 'invalid' && <p className="text-red-500 text-xs mt-1">Alleen letters, cijfers, _ en -</p>}
              {suggestions.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {suggestions.map(s => (
                    <button key={s} type="button" onClick={() => setUsername(s)}
                      className="bg-brand/10 border border-brand/30 text-brand text-xs px-3 py-1 rounded-lg">
                      @{s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base"
              disabled={loading || usernameStatus !== 'available'}>
              {loading ? <div className="w-5 h-5 border-2 border-transparent border-t-bg rounded-full animate-spin" /> : <>Account aanmaken <ArrowRight size={16} /></>}
            </button>
          </form>
          <p className="text-center text-sm text-muted mt-6">
            Al een account? <Link href="/login" className="text-brand font-semibold hover:underline">Inloggen</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-surface border-l border-border items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand/8 rounded-full blur-3xl" />
        <div className="z-10 text-center p-10 max-w-sm">
          <p className="font-display text-sm tracking-widest text-brand mb-8">WAAROM AIMEEGA</p>
          {[['🎬', 'Upload AI-films', 'MP4 tot 500GB. Auto 4K transcoding.'],['💰', 'Verdien geld', 'Creators houden 70%. Uitbetaling elke maand.'],['🚀', 'Word ontdekt', 'ORACLE plaatst je film voor het juiste publiek.'],['🛡️', 'Beschermd', 'SENTINEL scant elke upload automatisch.']].map(([icon, title, desc]) => (
            <div key={title} className="flex items-start gap-4 text-left mb-5">
              <div className="text-xl flex-shrink-0">{icon}</div>
              <div>
                <div className="font-semibold text-sm mb-0.5">{title}</div>
                <div className="text-xs text-muted">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
