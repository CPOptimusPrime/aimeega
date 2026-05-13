import type { Metadata } from 'next'
import { Bebas_Neue, Instrument_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Aimeega — AI Films by Creators. For Everyone.', template: '%s · Aimeega' },
  description: 'AI Films by Creators. For Everyone. Upload and discover AI-generated films — free, always.',
  keywords: ['AI film', 'AI cinema', 'AI video', 'Sora', 'Runway', 'AI filmmaker'],
  authors: [{ name: 'Aimeega' }],
  creator: 'Aimeega',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://aimeega.com',
    siteName: 'Aimeega',
    title: 'Aimeega — AI Films by Creators. For Everyone.',
    description: 'Upload, discover and monetize AI-generated films.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aimeega — AI Films by Creators. For Everyone.',
    description: 'Upload, discover and monetize AI-generated films.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://aimeega.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="nl" className={`${bebasNeue.variable} ${instrumentSans.variable}`}>
        <body className="bg-bg text-white font-body antialiased">
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#13131e',
                color: '#f0f0fa',
                border: '1px solid #1e1e30',
                fontFamily: 'var(--font-instrument)',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
