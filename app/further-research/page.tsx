import { FrNav } from '@/components/fr-nav'
import { FrOpening } from '@/components/fr-opening'
import { FrAtlas } from '@/components/fr-atlas'
import { FrProducts } from '@/components/fr-products'
import { FrTemporal } from '@/components/fr-temporal'
import { FrTrust } from '@/components/fr-trust'
import { FrNext } from '@/components/fr-next'

export const metadata = {
  title: 'Further Research — SNP ECOSTRESS Short-Window Signal Atlas',
  description: 'A deeper research chapter showing spatial maps, ECOSTRESS product evidence, yearly signal variation, robustness checks, and future research directions for the Swiss National Park short-window signal analysis.',
}

export default function FurtherResearch() {
  return (
    <main className="relative min-h-screen">
      <FrNav />

      {/* ── FELDSTATION: warm field paper ────────────────────────── */}
      <div
        data-register="feldstation"
        className="bg-background"
        style={{
          '--background': '#E7E1D3',
          '--card': '#ECE8DD',
          '--border': '#C9C3B5',
          '--secondary': '#EFE9DD',
        } as React.CSSProperties}
      >
        <FrOpening />
        <FrAtlas />
      </div>

      {/* ── RASTERBAND: light cool instrument panel ──────────────── */}
      <div
        data-register="rasterband"
        className="bg-background text-foreground"
        style={{
          '--background': '#D3D9D4',
          '--foreground': '#1F2421',
          '--card': '#E0E4DF',
          '--card-foreground': '#1F2421',
          '--muted-foreground': '#667067',
          '--border': '#BBC3BC',
          '--primary': '#3F6B4A',
          '--secondary': '#E0E4DF',
          '--secondary-foreground': '#1F2421',
          '--ice-blue': '#496B7A',
          '--gold': '#B3924A',
          '--stone': '#8F978E',
        } as React.CSSProperties}
      >
        <FrProducts />
        <FrTemporal />
      </div>

      {/* ── GRADIENTE: snowline off-white, scientific ─────────────── */}
      <div
        data-register="gradiente"
        className="bg-background"
        style={{
          '--background': '#D8DCD6',
          '--card': '#E4E6E1',
          '--border': '#BBC3BC',
        } as React.CSSProperties}
      >
        <FrTrust />
        <FrNext />
      </div>
    </main>
  )
}
