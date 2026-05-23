'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Menu, X } from 'lucide-react'

const sections = [
  { label: 'Question',  href: '#question' },
  { label: 'Spatial',   href: '#spatial' },
  { label: 'Products',  href: '#products' },
  { label: 'Temporal',  href: '#temporal' },
  { label: 'Robustness',href: '#trust' },
  { label: 'Next Steps',href: '#next' },
]

export function FrNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('question')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const ids = sections.map(s => s.href.slice(1))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'bg-background/70 backdrop-blur-xl border-b border-border/30' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group text-muted-foreground/55 hover:text-foreground/80 transition-colors duration-500"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] hidden sm:block">SNP Research</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {sections.map(s => (
                <button
                  key={s.label}
                  onClick={() => go(s.href)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all duration-500 relative ${
                    active === s.href.slice(1)
                      ? 'text-foreground'
                      : 'text-muted-foreground/70 hover:text-foreground/90'
                  }`}
                >
                  {s.label}
                  {active === s.href.slice(1) && (
                    <motion.div
                      layoutId="frActiveNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/60"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right side: page label */}
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-muted-foreground/40">
              <span className="uppercase tracking-[0.15em] text-muted-foreground/30">Further Research</span>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground/60 hover:text-foreground/90 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-5"
            >
              {sections.map((s, i) => (
                <motion.button
                  key={s.label}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  onClick={() => go(s.href)}
                  className={`text-xl font-serif ${active === s.href.slice(1) ? 'text-foreground' : 'text-muted-foreground/60 hover:text-foreground'} transition-colors duration-500`}
                >
                  {s.label}
                </motion.button>
              ))}
              <div className="mt-8">
                <Link href="/" className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.15em] hover:text-foreground/60 transition-colors">
                  <ArrowLeft className="w-3 h-3" />
                  Back to main site
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
