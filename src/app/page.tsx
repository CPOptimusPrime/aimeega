import Link from 'next/link'
import AimeegaLogo from '@/components/ui/AimeegaLogo'
import { ArrowRight, Upload, TrendingUp, DollarSign, Shield, Globe, Zap, Star } from 'lucide-react'

const TICKER = ['12.4M views · Neon Requiem', '57.7M views · Deep Carbon', 'New creator: NeuralNoir', 'Trending: Hollow Signal', '18.2M views · Memoria', '$84,200 payout · VoidFrames']

const FEATURES = [
  { icon: Upload, color: '#a855f7', title: 'Upload AI Films', desc: 'MP4, MOV, MKV tot 500GB. Auto-getranscodeerd naar 480p/720p/1080p/4K met adaptieve HLS streaming.' },
  { icon: TrendingUp, color: '#ff3d6b', title: 'ORACLE Algoritme', desc: 'Ons aanbevelingsalgoritme analyseert completion rate, engagement en social graph om jouw film gezien te krijgen.' },
  { icon: DollarSign, color: '#a855f7', title: 'Verdien met VAULT', desc: 'Creators houden 70% van alle inkomsten. Ad share, abonnementen, tipping, brand deals en filmlicenties.' },
  { icon: Shield, color: '#3d8bff', title: 'SENTINEL Bescherming', desc: 'AI-powered deepfake detectie, copyright scanning en EU AI Act compliant labeling — ingebouwd.' },
  { icon: Globe, color: '#00d48a', title: 'Wereldwijd CDN', desc: 'Cloudflare-powered delivery. Sub-2 seconden laden overal ter wereld. 300+ edge locaties.' },
  { icon: Zap, color: '#f59e0b', title: 'Creator Analytics', desc: 'Real-time PRISM dashboard. Weet precies wie er kijkt, waar ze afhaken, en wat er verdient.' },
]

const STEPS = [
  { n: '01', title: 'Maak je account aan', desc: 'Gratis aanmelden. Geen creditcard. In seconden geverifieerd.' },
  { n: '02', title: 'Upload je AI-film', desc: 'Drag & drop. FORGE regelt de transcoding automatisch. Live in minuten.' },
  { n: '03', title: 'Word ontdekt', desc: 'ORACLE plaatst jouw film voor het juiste publiek vanaf dag één.' },
  { n: '04', title: 'Verdien geld', desc: 'Zet monetization aan en begin te verdienen. Maandelijkse uitbetalingen.' },
]

const TESTIMONIALS = [
  { name: 'VoidFrames', role: 'Sci-Fi creator · 48K volgers', text: 'Deep Carbon bereikte 50 miljoen views in 6 weken. Mijn eerste uitbetaling was €84.000. Dit platform is echt.' },
  { name: 'NeuralNoir', role: 'Series creator · 31K volgers', text: 'Memoria ging van nul naar 18 miljoen views. Het ORACLE-algoritme is angstaanjagend goed in ontdekt worden.' },
  { name: 'GlitchWorks', role: 'Horror creator · 62K volgers', text: 'Ik verliet YouTube. De revenue share is beter, de community geeft echt om AI-cinema, en SENTINEL beschermt mijn werk.' },
]



