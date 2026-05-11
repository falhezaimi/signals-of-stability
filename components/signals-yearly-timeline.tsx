'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArtisticBackground } from './artistic-background'
import { SectionReveal } from './section-reveal'

type ProductKey = 'esi' | 'et' | 'ndvi' | 'pet' | 'wue'

const products: { key: ProductKey; label: string; name: string; color: string }[] = [
  { key: 'esi',  label: 'ESI',  name: 'Evaporative Stress Index', color: '#B99B45' },
  { key: 'et',   label: 'ET',   name: 'Evapotranspiration',        color: '#557F96' },
  { key: 'ndvi', label: 'NDVI', name: 'Vegetation Greenness',       color: '#3F6F42' },
  { key: 'pet',  label: 'PET',  name: 'Potential ET',               color: '#7A5F8A' },
  { key: 'wue',  label: 'WUE',  name: 'Water Use Efficiency',       color: '#4A8F80' },
]

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025]

// WUE 2024 is a known absence — insufficient satellite coverage
const isAbsent = (product: ProductKey, year: number) => product === 'wue' && year === 2024

function getUrls(product: ProductKey, year: number) {
  if (isAbsent(product, year)) return { webp: null, png: null }
  return {
    webp: `/data/signals/three-d-products/yearly/webp/${product}_${year}_3d_terrain.webp`,
    png:  `/data/signals/three-d-products/yearly/png/${product}_${year}_3d_terrain.png`,
  }
}

