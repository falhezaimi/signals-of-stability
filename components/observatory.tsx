'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArtisticBackground } from './artistic-background'
import readoutsRaw from '@/public/data/signals/observatory-readouts.json'

const layers = [
  {
    id: 'ndvi',
    label: 'NDVI',
    name: 'Vegetation Index',
    color: '#3F6F42',
    description: 'NDVI area mean over valid SNP pixels — April–June composite. ECO2LSTE-derived. Scale: –1 to 1.',
  },
  {
    id: 'et',
    label: 'ET',
    name: 'Evapotranspiration',
    color: '#557F96',
    description: 'ET area mean (mm/day) over valid SNP pixels — April–June composite. ECO3ETPTJPL product. 2024 is LOW CONFIDENCE (2 overpasses only).',
  },
  {
    id: 'esi',
    label: 'ESI',
    name: 'Evaporative Stress',
    color: '#B99B45',
    description: 'ESI area mean over valid SNP pixels — April–June composite. ECO4ESIPTJPL product. Scale: 0=maximum stress, 1=no stress. 2024 is LOW CONFIDENCE (2 overpasses only).',
  },
]

const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025']

type Readout = {
  mean: number
  median: number
  min: number
  max: number
  std: number
  p05: number
  p25: number
  p75: number
  p95: number
  coverage_aoi_percent: number
  obs_coverage_p95_percent: number
  confidence_level: string
  data_status: string
  note?: string
}

function getReadout(layer: string, year: string): Readout | null {
  const all = readoutsRaw.readouts as unknown as Record<string, Record<string, Readout>>
  return all[layer]?.[year] ?? null
}

