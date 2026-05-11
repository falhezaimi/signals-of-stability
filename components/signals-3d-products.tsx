'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArtisticBackground } from './artistic-background'
import { SectionReveal } from './section-reveal'

const products = [
  {
    product: 'esi',
    label:   'ESI',
    name:    'Evaporative Stress Index',
    title:   'Evaporative Stress Index over Alpine Terrain',
    role:    'Stress indicator',
    units:   'index (0–1)',
    p2:      0.6503,
    p98:     0.9046,
    color:   '#B99B45',
    webpUrl: '/data/signals/three-d-products/webp/esi_3d_terrain.webp',
    pngUrl:  '/data/signals/three-d-products/png/esi_3d_terrain.png',
    caption: 'Multi-year June composite of the Evaporative Stress Index (ESI) draped over NASADEM 30 m terrain. ESI values near 1 suggest relatively unstressed evapotranspiration; lower values indicate surface moisture limitation relative to potential. Color ramp runs from terracotta (lower ESI) through stone beige (neutral) to alpine green (higher ESI). Terrain is vertically exaggerated for visual clarity. Exploratory proxy — terrain context is interpretive, not confirmatory.',
    note: null,
  },
  {
    product: 'et',
    label:   'ET',
    name:    'Evapotranspiration',
    title:   'Evapotranspiration over Alpine Terrain',
    role:    'Vegetation water flux',
    units:   'mm day⁻¹ (proxy)',
    p2:      1.501,
    p98:     3.2307,
    color:   '#557F96',
    webpUrl: '/data/signals/three-d-products/webp/et_3d_terrain.webp',
    pngUrl:  '/data/signals/three-d-products/png/et_3d_terrain.png',
    caption: 'Multi-year June composite of ECOSTRESS-derived evapotranspiration (ET) draped over NASADEM terrain. Higher ET values (teal) indicate greater vegetation water flux; lower values (stone gray) suggest sparser or less active vegetation. Terrain context highlights how ET varies with elevation and slope aspect. Units are approximate; treat as a relative spatial proxy.',
    note: null,
  },
  {
    product: 'ndvi',
    label:   'NDVI',
    name:    'Vegetation Greenness',
    title:   'Vegetation Greenness over Alpine Terrain',
    role:    'Vegetation greenness',
    units:   'index (−1 to 1)',
    p2:      0.0663,
    p98:     0.341,
    color:   '#3F6F42',
    webpUrl: '/data/signals/three-d-products/webp/ndvi_3d_terrain.webp',
    pngUrl:  '/data/signals/three-d-products/png/ndvi_3d_terrain.png',
    caption: 'Multi-year June composite of NDVI draped over NASADEM terrain. Higher NDVI values (alpine green) indicate denser, more photosynthetically active vegetation. Lower values (warm tan) correspond to sparse vegetation, rock, or snow. NDVI in this alpine context is typically moderate (0.1–0.4) even in vegetated areas due to short growing seasons and altitude.',
    note: null,
  },
  {
    product: 'pet',
    label:   'PET',
    name:    'Potential Evapotranspiration',
    title:   'Potential Evapotranspiration over Alpine Terrain',
    role:    'Atmospheric demand',
    units:   'W m⁻²',
    p2:      157.2326,
    p98:     297.1372,
    color:   '#7A5F8A',
    webpUrl: '/data/signals/three-d-products/webp/pet_3d_terrain.webp',
    pngUrl:  '/data/signals/three-d-products/png/pet_3d_terrain.png',
    caption: 'Multi-year June composite of potential evapotranspiration (PET) over NASADEM terrain. PET represents the atmospheric demand for water — higher values (warm gold) indicate greater atmospheric evaporative demand. The spatial pattern reflects both solar geometry (aspect-driven) and elevation (temperature-driven). Color ramp runs from cool slate blue (lower demand) to muted burnt sienna (higher demand).',
    note: null,
  },
  {
    product: 'wue',
    label:   'WUE',
    name:    'Water Use Efficiency',
    title:   'Water Use Efficiency over Alpine Terrain',
    role:    'Efficiency proxy',
    units:   'proxy index',
    p2:      0.0949,
    p98:     3.9759,
    color:   '#4A8F80',
    webpUrl: '/data/signals/three-d-products/webp/wue_3d_terrain.webp',
    pngUrl:  '/data/signals/three-d-products/png/wue_3d_terrain.png',
    caption: 'Multi-year June composite of water use efficiency (WUE) draped over NASADEM terrain. WUE is computed as the ratio of carbon uptake to water loss — a proxy for vegetation efficiency. Higher values (deep teal) suggest more carbon gained per unit water lost; lower values (burnt orange) indicate lower efficiency. Treat as a relative spatial proxy; absolute values are model-dependent.',
    note: '2024 data unavailable — WUE mean uses 6 of 7 available June seasons (2019–2023, 2025)',
  },
]

