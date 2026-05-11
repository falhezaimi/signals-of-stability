'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from './section-reveal'

const maps = [
  {
    id: 'map_01',
    fig: 'Fig. M.1',
    title: 'Ecological Signal Mosaic',
    subtitle: 'Dominant Daytime Class',
    tag: 'Classification',
    tagColor: '#6F8F5B',
    webpUrl: '/data/signals/nasa_quality_maps/webp/map_01_dominant_daytime.webp',
    pngUrl:  '/data/signals/nasa_quality_maps/png/map_01_dominant_daytime.png',
    overlayUrl: '/data/signals/nasa_quality_maps/overlays/dominant_daytime_overlay_transparent.png',
    hasOverlay: true,
    caption: 'Dominant daytime ECOSTRESS signal classes reveal terrain-structured spatial organization across the Swiss National Park. Each pixel represents the dominant ecological signal class derived from multi-year June composites of NDVI, ET, ESI, PET, and WUE. Hillshade base from NASADEM 30 m DEM, resampled to ECOSTRESS 70 m grid. Classes are mutually exclusive; nodata pixels are transparent.',
  },
  {
    id: 'map_02',
    fig: 'Fig. M.2',
    title: 'Demand-Efficiency Watch',
    subtitle: 'Zones of Atmospheric Stress',
    tag: 'Watch Zone',
    tagColor: '#C9A34A',
    webpUrl: '/data/signals/nasa_quality_maps/webp/map_02_demand_efficiency_watch.webp',
    pngUrl:  '/data/signals/nasa_quality_maps/png/map_02_demand_efficiency_watch.png',
    overlayUrl: '/data/signals/nasa_quality_maps/overlays/demand_efficiency_watch_overlay_transparent.png',
    hasOverlay: true,
    caption: 'Localized areas where atmospheric demand and vegetation efficiency signals require closer monitoring. These pixels show positive NDVI and ET trends alongside negative WUE trends, suggesting vegetation activating under increasing atmospheric demand with declining water-use efficiency. All other valid pixels are dimmed for visual clarity.',
  },
  {
    id: 'map_03',
    fig: 'Fig. M.3',
    title: 'ESI Watch Zone',
    subtitle: 'Evaporative Stress Sensitivity',
    tag: 'ESI Watch',
    tagColor: '#A6523A',
    webpUrl: '/data/signals/nasa_quality_maps/webp/map_03_esi_watch_zone.webp',
    pngUrl:  '/data/signals/nasa_quality_maps/png/map_03_esi_watch_zone.png',
    overlayUrl: '/data/signals/nasa_quality_maps/overlays/esi_watch_overlay_transparent.png',
    hasOverlay: true,
    caption: 'Areas where evaporative stress signals suggest possible terrain-linked sensitivity. ESI watch pixels show positive NDVI and ET slopes alongside a negative ESI slope — a pattern that may indicate localized surface moisture limitation despite apparent vegetation greening.',
  },
  {
    id: 'map_04',
    fig: 'Fig. M.4',
    title: 'Stable Ecological Core',
    subtitle: 'Low-Variability Signal Zones',
    tag: 'Stable Core',
    tagColor: '#5A7FA3',
    webpUrl: '/data/signals/nasa_quality_maps/webp/map_04_stable_core.webp',
    pngUrl:  '/data/signals/nasa_quality_maps/png/map_04_stable_core.png',
    overlayUrl: '/data/signals/nasa_quality_maps/overlays/stable_core_overlay_transparent.png',
    hasOverlay: true,
    caption: 'Small but important areas showing consistent low-stress ecological signal behavior across multiple years. These pixels display low interannual variability in NDVI, ET, and ESI — a signal associated with stable, mature vegetation communities likely anchored in favorable topographic positions.',
  },
  {
    id: 'map_05',
    fig: 'Fig. M.5',
    title: 'Time-Bin Validation',
    subtitle: 'Signal Robustness Across Temporal Filters',
    tag: 'Validation',
    tagColor: '#728F8F',
    webpUrl: '/data/signals/nasa_quality_maps/webp/map_05_timebin_comparison.webp',
    pngUrl:  '/data/signals/nasa_quality_maps/png/map_05_timebin_comparison.png',
    overlayUrl: null,
    hasOverlay: false,
    caption: 'Class structure remains interpretable across temporal filtering choices. Four panels show the dominant ecological class from progressively broader time-bin selections: midday only, daytime, daytime + evening, and all available acquisition times. Core spatial patterns persist across bins, supporting the robustness of the classification framework.',
  },
  {
    id: 'map_06',
    fig: 'Fig. M.6',
    title: 'Terrain Context',
    subtitle: 'Ecological Classes Over Elevation',
    tag: 'Terrain',
    tagColor: '#8F7F6B',
    webpUrl: '/data/signals/nasa_quality_maps/webp/map_06_terrain_context.webp',
    pngUrl:  '/data/signals/nasa_quality_maps/png/map_06_terrain_context.png',
    overlayUrl: null,
    hasOverlay: false,
    caption: 'Class structure is interpreted against elevation and topographic gradients. Left panel: dominant daytime class over hillshade. Right panel: terrain field (elevation or slope) over the same hillshade base. Visual alignment between class boundaries and topographic zones supports a terrain-structured interpretation of the signal mosaic.',
  },
]

