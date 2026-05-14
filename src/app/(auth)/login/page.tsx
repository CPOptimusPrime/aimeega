'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { useSignIn } = await import('@clerk/nextjs')
      router.push('/discover')
    } catch (err: any) {
      setError('Inloggen mislukt. Controleer je gegevens.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'#06060a',color:'white',fontFamily:'sans-serif'}}>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px'}}>
        <Link href="/" style={{color:'#7b2fff',fontSize:24,fontWeight:'bold',marginBottom:48,display:'block'}}>AIMEEGA</Link>
        <div style={{width:'100%',maxWidth:400}}>
          <h1 style={{fontSize:40,fontWeight:'bold',marginBottom:8}}>WELKOM TERUG</h1>
          <p style={{color:'#70708a',marginBottom:32}}>Log in op je account</p>
          {error && <div style={{background:'rgba(255,61,107,.15)',border:'1px solid rgba(255,61,107,.3)',color:'#ff3d6b',padding:'12px',borderRadius:8,marginBottom:16,fontSize:14}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:11,fontWeight:'bold',color:'#70708a',letterSpacing:1,marginBottom:8}}>E-MAILADRES</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="jij@email.com"
                style={{width:'100%',background:'#13131e',border:'1px solid #1e1e30',color:'white',padding:'12px 16px',borderRadius:8,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{display:'block',fontSize:11,fontWeight:'bold',color:'#70708a',letterSpacing:1,marginBottom:8}}>WACHTWOORD</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                placeholder="Jouw wachtwoord"
                style={{width:'100%',background:'#13131e',border:'1px solid #1e1e30',color:'white',padding:'12px 16px',borderRadius:8,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
            </div>
            <button type="submit" disabled={loading}
              style={{width:'100%',background:'linear-gradient(135deg,#7b2fff,#00b4ff)',color:'white',border:'none',padding:'14px',borderRadius:8,fontSize:16,fontWeight:'bold',cursor:'pointer'}}>
              {loading ? 'Even geduld...' : 'Inloggen →'}
            </button>
          </form>
          <p style={{textAlign:'center',marginTop:20,color:'#70708a',fontSize:14}}>
            Nog geen account? <Link href="/signup" style={{color:'#7b2fff',fontWeight:'bold'}}>Gratis aanmelden</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
