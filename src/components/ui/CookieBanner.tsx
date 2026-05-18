'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted')
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookies_accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{position:'fixed',bottom:24,left:24,right:24,zIndex:9999,background:'#0d0d14',border:'1px solid #1e1e30',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap',boxShadow:'0 8px 32px rgba(0,0,0,0.4)',maxWidth:700,margin:'0 auto'}}>
      <p style={{color:'#70708a',fontSize:13,margin:0,flex:1}}>
        Wij gebruiken cookies voor een goede werking van het platform.{' '}
        <a href="/privacy" style={{color:'#7b2fff'}}>Meer info</a>
      </p>
      <button onClick={accept} style={{background:'linear-gradient(135deg,#7b2fff,#00b4ff)',color:'white',border:'none',borderRadius:8,padding:'8px 20px',fontSize:13,fontWeight:'bold',cursor:'pointer'}}>
        Accepteren
      </button>
    </div>
  )
}
