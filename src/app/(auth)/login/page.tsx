'use client'

import { useSignIn } from '@clerk/nextjs'
import { useState } from 'react'
import Link from 'next/link'
import AimeegaLogo from '@/components/ui/AimeegaLogo'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { signIn, isLoaded, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    try {
      const result = await signIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        window.location.href = '/discover'
      }
    } catch (err: any) {
      toast.error(err.errors?.[0]?.message ?? 'Inloggen mislukt')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    if (!isLoaded) return
    await signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/discover',
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 max-w-lg">
        <Link href="/" className="font-display text-2xl text-brand self-start mb-12">AIMEEGA</Link>

        <div className="w-full animate-fade-up">
          <h1 className="font-display text-5xl tracking-wide mb-2">WELKOM TERUG</h1>
          <p className="text-muted text-sm mb-8">Log in op je account</p>

          {/* Google */}
          <button onClick={handleGoogle} className="btn-ghost w-full flex items-center justify-center gap-3 mb-6 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/></svg>
            Doorgaan met Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted">of met e-mail</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">E-MAILADRES</label>
              <input className="input" type="email" placeholder="jij@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="label mb-0">WACHTWOORD</label>
                <Link href="/forgot-password" className="text-xs text-brand hover:underline">Vergeten?</Link>
              </div>
              <div className="relative">
                <input className="input pr-10" type={showPass ? 'text' : 'password'} placeholder="Jouw wachtwoord" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base mt-2" disabled={loading}>
              {loading ? <div className="w-5 h-5 border-2 border-transparent border-t-bg rounded-full animate-spin" /> : <>Inloggen <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Nog geen account?{' '}
            <Link href="/signup" className="text-brand font-semibold hover:underline">Gratis aanmelden</Link>
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex flex-1 bg-surface border-l border-border items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-blue/10 rounded-full blur-3xl" />
        <div className="z-10 text-center p-10">
          <p className="font-display text-sm tracking-widest text-brand mb-8">CREATOR VERDIENSTEN</p>
          {[['VoidFrames', '€84.200/maand'], ['NeuralNoir', '€22.100/maand'], ['GlitchWorks', '€14.200/maand']].map(([n, e], i) => (
            <div key={n} className="bg-bg/80 border border-border rounded-xl px-5 py-4 mb-3 flex justify-between gap-10 backdrop-blur-sm">
              <span className="font-semibold text-sm">{n}</span>
              <span className="font-display text-xl text-brand tracking-wide">{e}</span>
            </div>
          ))}
          <p className="text-xs text-muted mt-6">Creators houden 70% van alle inkomsten</p>
        </div>
      </div>
    </div>
  )
}
