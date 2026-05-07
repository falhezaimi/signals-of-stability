'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Satellite, Grid3X3, Filter, Calendar, GitCompare, Brain, ChevronRight } from 'lucide-react'

const pipelineSteps = [
  {
    icon: Satellite,
    title: 'Satellite Data',
    subtitle: 'Acquisition',
    description: 'Multi-spectral imagery from Landsat 8/9 and Sentinel-2 satellites capturing visible, near-infrared, and thermal bands.',
    detail: 'MODIS, Landsat, Sentinel-2',
  },
  {
    icon: Grid3X3,
    title: 'Raster Filtering',
    subtitle: 'Quality Control',
    description: 'Cloud masking, atmospheric correction, and geometric validation to ensure data integrity.',
    detail: 'QA Band Processing',
  },
  {
    icon: Filter,
    title: '70% Coverage',
    subtitle: 'Threshold',
    description: 'Scenes with less than 70% valid pixels are excluded to prevent spatial bias in aggregated statistics.',
    detail: 'Spatial Completeness',
  },
  {
    icon: Calendar,
    title: 'Monthly Aggregation',
    subtitle: 'Temporal Binning',
    description: 'Valid observations composited into monthly means for June, July, and August growing season analysis.',
    detail: 'JJA Season Focus',
  },
  {
    icon: GitCompare,
    title: 'Temporal Comparison',
    subtitle: 'Change Detection',
    description: 'Year-over-year and baseline comparisons to identify trends, anomalies, and persistent patterns.',
    detail: '2019-2024 Window',
  },
  {
    icon: Brain,
    title: 'Ecological Interpretation',
    subtitle: 'Synthesis',
    description: 'Translation of remote sensing signals into ecologically meaningful indicators of ecosystem state.',
    detail: 'Stability Assessment',
  },
]

export function Methodology() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="method" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-6">
            <Filter className="w-4 h-4 text-ice-blue" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Processing Pipeline
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Methodology
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-balance">
            A rigorous pipeline from satellite acquisition to ecological interpretation
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="relative group"
              >
                <div className="relative h-full p-6 rounded-xl border border-border/50 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-primary/30 transition-all duration-500">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                    <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-ice-blue/10 border border-ice-blue/20 flex items-center justify-center mb-4 group-hover:bg-ice-blue/20 transition-colors">
                    <step.icon className="w-5 h-5 text-ice-blue" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                      {step.subtitle}
                    </p>
                    <h3 className="text-lg font-medium">{step.title}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Detail tag */}
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-background/50 border border-border/50">
                    <span className="text-[10px] font-mono text-foreground/60">{step.detail}</span>
                  </div>

                  {/* Arrow connector (visible on larger screens) */}
                  {index < pipelineSteps.length - 1 && (index + 1) % 3 !== 0 && (
                    <div className="absolute top-1/2 -right-4 w-8 h-8 hidden lg:flex items-center justify-center z-10">
                      <ChevronRight className="w-4 h-4 text-border" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Pipeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <div className="p-6 md:p-8 rounded-xl border border-border/50 bg-card/20 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {pipelineSteps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border/50">
                    <step.icon className="w-4 h-4 text-ice-blue" />
                    <span className="text-xs font-mono text-foreground/80 hidden sm:inline">{step.title}</span>
                    <span className="text-xs font-mono text-foreground/80 sm:hidden">{index + 1}</span>
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-border shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key methodology points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Spatial Resolution', value: '30m (Landsat) / 10m (Sentinel-2)' },
            { label: 'Temporal Coverage', value: '6 Years (2019-2024)' },
            { label: 'Quality Threshold', value: '70% Valid Coverage' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-lg border border-border/30 bg-card/10 text-center"
            >
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-sm font-mono text-foreground">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
