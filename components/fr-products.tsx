'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArtisticBackground } from './artistic-background'
import { SectionReveal } from './section-reveal'

type Product = {
  id: string
  label: string
  title: string
  subtitle: string
  role: string
  units: string
  range: string
  color: string
  webp: string
  png: string
  caption: string
  interpretation: string
  note?: string
}

const products: Product[] = [
  {
    id: 'esi',
    label: 'ESI',
    title: 'Evaporative Stress Index',
    subtitle: 'Moisture stress relative to potential',
    role: 'Stress indicator',
    units: 'Index (0–1)',
    range: '0.650 – 0.905',
    color: '#B8563C',
    webp: '/data/signals/three-d-products/webp/esi_3d_terrain.webp',
    png:  '/data/signals/three-d-products/png/esi_3d_terrain.png',
    caption: 'Multi-year June composite ESI draped over NASADEM terrain. ESI values near 1 suggest relatively unstressed evapotranspiration; lower values indicate surface moisture limitation. Color ramp: terracotta (lower ESI) → stone beige (neutral) → alpine green (higher).',
    interpretation: 'ESI helps explain where stress watch zones appear. Areas of lower ESI tend to align with terrain features — exposed ridges, south-facing slopes — that limit soil moisture relative to atmospheric demand.',
  },
  {
    id: 'et',
    label: 'ET',
    title: 'Evapotranspiration',
    subtitle: 'Vegetation water flux',
    role: 'Water flux',
    units: 'mm day⁻¹ (proxy)',
    range: '1.501 – 3.231',
    color: '#2F7F78',
    webp: '/data/signals/three-d-products/webp/et_3d_terrain.webp',
    png:  '/data/signals/three-d-products/png/et_3d_terrain.png',
    caption: 'Multi-year June composite ET draped over NASADEM terrain. Higher ET (teal) indicates greater vegetation water flux; lower values (stone gray) suggest sparser or less active vegetation. Terrain context highlights how ET varies with elevation and slope aspect.',
    interpretation: 'ET variation across terrain reveals where vegetation is most active. High ET areas often correspond to sheltered valleys with mature canopy cover — locations that may overlap with stable core zones.',
  },
  {
    id: 'pet',
    label: 'PET',
    title: 'Potential Evapotranspiration',
    subtitle: 'Atmospheric evaporative demand',
    role: 'Atmospheric demand',
    units: 'W m⁻²',
    range: '157.2 – 297.1',
    color: '#C9A34A',
    webp: '/data/signals/three-d-products/webp/pet_3d_terrain.webp',
    png:  '/data/signals/three-d-products/png/pet_3d_terrain.png',
    caption: 'Multi-year June composite PET over NASADEM terrain. PET represents atmospheric demand for water — higher values (warm gold) indicate greater evaporative pressure. Spatial pattern reflects solar geometry (aspect-driven) and elevation (temperature-driven).',
    interpretation: 'PET spatial structure explains why demand-efficiency watch zones emerge. High PET areas face greater atmospheric pressure on vegetation water use — the engine behind the demand-efficiency watch pattern.',
  },
  {
    id: 'ndvi',
    label: 'NDVI',
    title: 'Normalized Difference Vegetation Index',
    subtitle: 'Vegetation greenness signal',
    role: 'Vegetation greenness',
    units: 'Index (−1 to 1)',
    range: '0.066 – 0.341',
    color: '#3F6F42',
    webp: '/data/signals/three-d-products/webp/ndvi_3d_terrain.webp',
    png:  '/data/signals/three-d-products/png/ndvi_3d_terrain.png',
    caption: 'Multi-year June composite NDVI draped over NASADEM terrain. Higher values (alpine green) indicate denser, more photosynthetically active vegetation. Lower values (warm tan) correspond to sparse vegetation, rock, or snow. NDVI is typically moderate (0.1–0.4) in alpine contexts.',
    interpretation: 'NDVI terrain structure reveals where vegetation is densest. Note that apparent greenness does not guarantee stability — some greening areas also coincide with declining water-use efficiency or stress signals.',
  },
  {
    id: 'wue',
    label: 'WUE',
    title: 'Water Use Efficiency',
    subtitle: 'Carbon gain per unit water lost',
    role: 'Efficiency proxy',
    units: 'Proxy index',
    range: '0.095 – 3.976',
    color: '#557F96',
    webp: '/data/signals/three-d-products/webp/wue_3d_terrain.webp',
    png:  '/data/signals/three-d-products/png/wue_3d_terrain.png',
    caption: 'Multi-year June composite WUE draped over NASADEM terrain. Higher values (deep teal) suggest more carbon gained per unit water lost; lower values (burnt orange) indicate lower efficiency. Treat as a relative spatial proxy. Note: 2024 not available; composite uses 6 of 7 seasons.',
    interpretation: 'WUE spatial patterns help explain demand-efficiency watch zones. Areas showing declining WUE alongside rising ET may be vegetation communities becoming less efficient under growing atmospheric pressure — a watch signal.',
    note: 'WUE 2024 data not available. Composite uses 6 of 7 June seasons (2019–2023, 2025).',
  },
]

