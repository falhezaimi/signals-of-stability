'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timelineData = [
  {
    year: '2019',
    ndvi: 0.62,
    et: 4.2,
    stress: -0.3,
    note: 'Baseline year. Normal growing season conditions with consistent vegetation patterns.',
    condition: 'stable',
  },
  {
    year: '2020',
    ndvi: 0.64,
    et: 4.5,
    stress: -0.2,
    note: 'Slight increase in greenness. Above-average spring precipitation supported early growth.',
    condition: 'positive',
  },
  {
    year: '2021',
    ndvi: 0.58,
    et: 3.8,
    stress: 0.4,
    note: 'Early summer drought conditions. Reduced evapotranspiration and elevated thermal stress.',
    condition: 'negative',
  },
  {
    year: '2022',
    ndvi: 0.61,
    et: 4.1,
    stress: 0.2,
    note: 'Partial recovery. Mixed signals with localized stress persistence in south-facing slopes.',
    condition: 'mixed',
  },
  {
    year: '2023',
    ndvi: 0.63,
    et: 4.4,
    stress: -0.1,
    note: 'Return to near-baseline. Favorable precipitation timing supported vegetation recovery.',
    condition: 'positive',
  },
  {
    year: '2024',
    ndvi: 0.65,
    et: 4.6,
    stress: -0.4,
    note: 'Preliminary data suggests continued stability. Full season analysis pending.',
    condition: 'stable',
  },
]

const conditionColors: Record<string, { bg: string; text: string; label: string }> = {
  stable: { bg: 'bg-stone/15', text: 'text-stone', label: 'Stable' },
  positive: { bg: 'bg-primary/15', text: 'text-primary', label: 'Positive' },
  negative: { bg: 'bg-destructive/15', text: 'text-destructive/80', label: 'Stress' },
  mixed: { bg: 'bg-gold/15', text: 'text-gold', label: 'Mixed' },
}

function SignalBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percentage = (value / max) * 100
  return (
    <div className="h-1.5 w-full bg-background/40 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  )
}

function YearCard({ data, index }: { data: typeof timelineData[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const condition = conditionColors[data.condition]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      className="relative"
    >
      <div className="p-5 rounded-xl border border-border/25 bg-card/10 hover:bg-card/20 transition-all duration-500">
        {/* Year header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl md:text-3xl font-medium">{data.year}</h3>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono ${condition.bg} ${condition.text}`}>
            {condition.label}
          </span>
        </div>

        {/* Signals */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-muted-foreground/60">NDVI</span>
              <span className="text-[10px] font-mono text-primary/80">{data.ndvi}</span>
            </div>
            <SignalBar value={data.ndvi} max={1} color="bg-primary/70" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-muted-foreground/60">ET (mm/day)</span>
              <span className="text-[10px] font-mono text-ice-blue/80">{data.et}</span>
            </div>
            <SignalBar value={data.et} max={6} color="bg-ice-blue/70" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-muted-foreground/60">Stress Index</span>
              <span className={`text-[10px] font-mono ${data.stress > 0 ? 'text-gold/80' : 'text-primary/80'}`}>
                {data.stress > 0 ? '+' : ''}{data.stress}
              </span>
            </div>
            <div className="relative h-1.5 w-full bg-background/40 rounded-full overflow-hidden">
              <div className="absolute top-0 left-1/2 w-px h-full bg-border/30" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.abs(data.stress) * 25}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`absolute top-0 h-full rounded-full ${data.stress > 0 ? 'bg-gold/70 left-1/2' : 'bg-primary/70 right-1/2'}`}
                style={{ [data.stress > 0 ? 'left' : 'right']: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground/60 leading-relaxed pt-3 border-t border-border/20">
          {data.note}
        </p>

        {/* Prototype label */}
        <div className="mt-3 pt-2 border-t border-border/15">
          <span className="text-[9px] font-mono text-muted-foreground/30">PROTOTYPE DATA</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="timeline" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/[0.02] blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ice-blue/60" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Temporal Analysis
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            A Journey Through Alpine Time
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground/80 text-sm text-balance">
            Six years of observation reveal patterns of resilience, stress, and recovery
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border/30 via-border/20 to-transparent md:-translate-x-1/2" />

          {/* Year cards */}
          <div className="space-y-6 md:space-y-10">
            {timelineData.map((data, index) => (
              <div
                key={data.year}
                className={`relative grid md:grid-cols-2 gap-6 ${
                  index % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-2.5 h-2.5 rounded-full bg-primary/60 border-2 border-background md:-translate-x-1/2 z-10" />

                {/* Card */}
                <div className={`pl-10 md:pl-0 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:col-start-2'}`}>
                  <YearCard data={data} index={index} />
                </div>

                {/* Year label (opposite side on desktop) */}
                <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-start pl-10' : 'justify-end pr-10'}`}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.08 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-7xl font-bold text-foreground"
                  >
                    {data.year}
                  </motion.span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 p-5 rounded-xl border border-border/20 bg-card/5">
            <p className="text-xs text-muted-foreground/70 max-w-md leading-relaxed">
              The timeline suggests a pattern of recovery following stress events, 
              potentially indicating ecosystem resilience within the protected boundary.
            </p>
            <span className="text-[9px] font-mono text-gold/60">
              PRELIMINARY INTERPRETATION
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
