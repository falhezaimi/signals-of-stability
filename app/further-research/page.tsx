import { FrNav } from '@/components/fr-nav'
import { FrOpening } from '@/components/fr-opening'
import { FrAtlas } from '@/components/fr-atlas'
import { FrProducts } from '@/components/fr-products'
import { FrTemporal } from '@/components/fr-temporal'
import { FrTrust } from '@/components/fr-trust'
import { FrNext } from '@/components/fr-next'

export const metadata = {
  title: 'Further Research: Inside the Signal | Swiss National Park',
  description: 'A deeper look at the map evidence, ECOSTRESS products, yearly variation, and terrain context behind the Swiss National Park stability story.',
}

export default function FurtherResearch() {
  return (
    <main className="relative min-h-screen">
      <FrNav />

      {/* ── FELDSTATION: cartographic ivory ─────────────────────── */}
      <div
        data-register="feldstation"
        className="bg-background"
        style={{
          '--background': 'oklch(0.892 0.018 75)',
          '--card': 'oklch(0.875 0.020 78)',
          '--border': 'oklch(0.740 0.022 80)',
          '--secondary': 'oklch(0.858 0.022 80)',
        } as React.CSSProperties}
      >
        <FrOpening />
        <FrAtlas />
      </div>

      {/* ── RASTERBAND: alpine night dark ──────────────────────── */}
      <div
        data-register="rasterband"
        className="bg-background text-foreground"
        style={{
          '--background': 'oklch(0.095 0.006 160)',
          '--foreground': 'oklch(0.875 0.010 80)',
          '--card': 'oklch(0.13 0.008 160)',
          '--card-foreground': 'oklch(0.875 0.010 80)',
          '--muted-foreground': 'oklch(0.52 0.010 80)',
          '--border': 'oklch(0.24 0.008 160)',
          '--primary': 'oklch(0.62 0.095 140)',
          '--secondary': 'oklch(0.155 0.008 160)',
          '--secondary-foreground': 'oklch(0.875 0.010 80)',
          '--ice-blue': 'oklch(0.62 0.092 234)',
          '--gold': 'oklch(0.75 0.115 79)',
          '--stone': 'oklch(0.62 0.016 80)',
        } as React.CSSProperties}
      >
        <FrProducts />
        <FrTemporal />
      </div>

      {/* ── GRADIENTE: near-white, scientific ──────────────────── */}
      <div
        data-register="gradiente"
        className="bg-background"
        style={{
          '--background': 'oklch(0.974 0.006 85)',
          '--card': 'oklch(0.966 0.008 85)',
          '--border': 'oklch(0.893 0.010 82)',
        } as React.CSSProperties}
      >
        <FrTrust />
        <FrNext />
      </div>
    </main>
  )
}
