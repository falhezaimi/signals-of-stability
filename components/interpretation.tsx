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
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Interpretation
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Reading the Signals
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-balance">
            Careful interpretation of satellite-derived indicators in the context of 
            ecosystem monitoring and conservation science
          </p>
        </motion.div>

        {/* Interpretation cards */}
        <div className="space-y-6 md:space-y-8">
          {interpretations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="relative p-6 md:p-8 rounded-xl border border-border/50 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-border transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-serif font-medium mb-3 text-balance">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-balance">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight tag */}
                  <div className="shrink-0 flex items-start">
                    <span className="px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-xs font-mono text-gold uppercase tracking-wider">
                      {item.highlight}
                    </span>
                  </div>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caveat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/60 font-mono max-w-lg mx-auto">
            These interpretations represent preliminary hypotheses based on prototype data. 
            Final conclusions require complete analysis with validated datasets.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
