import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'
import { nl } from 'date-fns/locale'

// ─── Tailwind class merger ────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Format large numbers ─────────────────────────────────────────────────────
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

// ─── Format duration (seconds → MM:SS or HH:MM:SS) ───────────────────────────
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

// ─── Relative time (Dutch) ────────────────────────────────────────────────────
export function timeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: nl })
}

// ─── Format currency ──────────────────────────────────────────────────────────
export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency }).format(amount)
}

// ─── Truncate text ────────────────────────────────────────────────────────────
export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

// ─── Generate initials from name ─────────────────────────────────────────────
export function initials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ─── Validate file type ───────────────────────────────────────────────────────
export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska']
export const MAX_FILE_SIZE_GB = 50

export function validateVideoFile(file: File): string | null {
  if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
    return 'Bestandstype niet ondersteund. Gebruik MP4, MOV, AVI of MKV.'
  }
  if (file.size > MAX_FILE_SIZE_GB * 1024 * 1024 * 1024) {
    return `Bestand is te groot. Maximum is ${MAX_FILE_SIZE_GB}GB.`
  }
  return null
}

// ─── Genres ───────────────────────────────────────────────────────────────────
export const GENRES = [
  'Sci-Fi', 'Fantasy', 'Horror', 'Animation',
  'Short Film', 'Series', 'Experimental',
  'Drama', 'Thriller', 'Documentary', 'Comedy', 'Action',
]

// ─── AI Tools ─────────────────────────────────────────────────────────────────
export const AI_TOOLS = [
  'Sora', 'Runway Gen-3', 'Kling AI', 'Pika 2.0',
  'Hailuo', 'Luma Dream Machine', 'Stable Video Diffusion',
  'Udio', 'Suno', 'Other',
]