export function SignalsMapAtlas() {
  const [activeMap, setActiveMap]     = useState(maps[0])
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <section id="map-atlas" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-32">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-start justify-between mb-14 md:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-foreground/30" />
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
                  Section I
                </span>
              </div>
              <h2
                className="font-serif font-medium text-foreground leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                Map Atlas
              </h2>
              <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-md">
                Six ecological signal maps derived from multi-year June composites. Hillshade base: NASADEM 30 m DEM resampled to 70 m.
              </p>
            </div>
            <div className="hidden md:block text-right shrink-0 ml-8">
              <div className="space-y-1.5 text-[9px] font-mono text-muted-foreground/30">
                <div>Phase 6 · NASA-Quality</div>
                <div>CRS: EPSG:32632</div>
                <div>Pixel: 70 m · 313 × 303</div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Main split */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">

          {/* Left: Featured map viewer */}
          <SectionReveal>
            <div>
              {/* Map frame */}
              <div className="relative overflow-hidden border border-border/40 bg-foreground/[0.025]">

                {/* Coordinate labels */}
                <div className="absolute top-2 left-3 z-10 text-[8px] font-mono text-foreground/30 pointer-events-none">46.74°N</div>
                <div className="absolute bottom-10 left-3 z-10 text-[8px] font-mono text-foreground/30 pointer-events-none">46.59°N</div>
                <div className="absolute top-2 right-12 z-10 text-[8px] font-mono text-foreground/30 pointer-events-none">10.05°E</div>
                <div className="absolute bottom-10 right-3 z-10 text-[8px] font-mono text-foreground/30 pointer-events-none">10.49°E</div>

                {/* Instrument grid */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                  viewBox="0 0 300 220"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <line x1="100" y1="0"   x2="100" y2="220" stroke="#8B7D6B" strokeWidth="0.3" opacity="0.10" />
                  <line x1="200" y1="0"   x2="200" y2="220" stroke="#8B7D6B" strokeWidth="0.3" opacity="0.10" />
                  <line x1="0"   y1="73"  x2="300" y2="73"  stroke="#8B7D6B" strokeWidth="0.3" opacity="0.10" />
                  <line x1="0"   y1="147" x2="300" y2="147" stroke="#8B7D6B" strokeWidth="0.3" opacity="0.10" />
                  {/* Corner registration marks */}
                  {[[8,5],[288,5],[8,215],[288,215]].map(([cx,cy], i) => (
                    <g key={i}>
                      <line x1={cx-4} y1={cy} x2={cx+4} y2={cy} stroke="#8B7D6B" strokeWidth="0.7" opacity="0.22" />
                      <line x1={cx} y1={cy-4} x2={cx} y2={cy+4} stroke="#8B7D6B" strokeWidth="0.7" opacity="0.22" />
                    </g>
                  ))}
                </svg>

                {/* Map image */}
                <motion.div
                  key={activeMap.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] w-full"
                >
                  <picture>
                    <source srcSet={activeMap.webpUrl} type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeMap.pngUrl}
                      alt={activeMap.title}
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </picture>

                  {/* Transparent overlay */}
                  {showOverlay && activeMap.overlayUrl && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeMap.overlayUrl}
                        alt={`${activeMap.title} transparent overlay`}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Bottom instrument bar */}
                <div className="flex items-center justify-between px-3 py-2 border-t border-border/25 bg-background/60">
                  <span className="text-[8px] font-mono uppercase tracking-[0.12em] text-muted-foreground/40">
                    ECOSTRESS · NASADEM
                  </span>
                  <div className="flex items-center gap-3">
                    {activeMap.hasOverlay && (
                      <button
                        onClick={() => setShowOverlay(!showOverlay)}
                        className={`text-[8px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 border transition-all duration-300 ${
                          showOverlay
                            ? 'border-primary/40 text-primary/70 bg-primary/[0.06]'
                            : 'border-border/30 text-muted-foreground/40 hover:border-border/50 hover:text-muted-foreground/60'
                        }`}
                      >
                        Overlay
                      </button>
                    )}
                    <span className="text-[8px] font-mono text-muted-foreground/30">{activeMap.fig}</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-5 border-l-2 border-primary/20 pl-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="text-[8px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 border"
                    style={{
                      borderColor: `${activeMap.tagColor}44`,
                      color: activeMap.tagColor,
                      backgroundColor: `${activeMap.tagColor}0D`,
                    }}
                  >
                    {activeMap.tag}
                  </span>
                  <span className="text-[9px] font-mono text-foreground/50">{activeMap.subtitle}</span>
                </div>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{activeMap.caption}</p>
                <p className="text-[9px] font-mono text-muted-foreground/30 mt-2 italic">
                  Data: ECOSTRESS + NASADEM · Swiss National Park · Daytime June analysis · Exploratory monitoring map
                </p>
              </div>

              {/* Class legend */}
              <div className="mt-6">
                <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-2">
                  Class Legend
                </p>
                <div className="border border-border/25 bg-foreground/[0.02] p-3 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/data/signals/nasa_quality_maps/legends/class_legend.png"
                    alt="Signal class legend"
                    className="max-h-16 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Map selector */}
          <SectionReveal direction="left" delay={0.1}>
            <div>
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">
                Select Map
              </p>
              <div className="space-y-1.5">
                {maps.map((map) => (
                  <button
                    key={map.id}
                    onClick={() => { setActiveMap(map); setShowOverlay(false) }}
                    className={`w-full text-left flex items-start gap-3 p-3 border transition-all duration-300 ${
                      activeMap.id === map.id
                        ? 'border-foreground/20 bg-foreground/[0.04]'
                        : 'border-transparent hover:border-border/30 hover:bg-foreground/[0.02]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-12 shrink-0 overflow-hidden border border-border/20 bg-foreground/[0.04]">
                      <picture>
                        <source srcSet={map.webpUrl} type="image/webp" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={map.pngUrl}
                          alt={map.title}
                          className="w-full h-full object-contain"
                          style={{ imageRendering: 'pixelated' }}
                          loading="lazy"
                        />
                      </picture>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[8px] font-mono text-muted-foreground/30">{map.fig}</span>
                        {activeMap.id === map.id && (
                          <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-foreground/80 leading-tight truncate">{map.title}</p>
                      <p className="text-[9px] font-mono text-muted-foreground/45 mt-0.5 truncate">{map.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Provenance note */}
              <div className="mt-6 pt-4 border-t border-border/15">
                <p className="text-[9px] font-mono text-muted-foreground/30 leading-relaxed">
                  CRS: EPSG:32632 · Pixel: 70 m · Shape: 313 × 303 · Phase 6 NASA-Quality export
                </p>
              </div>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}
