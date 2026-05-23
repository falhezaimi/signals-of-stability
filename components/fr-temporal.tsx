'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from './section-reveal'
import interpretationRaw from '@/public/data/signals/interpretation-summary.json'

type ProductKey = 'esi' | 'et' | 'ndvi' | 'pet' | 'wue'
const PRODUCTS: { id: ProductKey; label: string; color: string }[] = [
  { id: 'esi',  label: 'ESI',  color: '#B8563C' },
  { id: 'et',   label: 'ET',   color: '#2F7F78' },
  { id: 'ndvi', label: 'NDVI', color: '#3F6F42' },
  { id: 'pet',  label: 'PET',  color: '#C9A34A' },
  { id: 'wue',  label: 'WUE',  color: '#557F96' },
]
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025]

function isAbsent(product: ProductKey, year: number) {
  return product === 'wue' && year === 2024
}

function yearlyUrl(product: ProductKey, year: number, ext: 'webp' | 'png') {
  return `/data/signals/three-d-products/yearly/${ext}/${product}_${year}_3d_terrain.${ext}`
}

const yearlyData = interpretationRaw.yearly

export function FrTemporal() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>('esi')
  const [activeYear, setActiveYear] = useState(2023)

  const absent = isAbsent(activeProduct, activeYear)
  const prod = PRODUCTS.find(p => p.id === activeProduct)!

  // Find yearly observation count for active product/year
  const yearRow = yearlyData.find(d => d.year === activeYear)
  const obsCount = yearRow
    ? activeProduct === 'esi'  ? yearRow.esi_observation_count
    : activeProduct === 'et'   ? yearRow.et_observation_count
    : activeProduct === 'ndvi' ? yearRow.ndvi_observation_count
    : null
    : null
  const lowConf = yearRow?.low_confidence && (activeProduct === 'esi' || activeProduct === 'et')

  return (
    <section id="temporal" className="relative py-20 md:py-28 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/20">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
              Section 4 · Temporal Evidence
            </span>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/25 bg-card/15 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70">
                Does the signal persist through time?
              </span>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground/60 leading-relaxed">
              The multi-year composite gives the stable average picture behind the homepage finding.
              Yearly outputs reveal how that signal breathes from season to season — exposing variability,
              possible transition zones, and years where coverage was too sparse to draw strong conclusions.
              These views do not prove long-term ecological change. They are directional only.
            </p>
          </div>
        </SectionReveal>

        {/* Product selector */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] border transition-all duration-300 ${
                activeProduct === p.id
                  ? 'text-foreground bg-card/30'
                  : 'border-border/20 text-muted-foreground/50 hover:border-border/40 hover:text-muted-foreground/70'
              }`}
              style={{ ...(activeProduct === p.id ? { borderColor: `${p.color}55`, color: p.color } : {}) }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-6">

          {/* Main viewer */}
          <div>
            {/* Year strip */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {YEARS.map(yr => {
                const abs = isAbsent(activeProduct, yr)
                return (
                  <button
                    key={yr}
                    onClick={() => setActiveYear(yr)}
                    className={`relative border transition-all duration-300 overflow-hidden ${
                      activeYear === yr
                        ? 'border-[2px]'
                        : abs
                        ? 'border-border/10 opacity-30 cursor-not-allowed'
                        : 'border-border/20 hover:border-border/40 opacity-60 hover:opacity-80'
                    }`}
                    style={{ ...(activeYear === yr ? { borderColor: prod.color } : {}) }}
                    disabled={abs}
                    title={abs ? 'Data unavailable' : `${activeProduct.toUpperCase()} ${yr}`}
                  >
                    <div className="aspect-square bg-[oklch(0.075_0.012_222)]">
                      {abs ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[6px] font-mono text-muted-foreground/30">N/A</span>
                        </div>
                      ) : (
                        <picture>
                          <source srcSet={yearlyUrl(activeProduct, yr, 'webp')} type="image/webp" />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={yearlyUrl(activeProduct, yr, 'png')}
                            alt={`${activeProduct} ${yr}`}
                            className="w-full h-full object-contain"
                          />
                        </picture>
                      )}
                    </div>
                    <p className="text-[7px] font-mono text-center py-0.5 text-muted-foreground/40">{yr}</p>
                  </button>
                )
              })}
            </div>

            {/* Main image */}
            <motion.div
              key={`${activeProduct}-${activeYear}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="border border-border/25 bg-card/8"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: prod.color }} />
                  <span className="text-[10px] font-mono uppercase" style={{ color: prod.color }}>
                    {prod.label} · {activeYear}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {lowConf && (
                    <span className="text-[8px] font-mono uppercase tracking-[0.10em] px-1.5 py-0.5 border border-[#A6523A]/40 text-[#A6523A]/80">
                      LOW CONF
                    </span>
                  )}
                  {obsCount !== null && obsCount !== undefined && (
                    <span className="text-[8px] font-mono text-muted-foreground/30">
                      {obsCount} overpasses
                    </span>
                  )}
                  <span className="text-[8px] font-mono text-muted-foreground/25 uppercase tracking-[0.10em]">
                    3D TERRAIN
                  </span>
                </div>
              </div>

              <div className="relative" style={{ background: 'oklch(0.075 0.012 222)', aspectRatio: '4/3' }}>
                {absent ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-px bg-border/30" />
                    <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.12em]">Data Unavailable</p>
                    <p className="text-[9px] font-mono text-muted-foreground/25 text-center max-w-[200px] leading-relaxed">
                      WUE 2024 — insufficient June satellite coverage for a reliable composite
                    </p>
                    <div className="w-8 h-px bg-border/30" />
                  </div>
                ) : (
                  <>
                    {/* Scan lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden>
                      <defs>
                        <pattern id="temp-scan" x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
                          <rect y="1" width="1" height="1" fill="black" fillOpacity="0.06" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#temp-scan)" />
                    </svg>
                    <picture>
                      <source srcSet={yearlyUrl(activeProduct, activeYear, 'webp')} type="image/webp" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={yearlyUrl(activeProduct, activeYear, 'png')}
                        alt={`${prod.label} ${activeYear} terrain`}
                        className="w-full h-full object-contain"
                        style={{ imageRendering: 'auto' }}
                      />
                    </picture>
                    <div
                      className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 py-2.5 z-20 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, oklch(0.055 0.010 222 / 0.85), transparent)' }}
                    >
                      <span className="text-[8px] font-mono uppercase tracking-[0.12em]" style={{ color: '#DDD3BE', opacity: 0.50 }}>
                        {prod.label} · June {activeYear} · SNP
                      </span>
                      <span className="text-[7px] font-mono" style={{ color: '#DDD3BE', opacity: 0.28 }}>
                        NASADEM 3× exag
                      </span>
                    </div>
                  </>
                )}
              </div>

              {yearRow && (
                <div className="px-4 py-3 border-t border-border/10">
                  <p className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed italic">
                    {yearRow.website_note}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: year context panel */}
          <div className="space-y-4">
            <div className="border border-border/25 bg-card/10 p-4">
              <p className="text-[9px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em] mb-3">
                Year Context · {activeYear}
              </p>
              {yearRow ? (
                <div className="space-y-2.5">
                  {[
                    { label: 'NDVI Mean',  value: yearRow.ndvi_mean.toFixed(4),  color: '#3F6F42' },
                    { label: 'ET Mean',    value: `${yearRow.et_mean.toFixed(3)} mm/d`,  color: '#2F7F78' },
                    { label: 'ESI Mean',   value: yearRow.esi_mean.toFixed(4),   color: '#B8563C' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[9px] font-mono text-muted-foreground/35">{row.label}</span>
                        <span className="text-[9px] font-mono text-foreground/60">{row.value}</span>
                      </div>
                      <div className="h-px bg-border/20" />
                    </div>
                  ))}
                  {yearRow.low_confidence && (
                    <div className="mt-2 border border-[#A6523A]/25 bg-[#A6523A]/5 px-2.5 py-2">
                      <p className="text-[8px] font-mono text-[#A6523A]/70 leading-relaxed">
                        Low-confidence year: {yearRow.low_confidence_reasons.join('; ')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[9px] font-mono text-muted-foreground/30">No summary data.</p>
              )}
            </div>

            {/* Year availability dots */}
            <div className="border border-border/25 bg-card/10 p-4">
              <p className="text-[9px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em] mb-3">
                Availability · {prod.label}
              </p>
              <div className="space-y-1.5">
                {YEARS.map(yr => {
                  const abs = isAbsent(activeProduct, yr)
                  const row = yearlyData.find(d => d.year === yr)
                  const lc = row?.low_confidence && (activeProduct === 'esi' || activeProduct === 'et')
                  return (
                    <div key={yr} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${abs ? 'bg-muted-foreground/15' : lc ? 'bg-[#A6523A]/60' : 'bg-primary/50'}`}
                        />
                        <span className="text-[9px] font-mono text-muted-foreground/50">{yr}</span>
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/30">
                        {abs ? '—' : lc ? 'LOW CONF' : 'OK'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Short-window note */}
            <div className="border border-border/20 bg-card/8 px-3 py-3">
              <p className="text-[9px] font-mono text-muted-foreground/35 leading-relaxed">
                Short-window directional signal only. Do not interpret as long-term ecological change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
