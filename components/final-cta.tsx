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
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary/80">
              Research Project
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Reading the Alpine Signal
          </h2>

          <p className="max-w-md mx-auto text-muted-foreground/80 text-sm mb-10 text-balance">
            A research-driven digital experience connecting remote sensing, 
            ecological stability, and conservation storytelling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => handleNavClick('#observatory')}
              className="w-full sm:w-auto gap-2 bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              <Telescope className="w-4 h-4" />
              Explore Observatory
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavClick('#method')}
              className="w-full sm:w-auto gap-2 border-border/30 hover:bg-card/30"
            >
              <BookOpen className="w-4 h-4" />
              View Methodology
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNavClick('#findings')}
              className="w-full sm:w-auto gap-2 border-border/30 hover:bg-card/30"
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
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 pt-10 border-t border-border/20"
        >
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground/50 mb-1">PROJECT</p>
              <p className="text-xs text-foreground/70">Signals of Stability</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground/50 mb-1">FOCUS</p>
              <p className="text-xs text-foreground/70">Swiss National Park, CH</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground/50 mb-1">PERIOD</p>
              <p className="text-xs text-foreground/70">2019 - 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] text-muted-foreground/40">
            This is a research prototype. Data visualizations use simulated values for demonstration purposes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
