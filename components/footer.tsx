'use client'

import { motion } from 'framer-motion'

const navItems = [
  { label: 'Overview', href: '#hero' },
  { label: 'Earth View', href: '#earth' },
  { label: 'Question', href: '#question' },
  { label: 'Observatory', href: '#observatory' },
  { label: 'Method', href: '#method' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Findings', href: '#findings' },
  { label: 'Conclusion', href: '#conclusion' },
]

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-14 border-t border-border/20">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-10 md:gap-8">
          {/* Logo */}
          <div>
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-2.5 group mb-3"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-primary/50 group-hover:text-primary/70 transition-colors duration-500 shrink-0">
                <line x1="0" y1="10" x2="7" y2="10" stroke="currentColor" strokeWidth="1.2" />
                <line x1="13" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.2" />
                <line x1="10" y1="0" x2="10" y2="7" stroke="currentColor" strokeWidth="1.2" />
                <line x1="10" y1="13" x2="10" y2="20" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/55 group-hover:text-foreground/75 transition-colors duration-500">
                SNP Research
              </span>
            </button>
            <p className="text-[11px] text-muted-foreground/50 leading-relaxed max-w-[180px]">
              A digital exploration of vegetation change in the Swiss National Park
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-xs text-muted-foreground/50 hover:text-foreground/70 transition-colors duration-500"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Coordinates */}
          <div className="text-right">
            <div className="inline-flex flex-col items-end gap-0.5 text-[10px] font-mono text-muted-foreground/40">
              <span>46.6603° N, 10.2176° E</span>
              <span>Swiss National Park</span>
              <span>Graubünden, Switzerland</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[10px] text-muted-foreground/35">
            SNP ECOSTRESS Short-Window Signal Atlas — Exploratory Research Prototype
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/30">
            <span>46.6603°N · 10.2176°E</span>
            <span className="w-px h-2.5 bg-border/20" />
            <span>Swiss National Park · Est. 1914</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
