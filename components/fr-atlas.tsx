'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from './section-reveal'

type MapEntry = {
  id: string
  num: string
  slug: string
  webp: string
  png: string
  title: string
  subtitle: string
  question: string
  interpretation: string
  caption: string
  tag: string
  tagColor: string
}

const maps: MapEntry[] = [
  {
    id: 'map_01',
    num: '01',
    slug: 'dominant_daytime',
    webp: '/data/signals/nasa_quality_maps/webp/map_01_dominant_daytime.webp',
    png:  '/data/signals/nasa_quality_maps/png/map_01_dominant_daytime.png',
    title: 'Ecological Signal Mosaic',
    subtitle: 'Dominant daytime ECOSTRESS classes',
    question: 'How is the park spatially organized?',
    interpretation: 'The park does not read as one uniform zone. Stable cores, watch zones, and high-variability areas occupy distinct positions across the landscape — not randomly scattered.',
    caption: 'Dominant daytime ECOSTRESS signal classes reveal terrain-structured spatial organization. Each pixel shows the dominant ecological class derived from multi-year June composites of NDVI, ET, ESI, PET, and WUE. Hillshade base: NASADEM 30 m DEM.',
    tag: 'MOSAIC',
    tagColor: '#2F6B3F',
  },
  {
    id: 'map_02',
    num: '02',
    slug: 'demand_efficiency_watch',
    webp: '/data/signals/nasa_quality_maps/webp/map_02_demand_efficiency_watch.webp',
    png:  '/data/signals/nasa_quality_maps/png/map_02_demand_efficiency_watch.png',
    title: 'Demand-Efficiency Watch',
    subtitle: 'Atmospheric demand vs. water-use efficiency',
    question: 'Where is vegetation activating under rising demand with falling efficiency?',
    interpretation: 'These areas (~29% of the park) show positive NDVI and ET trends alongside a declining WUE trend — vegetation appears more active but less efficient, possibly under increasing atmospheric pressure.',
    caption: 'Localized areas where atmospheric demand and vegetation efficiency signals require monitoring. These pixels show positive NDVI and ET trends alongside negative WUE trends. All other valid pixels are dimmed.',
    tag: 'WATCH · CLASS 5',
    tagColor: '#C06020',
  },
  {
    id: 'map_03',
    num: '03',
    slug: 'esi_watch_zone',
    webp: '/data/signals/nasa_quality_maps/webp/map_03_esi_watch_zone.webp',
    png:  '/data/signals/nasa_quality_maps/png/map_03_esi_watch_zone.png',
    title: 'ESI Watch Zones',
    subtitle: 'Evaporative stress sensitivity',
    question: 'Where does greening vegetation coincide with declining evaporative capacity?',
    interpretation: 'These ESI watch pixels (~6.2%) show the signature of possible terrain-linked moisture limitation: NDVI and ET slopes trend positive while ESI trends negative — apparent greening alongside declining stress tolerance.',
    caption: 'Areas where evaporative stress signals suggest possible terrain-linked sensitivity. ESI watch pixels show positive NDVI and ET slopes alongside a negative ESI slope — a pattern that may indicate localized surface moisture limitation despite apparent vegetation greening.',
    tag: 'WATCH · CLASS 4',
    tagColor: '#B8563C',
  },
  {
    id: 'map_04',
    num: '04',
    slug: 'stable_core',
    webp: '/data/signals/nasa_quality_maps/webp/map_04_stable_core.webp',
    png:  '/data/signals/nasa_quality_maps/png/map_04_stable_core.png',
    title: 'Stable Ecological Core',
    subtitle: 'Low interannual variability in NDVI, ET, ESI',
    question: 'Where is the park most ecologically stable?',
    interpretation: 'Stable core pixels (~3.8%, ~6.7 km²) are small but meaningful — they show consistent low-stress behavior across multiple years, likely anchored in favorable topographic positions with mature vegetation communities.',
    caption: 'Small but important areas showing consistent low-stress ecological signal behavior across multiple years. These pixels display low interannual variability in NDVI, ET, and ESI — a signal associated with stable, mature vegetation communities.',
    tag: 'STABLE · CLASS 1',
    tagColor: '#2F6B3F',
  },
  {
    id: 'map_05',
    num: '05',
    slug: 'timebin_comparison',
    webp: '/data/signals/nasa_quality_maps/webp/map_05_timebin_comparison.webp',
    png:  '/data/signals/nasa_quality_maps/png/map_05_timebin_comparison.png',
    title: 'Time-Bin Validation',
    subtitle: 'Class structure across temporal filter choices',
    question: 'Does the pattern depend on which time-of-day data is used?',
    interpretation: 'Core spatial patterns persist across four time-bin filter choices (midday, daytime, daytime+evening, all acquisitions), supporting the robustness of the classification. This reduces the risk that the pattern is an artifact of one filter.',
    caption: 'Class structure remains interpretable across temporal filtering choices. Four panels show dominant ecological classes from progressively broader time-bin selections. Core spatial patterns persist, supporting the robustness of the classification framework.',
    tag: 'ROBUSTNESS',
    tagColor: '#5A7FA3',
  },
  {
    id: 'map_06',
    num: '06',
    slug: 'terrain_context',
    webp: '/data/signals/nasa_quality_maps/webp/map_06_terrain_context.webp',
    png:  '/data/signals/nasa_quality_maps/png/map_06_terrain_context.png',
    title: 'Terrain Context',
    subtitle: 'Class boundaries vs. elevation and slope',
    question: 'Do class boundaries align with topographic structure?',
    interpretation: 'The visual alignment between class boundaries and topographic zones — elevation gradients and slope changes — supports a terrain-structured interpretation of the signal mosaic rather than a random one.',
    caption: 'Class structure interpreted against elevation and topographic gradients. Left panel: dominant daytime class over hillshade. Right panel: terrain field over the same base. The alignment between class boundaries and topographic zones supports a terrain-structured interpretation.',
    tag: 'TERRAIN CONTEXT',
    tagColor: '#8A8A8A',
  },
]

