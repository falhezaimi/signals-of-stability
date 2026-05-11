import type { Metadata } from 'next'
import { SignalsNavigation } from '@/components/signals-navigation'
import { SignalsIntro } from '@/components/signals-intro'
import { SignalsMapAtlas } from '@/components/signals-map-atlas'
import { SignalsTerrain } from '@/components/signals-3d-products'
import { SignalsYearlyTimeline } from '@/components/signals-yearly-timeline'
import { SignalsProvenance } from '@/components/signals-provenance'
import { SignalsFooter } from '@/components/signals-footer'

export const metadata: Metadata = {
  title: 'Signal Observatory | Swiss National Park Research',
  description: 'ECOSTRESS signal outputs for the Swiss National Park: 2D map atlas, 3D terrain products, and yearly signal timeline. ESI · ET · NDVI · PET · WUE · 2019–2025.',
}

export default function SignalsPage() {
  return (
    <main className="relative min-h-screen">
      <SignalsNavigation />

      {/* ── FELDSTATION register: cartographic paper ─────────────────── */}
      <div
        data-register="feldstation"
        className="bg-background"
        style={{
          '--background': 'oklch(0.892 0.018 75)',
          '--card':       'oklch(0.875 0.020 78)',
          '--border':     'oklch(0.740 0.022 80)',
          '--secondary':  'oklch(0.858 0.022 80)',
        } as React.CSSProperties}
      >
        <SignalsIntro />
        <SignalsMapAtlas />
      </div>

      {/* ── RASTERBAND register: alpine night instrument dark ─────────── */}
      <div
        data-register="rasterband"
        className="bg-background text-foreground"
        style={{
          '--background':            'oklch(0.095 0.006 160)',
          '--foreground':            'oklch(0.875 0.010 80)',
          '--card':                  'oklch(0.13 0.008 160)',
          '--card-foreground':       'oklch(0.875 0.010 80)',
          '--muted-foreground':      'oklch(0.52 0.010 80)',
          '--border':                'oklch(0.24 0.008 160)',
          '--primary':               'oklch(0.62 0.095 140)',
          '--secondary':             'oklch(0.155 0.008 160)',
          '--secondary-foreground':  'oklch(0.875 0.010 80)',
          '--ice-blue':              'oklch(0.62 0.092 234)',
          '--gold':                  'oklch(0.75 0.115 79)',
          '--stone':                 'oklch(0.62 0.016 80)',
        } as React.CSSProperties}
      >
        <SignalsTerrain />
        <SignalsYearlyTimeline />
      </div>

      {/* ── GRADIENTE register: near-white scientific ────────────────── */}
      <div
        data-register="gradiente"
        className="bg-background"
        style={{
          '--background': 'oklch(0.974 0.006 85)',
          '--card':       'oklch(0.966 0.008 85)',
          '--border':     'oklch(0.893 0.010 82)',
        } as React.CSSProperties}
      >
        <SignalsProvenance />
        <SignalsFooter />
      </div>
    </main>
  )
}
