'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Satellite, Grid3X3, Filter, Calendar, GitCompare, Brain, ArrowRight } from 'lucide-react'

const pipelineSteps = [
  {
    icon: Satellite,
    title: 'Satellite Data',
    subtitle: 'Acquisition',
    description: 'Multi-spectral imagery from Landsat 8/9 and Sentinel-2 satellites.',
    detail: 'MODIS, Landsat, Sentinel-2',
  },
  {
    icon: Grid3X3,
    title: 'Raster Filtering',
    subtitle: 'Quality Control',
    description: 'Cloud masking, atmospheric correction, and geometric validation.',
    detail: 'QA Band Processing',
  },
  {
    icon: Filter,
    title: '70% Coverage',
    subtitle: 'Threshold',
    description: 'Scenes with less than 70% valid pixels are excluded.',
    detail: 'Spatial Completeness',
  },
  {
    icon: Calendar,
    title: 'Monthly Aggregation',
    subtitle: 'Temporal Binning',
    description: 'Valid observations composited into monthly means.',
    detail: 'JJA Season Focus',
  },
  {
    icon: GitCompare,
    title: 'Temporal Comparison',
    subtitle: 'Change Detection',
    description: 'Year-over-year and baseline comparisons.',
    detail: '2019-2024 Window',
  },
  {
    icon: Brain,
    title: 'Ecological Interpretation',
    subtitle: 'Synthesis',
    description: 'Translation of signals into ecological indicators.',
    detail: 'Stability Assessment',
  },
]

export function Methodology() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="method" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm mb-6">
            <Filter className="w-3.5 h-3.5 text-ice-blue/70" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Processing Pipeline
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Methodology
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground/80 text-sm text-balance">
            A rigorous pipeline from satellite acquisition to ecological interpretation
          </p>
        </motion.div>

        {/* Pipeline steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + index * 0.08, ease: 'easeOut' }}
              className="group"
            >
              <div className="relative h-full p-5 rounded-xl border border-border/25 bg-card/10 hover:bg-card/20 hover:border-border/40 transition-all duration-500">
                {/* Step number */}
                <div className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full bg-background border border-border/40 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-muted-foreground/70">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-ice-blue/8 border border-ice-blue/15 flex items-center justify-center mb-4 group-hover:bg-ice-blue/12 transition-colors duration-500">
                  <step.icon className="w-4 h-4 text-ice-blue/80" />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-0.5">
                    {step.subtitle}
                  </p>
                  <h3 className="text-sm font-medium">{step.title}</h3>
                </div>

                <p className="text-xs text-muted-foreground/60 leading-relaxed mb-3">
                  {step.description}
                </p>

                {/* Detail tag */}
                <div className="inline-flex items-center px-2 py-0.5 rounded bg-background/40 border border-border/20">
                  <span className="text-[9px] font-mono text-foreground/50">{step.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-14 md:mt-20"
        >
          <div className="p-5 rounded-xl border border-border/20 bg-card/5">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {pipelineSteps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background/40 border border-border/20">
                    <step.icon className="w-3 h-3 text-ice-blue/60" />
                    <span className="text-[10px] font-mono text-foreground/60 hidden sm:inline">{step.title}</span>
                    <span className="text-[10px] font-mono text-foreground/60 sm:hidden">{index + 1}</span>
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-border/50 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key methodology points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="mt-10 grid md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Spatial Resolution', value: '30m / 10m' },
            { label: 'Temporal Coverage', value: '2019-2024' },
            { label: 'Quality Threshold', value: '70% Valid' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3.5 rounded-lg border border-border/15 bg-card/5 text-center"
            >
              <p className="text-[10px] text-muted-foreground/50 mb-0.5">{item.label}</p>
              <p className="text-xs font-mono text-foreground/70">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
