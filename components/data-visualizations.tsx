'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// Simulated data
const vegetationData = [
  { year: '2019', ndvi: 0.62, ndviMin: 0.48, ndviMax: 0.74 },
  { year: '2020', ndvi: 0.64, ndviMin: 0.51, ndviMax: 0.76 },
  { year: '2021', ndvi: 0.58, ndviMin: 0.42, ndviMax: 0.71 },
  { year: '2022', ndvi: 0.61, ndviMin: 0.47, ndviMax: 0.73 },
  { year: '2023', ndvi: 0.63, ndviMin: 0.50, ndviMax: 0.75 },
  { year: '2024', ndvi: 0.65, ndviMin: 0.52, ndviMax: 0.77 },
]

const seasonalETData = [
  { month: 'June', y2019: 3.8, y2021: 3.2, y2023: 4.0 },
  { month: 'July', y2019: 4.5, y2021: 3.6, y2023: 4.7 },
  { month: 'August', y2019: 4.2, y2021: 3.5, y2023: 4.4 },
]

const stressMatrix = [
  { year: '2019', jun: -0.2, jul: -0.3, aug: -0.4 },
  { year: '2020', jun: -0.1, jul: -0.2, aug: -0.3 },
  { year: '2021', jun: 0.2, jul: 0.5, aug: 0.6 },
  { year: '2022', jun: 0.1, jul: 0.3, aug: 0.2 },
  { year: '2023', jun: -0.1, jul: 0.0, aug: -0.2 },
  { year: '2024', jun: -0.3, jul: -0.4, aug: -0.5 },
]