export function SignalsTerrain() {
  const [active, setActive] = useState(products[0])

  return (
    <section id="terrain-products" className="relative overflow-hidden py-20 md:py-32">
      <ArtisticBackground variant="rasterband" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-foreground/30" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
                Section II
              </span>
            </div>
            <h2
              className="font-serif font-medium text-foreground leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
            >
              3D Product Terrain
            </h2>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-md">
              ECOSTRESS signals draped over NASADEM 30 m terrain. Multi-year June composites, vertically exaggerated 3× for visual clarity.
            </p>
          </div>
        </SectionReveal>

        {/* Product selector */}
        <SectionReveal>
          <div className="flex flex-wrap gap-0 mb-8 border border-border/20 p-0.5 w-fit">
            {products.map((p) => (
              <button
                key={p.product}
                onClick={() => setActive(p)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-mono tracking-wider transition-all duration-300 ${
                  active.product === p.product
                    ? 'bg-card/60 text-foreground'
                    : 'text-muted-foreground/50 hover:text-muted-foreground/80'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                {p.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">

          {/* Left: image */}
          <SectionReveal>
            <div>
              <div className="relative overflow-hidden border border-border/20">

                {/* Instrument overlays */}
                <div className="absolute top-2 left-3 z-10 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>
                  46.74°N
                </div>
                <div className="absolute top-2 right-3 z-10 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.32 }}>
                  10.05°E
                </div>

                <motion.div
                  key={active.product}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <picture>
                    <source srcSet={active.webpUrl} type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={active.pngUrl}
                      alt={active.title}
                      className="w-full h-auto block"
                    />
                  </picture>
                </motion.div>

                {/* CRT scan-line texture */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  <defs>
                    <pattern id="terrain-scan" x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
                      <rect y="1" width="1" height="1" fill="black" fillOpacity="0.06" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#terrain-scan)" />
                </svg>

                {/* Bottom gradient bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, oklch(0.05 0.004 160 / 0.85), transparent)' }}
                >
                  <span className="text-[8px] font-mono uppercase tracking-[0.12em]" style={{ color: '#DDD3BE', opacity: 0.45 }}>
                    ECOSTRESS · NASADEM · June composite
                  </span>
                  <span className="text-[8px] font-mono" style={{ color: '#DDD3BE', opacity: 0.32 }}>
                    {active.label} · 2019–2025 mean
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-5 border-l-2 border-primary/20 pl-4">
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{active.caption}</p>
                {active.note && (
                  <p className="text-[9px] font-mono mt-2 italic" style={{ color: '#A6523A', opacity: 0.75 }}>
                    ⚠ {active.note}
                  </p>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Right: metadata */}
          <SectionReveal direction="left" delay={0.1}>
            <div className="space-y-5">

              {/* Product identity */}
              <div className="border border-border/20 bg-card/10 p-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">
                  Product Details
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Signal', value: active.label, color: active.color },
                    { label: 'Role',   value: active.role,  color: undefined },
                    { label: 'Units',  value: active.units, color: undefined },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-muted-foreground/35 mb-0.5">{stat.label}</p>
                      <p
                        className="text-[10px] font-mono text-foreground/70"
                        style={stat.color ? { color: stat.color } : undefined}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* p2–p98 range */}
              <div className="border border-border/20 bg-card/10 p-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">
                  Value Range (p2–p98)
                </p>
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground/35">p2</p>
                    <p className="text-sm font-mono text-foreground/70">{active.p2.toFixed(3)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-mono text-muted-foreground/35">p98</p>
                    <p className="text-sm font-mono text-foreground/70">{active.p98.toFixed(3)}</p>
                  </div>
                </div>
                <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${active.color}22, ${active.color}99)` }} />
              </div>

              {/* Render parameters */}
              <div className="border border-border/20 bg-card/10 p-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">
                  Render Parameters
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Camera Elev.',  value: '38°' },
                    { label: 'Camera Azim.',  value: '225°' },
                    { label: 'Vert. Exag.',   value: '3.0×' },
                    { label: 'DEM Source',    value: 'NASADEM 30 m' },
                    { label: 'Raster Shape',  value: '313 × 303 px' },
                    { label: 'Season',        value: 'June composite' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline justify-between gap-4">
                      <span className="text-[8px] font-mono text-muted-foreground/35">{stat.label}</span>
                      <span className="text-[9px] font-mono text-foreground/55">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* All products thumbnail strip */}
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">
                  All Products
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {products.map((p) => (
                    <button
                      key={p.product}
                      onClick={() => setActive(p)}
                      style={{ aspectRatio: '1' }}
                      className={`relative overflow-hidden border transition-all duration-300 ${
                        active.product === p.product
                          ? 'border-primary/40'
                          : 'border-border/15 hover:border-border/30'
                      }`}
                    >
                      <picture>
                        <source srcSet={p.webpUrl} type="image/webp" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.pngUrl} alt={p.label} className="w-full h-full object-cover" loading="lazy" />
                      </picture>
                      <div
                        className="absolute bottom-0 left-0 right-0 py-0.5 text-center"
                        style={{ background: 'oklch(0.05 0.004 160 / 0.75)' }}
                      >
                        <span className="text-[7px] font-mono" style={{ color: '#DDD3BE', opacity: 0.8 }}>
                          {p.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}
