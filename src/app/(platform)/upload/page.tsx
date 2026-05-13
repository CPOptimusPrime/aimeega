'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, CheckCircle, AlertTriangle, ArrowRight, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { GENRES, AI_TOOLS, validateVideoFile } from '@/lib/utils'
import type { UploadFormData } from '@/types'

const STEPS = ['Bestand', 'Details', 'AI Disclosure', 'Review']

export default function UploadPage() {
  const [step, setStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState<UploadFormData>({
    title: '', description: '', genre: '', ai_tool: '',
    music_source: '', voice_source: '',
    has_real_people: false, has_brand_ip: false,
  })

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0]
    if (!f) return
    const err = validateVideoFile(f)
    if (err) { toast.error(err); return }
    setFile(f)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] }, multiple: false,
  })

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)

    try {
      // 1. Get Cloudflare direct upload URL
      const urlRes = await fetch('/api/upload/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title }),
      })
      const { uploadURL, uid } = await urlRes.json()

      // 2. Upload directly to Cloudflare Stream
      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 80))
      }
      await new Promise<void>((resolve, reject) => {
        xhr.open('POST', uploadURL)
        xhr.onload = () => resolve()
        xhr.onerror = () => reject(new Error('Upload mislukt'))
        const fd = new FormData()
        fd.append('file', file)
        xhr.send(fd)
      })

      setProgress(85)

      // 3. Save to Supabase
      await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cf_uid: uid }),
      })

      setProgress(100)
      setTimeout(() => setDone(true), 500)
    } catch (err) {
      toast.error('Upload mislukt. Probeer opnieuw.')
      setUploading(false)
      setProgress(0)
    }
  }

  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-full py-20 px-6 text-center animate-fade-up">
      <div className="w-20 h-20 rounded-full bg-green/10 border border-green/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-green" />
      </div>
      <h2 className="font-display text-4xl tracking-wide mb-3">UPLOAD GELUKT</h2>
      <p className="text-muted mb-2 text-sm">Je film staat in de FORGE verwerkingswachtrij.</p>
      <p className="text-muted/60 text-xs mb-8">FORGE genereert 480p · 720p · 1080p · 4K varianten. Klaar in 5–15 minuten.</p>
      <div className="flex gap-3">
        <button className="btn-primary" onClick={() => { setDone(false); setStep(1); setFile(null); setProgress(0); setForm({ title: '', description: '', genre: '', ai_tool: '', music_source: '', voice_source: '', has_real_people: false, has_brand_ip: false }) }}>
          Nog een film uploaden
        </button>
        <a href="/discover" className="btn-ghost">Films bekijken</a>
      </div>
    </div>
  )

  if (uploading) return (
    <div className="flex flex-col items-center justify-center min-h-full py-20 px-6 text-center">
      <div className="font-display text-3xl tracking-wide mb-8">UPLOADEN NAAR FORGE...</div>
      <div className="w-full max-w-sm">
        <div className="h-1.5 bg-border rounded-full overflow-hidden mb-3">
          <div className="h-full rounded-full bg-gradient-to-r from-purple to-brand transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-muted text-sm">
          {progress}% — {progress < 30 ? 'Bestand uploaden...' : progress < 60 ? 'Codec valideren...' : progress < 85 ? 'Transcode jobs queuen...' : 'Afronden...'}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-16">
      <h1 className="font-display text-4xl tracking-wide mb-1">FILM UPLOADEN</h1>
      <p className="text-muted text-sm mb-8">Deel je AI-film met 142 miljoen kijkers.</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1 ? 'bg-green/20 border border-green text-green' : step === i + 1 ? 'bg-brand/15 border border-brand/50 text-brand' : 'bg-surface2 border border-border text-muted'}`}>
              {step > i + 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00d48a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : i + 1}
            </div>
            <span className={`text-xs ${step === i + 1 ? 'text-white' : 'text-muted'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className="w-5 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">

        {/* STEP 1: File */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-accent bg-brand/4' : 'border-border hover:border-border2'}`}>
              <input {...getInputProps()} />
              <Upload size={36} className={isDragActive ? 'text-brand mx-auto mb-4' : 'text-dim mx-auto mb-4'} />
              <div className="font-semibold text-base mb-2">{file?.name ?? 'Sleep je videobestand hierheen'}</div>
              <div className="text-muted text-sm mb-5">MP4, MOV, MKV, AVI — max 50GB</div>
              <div className="flex gap-2 justify-center flex-wrap">
                {['480p', '720p', '1080p', '4K', 'HLS', 'DASH'].map(q => (
                  <span key={q} className="bg-brand/8 border border-brand/20 text-brand text-[9px] font-bold px-2 py-1 rounded tracking-wider">{q}</span>
                ))}
              </div>
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-2 mt-4 py-3" onClick={() => setStep(2)}>
              Volgende stap <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && (
          <div className="animate-fade-up space-y-4">
            <div>
              <label className="label">TITEL *</label>
              <input className="input" placeholder="Naam van je film..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">GENRE *</label>
                <select className="input" value={form.genre} onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}>
                  <option value="">Selecteer...</option>
                  {GENRES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="label">AI TOOL *</label>
                <select className="input" value={form.ai_tool} onChange={e => setForm(f => ({ ...f, ai_tool: e.target.value }))}>
                  <option value="">Selecteer...</option>
                  {AI_TOOLS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">BESCHRIJVING</label>
              <textarea className="input" rows={3} placeholder="Vertel over je film..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
            </div>
            <div className="flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setStep(1)}>← Terug</button>
              <button className="btn-primary flex-[2] flex items-center justify-center gap-2" onClick={() => setStep(3)} disabled={!form.title || !form.genre || !form.ai_tool}>
                Volgende <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AI Disclosure */}
        {step === 3 && (
          <div className="animate-fade-up space-y-4">
            <div className="bg-brand/4 border border-brand/15 rounded-lg p-4">
              <div className="text-[10px] font-bold text-brand tracking-widest mb-2">EU AI ACT — VERPLICHTE DISCLOSURE</div>
              <p className="text-xs text-muted leading-relaxed">Alle AI-gegenereerde content moet gelabeld worden. Valse disclosure = permanent accountverbod.</p>
            </div>
            <div>
              <label className="label">MUZIEKBRON</label>
              <input className="input" placeholder="bijv. Suno AI, Udio, rechtenvrij..." value={form.music_source} onChange={e => setForm(f => ({ ...f, music_source: e.target.value }))} />
            </div>
            <div>
              <label className="label">STEMMENBRON</label>
              <input className="input" placeholder="bijv. ElevenLabs, AI-gegenereerd, geen..." value={form.voice_source} onChange={e => setForm(f => ({ ...f, voice_source: e.target.value }))} />
            </div>
            <div>
              <label className="label">ECHTE PERSONEN AFGEBEELD?</label>
              <div className="flex gap-3">
                {[false, true].map(val => (
                  <button key={String(val)} onClick={() => setForm(f => ({ ...f, has_real_people: val }))}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border ${form.has_real_people === val ? 'bg-brand/10 border-accent text-brand' : 'bg-surface2 border-border text-muted hover:border-border2'}`}>
                    {val ? 'Ja' : 'Nee'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">BEVAT MERK / IP?</label>
              <div className="flex gap-3">
                {[false, true].map(val => (
                  <button key={String(val)} onClick={() => setForm(f => ({ ...f, has_brand_ip: val }))}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border ${form.has_brand_ip === val ? 'bg-brand/10 border-accent text-brand' : 'bg-surface2 border-border text-muted hover:border-border2'}`}>
                    {val ? 'Ja' : 'Nee'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setStep(2)}>← Terug</button>
              <button className="btn-primary flex-[2] flex items-center justify-center gap-2" onClick={() => setStep(4)}>
                Volgende <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review */}
        {step === 4 && (
          <div className="animate-fade-up">
            <div className="font-semibold text-base mb-4">Review & indienen</div>
            <div className="bg-surface2 rounded-lg p-4 mb-4 space-y-2">
              {[['Titel', form.title || '—'], ['Genre', form.genre || '—'], ['AI Tool', form.ai_tool || '—'], ['Muziek', form.music_source || '—'], ['Stemmen', form.voice_source || '—'], ['Echte personen', form.has_real_people ? 'Ja' : 'Nee'], ['Bevat IP', form.has_brand_ip ? 'Ja' : 'Nee']].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                  <span className="text-muted text-xs tracking-wider uppercase">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
            {form.has_real_people && (
              <div className="flex items-start gap-3 bg-red/8 border border-red/25 rounded-lg p-3 mb-4 text-sm text-red">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                SENTINEL voert deepfake & likenessdetectie uit op deze upload vóór publicatie.
              </div>
            )}
            <div className="flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setStep(3)}>← Terug</button>
              <button className="flex-[2] bg-accent text-bg font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all" onClick={handleUpload}>
                <Zap size={15} /> Indienen bij FORGE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
