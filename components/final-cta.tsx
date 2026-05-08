'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      {/* Faint topo contour echo */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.022]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {[0,1,2,3,4].map((i) => (
          <path key={i}
            d={`M${-100+i*30},${200+Math.sin(i*0.7)*50} Q${600+Math.cos(i)*80},${150+i*22} ${1300-i*30},${210+Math.cos(i*0.4)*45}`}
            fill="none" stroke="currentColor" strokeWidth="0.6" className="text-foreground"
          />
        ))}
      </svg>

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Station label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-4 h-px bg-foreground/20" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
              Research Project · Signals of Stability
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-5 text-balance">
            Reading the Alpine Signal
          </h2>

          <p className="max-w-md text-muted-foreground/65 text-sm leading-relaxed mb-10 text-balance">
            A research-driven digital experience connecting remote sensing,
            ecological stability, and conservation storytelling across 170 km²
            of protected Swiss alpine terrain.
          </p>

          {/* Field-station navigation links */}
          <div className="flex flex-wrap items-center gap-0">
            {[
              { label: 'Signal Observatory', href: '#observatory' },
              { label: 'Methodology', href: '#method' },
              { label: 'Findings', href: '#findings' },
            ].map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-3 px-5 py-3 border border-border/30 hover:border-border/55 hover:bg-foreground/[0.03] transition-all duration-300 group"
              >
                <span className="text-[9px] font-mono text-muted-foreground/35">{String(i+1).padStart(2,'0')}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/65 group-hover:text-foreground/85 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="text-[10px] text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors duration-300">→</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="mt-16 pt-8 border-t border-border/15"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Project', value: 'Signals of Stability' },
              { label: 'Location', value: 'Swiss National Park, CH' },
              { label: 'Period', value: '2019 – 2025' },
              { label: 'Coverage', value: '170 km² · 7 Seasons · Apr–Jun' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-1">{item.label}</p>
                <p className="text-[10px] font-mono text-foreground/60">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="text-[9px] font-mono text-muted-foreground/30 mt-8 uppercase tracking-[0.12em]">
            Research prototype · Raster-derived ECOSTRESS/AppEEARS output · April–June composite · Validation pending
          </p>
        </motion.div>
      </div>
    </section>
  )
}