export function FrAtlas() {
  const [active, setActive] = useState(0)
  const m = maps[active]

  return (
    <section id="spatial" className="relative pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/25">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
              Section 2 · Spatial Evidence
            </span>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#5A7FA3' }} />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                Where does the signal appear?
              </span>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground/65 leading-relaxed">
              The class maps show the park organizes into a terrain-linked mosaic, not a random patchwork.
              Stable cores, ESI watch zones, demand-efficiency watch zones, and uncertain areas occupy
              different spatial positions across the landscape.
            </p>
          </div>
        </SectionReveal>

        {/* Atlas layout */}
        <div className="grid lg:grid-cols-[1fr_220px] gap-6">

          {/* Main map panel */}
          <div>
            <motion.div
              key={m.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border border-border/30 bg-card/10"
            >
              {/* Map header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/15">
                <div className="flex items-center gap-3">
                  <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.15em]">
                    MAP {m.num} / 06
                  </span>
                  <span className="w-px h-3 bg-border/25" />
                  <span
                    className="text-[8px] font-mono uppercase tracking-[0.12em]"
                    style={{ color: `${m.tagColor}cc` }}
                  >
                    {m.tag}
                  </span>
                </div>
                <span className="text-[7px] font-mono text-muted-foreground/25 uppercase tracking-[0.12em]">
                  ECOSTRESS · NASADEM · SNP
                </span>
              </div>

              {/* Image */}
              <div className="relative bg-[oklch(0.14_0.006_160)]" style={{ aspectRatio: '4/3' }}>
                <picture>
                  <source srcSet={m.webp} type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.png}
                    alt={m.title}
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'auto' }}
                  />
                </picture>
                {/* Corner registration marks */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden viewBox="0 0 200 150">
                  {[[5,4],[195,4],[5,146],[195,146]].map(([cx,cy],i) => (
                    <g key={i} opacity="0.25">
                      <line x1={cx-5} y1={cy} x2={cx+5} y2={cy} stroke="#DDD3BE" strokeWidth="0.6" />
                      <line x1={cx} y1={cy-5} x2={cx} y2={cy+5} stroke="#DDD3BE" strokeWidth="0.6" />
                    </g>
                  ))}
                </svg>
                {/* Coordinate labels */}
                <div className="absolute top-2 left-2 text-[7px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>46.74°N</div>
                <div className="absolute bottom-6 left-2 text-[7px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>46.59°N</div>
                <div className="absolute top-2 right-2 text-[7px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>10.49°E</div>
              </div>

              {/* Map footer: question → interpretation */}
              <div className="p-4 border-t border-border/10">
                <div className="grid md:grid-cols-[1fr_1fr] gap-4">
                  <div>
                    <p className="text-[9px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em] mb-1">
                      {m.question}
                    </p>
                    <p className="text-[11px] text-foreground/70 leading-relaxed">
                      {m.interpretation}
                    </p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-border/15 md:pl-4 pt-3 md:pt-0">
                    <p className="text-[9px] font-mono text-muted-foreground/30 mb-1.5 uppercase tracking-[0.10em]">Caption</p>
                    <p className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed italic">
                      {m.caption}
                    </p>
                    <p className="text-[7px] font-mono text-muted-foreground/25 mt-2 uppercase tracking-[0.10em]">
                      ECOSTRESS + NASADEM · SNP · Daytime June · Exploratory
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Thumbnail rail */}
          <div>
            <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em] mb-3">Select Map</p>
            <div className="space-y-2">
              {maps.map((map, i) => (
                <button
                  key={map.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left border transition-all duration-300 overflow-hidden ${
                    active === i
                      ? 'border-primary/40 bg-card/25'
                      : 'border-border/20 bg-card/8 hover:border-border/35 hover:bg-card/15'
                  }`}
                >
                  <div className="flex items-center gap-2.5 p-2">
                    <div className="relative shrink-0 w-14 h-10 bg-[oklch(0.14_0.006_160)] overflow-hidden">
                      <picture>
                        <source srcSet={map.webp} type="image/webp" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={map.png}
                          alt={map.title}
                          className="w-full h-full object-contain"
                          style={{ imageRendering: 'auto' }}
                        />
                      </picture>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: map.tagColor }}
                        />
                        <span className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.10em]">
                          MAP {map.num}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-foreground/65 truncate">{map.title}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Class legend */}
            <div className="mt-4 border border-border/20 bg-card/8 p-3">
              <p className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.12em] mb-2">Class Legend</p>
              {[
                { name: 'Stable Core',               color: '#2F6B3F', area: '6.7 km²' },
                { name: 'Coherent Activation',       color: '#5E9F49', area: '0.9 km²' },
                { name: 'ESI Watch',                 color: '#B8563C', area: '10.9 km²' },
                { name: 'Demand-Efficiency Watch',   color: '#C06020', area: '50.7 km²' },
                { name: 'Efficient Activation',      color: '#2F7F78', area: '4.8 km²' },
                { name: 'Disagreement',              color: '#7E5AA7', area: '87.9 km²' },
                { name: 'High Variability',          color: '#8A8A8A', area: '9.6 km²' },
              ].map(cls => (
                <div key={cls.name} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: cls.color }} />
                    <span className="text-[8px] font-mono text-muted-foreground/50">{cls.name}</span>
                  </div>
                  <span className="text-[7px] font-mono text-muted-foreground/30">{cls.area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