export function FrProducts() {
  const [active, setActive] = useState(0)
  const p = products[active]

  return (
    <section id="products" className="relative py-20 md:py-28 overflow-hidden">
      <ArtisticBackground variant="rasterband" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/20">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
              Section 3 · Product Evidence
            </span>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/25 bg-card/15 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-blue/60" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70">
                What environmental signals explain the pattern?
              </span>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground/60 leading-relaxed">
              Each ECOSTRESS product captures a different ecological lens. Together, ET, PET, ESI, NDVI, and WUE help explain why one part of the park appears stable while another becomes a watch zone.
            </p>
          </div>
        </SectionReveal>

        {/* Product selector tabs */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {products.map((prod, i) => (
            <button
              key={prod.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] border transition-all duration-300 ${
                active === i
                  ? 'border-[currentColor] text-foreground bg-card/30'
                  : 'border-border/20 text-muted-foreground/50 hover:border-border/40 hover:text-muted-foreground/70'
              }`}
              style={{ ...(active === i ? { borderColor: `${prod.color}55`, color: prod.color } : {}) }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: prod.color }} />
              {prod.label}
            </button>
          ))}
        </div>

        {/* Product viewer */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">

          {/* Image panel */}
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border border-border/25 bg-card/8"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: p.color }} />
                <span className="text-[10px] font-mono text-foreground/70 uppercase">{p.label}</span>
                <span className="w-px h-3 bg-border/30" />
                <span className="text-[9px] font-mono text-muted-foreground/40">{p.role}</span>
              </div>
              <span className="text-[7px] font-mono text-muted-foreground/25 uppercase tracking-[0.10em]">NASADEM 3× VERT EXAG</span>
            </div>

            {/* 3D terrain image */}
            <div className="relative" style={{ background: 'oklch(0.07 0.005 160)', aspectRatio: '4/3' }}>
              {/* Scan-line pattern */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden>
                <defs>
                  <pattern id={`prod-scan-${p.id}`} x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
                    <rect y="1" width="1" height="1" fill="black" fillOpacity="0.06" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#prod-scan-${p.id})`} />
              </svg>

              <picture>
                <source srcSet={p.webp} type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.png}
                  alt={p.title}
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              </picture>

              {/* Bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 py-2.5 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, oklch(0.05 0.004 160 / 0.85), transparent)' }}
              >
                <span className="text-[8px] font-mono uppercase tracking-[0.12em]" style={{ color: '#DDD3BE', opacity: 0.50 }}>
                  {p.label} · Multi-year June · SNP
                </span>
                <span className="text-[8px] font-mono" style={{ color: '#DDD3BE', opacity: 0.35 }}>
                  {p.range} {p.units}
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="px-4 py-3 border-t border-border/10">
              <p className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed italic">
                {p.caption}
              </p>
            </div>
          </motion.div>

          {/* Detail panel */}
          <div className="space-y-4">
            <motion.div
              key={`detail-${p.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="border border-border/25 bg-card/10 p-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.15em] mb-1" style={{ color: `${p.color}99` }}>
                  {p.label} · {p.role}
                </p>
                <h3 className="text-base font-serif font-medium text-foreground/85 mb-1">{p.title}</h3>
                <p className="text-[11px] text-muted-foreground/55 mb-4 leading-relaxed">{p.subtitle}</p>

                {/* Metadata grid */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: 'Units',    value: p.units },
                    { label: 'Range',    value: p.range },
                    { label: 'Source',   value: 'ECOSTRESS/AppEEARS' },
                    { label: 'Window',   value: 'June · 2019–2025' },
                    { label: 'CRS',      value: 'EPSG:32632' },
                    { label: 'Terrain',  value: 'NASADEM 30 m → 70 m' },
                  ].map(row => (
                    <div key={row.label} className="flex items-baseline justify-between gap-2">
                      <span className="text-[9px] font-mono text-muted-foreground/35 shrink-0">{row.label}</span>
                      <span className="text-[9px] font-mono text-foreground/60 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Value range bar */}
                <div className="mb-4">
                  <div className="h-1.5 w-full rounded-sm" style={{ background: `linear-gradient(to right, ${p.color}22, ${p.color})` }} />
                  <div className="flex justify-between mt-1 text-[7px] font-mono text-muted-foreground/30">
                    <span>p2 low</span>
                    <span>p98 high</span>
                  </div>
                </div>

                {/* Interpretation */}
                <div className="border-t border-border/15 pt-3">
                  <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em] mb-1.5">
                    Why it matters
                  </p>
                  <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
                    {p.interpretation}
                  </p>
                </div>

                {/* Note (WUE only) */}
                {p.note && (
                  <div className="mt-3 px-3 py-2 border border-[#C9A34A]/20 bg-[#C9A34A]/5">
                    <p className="text-[9px] font-mono text-[#C9A34A]/60 leading-relaxed">⚠ {p.note}</p>
                  </div>
                )}
              </div>

              {/* Product thumbnail strip */}
              <div className="flex gap-1.5 mt-3">
                {products.map((prod, i) => (
                  <button
                    key={prod.id}
                    onClick={() => setActive(i)}
                    className={`flex-1 border transition-all duration-300 overflow-hidden ${
                      active === i ? 'border-[2px]' : 'border-border/20 opacity-50 hover:opacity-75'
                    }`}
                    style={{ ...(active === i ? { borderColor: prod.color } : {}) }}
                  >
                    <div className="relative aspect-square bg-[oklch(0.07_0.005_160)]">
                      <picture>
                        <source srcSet={prod.webp} type="image/webp" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.png}
                          alt={prod.label}
                          className="w-full h-full object-contain"
                        />
                      </picture>
                    </div>
                    <p className="text-[7px] font-mono text-center py-0.5" style={{ color: `${prod.color}88` }}>
                      {prod.label}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
