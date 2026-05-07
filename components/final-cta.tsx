'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Telescope, BookOpen, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-alpine-night/50" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Research Project
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Reading the Alpine Signal
          </h2>

          <p className="max-w-xl mx-auto text-muted-foreground mb-12 text-balance">
            A research-driven digital experience connecting remote sensing, 
            ecological stability, and conservation storytelling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => handleNavClick('#observatory')}
              className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Telescope className="w-4 h-4" />
              Explore Observatory
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavClick('#method')}
              className="w-full sm:w-auto gap-2 border-border/50 hover:bg-card/50"
            >
              <BookOpen className="w-4 h-4" />
              View Methodology
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavClick('#findings')}
              className="w-full sm:w-auto gap-2 border-border/50 hover:bg-card/50"
            >
              <FileText className="w-4 h-4" />
              Read Findings
            </Button>
          </div>
        </motion.div>

        {/* Project info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-border/30"
        >
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">PROJECT</p>
              <p className="text-sm text-foreground">Signals of Stability</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">FOCUS</p>
              <p className="text-sm text-foreground">Swiss National Park, CH</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">PERIOD</p>
              <p className="text-sm text-foreground">2019 - 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-muted-foreground/50">
            This is a research prototype. Data visualizations use simulated values for demonstration purposes.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Real satellite analysis outputs will be integrated upon completion of the research phase.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
