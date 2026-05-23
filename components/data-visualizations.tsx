'use client'

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { ArtisticBackground } from './artistic-background'
import { SectionReveal } from './section-reveal'
import figuresRaw from '@/public/data/signals/findings-figures.json'
import observatoryRaw from '@/public/data/signals/observatory-readouts.json'

type ReadoutEntry = {
  variable: string; year: number; season: string; mean: number
  confidence_level: string; coverage_inside_aoi_percent: number
}

const fig1 = figuresRaw.figures[0]
const fig2 = figuresRaw.figures[1]
const fig3 = figuresRaw.figures[2]
const fig4 = figuresRaw.figures[3]

const readouts = observatoryRaw as ReadoutEntry[]

const ndviData = readouts
  .filter(d => d.variable === 'ndvi' && d.season === 'june')
  .sort((a, b) => a.year - b.year)
  .map(d => ({ year: String(d.year), ndvi: d.mean, confidence_level: d.confidence_level }))

const etData = readouts
  .filter(d => d.variable === 'et' && d.season === 'june')
  .sort((a, b) => a.year - b.year)
  .map(d => ({ year: String(d.year), et: d.mean, confidence_level: d.confidence_level }))

const esiData = readouts
  .filter(d => d.variable === 'esi' && d.season === 'june')
  .sort((a, b) => a.year - b.year)
  .map(d => ({ year: String(d.year), esi: d.mean, confidence_level: d.confidence_level }))

const covData = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'].map(year => {
  const get = (v: string) => readouts.find(d => d.variable === v && d.season === 'june' && String(d.year) === year)
  return {
    year,
    ndvi_cov: get('ndvi')?.coverage_inside_aoi_percent ?? 0,
    et_cov:   get('et')?.coverage_inside_aoi_percent ?? 0,
    esi_cov:  get('esi')?.coverage_inside_aoi_percent ?? 0,
  }
})

const ndviChartConfig: ChartConfig = {
  ndvi: { label: 'NDVI Mean', color: '#3F6F42' },
}

const etChartConfig: ChartConfig = {
  et: { label: 'ET mm/day', color: '#557F96' },
}

const esiChartConfig: ChartConfig = {
  esi: { label: 'ESI (0–1)', color: '#B99B45' },
}

function CoverageCell({ value, threshold }: { value: number; threshold: number }) {
  const normalizedAbs = Math.min(1, value / 100)
  const intensity = 0.12 + normalizedAbs * 0.55
  const isLow = value < threshold
  const bg = isLow
    ? `rgba(168, 97, 69, ${intensity})`
    : `rgba(63, 107, 74, ${intensity})`
  return (
    <div
      className="flex items-center justify-center text-[10px] font-mono py-2 transition-all duration-300"
      style={{ backgroundColor: bg, color: '#E8E3D8' }}
    >
      {value.toFixed(1)}%
    </div>
  )
}

function FigureFrame({
  number,
  title,
  subtitle,
  caption,
  tag,
  children,
}: {
  number: string
  title: string
  subtitle: string
  caption: string
  tag?: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-border/25 bg-card/8">
      {/* Figure header */}
      <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-border/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.18em]">Fig. {number}</span>
            <span className="w-3 h-px bg-border/25" />
            <span className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em]">SNP · Jan–Jun · 2019–2025</span>
          </div>
          <p className="text-sm font-medium text-foreground/85">{title}</p>
          <p className="text-[11px] text-muted-foreground/55 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-[8px] font-mono text-muted-foreground/25 mt-1 shrink-0 ml-4">{tag ?? 'ECOSTRESS'}</span>
      </div>
      {/* Chart area */}
      <div className="px-4 py-4">
        {children}
      </div>
      {/* Figure caption */}
      <div className="px-5 py-2.5 border-t border-border/10">
        <p className="text-[9px] font-mono text-muted-foreground/35 leading-relaxed italic">{caption}</p>
      </div>
    </div>
  )
}

