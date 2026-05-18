import Link from 'next/link'
import LogoutButton from '@/components/ui/LogoutButton'
import AimeegaLogo from '@/components/ui/AimeegaLogo'
import { Home, TrendingUp, Upload, User } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase'

const NAV = [
  { href: '/discover', icon: Home, label: 'Ontdekken' },
  { href: '/trending', icon: TrendingUp, label: 'Trending' },
  { href: '/upload', icon: Upload, label: 'Uploaden' },
  { href: '/profile', icon: User, label: 'Profiel' },
]

const SYSTEMS = ['NEXUS', 'FORGE', 'ORACLE', 'SENTINEL', 'VAULT']

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const clerkUser = await currentUser()
  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, display_name')
    .eq('clerk_id', clerkUser?.id ?? '')
    .single()

  return (
    <div style={{display:"flex",height:"100vh",overflow:"hidden",background:"#06060a",color:"white"}}>
      {/* Sidebar */}
      <aside style={{width:192,flexShrink:0,background:"#0d0d14",borderRight:"1px solid #1e1e30",display:"flex",flexDirection:"column",padding:"16px 10px"}}>
        {/* Logo */}
        <div className="px-2 pb-4 mb-3 border-b border-border">
          <Link href="/" className="font-display text-xl tracking-wide text-white hover:text-brand transition-colors">AIMEEGA</Link>
          <div className="text-[8px] text-muted/60 tracking-widest mt-0.5">AI FILM PLATFORM</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-1">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-muted text-sm font-medium transition-all hover:bg-surface2 hover:text-white [&.active]:bg-brand/10 [&.active]:text-brand [&.active]:border-l-2 [&.active]:border-brand">
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* System status */}
        <div className="border-t border-border pt-3 mt-2">
          <div className="text-[8px] text-muted/50 tracking-widest px-2 mb-2">SYSTEMEN</div>
          {SYSTEMS.map(s => (
            <div key={s} className="flex items-center justify-between px-2 py-1">
              <span className="text-[10px] text-muted/60 font-semibold">{s}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_6px_rgba(0,212,138,.8)]" />
            </div>
          ))}
        </div>

        {/* User */}
        <div className="border-t border-border pt-3 mt-2 flex items-center gap-2.5 px-2">
          <LogoutButton />
          <div>
            <div className="text-xs font-semibold truncate max-w-[100px]">
              {profile?.display_name ?? profile?.username ?? 'Creator'}
            </div>
            <div className="text-[10px] text-brand">@{profile?.username ?? '...'}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Topbar */}
        <header className="flex-shrink-0 h-14 flex items-center justify-between px-7 bg-bg/90 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-green">
              <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              <span>Alle systemen live</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/upload" className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
              <Upload size={13} /> Upload
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{flex:1,overflowY:"auto"}}>
          {children}
        </main>
      </div>
    </div>
  )
}
