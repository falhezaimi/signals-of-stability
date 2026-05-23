'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArtisticBackground } from './artistic-background'
import { SectionReveal } from './section-reveal'
import timelineRaw from '@/public/data/signals/timeline-yearly-values.json'

type RawEntry = {
  year: number
  ndvi_mean: number; et_mean: number; esi_mean: number
  confidence: { ndvi: string; et: string; esi: string }
  ecological_note: string; confidence_note: string
}

type YearEntry = {
  year: string
  ndvi: { mean: number; obs_coverage_p95: number; confidence_level: string }
  et: { mean: number; obs_coverage_p95: number; confidence_level: string; unit: string }
  esi: { mean: number; obs_coverage_p95: number; confidence_level: string; unit: string }
  coverage_aoi_percent: number
  note: string
  ecological_context: string
}

const timelineData: YearEntry[] = (timelineRaw as unknown as RawEntry[]).map(raw => ({
  year: String(raw.year),
  ndvi: { mean: raw.ndvi_mean, obs_coverage_p95: 100, confidence_level: raw.confidence.ndvi },
  et:   { mean: raw.et_mean,   obs_coverage_p95: 100, confidence_level: raw.confidence.et,   unit: 'mm/day' },
  esi:  { mean: raw.esi_mean,  obs_coverage_p95: 100, confidence_level: raw.confidence.esi,  unit: '' },
  coverage_aoi_percent: 100,
  note: raw.ecological_note,
  ecological_context: raw.confidence_note,
}))

type Condition = 'stable' | 'positive' | 'negative' | 'mixed' | 'partial'

function getCondition(entry: YearEntry): Condition {
  if (entry.ndvi.confidence_level === 'low' || entry.esi.confidence_level === 'low') return 'partial'
  if (entry.year === '2021') return 'negative'
  if (entry.year === '2023') return 'positive'
  if (entry.year === '2020' || entry.year === '2022') return 'mixed'
  return 'stable'
}

const conditionConfig: Record<Condition, { label: string; color: string }> = {
  stable:   { label: 'BASELINE',  color: 'text-muted-foreground/60' },
  positive: { label: 'HIGH NDVI', color: 'text-primary/70' },
  negative: { label: 'STRESSED',  color: 'text-gold/70' },
  mixed:    { label: 'VARIABLE',  color: 'text-ice-blue/60' },
  partial:  { label: 'PARTIAL',   color: 'text-muted-foreground/40' },
}

function RasterThumbnail({ year }: { year: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/data/rasters/ndvi_${year}_apr_jun_mean.png`}
        alt={`NDVI ${year} January–June mean`}
        loading="lazy"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover', imageRendering: 'pixelated' }}
      />
      {/* Scan-line overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <defs>
          <pattern id={`ts-scan-${year}`} x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
            <rect y="1" width="1" height="1" fill="black" fillOpacity="0.09" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ts-scan-${year})`} />
      </svg>
      {/* Corner registration marks */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 80" aria-hidden>
        <g opacity="0.28">
          <line x1="3" y1="4" x2="9" y2="4" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="6" y1="1" x2="6" y2="7" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="91" y1="4" x2="97" y2="4" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="94" y1="1" x2="94" y2="7" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="3" y1="76" x2="9" y2="76" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="6" y1="73" x2="6" y2="79" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="91" y1="76" x2="97" y2="76" stroke="#DDD3BE" strokeWidth="0.8" />
          <line x1="94" y1="73" x2="94" y2="79" stroke="#DDD3BE" strokeWidth="0.8" />
        </g>
      </svg>
      {/* Label bar */}
      <div className="absolute top-0 left-0 px-1.5 py-0.5 pointer-events-none" style={{ background: 'rgba(0,0,0,0.42)' }}>
        <span className="text-[7px] font-mono" style={{ color: '#DDD3BE', opacity: 0.75 }}>NDVI · {year}</span>
      </div>
    </div>
  )
}

