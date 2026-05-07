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
    <section id="question" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Question */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Research Question
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-balance max-w-4xl mx-auto">
            <span className="text-muted-foreground">Can satellite observations reveal whether</span>{' '}
            <span className="text-foreground">a protected alpine ecosystem is changing, stabilizing, or quietly resisting environmental stress?</span>
          </h2>
        </motion.div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full p-6 md:p-8 rounded-xl border border-border/50 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-border transition-all duration-500">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <area.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-medium mb-3">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {area.description}
                </p>

                {/* Metric badge */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">INDEX</span>
                    <span className="text-xs font-mono text-foreground">{area.metric}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">RANGE</span>
                    <span className="text-xs font-mono text-foreground">{area.range}</span>
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-xs text-muted-foreground/60 mt-12 font-mono"
        >
          Focus areas represent key environmental signals analyzed in this research prototype
        </motion.p>
      </div>
    </section>
  )
}