const coverageData = [
  { year: '2019', coverage: 82 },
  { year: '2020', coverage: 78 },
  { year: '2021', coverage: 71 },
  { year: '2022', coverage: 85 },
  { year: '2023', coverage: 88 },
  { year: '2024', coverage: 79 },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg bg-card/95 border border-border/40 shadow-lg backdrop-blur-sm">
        <p className="text-[10px] font-mono text-muted-foreground/70 mb-1">{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }, index: number) => (
          <p key={index} className="text-xs font-mono" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function HeatmapCell({ value, maxAbs = 0.6 }: { value: number; maxAbs?: number }) {
  const normalizedValue = value / maxAbs
  const opacity = Math.min(0.8, Math.abs(normalizedValue) * 0.8 + 0.2)
  const color = value > 0 
    ? `oklch(0.75 0.08 85 / ${opacity})`
    : `oklch(0.65 0.08 160 / ${opacity})`

  return (
    <div
      className="aspect-square rounded flex items-center justify-center text-[9px] font-mono transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: color, color: 'white' }}
    >
      {value > 0 ? '+' : ''}{value.toFixed(1)}
    </div>
  )
}

export function DataVisualizations() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeChart, setActiveChart] = useState<'vegetation' | 'et' | 'stress' | 'coverage'>('vegetation')

  return (
    <section id="findings" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Data Analysis
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Visualizing the Signals
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground/80 text-sm text-balance">
            Publication-grade visualizations of vegetation, water, and stress indicators
          </p>
        </motion.div>

        {/* Chart selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-1.5 mb-8"
        >
          {[
            { id: 'vegetation', label: 'Vegetation Index' },
            { id: 'et', label: 'Seasonal ET' },
            { id: 'stress', label: 'Stress Matrix' },
            { id: 'coverage', label: 'Data Quality' },
          ].map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id as typeof activeChart)}
              className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all duration-300 ${
                activeChart === chart.id
                  ? 'bg-primary/15 border-primary/30 text-foreground'
                  : 'border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40'
              }`}
            >
              {chart.label}
            </button>
          ))}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="rounded-xl border border-border/25 bg-card/10 overflow-hidden"
        >
          {/* Vegetation Index Chart */}
          {activeChart === 'vegetation' && (
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Vegetation Greenness (NDVI)</h3>
                  <p className="text-xs text-muted-foreground/60">Mean growing season values with range</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/40">Simulated Data</span>
              </div>
              <div className="h-[280px] md:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vegetationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.12 160)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="oklch(0.65 0.12 160)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240 / 0.4)" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: 'oklch(0.5 0.02 240)', fontSize: 10 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240 / 0.4)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[0.4, 0.8]}
                      tick={{ fill: 'oklch(0.5 0.02 240)', fontSize: 10 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240 / 0.4)' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="ndviMax"
                      stroke="none"
                      fill="oklch(0.65 0.12 160)"
                      fillOpacity={0.08}
                    />
                    <Area
                      type="monotone"
                      dataKey="ndviMin"
                      stroke="none"
                      fill="oklch(0.08 0.01 240)"
                    />
                    <Line
                      type="monotone"
                      dataKey="ndvi"
                      stroke="oklch(0.65 0.12 160)"
                      strokeWidth={1.5}
                      dot={{ fill: 'oklch(0.65 0.12 160)', strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, fill: 'oklch(0.65 0.12 160)' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Seasonal ET Comparison */}
          {activeChart === 'et' && (
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Seasonal Evapotranspiration</h3>
                  <p className="text-xs text-muted-foreground/60">Monthly comparison across selected years (mm/day)</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/40">Simulated Data</span>
              </div>
              <div className="h-[280px] md:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalETData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240 / 0.4)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: 'oklch(0.5 0.02 240)', fontSize: 10 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240 / 0.4)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[2, 5]}
                      tick={{ fill: 'oklch(0.5 0.02 240)', fontSize: 10 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240 / 0.4)' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '16px' }}
                      formatter={(value) => <span className="text-[10px] text-muted-foreground/70">{value}</span>}
                    />
                    <Line
                      type="monotone"
                      dataKey="y2019"
                      name="2019 (Baseline)"
                      stroke="oklch(0.45 0.02 240)"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      dot={{ fill: 'oklch(0.45 0.02 240)', strokeWidth: 0, r: 2.5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="y2021"
                      name="2021 (Drought)"
                      stroke="oklch(0.75 0.08 85)"
                      strokeWidth={1.5}
                      dot={{ fill: 'oklch(0.75 0.08 85)', strokeWidth: 0, r: 2.5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="y2023"
                      name="2023 (Recovery)"
                      stroke="oklch(0.7 0.08 220)"
                      strokeWidth={1.5}
                      dot={{ fill: 'oklch(0.7 0.08 220)', strokeWidth: 0, r: 2.5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Stress Matrix */}
          {activeChart === 'stress' && (
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Monthly Stress Index Matrix</h3>
                  <p className="text-xs text-muted-foreground/60">Evaporative stress anomalies (ESI) by year and month</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/40">Simulated Data</span>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[320px] max-w-md mx-auto">
                  {/* Header */}
                  <div className="grid grid-cols-[70px_1fr_1fr_1fr] gap-1.5 mb-1.5">
                    <div />
                    <div className="text-center text-[10px] font-mono text-muted-foreground/60 py-1.5">Jun</div>
                    <div className="text-center text-[10px] font-mono text-muted-foreground/60 py-1.5">Jul</div>
                    <div className="text-center text-[10px] font-mono text-muted-foreground/60 py-1.5">Aug</div>
                  </div>
                  {/* Matrix rows */}
                  {stressMatrix.map((row) => (
                    <div key={row.year} className="grid grid-cols-[70px_1fr_1fr_1fr] gap-1.5 mb-1.5">
                      <div className="flex items-center text-xs font-mono text-foreground/60">{row.year}</div>
                      <HeatmapCell value={row.jun} />
                      <HeatmapCell value={row.jul} />
                      <HeatmapCell value={row.aug} />
                    </div>
                  ))}
                  {/* Legend */}
                  <div className="mt-5 flex items-center justify-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: 'oklch(0.65 0.08 160 / 0.6)' }} />
                      <span className="text-[10px] text-muted-foreground/60">No Stress</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: 'oklch(0.75 0.08 85 / 0.6)' }} />
                      <span className="text-[10px] text-muted-foreground/60">Elevated Stress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Quality / Coverage */}
          {activeChart === 'coverage' && (
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Valid Data Coverage</h3>
                  <p className="text-xs text-muted-foreground/60">Percentage of valid pixels meeting 70% threshold</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/40">Simulated Data</span>
              </div>
              <div className="h-[280px] md:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={coverageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.7 0.08 220)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="oklch(0.7 0.08 220)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240 / 0.4)" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: 'oklch(0.5 0.02 240)', fontSize: 10 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240 / 0.4)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[60, 100]}
                      tick={{ fill: 'oklch(0.5 0.02 240)', fontSize: 10 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240 / 0.4)' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {/* 70% threshold line */}
                    <Line
                      type="monotone"
                      dataKey={() => 70}
                      stroke="oklch(0.75 0.08 85 / 0.5)"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      dot={false}
                      name="70% Threshold"
                    />
                    <Area
                      type="monotone"
                      dataKey="coverage"
                      stroke="oklch(0.7 0.08 220)"
                      strokeWidth={1.5}
                      fill="url(#coverageGradient)"
                      name="Coverage"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex items-center justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-0.5 rounded bg-gold/50" style={{ backgroundImage: 'repeating-linear-gradient(90deg, oklch(0.75 0.08 85 / 0.5) 0, oklch(0.75 0.08 85 / 0.5) 4px, transparent 4px, transparent 8px)' }} />
                  <span className="text-[10px] text-muted-foreground/60">70% Threshold</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="px-5 py-3 border-t border-border/15">
            <p className="text-[10px] text-muted-foreground/50 text-center">
              All visualizations use prototype/simulated data for demonstration purposes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
