import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { EarthMap } from '@/components/earth-map'
import { ResearchQuestion } from '@/components/research-question'
import { Observatory } from '@/components/observatory'
import { Methodology } from '@/components/methodology'
import { Timeline } from '@/components/timeline'
import { DataVisualizations } from '@/components/data-visualizations'
import { Interpretation } from '@/components/interpretation'
import { ConservationClose } from '@/components/conservation-close'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function SignalsOfStability() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Live Earth Context Section */}
      <EarthMap />
      
      {/* Research Question Section */}
      <ResearchQuestion />
      
      {/* Observatory Interface Section */}
      <Observatory />
      
      {/* Methodology Section */}
      <Methodology />
      
      {/* Temporal Story / Timeline Section */}
      <Timeline />
      
      {/* Data Visualization Section */}
      <DataVisualizations />
      
      {/* Interpretation Section */}
      <Interpretation />
      
      {/* Conservation Meaning Section */}
      <ConservationClose />
      
      {/* Final CTA Section */}
      <FinalCTA />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
