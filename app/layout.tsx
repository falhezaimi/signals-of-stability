import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  title: 'Swiss National Park ECOSTRESS Short-Window Signal Atlas',
  description: 'An exploratory atlas of vegetation stress signals from ECOSTRESS-derived ESI, ET, NDVI, PET, and WUE products across January–June observations at Swiss National Park.',
  generator: 'v0.app',
  keywords: ['Swiss National Park', 'ECOSTRESS', 'remote sensing', 'vegetation stress', 'ESI', 'ET', 'NDVI', 'PET', 'WUE', 'signal atlas', 'AppEEARS'],
  authors: [{ name: 'Research Team' }],
  openGraph: {
    title: 'Swiss National Park ECOSTRESS Short-Window Signal Atlas',
    description: 'An exploratory atlas of vegetation stress signals from ECOSTRESS-derived ESI, ET, NDVI, PET, and WUE products across January–June observations.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F7F2E8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
