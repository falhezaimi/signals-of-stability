'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const checks = [
  { number: '1', label: 'Enough observations', description: 'High observation count reduces the chance that a pattern reflects sparse or uneven sampling.' },
  { number: '2', label: 'Strong AOI coverage', description: 'Coverage inside the study area above ~60% gives the spatial pattern more interpretive weight.' },
  { number: '3', label: 'Consistent time-bin behavior', description: 'Patterns that persist across all-overpass, midday-primary, and morning-fallback summaries are more trustworthy.' },
  { number: '4', label: 'Agreement across products', description: 'A pattern that appears in multiple independent variables (ESI, ET, NDVI, PET, WUE) carries more evidential weight than a single-product signal.' },
]

export function ConservationClose() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="conclusion" ref={sectionRef} className="relative py-28 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Ghost background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          className="font-serif font-bold text-foreground leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)', opacity: 0.035 }}
        >
          SIGNALS
        </span>
      </div>

      {/* Faint contour accent */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.022]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M${-50 + i * 30},${300 + Math.sin(i * 0.5) * 55} Q${500 + Math.cos(i) * 55},${220 + i * 22} ${1050 - i * 30},${320 + Math.cos(i * 0.3) * 45}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            className="text-foreground"
          />
        ))}
      </svg>

      <div className="relative max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-foreground/15" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
              How to read this atlas
            </span>
            <div className="w-8 h-px bg-foreground/15" />
          </div>

          {/* Main statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
            className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-4 text-balance"
          >
            Read the maps and timelines as signals, not verdicts.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
            className="text-base text-muted-foreground/65 leading-relaxed mb-14 text-balance"
          >
            The strongest interpretations are the ones that survive four checks. A signal that passes
            all four is worth discussing. A signal that fails any one should be flagged for review before
            being presented as a finding.
          </motion.p>

          {/* Four checks */}
          <div className="space-y-0 border border-border/20 divide-y divide-border/15 mb-14">
            {checks.map((check, i) => (
              <motion.div
                key={check.number}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                className="flex items-start gap-5 px-5 py-4 bg-card/5 hover:bg-card/10 transition-colors duration-300"
              >
                <span className="shrink-0 font-mono text-[10px] text-primary/60 mt-0.5 w-3">{check.number}</span>
                <div>
                  <p className="text-sm font-medium text-foreground/80 mb-1">{check.label}</p>
                  <p className="text-xs text-muted-foreground/55 leading-relaxed">{check.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground/55 leading-relaxed mb-6 text-balance">
              The purpose of this atlas is not to declare ecological change, but to make short-window
              vegetation stress signals visible, comparable, and scientifically discussable.
            </p>
            <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[0.14em]">
              Short-window signal only · Exploratory research prototype · Independent validation pending
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent mx-auto mt-12"
          />
        </motion.div>
      </div>
    </section>
  )
}
