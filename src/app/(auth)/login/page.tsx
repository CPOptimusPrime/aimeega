'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSignIn } from '@clerk/nextjs'

export default function LoginPage() {
  const { signIn, isLoaded, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      const result = await signIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        window.location.href = '/discover'
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage ?? err.errors?.[0]?.message ?? 'Inloggen mislukt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'#06060a',color:'white',fontFamily:'sans-serif'}}>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px',maxWidth:480}}>
        <Link href="/" style={{color:'#7b2fff',fontSize:22,fontWeight:'bold',marginBottom:48,display:'block',textDecoration:'none'}}>AIMEEGA</Link>
        <div style={{width:'100%'}}>
          <h1 style={{fontSize:42,fontWeight:'bold',marginBottom:6}}>WELKOM TERUG</h1>
          <p style={{color:'#70708a',marginBottom:32,fontSize:14}}>Log in op je account</p>
          {error && (
            <div style={{background:'rgba(255,61,107,.15)',border:'1px solid rgba(255,61,107,.3)',color:'#ff3d6b',padding:'12px 16px',borderRadius:8,marginBottom:20,fontSize:14}}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:11,fontWeight:'bold',color:'#70708a',letterSpacing:1,marginBottom:8}}>E-MAILADRES</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="jij@email.com"
                style={{width:'100%',background:'#13131e',border:'1px solid #1e1e30',color:'white',padding:'12px 16px',borderRadius:8,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginBottom:28}}>
              <label style={{display:'block',fontSize:11,fontWeight:'bold',color:'#70708a',letterSpacing:1,marginBottom:8}}>WACHTWOORD</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                placeholder="Jouw wachtwoord"
                style={{width:'100%',background:'#13131e',border:'1px solid #1e1e30',color:'white',padding:'12px 16px',borderRadius:8,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
            </div>
            <button type="submit" disabled={loading || !isLoaded}
              style={{width:'100%',background:'linear-gradient(135deg,#7b2fff,#00b4ff)',color:'white',border:'none',padding:'14px',borderRadius:8,fontSize:16,fontWeight:'bold',cursor:'pointer',opacity:loading?0.7:1}}>
              {loading ? 'Inloggen...' : 'Inloggen →'}
            </button>
          </form>
          <p style={{textAlign:'center',marginTop:24,color:'#70708a',fontSize:14}}>
            Nog geen account? <Link href="/signup" style={{color:'#7b2fff',fontWeight:'bold',textDecoration:'none'}}>Gratis aanmelden</Link>
          </p>
        </div>
      </div>
      <div style={{flex:1,background:'#0d0d14',borderLeft:'1px solid #1e1e30',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{padding:40,maxWidth:340}}>
          <p style={{color:'#7b2fff',fontSize:12,fontWeight:'bold',letterSpacing:3,marginBottom:24}}>CREATOR VERDIENSTEN</p>
          {[['VoidFrames','84.200/mo'],['NeuralNoir','22.100/mo'],['GlitchWorks','14.200/mo']].map(([n,e]) => (
            <div key={n} style={{background:'rgba(6,6,10,.85)',border:'1px solid #1e1e30',borderRadius:10,padding:'13px 18px',marginBottom:10,display:'flex',justifyContent:'space-between'}}>
              <span style={{fontWeight:600,fontSize:14}}>{n}</span>
              <span style={{color:'#7b2fff',fontWeight:'bold'}}>e{e}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
