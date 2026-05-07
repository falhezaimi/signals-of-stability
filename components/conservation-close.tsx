'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

function ContourBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="closeContourGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.65 0.12 160)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.7 0.1 220)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[...Array(15)].map((_, i) => (
        <path
          key={i}
          d={`M${-100 + i * 20},${300 + Math.sin(i * 0.5) * 100} Q${500 + Math.cos(i) * 100},${200 + i * 20} ${1100 - i * 20},${350 + Math.cos(i * 0.3) * 80}`}
          fill="none"
          stroke="url(#closeContourGradient)"
          strokeWidth={0.5}
          className="animate-contour"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  )
}

export function ConservationClose() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])

  return (
    <section id="conclusion" ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-alpine-night to-background" />
      
      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.12_160_/_0.05)_0%,transparent_50%)]" />
      
      {/* Contour lines */}
      <ContourBackground />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.08_0.01_240)_80%)]" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          style={{ opacity, y }}
          className="text-center"
        >
          {/* Quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="font-serif text-[120px] md:text-[180px] text-foreground/5 leading-none select-none">
              &quot;
            </span>
          </motion.div>

          {/* Main statement */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-8 text-balance"
          >
            <span className="text-muted-foreground">A protected landscape is not a frozen landscape.</span>
            {' '}
            <span className="text-foreground">
              Even in places designed for preservation, change leaves signatures in heat, water, and vegetation.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance"
          >
            This project explores how satellite observation can help read those signatures 
            before they become visible on the ground.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-12"
          />
        </motion.div>
      </div>
    </section>
  )
}
