'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

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
  stable: { bg: 'bg-stone/20', text: 'text-stone', label: 'Stable' },
  positive: { bg: 'bg-primary/20', text: 'text-primary', label: 'Positive' },
  negative: { bg: 'bg-destructive/20', text: 'text-destructive', label: 'Stress' },
  mixed: { bg: 'bg-gold/20', text: 'text-gold', label: 'Mixed' },
}

function SignalBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percentage = (value / max) * 100
  return (
    <div className="h-2 w-full bg-background/50 rounded-full overflow-hidden">
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
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
        {/* Year header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-3xl md:text-4xl font-medium">{data.year}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-mono ${condition.bg} ${condition.text}`}>
            {condition.label}
          </span>
        </div>

        {/* Signals */}
        <div className="space-y-4 mb-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-muted-foreground">NDVI</span>
              <span className="text-xs font-mono text-primary">{data.ndvi}</span>
            </div>
            <SignalBar value={data.ndvi} max={1} color="bg-primary" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-muted-foreground">ET (mm/day)</span>
              <span className="text-xs font-mono text-ice-blue">{data.et}</span>
            </div>
            <SignalBar value={data.et} max={6} color="bg-ice-blue" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-muted-foreground">Stress Index</span>
              <span className={`text-xs font-mono ${data.stress > 0 ? 'text-gold' : 'text-primary'}`}>
                {data.stress > 0 ? '+' : ''}{data.stress}
              </span>
            </div>
            <div className="relative h-2 w-full bg-background/50 rounded-full overflow-hidden">
              <div className="absolute top-0 left-1/2 w-px h-full bg-border" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.abs(data.stress) * 25}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`absolute top-0 h-full rounded-full ${data.stress > 0 ? 'bg-gold left-1/2' : 'bg-primary right-1/2'}`}
                style={{ [data.stress > 0 ? 'left' : 'right']: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/50">
          {data.note}
        </p>

        {/* Prototype label */}
        <div className="mt-4 pt-3 border-t border-border/30">
          <span className="text-[10px] font-mono text-muted-foreground/50">PROTOTYPE DATA</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section id="timeline" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-alpine-night/50 via-background to-background"
      />
      
      {/* Atmospheric effect */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-ice-blue" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Temporal Analysis
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            A Journey Through Alpine Time
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-balance">
            Six years of observation reveal patterns of resilience, stress, and recovery 
            in the Swiss National Park ecosystem
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent md:-translate-x-1/2" />

          {/* Year cards */}
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((data, index) => (
              <div
                key={data.year}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full bg-primary border-2 border-background md:-translate-x-1/2 z-10" />

                {/* Card */}
                <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}`}>
                  <YearCard data={data} index={index} />
                </div>

                {/* Year label (opposite side on desktop) */}
                <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-start pl-12' : 'justify-end pr-12'}`}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    viewport={{ once: true }}
                    className="font-serif text-8xl font-bold text-foreground/10"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-6 rounded-xl border border-border/30 bg-card/10">
            <p className="text-sm text-muted-foreground max-w-md">
              The timeline suggests a pattern of recovery following stress events, 
              potentially indicating ecosystem resilience within the protected boundary.
            </p>
            <span className="text-[10px] font-mono text-gold">
              PRELIMINARY INTERPRETATION — PROTOTYPE DATA
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