function RasterPanel({ layer, year, color }: { layer: string; year: string; color: string }) {
  const [sidecar, setSidecar] = useState<{ vmin: number; vmax: number; legend_ticks: number[] } | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`/data/rasters/${layer}_${year}_apr_jun_mean.json`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => setSidecar({ vmin: d.vmin, vmax: d.vmax, legend_ticks: d.legend_ticks }))
      .catch(() => {})
    return () => ctrl.abort()
  }, [layer, year])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'oklch(0.07 0.005 160)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/data/rasters/${layer}_${year}_apr_jun_mean.png`}
        alt={`${layer.toUpperCase()} ${year} April–June mean`}
        loading="eager"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
      />

      {/* Scan-line texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <defs>
          <pattern id={`rp-scan-${layer}`} x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
            <rect y="1" width="1" height="1" fill="black" fillOpacity="0.09" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#rp-scan-${layer})`} />
      </svg>

      {/* Instrument grid + tick marks + corner registration */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 160" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <line x1="80" y1="0" x2="80" y2="160" stroke="#DDD3BE" strokeWidth="0.3" opacity="0.13" />
        <line x1="160" y1="0" x2="160" y2="160" stroke="#DDD3BE" strokeWidth="0.3" opacity="0.13" />
        <line x1="0" y1="53" x2="240" y2="53" stroke="#DDD3BE" strokeWidth="0.3" opacity="0.13" />
        <line x1="0" y1="107" x2="240" y2="107" stroke="#DDD3BE" strokeWidth="0.3" opacity="0.13" />
        {[40, 80, 120, 160, 200].map((x) => (
          <line key={`tx${x}`} x1={x} y1="0" x2={x} y2="4" stroke="#DDD3BE" strokeWidth="0.5" opacity="0.20" />
        ))}
        {[40, 80, 120].map((y) => (
          <line key={`ty${y}`} x1="0" y1={y} x2="4" y2={y} stroke="#DDD3BE" strokeWidth="0.5" opacity="0.20" />
        ))}
        <line x1="7" y1="5" x2="15" y2="5" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="11" y1="1" x2="11" y2="9" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="225" y1="5" x2="233" y2="5" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="229" y1="1" x2="229" y2="9" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="7" y1="155" x2="15" y2="155" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="11" y1="151" x2="11" y2="159" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="225" y1="155" x2="233" y2="155" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
        <line x1="229" y1="151" x2="229" y2="159" stroke="#DDD3BE" strokeWidth="0.7" opacity="0.30" />
      </svg>

      {/* Coordinate labels */}
      <div className="absolute top-2 left-3 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>46.74°N</div>
      <div className="absolute bottom-7 left-3 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>46.59°N</div>
      <div className="absolute top-2 right-3 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>10.05°E</div>
      <div className="absolute bottom-7 right-3 text-[8px] font-mono pointer-events-none" style={{ color: '#DDD3BE', opacity: 0.38 }}>10.49°E</div>

      {/* Vertical legend bar */}
      {sidecar && (
        <div className="absolute top-8 right-2 bottom-8 flex flex-col items-center gap-0.5 pointer-events-none">
          <span className="text-[7px] font-mono leading-none" style={{ color: '#DDD3BE', opacity: 0.42 }}>
            {sidecar.legend_ticks[sidecar.legend_ticks.length - 1].toFixed(2)}
          </span>
          <div className="flex-1 w-1.5" style={{ background: `linear-gradient(to bottom, ${color}cc, ${color}22)` }} />
          <span className="text-[7px] font-mono leading-none" style={{ color: '#DDD3BE', opacity: 0.42 }}>
            {sidecar.legend_ticks[0].toFixed(2)}
          </span>
        </div>
      )}

      {/* Bottom instrument bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-1.5 pointer-events-none"
        style={{ background: 'linear-gradient(to top, oklch(0.05 0.004 160 / 0.85), transparent)' }}
      >
        <span className="text-[8px] font-mono uppercase tracking-[0.12em]" style={{ color: '#DDD3BE', opacity: 0.45 }}>
          ECOSTRESS raster composite
        </span>
        <span className="text-[8px] font-mono" style={{ color: '#DDD3BE', opacity: 0.32 }}>
          {layer.toUpperCase()} · {year} · AMJ
        </span>
      </div>
    </div>
  )
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((value, idx) => (
        <div
          key={idx}
          className="flex-1 transition-all"
          style={{
            height: `${((value - min) / range) * 100}%`,
            minHeight: '2px',
            backgroundColor: color,
            opacity: 0.22 + (idx / data.length) * 0.65,
          }}
        />
      ))}
    </div>
  )
}

function ConfidenceBadge({ level, note }: { level: string; note?: string }) {
  if (level === 'low') {
    return (
      <span
        className="text-[8px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 border"
        style={{ borderColor: '#A6523A55', color: '#A6523A', backgroundColor: '#A6523A11' }}
        title={note}
      >
        LOW CONF
      </span>
    )
  }
  if (level === 'medium') {
    return (
      <span
        className="text-[8px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 border"
        style={{ borderColor: '#B99B4555', color: '#B99B45', backgroundColor: '#B99B4511' }}
      >
        PARTIAL
      </span>
    )
  }
  return (
    <span className="text-[8px] font-mono text-muted-foreground/25">
      RASTER-DERIVED
    </span>
  )
}

export function Observatory() {
  const [activeLayer, setActiveLayer] = useState('ndvi')
  const [activeYear, setActiveYear] = useState('2023')
  const [yearIndex, setYearIndex] = useState(4)

  const readout = getReadout(activeLayer, activeYear)
  const layerConfig = layers.find((l) => l.id === activeLayer) || layers[0]

  const chartData = years.map((y) => {
    const r = getReadout(activeLayer, y)
    return r?.mean ?? 0
  })

  const obsP95 = readout?.obs_coverage_p95_percent ?? 0
  const coverageAoi = readout?.coverage_aoi_percent ?? 0
  const confidenceLevel = readout?.confidence_level ?? 'high'

  return (
    <section id="observatory" className="relative min-h-screen flex flex-col overflow-hidden">
      <ArtisticBackground variant="rasterband" />

      {/* Station header bar — pt-14 clears the fixed nav */}
      <div className="relative z-10 flex items-center justify-between px-6 h-12 border-b border-border/20 shrink-0 mt-14 md:mt-16">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/40">
            Signal Observatory
          </span>
          <span className="w-px h-3 bg-border/30" />
          <span className="text-[9px] font-mono text-foreground/35 hidden sm:inline">
            SNP·OBS·001 &nbsp;·&nbsp; 46.6603°N 10.2176°E
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary/70" />
          </span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-primary/60">
            Monitoring
          </span>
        </div>
      </div>

      {/* Main instrument panel */}
      <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_280px]">

        {/* Left: visualization + tabs */}
        <div className="flex flex-col border-r border-border/15">
          <Tabs value={activeLayer} onValueChange={setActiveLayer}>
            <div className="px-5 pt-5 pb-3 border-b border-border/15">
              <TabsList className="bg-transparent border border-border/20 h-auto p-0.5 gap-0 rounded-none">
                {layers.map((layer) => (
                  <TabsTrigger
                    key={layer.id}
                    value={layer.id}
                    className="text-[10px] font-mono tracking-wider rounded-none data-[state=active]:bg-card/60 data-[state=active]:text-foreground text-muted-foreground gap-1.5 py-1.5 px-3"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    {layer.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {layers.map((layer) => (
              <TabsContent key={layer.id} value={layer.id} className="flex-1 mt-0 flex flex-col">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 px-5 py-3 cursor-default">
                        <span className="text-xs font-mono" style={{ color: layer.color }}>
                          {layer.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground/40">ⓘ</span>
                        <span className="ml-auto text-[9px] font-mono text-muted-foreground/35">
                          April–June (AMJ)
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[220px] text-xs rounded-none bg-card border-border/40">
                      {layer.description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <motion.div
                  key={`${activeLayer}-${activeYear}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 min-h-[280px] md:min-h-[360px]"
                >
                  <RasterPanel layer={layer.id} year={activeYear} color={layer.color} />
                </motion.div>

                <div className="flex items-center justify-between px-5 py-2.5 border-t border-border/15">
                  <span className="text-[10px] font-mono text-muted-foreground/40">
                    {layer.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/40">
                    {activeYear} · April–June
                  </span>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Right: control dock */}
        <div className="p-5 space-y-6 overflow-y-auto border-t lg:border-t-0 border-border/15">

          {/* Year control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50">
                Year
              </span>
              <span className="font-serif text-3xl text-foreground/90 leading-none">{activeYear}</span>
            </div>
            <Slider
              min={0}
              max={6}
              step={1}
              value={[yearIndex]}
              onValueChange={(val: number[]) => {
                const idx = val[0]
                setYearIndex(idx)
                setActiveYear(years[idx])
              }}
              className="mb-2"
            />
            <div className="flex justify-between text-[9px] font-mono text-muted-foreground/35">
              <span>2019</span>
              <span>2025 ↗</span>
            </div>
          </div>

          <div className="h-px bg-border/20" />

          {/* Season label — replaces month selector */}
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50 block mb-2">
              Analysis Window
            </span>
            <div className="px-3 py-2.5 border border-border/20 bg-card/15">
              <p className="text-[10px] font-mono text-foreground/70">April – June (AMJ)</p>
              <p className="text-[9px] font-mono text-muted-foreground/40 mt-0.5">
                Fixed season · early alpine growing window
              </p>
            </div>
          </div>

          <div className="h-px bg-border/20" />

          {/* Observation coverage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50">
                Obs. Coverage (p95)
              </span>
              <span className="text-[10px] font-mono text-foreground/70">{obsP95.toFixed(1)}%</span>
            </div>
            <div className="h-px bg-border/30 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full transition-all duration-700"
                style={{
                  width: `${obsP95}%`,
                  backgroundColor: confidenceLevel === 'low' ? '#A6523A' : layerConfig.color,
                  opacity: 0.5,
                }}
              />
            </div>
            <p className="text-[9px] font-mono mt-1.5 text-muted-foreground/35">
              AOI pixels w/ valid data: ~{coverageAoi.toFixed(0)}%
            </p>
          </div>

          <div className="h-px bg-border/20" />

          {/* Signal statistics */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50">
                Signal Values
              </span>
              {readout && <ConfidenceBadge level={readout.confidence_level} note={readout.note} />}
            </div>
            {readout ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Mean', value: readout.mean.toFixed(4), color: layerConfig.color },
                    { label: 'Std Dev', value: readout.std.toFixed(4), color: undefined },
                    { label: 'p05', value: readout.p05.toFixed(4), color: undefined },
                    { label: 'p95', value: readout.p95.toFixed(4), color: undefined },
                  ].map((stat) => (
                    <div key={stat.label} className="p-2.5 border border-border/15 bg-card/20">
                      <p className="text-[9px] font-mono text-muted-foreground/40 mb-0.5">{stat.label}</p>
                      <p className="text-sm font-mono text-foreground/85" style={stat.color ? { color: stat.color } : undefined}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                {readout.note && (
                  <p className="text-[9px] font-mono text-muted-foreground/40 mt-2 italic leading-relaxed">
                    {readout.note}
                  </p>
                )}
              </>
            ) : (
              <p className="text-[9px] font-mono text-muted-foreground/35">No data for this selection.</p>
            )}
          </div>

          <div className="h-px bg-border/20" />

          {/* Trend 2019–2025 */}
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50 block mb-2.5">
              Signal 2019–2025
            </span>
            <div className="p-3 border border-border/15 bg-card/10">
              <MiniChart data={chartData} color={layerConfig.color} />
              <div className="flex justify-between mt-1.5 text-[9px] font-mono text-muted-foreground/35">
                <span>2019</span>
                <span>2025</span>
              </div>
            </div>
          </div>

          {/* Legend bar */}
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50 block mb-2">
              Legend
            </span>
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, ${layerConfig.color}18, ${layerConfig.color})`,
              }}
            />
            <div className="flex justify-between mt-1 text-[9px] font-mono text-muted-foreground/35">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="relative z-10 px-6 py-3 border-t border-border/15">
        <p className="text-[10px] font-mono text-muted-foreground/40 text-center">
          ECOSTRESS/AppEEARS · April–June composite · ~37% AOI pixel coverage · 2024 ET & ESI are low confidence (2 overpasses)
        </p>
      </div>
    </section>
  )
}