export default function LandingPage() {
  return (
    <div className="grain min-h-screen bg-bg text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 bg-bg/85 backdrop-blur-xl border-b border-border/80">
        <AimeegaLogo size={36} showText={true} />
        <div className="hidden md:flex gap-8 items-center">
          {['Features', 'Creators', 'Blog'].map(l => (
            <span key={l} className="text-muted text-sm font-medium cursor-pointer hover:text-white transition-colors">{l}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="btn-ghost text-sm py-2 px-4">Inloggen</Link>
          <Link href="/signup" className="btn-primary text-sm py-2 px-4">Gratis starten</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-purple/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-blue/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 border rounded-full rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-bold tracking-wider brand-text">NU IN OPEN BETA — GRATIS MEEDOEN</span>
        </div>

        <h1 className="font-display text-[clamp(56px,9vw,120px)] leading-none tracking-wide mb-6 max-w-4xl">
          HET THUIS VAN<br />
          <span className="text-brand">AI CINEMA</span>
        </h1>

        <p className="text-[clamp(16px,2vw,20px)] text-muted leading-relaxed max-w-xl mb-10">
          Upload, ontdek en deel AI-gegenereerde films. Gratis, voor altijd. AI Films by Creators. For Everyone.
        </p>

        <div className="flex gap-0 max-w-md w-full mb-4">
          <input className="input rounded-r-none flex-1 text-base" placeholder="Jouw e-mailadres" type="email" />
          <Link href="/signup" className="btn-primary rounded-l-none flex-shrink-0 flex items-center gap-2 px-5">
            Start gratis <ArrowRight size={16} />
          </Link>
        </div>
        <p className="text-xs text-dim">Geen creditcard vereist · Gratis voor altijd plan · Op elk moment opzeggen</p>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-8">
          <div className="flex">
            {['#7b2fff,#3d8bff', '#3d8bff,#a855f7', '#ff3d6b,#7b2fff', '#22c55e,#3d8bff', '#f59e0b,#ff3d6b'].map((g, i) => (
              <div key={i} style={{ marginLeft: i ? -8 : 0, background: `linear-gradient(135deg,${g})`, border: '2px solid #06060a' }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display text-white">
                {['VF', 'DE', 'GW', 'NN', 'PD'][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted"><span className="text-white font-bold">89.000+</span> creators al op het platform</p>
        </div>
      </section>

      {/* Ticker */}
      <div style={{background:"linear-gradient(135deg,#7b2fff,#00b4ff)",padding:"10px 0",overflow:"hidden"}}>
        <div className="inline-flex gap-0 whitespace-nowrap animate-ticker">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="px-8 text-sm font-bold text-bg tracking-wide">⬥ {t}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="py-24 px-8 border-b border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[['142M', 'Maandelijkse kijkers'], ['89K', 'Actieve creators'], ['4.8B', 'Watch hours'], ['€28.4M', 'Uitbetaald']].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-5xl md:text-6xl text-brand">{v}</div>
              <div className="text-sm text-muted mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-brand tracking-widest mb-4">HET PLATFORM</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none">ALLES WAT EEN CREATOR NODIG HEEFT</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="card p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-8 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-brand tracking-widest mb-4">HOE HET WERKT</p>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none">VAN UPLOAD NAAR INKOMEN<br />IN 4 STAPPEN</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STEPS.map(s => (
              <div key={s.n} className="bg-surface2 border border-border rounded-2xl p-7 flex gap-5">
                <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center font-display text-lg text-brand flex-shrink-0">{s.n}</div>
                <div>
                  <h3 className="font-display text-xl tracking-wide mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-brand tracking-widest mb-4">CREATOR VERHALEN</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none">ZIJ BOUWDEN CARRIÈRES HIER</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill="#a855f7" color="#a855f7" />)}
              </div>
              <p className="text-sm text-muted/90 leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-blue flex items-center justify-center font-display text-sm">{t.name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Altijd gratis */}
      <section className="py-24 px-8 bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold text-brand tracking-widest mb-4">ALTIJD GRATIS</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none mb-8">
            UPLOADEN KOST<br /><span className="text-brand">NOOIT IETS.</span>
          </h2>
          <p className="text-muted text-base leading-relaxed mb-12 max-w-xl mx-auto">
            Maak een account en upload je AI-films direct. Geen abonnement, geen limiet, geen verborgen kosten. Of het nu gaat om een clip van 30 seconden of een film van 2 uur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[['🎬', 'Onbeperkt uploaden', 'Korte clips én volledige films. Geen uploadlimiet.'],
              ['👤', 'Eigen profielpagina', 'Unieke gebruikersnaam. Jouw kanaal, jouw merk.'],
              ['🌍', 'Wereldwijd bereik', 'Jouw film direct zichtbaar voor iedereen op het platform.']].map(([icon, title, desc]) => (
              <div key={String(title)} className="bg-bg border border-border rounded-2xl p-6 text-left">
                <div className="text-3xl mb-4">{icon}</div>
                <div className="font-display text-xl tracking-wide mb-2">{title}</div>
                <div className="text-sm text-muted leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          <Link href="/signup" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Gratis account aanmaken <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-brand tracking-widest mb-6">JOIN DE BEWEGING</p>
          <h2 className="font-display text-[clamp(44px,7vw,96px)] leading-none mb-7">
            DE TOEKOMST VAN CINEMA<br />WORDT NU GEMAAKT <span className="text-brand">HIER.</span>
          </h2>
          <p className="text-base text-muted leading-relaxed mb-10 max-w-lg mx-auto">
            89.000 creators bouwen al hun carrière op dit platform. Upload vandaag je eerste film — het is gratis.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-3 text-lg px-10 py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-2xl" style={{background:"linear-gradient(135deg,#7b2fff,#00b4ff)",boxShadow:"0 8px 32px rgba(123,47,255,0.4)"}}>
            Gratis account aanmaken <ArrowRight size={20} />
          </Link>
          <p className="text-xs text-dim mt-4">Gratis voor altijd plan · Geen creditcard · Live in minuten</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap">
        <div>
          <div className="font-display text-xl mb-1">AIMEEGA</div>
          <div className="text-xs text-dim">© 2026 · AI Films by Creators. For Everyone.</div>
        </div>
        <div className="flex gap-6 flex-wrap">
          {['Voorwaarden', 'Privacy', 'EU AI Act', 'Creator richtlijnen', 'Contact'].map(l => (
            <span key={l} className="text-xs text-muted hover:text-white cursor-pointer transition-colors">{l}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-dim">
          <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          Alle systemen operationeel
        </div>
      </footer>
    </div>
  )
}
