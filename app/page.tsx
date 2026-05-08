import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { EarthMap } from '@/components/earth-map'
import { ResearchQuestion } from '@/components/research-question'
import { Observatory } from '@/components/observatory'
import { Methodology } from '@/components/methodology'
import { Timeline } from '@/components/timeline'
import { DataVisualizations } from '@/components/data-visualizations'
import { DataProvenance } from '@/components/data-provenance'
import { Interpretation } from '@/components/interpretation'
import { ConservationClose } from '@/components/conservation-close'
import { ForestDivider } from '@/components/alpine-accents'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function SignalsOfStability() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />

      {/* ── FELDSTATION register: cartographic paper ───────────────── */}
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
        <Hero />
        <EarthMap />
        <ResearchQuestion />
      </div>

      {/* ── RASTERBAND register: alpine night instrument dark ───────── */}
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
        <Observatory />
        <Methodology />
        <Timeline />
      </div>

      {/* ── GRADIENTE register: near-white, scientific ──────────────── */}
      <div
        data-register="gradiente"
        className="bg-background"
        style={{
          '--background': 'oklch(0.974 0.006 85)',
          '--card': 'oklch(0.966 0.008 85)',
          '--border': 'oklch(0.893 0.010 82)',
        } as React.CSSProperties}
      >
        <DataVisualizations />
        <DataProvenance />
        <Interpretation />
        <ForestDivider />
        <ConservationClose />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  )
}
