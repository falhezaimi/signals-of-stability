'use client'

import { motion } from 'framer-motion'
import { SectionReveal } from './section-reveal'

export function FrOpening() {
  return (
    <section id="question" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Ghost bleed typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        <span
          className="absolute -top-8 -left-4 font-serif font-bold leading-none text-foreground/[0.04]"
          style={{ fontSize: 'clamp(80px, 18vw, 200px)' }}
        >
          MOSAIC
        </span>
        <span
          className="absolute bottom-4 -right-4 font-serif font-bold leading-none text-foreground/[0.04]"
          style={{ fontSize: 'clamp(60px, 14vw, 160px)' }}
        >
          TERRAIN
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        {/* Coord strip */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/25">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
              Evidence Layer · Swiss National Park · ECOSTRESS Short-Window Signal Atlas
            </span>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Left: text */}
          <div>
            <SectionReveal>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                  The Evidence Layer
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.07}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] text-balance mb-4">
                Inside the Evidence Layer
                <br />
                <span className="text-foreground/55">Swiss National Park</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 mb-8">
                ECOSTRESS/AppEEARS · Swiss National Park · 2019–2025 · January–June Observations
              </p>
            </SectionReveal>

            {/* Bridge from homepage CTA */}
            <SectionReveal delay={0.15}>
              <p className="max-w-2xl text-sm text-muted-foreground/65 leading-relaxed mb-8">
                The homepage states the directional finding. This page opens the evidence behind it —
                moving through six spatial maps, five ECOSTRESS product signals, yearly variation
                across 2019–2025, and robustness checks that support or qualify the terrain-structured
                mosaic claim. This is exploratory evidence, not a confirmed trend.
              </p>
            </SectionReveal>

            {/* The question */}
            <SectionReveal delay={0.18}>
              <div className="border-l-2 border-primary/30 pl-5 mb-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-2">Research Question</p>
                <p className="font-serif text-xl md:text-2xl font-medium leading-snug text-foreground/85 text-balance">
                  "Are short-window vegetation stress signals in Swiss National Park uniformly distributed, or do they show spatial structure?"
                </p>
              </div>
            </SectionReveal>

            {/* The answer */}
            <SectionReveal delay={0.24}>
              <div className="bg-card/20 border border-border/30 p-5 mb-8">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-primary/60 mb-2">Early Signal Pattern</p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  <span className="font-medium">Signal structure, not uniform distribution.</span> Short-window ECOSTRESS-derived outputs
                  show spatially differentiated patterns across the park — areas with consistently higher
                  ESI signals, elevated stress signals, and variable-demand patterns emerge from
                  available January–June observations. These are candidate patterns, not confirmed ecological findings.
                </p>
              </div>
            </SectionReveal>

            {/* What this page does */}
            <SectionReveal delay={0.30}>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'The Maps', desc: 'Show where the signal appears spatially across the park.' },
                  { label: 'The Products', desc: 'Reveal what environmental processes may explain the pattern.' },
                  { label: 'Yearly Outputs', desc: 'Demonstrate whether the signal persists or shifts through time.' },
                  { label: 'Robustness Checks', desc: 'Help separate credible patterns from visualization artifacts.' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 border border-border/20 bg-card/8">
                    <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono text-foreground/65 mb-0.5">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground/55 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right: anchor map */}
          <SectionReveal delay={0.2} direction="left" className="hidden md:block">
            <div className="w-64 lg:w-72">
              <div className="border border-border/30 bg-card/10 p-2 mb-2">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <picture>
                    <source srcSet="/data/signals/nasa_quality_maps/webp/map_01_dominant_daytime.webp" type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/data/signals/nasa_quality_maps/png/map_01_dominant_daytime.png"
                      alt="Dominant daytime ecological signal mosaic — Swiss National Park"
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'auto' }}
                    />
                  </picture>
                  {/* Corner marks */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden viewBox="0 0 100 75">
                    {[[4,3],[96,3],[4,72],[96,72]].map(([cx,cy],i) => (
                      <g key={i} opacity="0.35">
                        <line x1={cx-4} y1={cy} x2={cx+4} y2={cy} stroke="#DDD3BE" strokeWidth="0.7" />
                        <line x1={cx} y1={cy-4} x2={cx} y2={cy+4} stroke="#DDD3BE" strokeWidth="0.7" />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
              <p className="text-[8px] font-mono text-muted-foreground/35 text-center uppercase tracking-[0.12em]">
                Ecological Signal Mosaic · Map 01 · Dominant Daytime Classes
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* Scroll cue */}
        <SectionReveal delay={0.4} className="mt-16 flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground/30"
          >
            <span className="text-[8px] font-mono uppercase tracking-[0.18em]">Scroll for evidence</span>
            <div className="w-px h-8 bg-gradient-to-b from-border/40 to-transparent" />
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  )
}
