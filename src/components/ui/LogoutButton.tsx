'use client'

import { useClerk } from '@clerk/nextjs'

export default function LogoutButton() {
  const { signOut } = useClerk()
  return (
    <button
      onClick={async () => {
        await signOut()
        window.location.href = '/login'
      }}
      style={{fontSize:12,color:'#7b2fff',background:'none',border:'none',cursor:'pointer',padding:0}}
    >
      Uitloggen
    </button>
  )
}
