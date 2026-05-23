import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { ProjectSnapshot } from '@/components/project-snapshot'
import { ResearchQuestion } from '@/components/research-question'
import { AnswerBrief } from '@/components/answer-brief'
import { EarthMap } from '@/components/earth-map'
import { DataVisualizations } from '@/components/data-visualizations'
import { Interpretation } from '@/components/interpretation'
import { Observatory } from '@/components/observatory'
import { Methodology } from '@/components/methodology'
import { Timeline } from '@/components/timeline'
import { DataProvenance } from '@/components/data-provenance'
import { ConservationClose } from '@/components/conservation-close'
import { ForestDivider } from '@/components/alpine-accents'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function SignalsAtlas() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />

      {/* ── FELDSTATION register: context, question, answer, study region ─ */}
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
        <Hero />
        <ProjectSnapshot />
        <ResearchQuestion />
        <AnswerBrief />
        <EarthMap />
      </div>

      {/* ── GRADIENTE register: evidence and findings ──────────────────── */}
      <div
        data-register="gradiente"
        className="bg-background"
        style={{
          '--background': '#D8DCD6',
          '--card': '#E4E6E1',
          '--border': '#BBC3BC',
        } as React.CSSProperties}
      >
        <DataVisualizations />
        <Interpretation />
      </div>

      {/* ── RASTERBAND register: light instrument panel ────────────────── */}
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
        <Observatory />
        <Methodology />
        <Timeline />
      </div>

      {/* ── GRADIENTE register: provenance, closure, CTA ──────────────── */}
      <div
        data-register="gradiente"
        className="bg-background"
        style={{
          '--background': '#D8DCD6',
          '--card': '#E4E6E1',
          '--border': '#BBC3BC',
        } as React.CSSProperties}
      >
        <DataProvenance />
        <ForestDivider />
        <ConservationClose />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  )
}
