'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Droplets, Shield } from 'lucide-react'

const interpretations = [
  {
    icon: TrendingUp,
    title: 'Stability may be a signal',
    description: 'If repeated observations show no dramatic decline, ecological stability itself may be an important result. The absence of negative trends in a protected area suggests that conservation measures may be effectively buffering external pressures.',
    highlight: 'stability',
  },
  {
    icon: Droplets,
    title: 'Water stress may appear before greenness declines',
    description: 'Evapotranspiration and thermal stress signals may reveal subtle pressure before visible vegetation loss. Early detection through water-related indices could provide advance warning of ecosystem changes.',
    highlight: 'early detection',
  },
  {
    icon: Shield,
    title: 'Protected landscapes still need monitoring',
    description: 'Long-term Earth observation can help evaluate whether conservation areas are buffering or exposing climate-driven change. Continuous monitoring ensures that protection status translates to actual ecological outcomes.',
    highlight: 'monitoring',
  },
]

export function Interpretation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Interpretation
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Reading the Signals
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground/80 text-sm text-balance">
            Careful interpretation of satellite-derived indicators in the context of 
            ecosystem monitoring and conservation science
          </p>
        </motion.div>

        {/* Interpretation cards */}
        <div className="space-y-5">
          {interpretations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
              className="group"
            >
              <div className="p-5 md:p-6 rounded-xl border border-border/25 bg-card/10 hover:bg-card/20 transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-5">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center group-hover:bg-gold/12 transition-colors duration-500">
                      <item.icon className="w-5 h-5 text-gold/80" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif font-medium mb-2 text-balance">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed text-balance">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight tag */}
                  <div className="shrink-0 flex items-start">
                    <span className="px-2.5 py-1 rounded-full bg-gold/8 border border-gold/15 text-[10px] font-mono text-gold/80 uppercase tracking-wider">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caveat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[11px] text-muted-foreground/50 font-mono max-w-md mx-auto">
            These interpretations represent preliminary hypotheses based on prototype data. 
            Final conclusions require complete analysis with validated datasets.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
