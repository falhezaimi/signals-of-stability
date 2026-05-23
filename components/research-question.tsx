'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const products = [
  {
    acronym: 'ESI',
    name: 'Evaporative Stress Index',
    description:
      'ESI is used as a vegetation-water-stress signal. Lower or more stressed ESI patterns may suggest areas where vegetation is experiencing reduced evaporative function relative to available observations.',
    caution: 'ESI can support stress interpretation, but it does not prove cause by itself.',
    color: '#B99B45',
  },
  {
    acronym: 'ET',
    name: 'Evapotranspiration',
    description:
      'ET represents water movement from land and vegetation into the atmosphere. In this atlas, ET helps show where vegetation-water activity appears stronger or weaker across available ECOSTRESS observations.',
    caution: 'ET patterns depend on vegetation, weather, soil moisture, overpass timing, and data coverage.',
    color: '#557F96',
  },
  {
    acronym: 'NDVI',
    name: 'Normalized Difference Vegetation Index',
    description:
      'NDVI provides a greenness-related vegetation signal. It helps identify areas with relatively higher or lower vegetation activity during the available January–June window.',
    caution: 'Greenness alone does not explain water stress or ecosystem condition.',
    color: '#3F6F42',
  },
  {
    acronym: 'PET',
    name: 'Potential Evapotranspiration',
    description:
      'PET represents atmospheric demand for water. It helps contextualize stress by showing where the atmosphere may be demanding more water from the surface.',
    caution: 'PET should be interpreted alongside ET, ESI, and observation coverage.',
    color: '#7B6F8A',
  },
  {
    acronym: 'WUE',
    name: 'Water Use Efficiency',
    description:
      'WUE relates vegetation function to water use. In this atlas, it helps explore where vegetation may appear more or less efficient under the available short-window observations.',
    caution: 'WUE can be sensitive to calculation method, data quality, and valid-pixel coverage.',
    color: '#5E8A7B',
  },
]

const atlasClaims = [
  {
    side: 'shows',
    items: [
      'How five vegetation-water-energy signals vary across Swiss National Park',
      'Where patterns appear stronger, weaker, or more variable in January–June observations',
      'How signal patterns compare across products, years, months, and overpass timing',
      'Which outputs have strong coverage and which are observation-limited',
    ],
  },
  {
    side: 'does not claim',
    items: [
      'Long-term ecological change or confirmed trends',
      'Causal relationships between signals and landscape condition',
      'Full growing-season or JJA analysis',
      'Resilience or stability without clearly defined thresholds',
    ],
  },
]

export function ResearchQuestion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="question" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-gold/25 bg-gold/[0.05] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold/75 whitespace-nowrap">
              Atlas Overview
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-5 text-balance">
            What this atlas shows
          </h2>
          <p className="max-w-2xl text-muted-foreground/70 text-sm leading-relaxed text-balance">
            This atlas shows how vegetation stress-related signals vary across Swiss National Park using
            ECOSTRESS-derived raster products. Each product captures a different part of the
            vegetation-water-energy system. The website organizes outputs into composites, anomalies,
            short-window trends, variability summaries, preview maps, and provenance files.
          </p>
        </motion.div>

        {/* What it shows / does not claim */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          className="grid md:grid-cols-2 gap-5 mb-16 md:mb-20"
        >
          {atlasClaims.map((col) => (
            <div
              key={col.side}
              className={`p-5 md:p-6 border bg-card/10 ${
                col.side === 'shows'
                  ? 'border-primary/20'
                  : 'border-border/20'
              }`}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.22em] mb-4">
                {col.side === 'shows' ? (
                  <span className="text-primary/65">This atlas shows →</span>
                ) : (
                  <span className="text-muted-foreground/40">This atlas does not claim →</span>
                )}
              </p>
              <ul className="space-y-2.5">
                {col.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: col.side === 'shows' ? '#3F6F42' : '#B8B1A3' }}
                    />
                    <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Section divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px bg-border/25" />
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40 whitespace-nowrap">
            Five Environmental Variables
          </span>
          <div className="flex-1 h-px bg-border/25" />
        </motion.div>

        {/* Five product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {products.map((product, index) => (
            <motion.div
              key={product.acronym}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: 'easeOut' }}
              className="group"
            >
              <div className="relative h-full p-5 border border-border/20 bg-card/8 hover:bg-card/15 hover:border-border/35 transition-all duration-500">
                {/* Acronym tag top-right */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-[10px] font-mono font-medium tracking-widest"
                    style={{ color: product.color }}
                  >
                    {product.acronym}
                  </span>
                </div>

                {/* Color accent bar */}
                <div
                  className="w-6 h-0.5 mb-4"
                  style={{ backgroundColor: product.color, opacity: 0.55 }}
                />

                <h3 className="text-sm font-medium mb-2 pr-8 leading-snug">{product.name}</h3>
                <p className="text-xs text-muted-foreground/65 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Caution */}
                <div className="pt-3 border-t border-border/15">
                  <p className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed italic">
                    Caution: {product.caution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Note card — sixth slot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 + 5 * 0.08, ease: 'easeOut' }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="h-full p-5 border border-border/15 bg-card/5 flex flex-col justify-center">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-3">
                Interpretation note
              </p>
              <p className="text-xs text-muted-foreground/50 leading-relaxed">
                The strongest interpretations survive four checks: sufficient observations, strong AOI
                coverage, consistent time-bin behavior, and agreement across multiple products.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-[10px] text-muted-foreground/35 mt-12 font-mono"
        >
          ECOSTRESS-derived products · ESI, ET, NDVI, PET, WUE · Short-window raster-derived analysis · Exploratory use only
        </motion.p>
      </div>
    </section>
  )
}
