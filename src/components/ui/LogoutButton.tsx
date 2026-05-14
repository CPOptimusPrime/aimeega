'use client'

import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { signOut } = useClerk()
  const router = useRouter()
  return (
    <button
      onClick={() => signOut().then(() => router.push('/login'))}
      style={{fontSize:12,color:'#7b2fff',background:'none',border:'none',cursor:'pointer',padding:0}}
    >
      Uitloggen
    </button>
  )
}
