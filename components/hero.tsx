'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArtisticBackground } from './artistic-background'
import { TreelineAccent } from './alpine-accents'

function TopoArtifactSVG() {
  return (
    <svg
      viewBox="0 0 480 520"
      className="w-full h-full"
      style={{ color: 'currentColor' }}
      aria-hidden
    >
      {/* Outer coordinate frame */}
      <rect x="32" y="28" width="416" height="464" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />

      {/* Coordinate tick marks — top edge */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`t${i}`}>
          <line x1={32 + i * 104} y1="28" x2={32 + i * 104} y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <text x={32 + i * 104} y="17" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.3" fontFamily="monospace">
            {(10.18 + i * 0.05).toFixed(2)}°E
          </text>
        </g>
      ))}

      {/* Coordinate tick marks — left edge */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`l${i}`}>
          <line x1="32" y1={28 + i * 116} x2="26" y2={28 + i * 116} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <text x="22" y={32 + i * 116} textAnchor="end" fontSize="6" fill="currentColor" opacity="0.3" fontFamily="monospace">
            {(46.74 - i * 0.04).toFixed(2)}N
          </text>
        </g>
      ))}

      {/* Registration crosses — corners */}
      {[
        [32, 28], [448, 28], [32, 492], [448, 492],
        [240, 28], [240, 492], [32, 260], [448, 260],
      ].map(([cx, cy], i) => (
        <g key={`cross${i}`} opacity="0.22">
          <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="currentColor" strokeWidth="0.7" />
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="currentColor" strokeWidth="0.7" />
          <circle cx={cx} cy={cy} r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </g>
      ))}

      {/* Topographic contour lines — nested elevation rings */}
      {/* Core summit zone — high density contours */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <ellipse
          key={`c${i}`}
          cx="250" cy="200"
          rx={18 + i * 22} ry={12 + i * 16}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 0 ? 0.9 : 0.45}
          opacity={0.28 - i * 0.025}
          transform={`rotate(${-12 + i * 3} 250 200)`}
        />
      ))}
      {/* Secondary ridge — south-east spur */}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={`r${i}`}
          cx="340" cy="310"
          rx={14 + i * 18} ry={9 + i * 12}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity={0.18 - i * 0.02}
          transform={`rotate(${25 + i * 2} 340 310)`}
        />
      ))}
      {/* Valley contours — lower right */}
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={`v${i}`}
          cx="370" cy="420"
          rx={20 + i * 26} ry={10 + i * 14}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
          opacity={0.12 - i * 0.02}
          transform={`rotate(-8 370 420)`}
        />
      ))}
      {/* North-west plateau */}
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={`p${i}`}
          cx="110" cy="150"
          rx={16 + i * 20} ry={12 + i * 15}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
          opacity={0.14 - i * 0.02}
          transform={`rotate(5 110 150)`}
        />
      ))}
      {/* Index contours (every 100m) — bolder */}
      {[3, 6].map((i) => (
        <ellipse
          key={`ic${i}`}
          cx="250" cy="200"
          rx={18 + i * 22} ry={12 + i * 16}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.2"
          transform={`rotate(${-12 + i * 3} 250 200)`}
        />
      ))}

      {/* Elevation labels */}
      <text x="258" y="185" fontSize="6.5" fill="currentColor" opacity="0.32" fontFamily="monospace">2847m</text>
      <text x="285" y="222" fontSize="5.5" fill="currentColor" opacity="0.22" fontFamily="monospace">2700</text>
      <text x="306" y="258" fontSize="5.5" fill="currentColor" opacity="0.18" fontFamily="monospace">2500</text>
      <text x="160" y="170" fontSize="5.5" fill="currentColor" opacity="0.18" fontFamily="monospace">2300</text>

      {/* Raster pixel fragments — NDVI signal mosaic */}
      {/* Top-right quadrant — high vegetation signal */}
      {[
        [360, 60, 0.52, 8], [370, 60, 0.61, 8], [380, 60, 0.58, 8], [390, 60, 0.49, 8],
        [360, 70, 0.55, 8], [370, 70, 0.67, 8], [380, 70, 0.63, 8], [390, 70, 0.44, 8],
        [360, 80, 0.48, 8], [370, 80, 0.60, 8], [380, 80, 0.56, 8], [390, 80, 0.38, 8],
        [400, 60, 0.45, 8], [400, 70, 0.42, 8], [400, 80, 0.35, 8],
        [360, 90, 0.41, 8], [370, 90, 0.52, 8], [380, 90, 0.47, 8],
      ].map(([x, y, op, s], i) => (
        <rect key={`px${i}`} x={x} y={y} width={s} height={s} fill="currentColor" opacity={op as number * 0.4} />
      ))}
      {/* Bottom-left quadrant — stress signal */}
      {[
        [50, 390, 0.30, 10], [62, 390, 0.38, 10], [74, 390, 0.42, 10],
        [50, 402, 0.35, 10], [62, 402, 0.45, 10], [74, 402, 0.38, 10],
        [50, 414, 0.28, 10], [62, 414, 0.33, 10], [74, 414, 0.25, 10],
      ].map(([x, y, op, s], i) => (
        <rect key={`ps${i}`} x={x} y={y} width={s} height={s} fill="currentColor" opacity={op as number * 0.35} />
      ))}

      {/* Study-area polygon — the SNP boundary */}
      <polygon
        points="80,100 200,68 380,95 440,180 420,370 340,450 180,460 70,380 55,240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeDasharray="4 2.5"
        opacity="0.3"
      />

      {/* Study area label */}
      <text x="200" y="280" fontSize="7.5" fill="currentColor" opacity="0.18" fontFamily="monospace" letterSpacing="0.12em">
        STUDY AREA
      </text>
      <text x="208" y="290" fontSize="6" fill="currentColor" opacity="0.12" fontFamily="monospace">
        170.3 km²
      </text>

      {/* Signal transect line */}
      <line x1="80" y1="340" x2="420" y2="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.18" />
      <text x="90" y="337" fontSize="5.5" fill="currentColor" opacity="0.2" fontFamily="monospace">TRANSECT A–A′</text>

      {/* NDVI gradient bar — bottom legend */}
      <g transform="translate(52, 464)">
        <text x="0" y="-4" fontSize="5.5" fill="currentColor" opacity="0.3" fontFamily="monospace" letterSpacing="0.1em">NDVI</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <rect key={`nd${i}`} x={i * 14} y="0" width="14" height="6" fill="currentColor" opacity={0.08 + i * 0.032} />
        ))}
        <text x="0" y="14" fontSize="5" fill="currentColor" opacity="0.25" fontFamily="monospace">0.0</text>
        <text x="116" y="14" fontSize="5" fill="currentColor" opacity="0.25" fontFamily="monospace">1.0</text>
      </g>

      {/* Scene metadata — top-right corner */}
      <g transform="translate(340, 36)">
        <text x="0" y="0" fontSize="5.5" fill="currentColor" opacity="0.22" fontFamily="monospace">ECOSTRESS</text>
        <text x="0" y="9" fontSize="5" fill="currentColor" opacity="0.18" fontFamily="monospace">APR–JUN AMJ</text>
        <text x="0" y="18" fontSize="5" fill="currentColor" opacity="0.15" fontFamily="monospace">NDVI · ET · ESI</text>
        <text x="0" y="27" fontSize="5" fill="currentColor" opacity="0.12" fontFamily="monospace">70m nominal</text>
      </g>

      {/* North arrow */}
      <g transform="translate(432, 55)">
        <line x1="0" y1="12" x2="0" y2="-8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <polygon points="0,-10 -3,-2 3,-2" fill="currentColor" opacity="0.3" />
        <text x="0" y="20" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.25" fontFamily="monospace">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(340, 486)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
        <text x="30" y="-5" textAnchor="middle" fontSize="5" fill="currentColor" opacity="0.25" fontFamily="monospace">5 km</text>
      </g>
    </svg>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const scrollToObservatory = () => {
    document.getElementById('observatory')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToMethodology = () => {
    document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <ArtisticBackground variant="feldstation" />

      {/* Ghost bleeds */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute font-serif font-bold text-foreground leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 280px)', opacity: 0.04, left: '-3vw', top: '8%', letterSpacing: '-0.03em' }}
        >
          ALPINE
        </div>
        <div
          className="absolute font-serif font-bold text-foreground leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 280px)', opacity: 0.028, right: '-3vw', bottom: '22%', letterSpacing: '-0.03em' }}
        >
          SIGNALS
        </div>
      </div>

      {/* Main two-column layout */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex items-center pt-20 pb-8"
      >
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_460px] gap-0 md:gap-8 lg:gap-14 items-center min-h-[calc(100vh-160px)]">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col justify-center py-8 md:py-0">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 border border-primary/25 bg-primary/[0.06]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary/75" />
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-primary/85">
                    Research Project
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40">
                  2019–2025
                </span>
              </motion.div>

              {/* Title — flush left, large */}
              <div className="mb-8">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 72 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="font-serif font-medium tracking-tight text-foreground block leading-[0.90]"
                      style={{ fontSize: 'clamp(3.8rem, 8.5vw, 10.5rem)' }}
                    >
                      Signals of
                    </span>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 72 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="font-serif font-medium tracking-tight text-foreground block leading-[0.90] pl-6 md:pl-10"
                      style={{ fontSize: 'clamp(3.8rem, 8.5vw, 10.5rem)' }}
                    >
                      Stability
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Rule */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.62, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
                className="flex items-center gap-4 mb-7"
              >
                <div className="w-10 h-px bg-foreground/18" />
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/40 whitespace-nowrap">
                  Vegetation Change · Swiss National Park
                </span>
              </motion.div>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.78, ease: 'easeOut' }}
                className="text-sm text-muted-foreground/65 leading-loose mb-8 max-w-sm text-pretty"
              >
                Using satellite-derived environmental signals to examine whether one of Europe's most
                protected alpine landscapes shows resilience, stress, or subtle ecological change.
              </motion.p>

              {/* Metadata block */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.92, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10 border-l-2 border-primary/25 pl-4"
              >
                {[
                  { label: 'Coordinates', value: '46.6603°N · 10.2176°E' },
                  { label: 'Area', value: '170 km²' },
                  { label: 'Study Window', value: '2019 – 2025' },
                  { label: 'Signals', value: 'NDVI · ET · ESI' },
                  { label: 'Resolution', value: '70m nominal' },
                  { label: 'Platform', value: 'ECOSTRESS / AppEEARS' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-0.5">{item.label}</p>
                    <p className="text-[10px] font-mono text-foreground/70">{item.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.06, ease: 'easeOut' }}
                className="flex items-center gap-6"
              >
                <button
                  onClick={scrollToObservatory}
                  className="bg-foreground/90 text-background hover:bg-foreground transition-all duration-300 px-6 py-2.5 text-[10px] font-mono tracking-widest uppercase"
                >
                  Explore Observatory
                </button>
                <button
                  onClick={scrollToMethodology}
                  className="text-[10px] font-mono text-muted-foreground/55 hover:text-foreground/75 transition-colors duration-300 uppercase tracking-widest flex items-center gap-2"
                >
                  Methodology
                  <span className="opacity-60">→</span>
                </button>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN — Topographic Artifact ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex flex-col justify-center"
            >
              {/* Frame label */}
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/30">
                  Topographic Reference · SNP
                </span>
                <span className="text-[8px] font-mono text-muted-foreground/20">
                  1:50 000
                </span>
              </div>

              {/* SVG panel */}
              <div
                className="w-full text-foreground/60 border border-foreground/12 bg-foreground/[0.018]"
                style={{ aspectRatio: '480/520' }}
              >
                <TopoArtifactSVG />
              </div>

              {/* Caption */}
              <div className="flex items-center gap-4 mt-2 px-1">
                <span className="text-[8px] font-mono text-muted-foreground/25">Fig. 0.1</span>
                <span className="text-[8px] font-mono text-muted-foreground/25">
                  Study area boundary and sensor coverage extent, April–June composite
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Bottom strip */}
      <div className="relative z-10 mt-auto">
        <div className="flex items-end">
          <div className="hidden md:block px-7 pb-6 shrink-0 min-w-[130px]">
            <div className="text-[8px] font-mono text-muted-foreground/30 leading-relaxed space-y-0.5">
              <div className="text-[7px] uppercase tracking-[0.15em] text-muted-foreground/20 mb-1">Field Bbox</div>
              <div>46.74°N / 46.58°N</div>
              <div>10.06°E / 10.38°E</div>
            </div>
          </div>
          <div className="flex-1 h-[80px] text-primary/[0.10]">
            <TreelineAccent />
          </div>
          <div className="hidden md:block px-7 pb-6 shrink-0 text-right min-w-[130px]">
            <div className="text-[8px] font-mono text-muted-foreground/30 leading-relaxed space-y-0.5">
              <div className="text-[7px] uppercase tracking-[0.15em] text-muted-foreground/20 mb-1">Study Period</div>
              <div>2019–2025</div>
              <div>7 Seasons · Apr–Jun</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
