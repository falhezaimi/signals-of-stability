'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const signalClasses = [
  { label: 'High-ESI signal areas', detail: '~3.8% of AOI · ~6.7 km²', note: 'Consistent high-ESI patterns' },
  { label: 'Elevated stress signal areas', detail: '~6.2% of AOI · ~10.9 km²', note: 'Persistently low-ESI patterns' },
  { label: 'Variable-demand signal areas', detail: '~29% of AOI · ~50.7 km²', note: 'Mixed ET/PET behavior' },
]

export function AnswerBrief() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="answer" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-primary/25 bg-primary/[0.05] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-primary/80 whitespace-nowrap">
            Early signal pattern
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-medium tracking-tight mb-7 text-balance"
        >
          Signal structure, not uniform distribution.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.16, ease: 'easeOut' }}
          className="max-w-2xl text-base md:text-lg text-muted-foreground/75 leading-relaxed mb-10 text-balance"
        >
          Swiss National Park does not appear as a uniform green landscape in these observations.
          ECOSTRESS-derived signals from available January–June scenes point to{' '}
          <span className="text-foreground/90 font-medium">spatially structured patterns</span>:{' '}
          high-ESI areas, elevated-stress areas, and variable-demand areas emerge across the
          atlas outputs. These are short-window signal patterns — not confirmed ecological classifications.
        </motion.p>

        {/* Signal class tags */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {signalClasses.map((sc, i) => (
            <motion.div
              key={sc.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.30 + i * 0.08, ease: 'easeOut' }}
              className="px-4 py-2.5 border border-border/35 bg-card/12"
            >
              <p className="text-[11px] font-medium text-foreground/75 mb-0.5">{sc.label}</p>
              <p className="text-[9px] font-mono text-muted-foreground/40">{sc.detail}</p>
              <p className="text-[8px] font-mono text-muted-foreground/30 mt-0.5 italic">{sc.note}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Caveat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex items-center gap-3"
        >
          <div className="w-4 h-px bg-muted-foreground/25" />
          <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.14em]">
            Short-window signal only · Jan–Jun observations · 2024 ET &amp; ESI limited coverage · Validation pending
          </p>
        </motion.div>
      </div>
    </section>
  )
}