export function SignalsYearlyTimeline() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>('esi')
  const [activeYear,    setActiveYear]    = useState(2023)

  const productMeta = products.find((p) => p.key === activeProduct)!
  const urls        = getUrls(activeProduct, activeYear)
  const absent      = isAbsent(activeProduct, activeYear)

  return (
    <section id="yearly-timeline" className="relative overflow-hidden py-20 md:py-32">
      <ArtisticBackground variant="timeline" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-foreground/30" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
                Section III
              </span>
            </div>
            <h2
              className="font-serif font-medium text-foreground leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
            >
              Yearly Signal
              <br />
              <span className="pl-6 md:pl-10">Timeline</span>
            </h2>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-md">
              Seven years of terrain renders grouped by product. Each render uses the June composite for that year. Select a product and a year to explore.
            </p>
          </div>
        </SectionReveal>

        {/* Product selector */}
        <SectionReveal>
          <div className="mb-8">
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">Product</p>
            <div className="flex flex-wrap gap-0 border border-border/20 p-0.5 w-fit">
              {products.map((p) => (
                <button
                  key={p.key}
                  onClick={() => {
                    setActiveProduct(p.key)
                    // If the currently selected year is absent for the new product, reset to 2023
                    if (isAbsent(p.key, activeYear)) setActiveYear(2023)
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-mono tracking-wider transition-all duration-300 ${
                    activeProduct === p.key
                      ? 'bg-card/60 text-foreground'
                      : 'text-muted-foreground/50 hover:text-muted-foreground/80'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Year thumbnail strip */}
        <SectionReveal>
          <div className="mb-8">
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">Year</p>
            <div className="grid grid-cols-7 gap-1.5">
              {years.map((year) => {
                const yearAbsent = isAbsent(activeProduct, year)
                const active = activeYear === year && !yearAbsent
                return (
                  <button
                    key={year}
                    onClick={() => !yearAbsent && setActiveYear(year)}
                    disabled={yearAbsent}
                    className={`border transition-all duration-300 overflow-hidden ${
                      active
                        ? 'border-primary/40 bg-primary/[0.06]'
                        : yearAbsent
                        ? 'border-border/10 opacity-35 cursor-not-allowed'
                        : 'border-border/20 hover:border-border/40 cursor-pointer'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-square relative overflow-hidden bg-foreground/[0.04]">
                      {yearAbsent ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-mono text-muted-foreground/30">—</span>
                        </div>
                      ) : (
                        <picture>
                          <source
                            srcSet={`/data/signals/three-d-products/yearly/webp/${activeProduct}_${year}_3d_terrain.webp`}
                            type="image/webp"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/data/signals/three-d-products/yearly/png/${activeProduct}_${year}_3d_terrain.png`}
                            alt={`${activeProduct.toUpperCase()} ${year}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </picture>
                      )}
                    </div>

                    {/* Year label */}
                    <div className="py-1 px-1 flex items-center justify-between bg-background/20">
                      <span className={`text-[8px] font-mono leading-none ${active ? 'text-foreground/70' : 'text-muted-foreground/35'}`}>
                        {year}
                      </span>
                      {yearAbsent && <span className="text-[7px] font-mono text-muted-foreground/25">N/A</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Main viewer + info */}
        <div className="grid lg:grid-cols-[1fr_250px] gap-8 lg:gap-12">

          <SectionReveal>
            <div>
              <div className="relative overflow-hidden border border-border/20">

                {/* Instrument labels */}
                <div className="absolute top-2 left-3 z-10 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>
                  46.74°N
                </div>
                <div className="absolute top-2 right-3 z-10 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.32 }}>
                  10.05°E
                </div>

                {absent ? (
                  <div className="aspect-[4/3] flex flex-col items-center justify-center gap-3 bg-foreground/[0.04]">
                    <div className="border border-border/15 px-4 py-3 text-center">
                      <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/30 mb-1.5">
                        Data Unavailable
                      </p>
                      <p className="text-[9px] font-mono text-muted-foreground/25 leading-relaxed max-w-[220px]">
                        WUE 2024 satellite coverage was insufficient to produce a reliable June composite.
                      </p>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    key={`${activeProduct}-${activeYear}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                  >
                    <picture>
                      <source srcSet={urls.webp!} type="image/webp" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urls.png!}
                        alt={`${productMeta.name} ${activeYear}`}
                        className="w-full h-auto block"
                      />
                    </picture>
                  </motion.div>
                )}

                {/* CRT scan overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  <defs>
                    <pattern id="yearly-scan" x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
                      <rect y="1" width="1" height="1" fill="black" fillOpacity="0.05" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#yearly-scan)" />
                </svg>

                {/* Bottom gradient bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, oklch(0.05 0.004 160 / 0.85), transparent)' }}
                >
                  <span className="text-[8px] font-mono uppercase tracking-[0.12em]" style={{ color: '#DDD3BE', opacity: 0.45 }}>
                    ECOSTRESS · NASADEM · June
                  </span>
                  <span className="text-[8px] font-mono" style={{ color: '#DDD3BE', opacity: 0.32 }}>
                    {activeProduct.toUpperCase()} · {activeYear} · Daytime
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Info panel */}
          <SectionReveal direction="left" delay={0.1}>
            <div className="space-y-4">

              {/* Current selection */}
              <div className="border border-border/20 bg-card/10 p-4">
                <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-4">
                  Selection
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground/35 mb-0.5">Product</p>
                    <p className="font-mono text-lg text-foreground/80 leading-none" style={{ color: productMeta.color }}>
                      {productMeta.label}
                    </p>
                    <p className="text-[9px] font-mono text-muted-foreground/40 mt-0.5">{productMeta.name}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground/35 mb-0.5">Year</p>
                    <p className="font-serif text-2xl text-foreground/80">{absent ? '—' : activeYear}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground/35 mb-0.5">Season</p>
                    <p className="text-[9px] font-mono text-foreground/50">June · daytime composite</p>
                  </div>
                </div>
              </div>

              {/* Year availability */}
              <div className="border border-border/20 bg-card/10 p-4">
                <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-3">
                  Availability
                </p>
                <div className="space-y-1.5">
                  {years.map((y) => {
                    const yearAbsent = isAbsent(activeProduct, y)
                    const isActive   = activeYear === y && !yearAbsent
                    return (
                      <div key={y} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${yearAbsent ? 'bg-destructive/40' : 'bg-primary/50'}`} />
                        <span className={`text-[9px] font-mono ${isActive ? 'text-foreground/70' : 'text-muted-foreground/35'}`}>
                          {y}
                        </span>
                        {yearAbsent && <span className="text-[8px] font-mono text-muted-foreground/25 ml-auto">No data</span>}
                        {isActive    && <span className="text-[8px] font-mono ml-auto" style={{ color: productMeta.color, opacity: 0.6 }}>Active</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Render params note */}
              <p className="text-[9px] font-mono text-muted-foreground/30 leading-relaxed">
                Vert. exag.: 3.0× · Camera: elev. 38°, azim. 225° · DEM: NASADEM 30 m → 70 m
              </p>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}
