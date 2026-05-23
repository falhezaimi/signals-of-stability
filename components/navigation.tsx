'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '#hero' },
  { label: 'Signal Atlas', href: '#observatory' },
  { label: 'Findings', href: '#findings' },
  { label: 'Methods', href: '#method' },
  { label: 'Limitations', href: '#limitations' },
  { label: 'Provenance', href: '#provenance' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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
            {/* Logo — field-station cross mark */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-3 group"
            >
              <svg
                width="20" height="20"
                viewBox="0 0 20 20"
                className="text-primary/60 group-hover:text-primary/80 transition-colors duration-500"
                aria-hidden="true"
              >
                {/* Horizontal arm */}
                <line x1="0" y1="10" x2="7" y2="10" stroke="currentColor" strokeWidth="1.2" />
                <line x1="13" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.2" />
                {/* Vertical arm */}
                <line x1="10" y1="0" x2="10" y2="7" stroke="currentColor" strokeWidth="1.2" />
                <line x1="10" y1="13" x2="10" y2="20" stroke="currentColor" strokeWidth="1.2" />
                {/* Center dot */}
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/55 group-hover:text-foreground/75 transition-colors duration-500 hidden sm:block">
                SNP · Signal Atlas
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all duration-500 relative ${
                    activeSection === item.href.slice(1)
                      ? 'text-foreground'
                      : 'text-muted-foreground/70 hover:text-foreground/90'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/60"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Further Research link + Coordinates */}
            <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-muted-foreground/40">
              <Link
                href="/further-research"
                className="flex items-center gap-1.5 border border-border/30 px-2.5 py-1 hover:border-primary/30 hover:text-primary/70 transition-all duration-500"
              >
                <span className="w-1 h-1 rounded-full bg-gold/50" />
                <span className="hidden xl:inline">Further Research</span>
                <span className="xl:hidden">Research</span>
              </Link>
              <span className="w-px h-2.5 bg-border/30" />
              <span>46.6603° N</span>
              <span className="w-px h-2.5 bg-border/30" />
              <span>10.2176° E</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground/60 hover:text-foreground/90 transition-colors duration-500"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-xl font-serif ${
                    activeSection === item.href.slice(1)
                      ? 'text-foreground'
                      : 'text-muted-foreground/60 hover:text-foreground'
                  } transition-colors duration-500`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="mt-8 flex items-center gap-3 text-[10px] font-mono text-muted-foreground/40">
                <span>46.6603° N</span>
                <span className="w-px h-2.5 bg-border/30" />
                <span>10.2176° E</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