function SignalTrace({ values, activeIdx, colorClass }: { values: number[]; activeIdx: number; colorClass: string }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const norm = (v: number) => ((v - min) / (max - min)) * 28 + 4
  const pts = values.map((v, i) => `${i * (100 / (values.length - 1))},${32 - norm(v)}`).join(' ')

  return (
    <svg viewBox="0 0 100 36" className="w-full" preserveAspectRatio="none" aria-hidden>
      <line x1="0" y1="32" x2="100" y2="32" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.2" className={colorClass} opacity="0.55" />
      {(() => {
        const [ax, ay] = pts.split(' ')[activeIdx].split(',')
        return <circle cx={ax} cy={ay} r="2" fill="currentColor" className={colorClass} opacity="0.8" />
      })()}
      {values.map((_, i) => (
        <line
          key={i}
          x1={i * (100 / (values.length - 1))}
          y1="32"
          x2={i * (100 / (values.length - 1))}
          y2="30"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
        />
      ))}
    </svg>
  )
}

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const ndviValues = timelineData.map((d) => d.ndvi.mean)
  const etValues = timelineData.map((d) => d.et.mean)
  const esiValues = timelineData.map((d) => d.esi.mean)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const idx = Math.round(scrollLeft / clientWidth)
    setActiveIdx(Math.min(Math.max(idx, 0), timelineData.length - 1))
  }

  const scrollToFrame = (i: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ left: i * scrollRef.current.clientWidth, behavior: 'smooth' })
    setActiveIdx(i)
  }

  const total = timelineData.length

  return (
    <section id="timeline" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <ArtisticBackground variant="rasterband" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        <SectionReveal>
          <header className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-blue/60" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                Temporal Analysis · January–June · 2019–2025
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance text-foreground">
              Seven Years of Signal
            </h2>
            <p className="max-w-lg text-muted-foreground/70 text-sm text-balance leading-relaxed">
              Season-by-season ECOSTRESS/AppEEARS satellite composite. Scroll to advance through the study period.
            </p>
          </header>
        </SectionReveal>

        {/* ── FILM STRIP — horizontal scroll ── */}
        <SectionReveal delay={0.15}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-0"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {timelineData.map((data, i) => {
              const condition = getCondition(data)
              const cond = conditionConfig[condition]
              const isLowConf = data.et.confidence_level === 'low' || data.esi.confidence_level === 'low'

              return (
                <div
                  key={data.year}
                  className="shrink-0 flex flex-col border-r border-border/25 last:border-r-0"
                  style={{ scrollSnapAlign: 'start', width: '100%', minWidth: '100%' }}
                >
                  {/* Frame header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-card/12">
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.15em]">
                        FRAME {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
                      <span className="w-px h-3 bg-border/25" />
                      <span className={`text-[8px] font-mono uppercase tracking-[0.15em] ${cond.color}`}>
                        {cond.label}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-muted-foreground/25">
                      Jan–Jun · SNP · ECOSTRESS
                    </span>
                  </div>

                  {/* Frame body */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">

                    {/* Raster panel */}
                    <div className="border-b md:border-b-0 md:border-r border-border/20 p-5 flex flex-col gap-3">
                      <div className="relative h-[100px] md:h-[140px] flex items-center justify-center overflow-hidden">
                        <span
                          className="absolute font-serif font-bold text-foreground select-none leading-none"
                          style={{ fontSize: 'clamp(72px, 18vw, 120px)', opacity: 0.07, letterSpacing: '-0.03em' }}
                        >
                          {data.year}
                        </span>
                        <div className="relative w-full h-full max-w-[200px] mx-auto text-foreground/50">
                          <RasterThumbnail year={data.year} />
                        </div>
                      </div>

                      {/* Scene metadata */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                        {[
                          { label: 'NDVI', value: data.ndvi.mean.toFixed(4), col: 'text-primary/65' },
                          { label: 'ET mm/day', value: data.et.mean.toFixed(3), col: 'text-ice-blue/65' },
                          { label: 'ESI', value: data.esi.mean.toFixed(4), col: 'text-gold/65' },
                          { label: 'Season', value: 'Apr–Jun', col: 'text-muted-foreground/50' },
                        ].map((m) => (
                          <div key={m.label}>
                            <p className="text-[8px] font-mono text-muted-foreground/30 mb-0.5">{m.label}</p>
                            <p className={`text-[11px] font-mono ${m.col}`}>{m.value}</p>
                          </div>
                        ))}
                      </div>

                      {isLowConf ? (
                        <span
                          className="text-[8px] font-mono uppercase tracking-[0.12em] mt-1"
                          style={{ color: '#A6523A' }}
                        >
                          ET · ESI: LOW CONFIDENCE
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono text-muted-foreground/20 uppercase tracking-[0.12em] mt-1">
                          RASTER-DERIVED
                        </span>
                      )}
                    </div>

                    {/* Annotation panel */}
                    <div className="p-5 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline gap-4 mb-4">
                          <span className="font-serif text-5xl md:text-6xl font-medium text-foreground/85 leading-none">
                            {data.year}
                          </span>
                          <div className="flex flex-col gap-1">
                            <span className={`text-[9px] font-mono uppercase tracking-[0.18em] ${cond.color}`}>
                              {cond.label}
                            </span>
                            <span className="text-[8px] font-mono text-muted-foreground/30">
                              Year {i + 1} of {total}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground/65 leading-relaxed mb-3 max-w-sm">
                          {data.note}
                        </p>
                        <p className="text-xs text-muted-foreground/45 leading-relaxed mb-6 max-w-sm">
                          {data.ecological_context}
                        </p>
                      </div>

                      {/* Signal bars */}
                      <div className="space-y-3">
                        {[
                          { label: 'NDVI', value: data.ndvi.mean, displayVal: data.ndvi.mean.toFixed(4), max: 0.20, col: 'bg-primary/55' },
                          { label: 'ET mm/day', value: data.et.mean, displayVal: data.et.mean.toFixed(3), max: 3.0, col: 'bg-ice-blue/55' },
                          { label: 'ESI (0–1)', value: data.esi.mean, displayVal: data.esi.mean.toFixed(4), max: 1.0, col: 'bg-gold/55' },
                        ].map((bar) => (
                          <div key={bar.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] font-mono text-muted-foreground/40">{bar.label}</span>
                              <span className="text-[9px] font-mono text-muted-foreground/55">{bar.displayVal}</span>
                            </div>
                            <div className="h-1 w-full bg-background/30 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${(bar.value / bar.max) * 100}%` } : { width: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                                className={`h-full ${bar.col}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionReveal>

        {/* ── TEMPORAL RAIL ── */}
        <SectionReveal delay={0.2}>
          <div className="mt-4 border border-border/25 bg-card/10 px-5 py-4">
            <div className="flex items-center gap-0 mb-3">
              {timelineData.map((d, i) => (
                <button
                  key={d.year}
                  onClick={() => scrollToFrame(i)}
                  className={`flex-1 py-2 text-center transition-all duration-200 border-r border-border/20 last:border-r-0 ${
                    activeIdx === i ? 'bg-primary/15 border-t border-primary/30' : 'hover:bg-card/30'
                  }`}
                >
                  <span className={`text-[9px] font-mono ${activeIdx === i ? 'text-primary/80' : 'text-muted-foreground/40'}`}>
                    {d.year}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { label: 'NDVI', values: ndviValues, col: 'text-primary' },
                { label: 'ET',   values: etValues,   col: 'text-ice-blue' },
                { label: 'ESI',  values: esiValues,  col: 'text-gold' },
              ].map((trace) => (
                <div key={trace.label} className="flex items-center gap-3">
                  <span className="text-[8px] font-mono text-muted-foreground/35 w-10 shrink-0">{trace.label}</span>
                  <div className="flex-1 text-foreground">
                    <SignalTrace values={trace.values} activeIdx={activeIdx} colorClass={trace.col} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/15">
              <span className="text-[8px] font-mono text-muted-foreground/25 uppercase tracking-[0.12em]">
                ECOSTRESS/AppEEARS · January–June · 2019–2025
              </span>
              <span className="text-[8px] font-mono text-muted-foreground/20">
                Frame {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-6 border border-border/20 bg-card/8 px-6 py-5 text-center">
            <p className="text-xs text-muted-foreground/60 max-w-md mx-auto leading-relaxed mb-2">
              The January–June short-window signal shows inter-annual variability with a directional low in 2021.
              These are short-window signal patterns only — not indicative of long-term change. Requires independent validation.
            </p>
            <span className="text-[9px] font-mono text-gold/45 uppercase tracking-[0.15em]">
              Exploratory Findings · Research Prototype · Not Peer Reviewed
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
