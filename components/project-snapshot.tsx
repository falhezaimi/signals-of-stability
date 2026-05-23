'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const metrics = [
  { value: '5', label: 'Environmental Variables', detail: 'ESI · ET · NDVI · PET · WUE' },
  { value: '2,122', label: 'Raster Files Indexed', detail: 'ECOSTRESS-derived rasters' },
  { value: '5,313', label: 'Composite Statistic Records', detail: 'Seasonal composites' },
  { value: '1,508', label: 'Anomaly Records', detail: 'Relative departures' },
  { value: '133', label: 'Short-Window Trend Records', detail: 'Diagnostic only' },
  { value: '384', label: 'Variability Records', detail: 'Signal consistency summaries' },
  { value: '3,526', label: 'Preview Maps Generated', detail: 'Raster PNG previews' },
  { value: '6', label: 'Observed Months', detail: 'January through June' },
  { value: '4', label: 'Overpass Time Bins', detail: 'Morning · Midday/Afternoon · Evening · Night' },
]

export function ProjectSnapshot() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id="snapshot" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/25 bg-card/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/65">
                Pipeline Outputs
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
              Atlas at a glance
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[8px] font-mono text-muted-foreground/30 leading-relaxed space-y-0.5">
              <div className="text-[7px] uppercase tracking-[0.15em] text-muted-foreground/20 mb-1">Processing status</div>
              <div>Pipeline complete</div>
              <div>Jan–Jun observations</div>
            </div>
          </div>
        </motion.div>

        {/* Metric grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-px bg-border/20 border border-border/20 mb-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
              className="bg-card/8 px-4 py-5 md:px-5 md:py-6 group hover:bg-card/15 transition-colors duration-300"
            >
              <p
                className="font-serif text-2xl md:text-3xl font-medium text-foreground/85 leading-none mb-1.5"
              >
                {m.value}
              </p>
              <p className="text-[10px] font-medium text-foreground/60 mb-1 leading-snug">{m.label}</p>
              <p className="text-[8px] font-mono text-muted-foreground/35 leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-start gap-3 px-4 py-3 border border-border/20 bg-card/5"
        >
          <div className="mt-0.5 w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
          <p className="text-[10px] font-mono text-muted-foreground/45 leading-relaxed">
            These outputs summarize short-window raster-derived signals. They should be interpreted
            alongside observation count, valid-pixel coverage, and time-of-day context.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
