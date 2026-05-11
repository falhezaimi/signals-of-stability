'use client'

import { motion } from 'framer-motion'
import { ArtisticBackground } from './artistic-background'

const productInventory = [
  { label: 'ESI',  name: 'Evaporative Stress Index', rasters: 309,  color: '#B99B45' },
  { label: 'ET',   name: 'Evapotranspiration',        rasters: 308,  color: '#557F96' },
  { label: 'NDVI', name: 'Vegetation Greenness',       rasters: 930,  color: '#3F6F42' },
  { label: 'PET',  name: 'Potential ET',               rasters: 309,  color: '#7A5F8A' },
  { label: 'WUE',  name: 'Water Use Efficiency',       rasters: 266,  color: '#4A8F80' },
]

export function SignalsIntro() {
  return (
    <section
      id="observatory"
      className="relative min-h-[80vh] flex flex-col overflow-hidden"
    >
      <ArtisticBackground variant="feldstation" />

      {/* Ghost bleeds */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute font-serif font-bold text-foreground leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)', opacity: 0.04, right: '-3vw', top: '6%', letterSpacing: '-0.03em' }}
          aria-hidden="true"
        >
          ATLAS
        </div>
        <div
          className="absolute font-serif font-bold text-foreground leading-none"
          style={{ fontSize: 'clamp(60px, 12vw, 190px)', opacity: 0.025, left: '-2vw', bottom: '10%', letterSpacing: '-0.03em' }}
          aria-hidden="true"
        >
          TERRAIN
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center pt-20 pb-12">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-center">

            {/* ── LEFT — text ── */}
            <div className="flex flex-col justify-center py-8 lg:py-0">

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
                    Signal Observatory
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40">
                  ECOSTRESS · NASADEM
                </span>
              </motion.div>

              {/* Title */}
              <div className="mb-8">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="font-serif font-medium tracking-tight text-foreground block leading-[0.90]"
                      style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
                    >
                      Signals of
                    </span>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="font-serif font-medium tracking-tight text-foreground block leading-[0.90] pl-6 md:pl-10"
                      style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
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
                  Swiss National Park · Data Atlas
                </span>
              </motion.div>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.78, ease: 'easeOut' }}
                className="text-sm text-muted-foreground/65 leading-loose mb-8 max-w-md text-pretty"
              >
                This page presents the map, product, and yearly signal outputs from the ECOSTRESS/NASADEM workflow.
                Six ecological signal maps, five 3D terrain renders, and seven years of annual products for
                ESI, ET, NDVI, PET, and WUE.
              </motion.p>

              {/* Metadata block */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.92, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10 border-l-2 border-primary/25 pl-4"
              >
                {[
                  { label: 'Maps',          value: '6 Signal Maps' },
                  { label: '3D Products',   value: '5 Terrain Renders' },
                  { label: 'Study Window',  value: '2019 – 2025' },
                  { label: 'Signals',       value: 'ESI · ET · NDVI · PET · WUE' },
                  { label: 'Resolution',    value: '70 m nominal' },
                  { label: 'DEM Source',    value: 'NASADEM 30 m' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-0.5">{item.label}</p>
                    <p className="text-[10px] font-mono text-foreground/70">{item.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.06, ease: 'easeOut' }}
                className="flex items-center gap-6"
              >
                <button
                  onClick={() => document.getElementById('map-atlas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-foreground/90 text-background hover:bg-foreground transition-all duration-300 px-6 py-2.5 text-[10px] font-mono tracking-widest uppercase"
                >
                  Map Atlas
                </button>
                <button
                  onClick={() => document.getElementById('terrain-products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[10px] font-mono text-muted-foreground/55 hover:text-foreground/75 transition-colors duration-300 uppercase tracking-widest flex items-center gap-2"
                >
                  3D Terrain <span className="opacity-60">→</span>
                </button>
              </motion.div>
            </div>

            {/* ── RIGHT — signal inventory panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/30">
                  Signal Inventory · SNP
                </span>
                <span className="text-[8px] font-mono text-muted-foreground/20">Phase 6</span>
              </div>

              <div className="border border-foreground/12 bg-foreground/[0.018] p-5 space-y-4">
                {productInventory.map((p) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <div
                      className="w-0.5 h-8 shrink-0"
                      style={{ backgroundColor: p.color, opacity: 0.55 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[10px] font-mono text-foreground/80">{p.label}</span>
                        <span className="text-[9px] font-mono text-muted-foreground/40 truncate">{p.name}</span>
                      </div>
                      <div className="h-px bg-border/30 relative overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full"
                          style={{
                            width: `${(p.rasters / 930) * 100}%`,
                            backgroundColor: p.color,
                            opacity: 0.35,
                          }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/30">{p.rasters} rasters</span>
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-border/20 space-y-1.5">
                  {[
                    { label: 'Total Rasters', value: '2 122' },
                    { label: 'CRS',            value: 'EPSG:32632' },
                    { label: 'Window',         value: '2019–2025 · Jan–Jun' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-muted-foreground/30">{item.label}</span>
                      <span className="text-[10px] font-mono text-foreground/55">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 px-1">
                <span className="text-[8px] font-mono text-muted-foreground/25">Fig. S.0</span>
                <span className="text-[8px] font-mono text-muted-foreground/25">
                  Signal inventory by product, Jan–Jun 2019–2025
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
