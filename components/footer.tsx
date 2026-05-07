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
              <div className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
              </div>
              <span className="text-xs font-medium tracking-wide text-foreground/60 group-hover:text-foreground/80 transition-colors duration-500">
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
            Signals of Stability — Research Prototype 2024
          </p>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground/35">
            <span>Built with Next.js</span>
            <span className="w-px h-2.5 bg-border/20" />
            <span>Deployed on Vercel</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
