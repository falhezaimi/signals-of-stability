'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PineSprigs } from './alpine-accents'

export function ConservationClose() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="conclusion" ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Clean background with subtle atmosphere */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Very subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.02] blur-[150px]" />
      
      {/* Ghost background word — more visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          className="font-serif font-bold text-foreground leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)', opacity: 0.04 }}
        >
          RESILIENCE
        </span>
      </div>

      {/* Pine sprigs corner accent */}
      <div className="absolute bottom-12 right-8 hidden lg:block">
        <PineSprigs className="opacity-[0.08] rotate-[6deg]" />
      </div>

      {/* Faint contour accent */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${-50 + i * 30},${300 + Math.sin(i * 0.5) * 60} Q${500 + Math.cos(i) * 60},${220 + i * 25} ${1050 - i * 30},${330 + Math.cos(i * 0.3) * 50}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            className="text-foreground"
          />
        ))}
      </svg>

      <div className="relative max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Quote mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.04 } : {}}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <span className="font-serif text-[100px] md:text-[140px] text-foreground leading-none select-none">
              &quot;
            </span>
          </motion.div>

          {/* Main statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-6 text-balance"
          >
            <span className="text-muted-foreground/70">A protected landscape is not a frozen landscape.</span>
            {' '}
            <span className="text-foreground">
              Even in places designed for preservation, change leaves signatures in heat, water, and vegetation.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="text-base md:text-lg text-muted-foreground/70 leading-relaxed text-balance"
          >
            This project explores how satellite observation can help read those signatures 
            before they become visible on the ground.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-12"
          />
        </motion.div>
      </div>
    </section>
  )
}
