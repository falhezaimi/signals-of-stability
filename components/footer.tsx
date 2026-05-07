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
    <footer className="relative py-16 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-12 md:gap-8">
          {/* Logo */}
          <div>
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-3 group mb-4"
            >
              <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center group-hover:border-primary transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-sm font-medium tracking-wide text-foreground/80 group-hover:text-foreground transition-colors">
                SNP Research
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              A digital exploration of vegetation change in the Swiss National Park
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Coordinates */}
          <div className="text-right">
            <div className="inline-flex flex-col items-end gap-1 text-xs font-mono text-muted-foreground/60">
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
          className="mt-16 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground/50">
            Signals of Stability — Research Prototype 2024
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground/50">
            <span>Built with Next.js</span>
            <span className="w-px h-3 bg-border/50" />
            <span>Deployed on Vercel</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