export function DataVisualizations() {
  return (
    <section id="findings" className="relative py-20 md:py-32 overflow-hidden">
      <ArtisticBackground variant="findings" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        <SectionReveal>
          {/* Coordinate strip */}
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/15">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
              SNP · 46.6603°N 10.2176°E · Short-Window Signal · January–June 2019–2025
            </span>
          </div>

          {/* Section header */}
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                  Data Findings · ECOSTRESS/AppEEARS · Research Prototype
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight mb-3 text-balance">
                Reading the Signals
              </h2>
              <p className="max-w-md text-muted-foreground/65 text-sm leading-relaxed">
                Short-window raster-derived ECOSTRESS satellite indices across the Swiss National Park · January–June observations
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-[8px] font-mono text-muted-foreground/30 leading-relaxed space-y-0.5">
                <div className="text-[7px] uppercase tracking-[0.15em] text-muted-foreground/20 mb-1">Elevation Bands</div>
                <div>Subalpine · 1400–1800m</div>
                <div>Alpine · 1800–2400m</div>
                <div>Subnival · 2400–3174m</div>
              </div>
            </div>
          </div>

          {/* 2-column chart grid — Fig 1 + Fig 2 */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <FigureFrame
              number={fig1.figure_number.replace('Fig. ', '')}
              title={fig1.title}
              subtitle={fig1.data_source_note}
              caption={fig1.caption}
            >
              <ChartContainer config={ndviChartConfig} className="h-[200px]">
                <AreaChart data={ndviData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ndviFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3F6F42" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#3F6F42" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 3" stroke="currentColor" strokeOpacity={0.07} />
                  <XAxis dataKey="year" tick={{ fontSize: 9, fontFamily: 'monospace' }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0.08, 0.20]} tick={{ fontSize: 9, fontFamily: 'monospace' }} tickLine={false} axisLine={false} tickCount={4} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="ndvi" stroke="#3F6F42" strokeWidth={1.5} fill="url(#ndviFill)"
                    dot={{ fill: '#3F6F42', strokeWidth: 0, r: 2.5 }} activeDot={{ r: 4, fill: '#3F6F42' }} />
                </AreaChart>
              </ChartContainer>
              <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-border/10">
                {([
                  { year: '2021', label: '2021 — low' },
                  { year: '2023', label: '2023 — high' },
                  { year: '2025', label: '2025 — partial' },
                ] as { year: string; label: string }[]).map(({ year, label }) => (
                  <div key={year}>
                    <div className="relative overflow-hidden border border-border/15" style={{ aspectRatio: '4/3' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/data/rasters/ndvi_${year}_apr_jun_mean.png`}
                        alt={`NDVI ${year} AMJ`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                      />
                    </div>
                    <p className="text-[7px] font-mono text-muted-foreground/35 text-center mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </FigureFrame>

            <FigureFrame
              number={fig2.figure_number.replace('Fig. ', '')}
              title={fig2.title}
              subtitle={fig2.data_source_note}
              caption={fig2.caption}
            >
              <ChartContainer config={etChartConfig} className="h-[200px]">
                <AreaChart data={etData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="etFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#557F96" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#557F96" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 3" stroke="currentColor" strokeOpacity={0.07} />
                  <XAxis dataKey="year" tick={{ fontSize: 9, fontFamily: 'monospace' }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0.8, 2.8]} tick={{ fontSize: 9, fontFamily: 'monospace' }} tickLine={false} axisLine={false} tickCount={4} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="et" stroke="#557F96" strokeWidth={1.5} fill="url(#etFill)"
                    dot={{ fill: '#557F96', strokeWidth: 0, r: 2.5 }} activeDot={{ r: 4, fill: '#557F96' }} />
                </AreaChart>
              </ChartContainer>
              <p className="text-[8px] font-mono text-muted-foreground/35 mt-1.5 pl-1">
                ⚠ 2024 LOW CONFIDENCE — 2 overpasses only
              </p>
              <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-border/10">
                {([
                  { year: '2021', label: '2021', lowConf: false },
                  { year: '2022', label: '2022', lowConf: false },
                  { year: '2024', label: '2024', lowConf: true },
                  { year: '2025', label: '2025', lowConf: false },
                ] as { year: string; label: string; lowConf: boolean }[]).map(({ year, label, lowConf }) => (
                  <div key={year}>
                    <div className="relative overflow-hidden border border-border/15" style={{ aspectRatio: '4/3' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/data/rasters/et_${year}_apr_jun_mean.png`}
                        alt={`ET ${year} AMJ`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                      />
                      {lowConf && (
                        <div className="absolute inset-0 flex items-end justify-start p-1">
                          <span className="text-[6px] font-mono uppercase px-1 py-0.5" style={{ color: '#A6523A', background: 'rgba(0,0,0,0.6)' }}>LOW CONF</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[7px] font-mono text-muted-foreground/35 text-center mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </FigureFrame>
          </div>

          {/* Fig 3 — ESI area chart */}
          <div className="mb-5">
            <FigureFrame
              number={fig3.figure_number.replace('Fig. ', '')}
              title={fig3.title}
              subtitle={fig3.data_source_note}
              caption={fig3.caption}
            >
              <ChartContainer config={esiChartConfig} className="h-[160px]">
                <BarChart data={esiData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 3" stroke="currentColor" strokeOpacity={0.07} />
                  <XAxis dataKey="year" tick={{ fontSize: 9, fontFamily: 'monospace' }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0.7, 1.0]} tick={{ fontSize: 9, fontFamily: 'monospace' }} tickLine={false} axisLine={false} tickCount={4} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="esi" fill="#B99B45" maxBarSize={18} />
                </BarChart>
              </ChartContainer>
              <div className="flex items-center gap-6 mt-2 pl-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: '#B99B4555' }} />
                  <span className="text-[9px] font-mono text-muted-foreground/50">0 = max stress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: '#B99B45' }} />
                  <span className="text-[9px] font-mono text-muted-foreground/50">1 = no stress</span>
                </div>
                <span className="text-[8px] font-mono text-muted-foreground/30 ml-auto">⚠ 2024 LOW CONF</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-border/10">
                {([
                  { year: '2021', label: '2021', lowConf: false },
                  { year: '2023', label: '2023', lowConf: false },
                  { year: '2024', label: '2024', lowConf: true },
                ] as { year: string; label: string; lowConf: boolean }[]).map(({ year, label, lowConf }) => (
                  <div key={year}>
                    <div className="relative overflow-hidden border border-border/15" style={{ aspectRatio: '4/3' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/data/rasters/esi_${year}_apr_jun_mean.png`}
                        alt={`ESI ${year} AMJ`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                      />
                      {lowConf && (
                        <div className="absolute inset-0 flex items-end justify-start p-1">
                          <span className="text-[6px] font-mono uppercase px-1 py-0.5" style={{ color: '#A6523A', background: 'rgba(0,0,0,0.6)' }}>LOW CONF</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[7px] font-mono text-muted-foreground/35 text-center mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </FigureFrame>
          </div>

          {/* Fig 4 — Directional Trend Maps (slope rasters) */}
          <div className="mb-5">
            <FigureFrame
              number="4"
              title="Directional Trend Maps"
              subtitle="Pixel-level linear slope per year · January–June · 2019–2025"
              caption="Short-window diagnostic signal only — not indicative of long-term ecological change. Short observation record; independent validation pending."
              tag="TREND"
            >
              <div className="grid grid-cols-3 gap-3">
                {([
                  { layer: 'ndvi', label: 'NDVI', desc: 'Vegetation index' },
                  { layer: 'et',   label: 'ET',   desc: 'Evapotranspiration' },
                  { layer: 'esi',  label: 'ESI',  desc: 'Evaporative stress' },
                ] as { layer: string; label: string; desc: string }[]).map(({ layer, label, desc }) => (
                  <div key={layer} className="flex flex-col gap-1.5">
                    <div className="relative overflow-hidden border border-border/20" style={{ aspectRatio: '1 / 1' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/data/rasters/${layer}_apr_jun_slope_per_year.png`}
                        alt={`${label} slope per year`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 px-1.5 py-1 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(8,12,10,0.72), transparent)' }}
                      >
                        <span className="text-[7px] font-mono uppercase tracking-[0.10em]" style={{ color: '#DDD3BE', opacity: 0.85 }}>
                          {label} slope/yr
                        </span>
                      </div>
                    </div>
                    <p className="text-[8px] font-mono text-muted-foreground/45 text-center">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-[8px] font-mono text-muted-foreground/35 mt-3 italic">
                Short-window diagnostic signal (2019–2025). Not sufficient for trend attribution. Review alongside observation count and AOI coverage.
              </p>
            </FigureFrame>
          </div>

          {/* Fig 5 — Observation Coverage */}
          <div className="border border-border/25 bg-card/8 mb-5">
            <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-border/15">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.18em]">Fig. 5</span>
                  <span className="w-3 h-px bg-border/25" />
                  <span className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em]">SNP · Jan–Jun · 2019–2025</span>
                </div>
                <p className="text-sm font-medium text-foreground/85">Observation Coverage</p>
                <p className="text-[11px] text-muted-foreground/55 mt-0.5">ECOSTRESS overpass count per pixel · January–June window</p>
              </div>
              <span className="text-[8px] font-mono text-muted-foreground/25 mt-1 ml-4">COVERAGE</span>
            </div>
            <div className="px-5 py-5">
              <div className="grid grid-cols-7 gap-1.5 mb-5">
                {(['2019', '2020', '2021', '2022', '2023', '2024', '2025'] as string[]).map((year) => (
                  <div key={year} className="flex flex-col gap-0.5">
                    <div className="relative overflow-hidden border border-border/15" style={{ aspectRatio: '1 / 1' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/data/rasters/ndvi_${year}_apr_jun_observation_coverage.png`}
                        alt={`Observation coverage ${year}`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                        style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                      />
                      {(year === '2024' || year === '2025') && (
                        <div className="absolute inset-0 border border-[#A6523A]/25" />
                      )}
                    </div>
                    <p className="text-[7px] font-mono text-center text-muted-foreground/40">{year}</p>
                    {year === '2024' && (
                      <p className="text-[6px] font-mono text-center" style={{ color: '#A6523A' }}>2 OVP</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="max-w-2xl">
                <div className="grid grid-cols-[72px_1fr_1fr_1fr] gap-2 mb-2">
                  <div />
                  {['NDVI', 'ET', 'ESI'].map((v) => (
                    <div key={v} className="text-center text-[9px] font-mono text-muted-foreground/50 py-1 uppercase tracking-[0.12em]">{v}</div>
                  ))}
                </div>
                {covData.map((row) => (
                  <div key={row.year} className="grid grid-cols-[72px_1fr_1fr_1fr] gap-2 mb-1.5">
                    <div className="flex items-center text-[10px] font-mono text-foreground/55">{row.year}</div>
                    <CoverageCell value={row.ndvi_cov} threshold={60} />
                    <CoverageCell value={row.et_cov} threshold={60} />
                    <CoverageCell value={row.esi_cov} threshold={60} />
                  </div>
                ))}
                <div className="mt-4 flex items-center gap-6">
                  {[
                    { color: 'rgba(63, 107, 74, 0.6)', label: '≥60% — adequate coverage' },
                    { color: 'rgba(168, 97, 69, 0.6)', label: '<60% — low confidence' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-2">
                      <div className="w-3 h-3" style={{ backgroundColor: l.color }} />
                      <span className="text-[9px] font-mono text-muted-foreground/50">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 py-2.5 border-t border-border/10">
              <p className="text-[9px] font-mono text-muted-foreground/35 italic">
                {fig4.caption}
              </p>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-px bg-border/20 border border-border/20">
            {[
              { label: 'NDVI Min/Max', value: '0.109 – 0.163', note: '2021 low · 2023 high' },
              { label: 'ET Range', value: '1.17 – 2.26', note: 'mm/day · Jan–Jun mean' },
              { label: 'ESI Range', value: '0.781 – 0.925', note: '2024 limited coverage' },
            ].map((stat) => (
              <div key={stat.label} className="px-5 py-4 bg-card/8 text-center">
                <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-muted-foreground/35 mb-1">{stat.label}</p>
                <p className="font-serif text-xl font-medium text-foreground/85 mb-0.5">{stat.value}</p>
                <p className="text-[9px] font-mono text-muted-foreground/40">{stat.note}</p>
              </div>
            ))}
          </div>

          <p className="text-[9px] font-mono text-muted-foreground/30 mt-5 uppercase tracking-[0.12em]">
            Short-window raster-derived ECOSTRESS/AppEEARS output · January–June observations · Exploratory research prototype · Validation pending
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
