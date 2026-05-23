'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const observations = [
  {
    number: '01',
    title: 'Time-of-day separation matters',
    description:
      'ECOSTRESS observations occur at different times of day. Because vegetation stress signals can shift between morning, midday, evening, and night, patterns should be compared across time bins before drawing conclusions. A signal visible only in one time bin may reflect observation timing rather than landscape condition.',
    tag: 'Time-bin sensitive',
    color: '#557F96',
  },
  {
    number: '02',
    title: 'Coverage affects confidence',
    description:
      'Outputs with low AOI pixel coverage or limited observation counts should be interpreted cautiously, even if the visual pattern appears strong. The coverage_inside_aoi_percent and observation_count fields are the primary quality indicators for each output.',
    tag: 'Coverage-sensitive',
    color: '#B99B45',
  },
  {
    number: '03',
    title: 'Products capture different parts of vegetation stress',
    description:
      'ESI, ET, NDVI, PET, and WUE each measure a different dimension of vegetation-water-energy behavior. Patterns that appear in only one product should be treated as candidate signals, not conclusions. Agreement across multiple products increases interpretive weight.',
    tag: 'Multi-product check',
    color: '#3F6F42',
  },
  {
    number: '04',
    title: 'Some areas show repeated short-window signal differences',
    description:
      'Certain locations appear consistently different from the AOI mean across multiple products and years. These areas are candidates for closer review. They do not automatically indicate ecological damage, decline, or long-term change.',
    tag: 'Candidate signal',
    color: '#7B6F8A',
  },
  {
    number: '05',
    title: 'This atlas is strongest as a discussion tool',
    description:
      'The outputs are designed to make short-window vegetation stress signals visible, comparable, and scientifically discussable. They are exploratory in nature. Independent field validation, longer monitoring periods, and ecological context are all needed before drawing firm conclusions.',
    tag: 'Exploratory use',
    color: '#5E8A7B',
  },
]

export function Interpretation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-gold/25 bg-gold/[0.05] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold/75 whitespace-nowrap">
              Key Observations
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            What the signals suggest
          </h2>
          <p className="max-w-lg text-muted-foreground/65 text-sm text-balance leading-relaxed">
            Five careful observations from short-window ECOSTRESS-derived signal analysis.
            These are evidence-based observations, not ecological conclusions.
          </p>
        </motion.div>

        {/* Observation cards */}
        <div className="space-y-4">
          {observations.map((obs, index) => (
            <motion.div
              key={obs.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 + index * 0.09, ease: 'easeOut' }}
              className="group"
            >
              <div className="flex gap-5 p-5 md:p-6 border border-border/20 bg-card/8 hover:bg-card/15 hover:border-border/30 transition-all duration-400">
                {/* Number */}
                <div className="shrink-0 pt-0.5">
                  <span
                    className="text-[10px] font-mono font-medium"
                    style={{ color: obs.color, opacity: 0.7 }}
                  >
                    {obs.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="text-base md:text-lg font-serif font-medium leading-snug text-balance">
                      {obs.title}
                    </h3>
                    <span
                      className="shrink-0 text-[8px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 border"
                      style={{
                        borderColor: `${obs.color}30`,
                        color: obs.color,
                        backgroundColor: `${obs.color}08`,
                      }}
                    >
                      {obs.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground/65 leading-relaxed">
                    {obs.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caveat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] text-muted-foreground/40 font-mono max-w-lg mx-auto">
            Short-window raster-derived ECOSTRESS/AppEEARS signals · January–June observations ·
            2019–2025 · Exploratory research prototype · Independent validation pending
          </p>
        </motion.div>
      </div>
    </section>
  )
}
