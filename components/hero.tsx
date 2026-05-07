'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function SubtleContourLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={i}
          cx={500 + Math.sin(i * 0.7) * 80}
          cy={600 + Math.cos(i * 0.4) * 40}
          rx={200 + i * 60}
          ry={120 + i * 35}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5}
          className="text-foreground"
        />
      ))}
    </svg>
  )
}

function SoftGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.03] blur-[120px]" />
      <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[200px] rounded-full bg-ice-blue/[0.02] blur-[100px]" />
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
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])

  const scrollToEarth = () => {
    document.getElementById('earth')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alpine-night via-background to-background" />
      
      {/* Soft atmospheric glow */}
      <SoftGlow />
      
      {/* Faint contour lines */}
      <SubtleContourLines />
      
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.08_0.01_240/0.4)_100%)]" />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Research Project 2024
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-balance mb-8"
        >
          Signals of Stability
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-6 text-balance"
        >
          A Digital Exploration of Vegetation Change in the Swiss National Park
        </motion.p>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="max-w-xl mx-auto text-sm text-muted-foreground/70 leading-relaxed mb-14 text-pretty"
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
          className="inline-flex items-center gap-6 px-5 py-2.5 rounded-lg border border-border/20 bg-card/10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/60" />
            <span className="text-[11px] font-mono text-muted-foreground/70">STUDY REGION</span>
          </div>
          <span className="text-[11px] font-mono text-foreground/60">Swiss National Park</span>
          <span className="text-[11px] font-mono text-muted-foreground/50">170 km²</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToEarth}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-500"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Corner coordinates - subtle */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-8 hidden lg:block"
      >
        <div className="flex flex-col gap-0.5 text-[10px] font-mono text-muted-foreground/30">
          <span>46.6603° N</span>
          <span>10.2176° E</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 right-8 hidden lg:block"
      >
        <div className="flex flex-col gap-0.5 text-[10px] font-mono text-muted-foreground/30 text-right">
          <span>EST. 1914</span>
          <span>GRAUBÜNDEN, CH</span>
        </div>
      </motion.div>
    </section>
  )
}
