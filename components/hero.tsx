'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function ContourLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="contourGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.65 0.12 160)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="oklch(0.7 0.1 220)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.65 0.12 160)" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {[...Array(20)].map((_, i) => (
        <ellipse
          key={i}
          cx={500 + Math.sin(i * 0.5) * 100}
          cy={500 + Math.cos(i * 0.3) * 50}
          rx={100 + i * 40}
          ry={60 + i * 25}
          fill="none"
          stroke="url(#contourGradient)"
          strokeWidth={0.5}
          className="animate-contour"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </svg>
  )
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 opacity-[0.03]">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.65 0.12 160) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.65 0.12 160) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  )
}

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan"
      />
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const scrollToEarth = () => {
    document.getElementById('earth')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-alpine-night via-background to-background" />
        
        {/* Atmospheric glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] bg-gradient-to-b from-primary/5 via-ice-blue/3 to-transparent blur-3xl" />
        
        {/* Contour lines */}
        <ContourLines />
        
        {/* Grid overlay */}
        <GridOverlay />
        
        {/* Scan line effect */}
        <ScanLine />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.08_0.01_240)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Research Project 2024
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-balance mb-6"
        >
          <span className="bg-gradient-to-r from-glacier via-foreground to-glacier bg-clip-text text-transparent">
            Signals of Stability
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-8 text-balance"
        >
          A Digital Exploration of Vegetation Change in the Swiss National Park
        </motion.p>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground/80 leading-relaxed mb-12 text-pretty"
        >
          Using satellite-derived environmental signals to examine whether one of Europe&apos;s 
          most protected alpine landscapes shows resilience, stress, or subtle ecological 
          change through time.
        </motion.p>

        {/* Coordinate badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="inline-flex items-center gap-6 px-6 py-3 rounded-lg border border-border/30 bg-card/20 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-mono text-muted-foreground">STUDY REGION</span>
          </div>
          <span className="text-xs font-mono text-foreground/70">Swiss National Park</span>
          <span className="text-xs font-mono text-muted-foreground">170 km²</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToEarth}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Corner coordinates */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <div className="flex flex-col gap-1 text-xs font-mono text-muted-foreground/50">
          <span>46.6603° N</span>
          <span>10.2176° E</span>
          <span>ALT 1,500-3,174m</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex flex-col gap-1 text-xs font-mono text-muted-foreground/50 text-right">
          <span>EST. 1914</span>
          <span>UNESCO BIOSPHERE</span>
          <span>GRAUBÜNDEN, CH</span>
        </div>
      </div>
    </section>
  )
}
