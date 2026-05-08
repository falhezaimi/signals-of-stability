'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Droplets, Thermometer } from 'lucide-react'

const focusAreas = [
  {
    icon: Leaf,
    title: 'Vegetation Greenness',
    description: 'Tracking photosynthetic activity and canopy health through normalized difference vegetation index (NDVI) measurements across growing seasons.',
    metric: 'NDVI',
    range: '0.2 – 0.8',
  },
  {
    icon: Droplets,
    title: 'Evapotranspiration & Water Use',
    description: 'Monitoring water flux from vegetation and soil surfaces to understand ecosystem water balance and drought stress responses.',
    metric: 'ET',
    range: '0 – 8 mm/day',
  },
  {
    icon: Thermometer,
    title: 'Thermal & Drought Stress',
    description: 'Analyzing land surface temperature anomalies and evaporative stress indices to detect early signs of ecological pressure.',
    metric: 'ESI',
    range: '-2 – +2 σ',
  },
]

export function ResearchQuestion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="question" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle decorative line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        {/* Main Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20 md:mb-28"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-gold/25 bg-gold/[0.05] mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold/75 whitespace-nowrap">
              Research Question
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.3] text-balance max-w-3xl mx-auto">
            <span className="text-muted-foreground/70">Can satellite observations reveal whether</span>{' '}
            <span className="text-foreground">a protected alpine ecosystem is changing, stabilizing, or quietly resisting environmental stress?</span>
          </h2>
        </motion.div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
              className="group"
            >
              <div className="relative h-full p-6 md:p-7 border border-border/25 bg-card/10 hover:bg-card/20 hover:border-border/40 transition-all duration-500">
                {/* Metric tag top-right */}
                <div className="absolute top-4 right-4">
                  <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-muted-foreground/30">{area.metric}</span>
                </div>
                {/* Signal indicator — small colored bar instead of icon circle */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-px bg-primary/40" />
                  <area.icon className="w-3.5 h-3.5 text-primary/60" />
                </div>

                {/* Content */}
                <h3 className="text-base md:text-lg font-medium mb-2.5">{area.title}</h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">
                  {area.description}
                </p>

                {/* Metric badge */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground/50">INDEX</span>
                    <span className="text-[10px] font-mono text-foreground/70">{area.metric}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground/50">RANGE</span>
                    <span className="text-[10px] font-mono text-foreground/70">{area.range}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-[11px] text-muted-foreground/40 mt-14 font-mono"
        >
          Focus areas represent key environmental signals analyzed in this research prototype
        </motion.p>
      </div>
    </section>
  )
}
