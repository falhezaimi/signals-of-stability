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
import { Info } from 'lucide-react'

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
      <div className="px-3 py-2 rounded-lg bg-card border border-border shadow-xl">
        <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }, index: number) => (
          <p key={index} className="text-sm font-mono" style={{ color: entry.color }}>
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
  const color = value > 0 
    ? `oklch(0.75 ${Math.abs(normalizedValue) * 0.12} 85)` // gold for stress
    : `oklch(0.65 ${Math.abs(normalizedValue) * 0.12} 160)` // green for normal

  return (
    <div
      className="aspect-square rounded flex items-center justify-center text-[10px] font-mono transition-all hover:scale-110"
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
    <section id="findings" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Data Analysis
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Visualizing the Signals
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-balance">
            Publication-grade visualizations of vegetation, water, and stress indicators
          </p>
        </motion.div>

        {/* Chart selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
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
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                activeChart === chart.id
                  ? 'bg-primary/20 border-primary/50 text-foreground'
                  : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {chart.label}
            </button>
          ))}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
        >
          {/* Vegetation Index Chart */}
          {activeChart === 'vegetation' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-1">Vegetation Greenness (NDVI)</h3>
                  <p className="text-sm text-muted-foreground">Mean growing season values with range</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>Simulated Data</span>
                </div>
              </div>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vegetationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.12 160)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.65 0.12 160)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240)" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: 'oklch(0.55 0.02 240)', fontSize: 12 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240)' }}
                    />
                    <YAxis 
                      domain={[0.4, 0.8]}
                      tick={{ fill: 'oklch(0.55 0.02 240)', fontSize: 12 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="ndviMax"
                      stroke="none"
                      fill="oklch(0.65 0.12 160)"
                      fillOpacity={0.1}
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
                      strokeWidth={2}
                      dot={{ fill: 'oklch(0.65 0.12 160)', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: 'oklch(0.65 0.12 160)' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Seasonal ET Comparison */}
          {activeChart === 'et' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-1">Seasonal Evapotranspiration</h3>
                  <p className="text-sm text-muted-foreground">Monthly comparison across selected years (mm/day)</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>Simulated Data</span>
                </div>
              </div>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalETData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: 'oklch(0.55 0.02 240)', fontSize: 12 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240)' }}
                    />
                    <YAxis 
                      domain={[2, 5]}
                      tick={{ fill: 'oklch(0.55 0.02 240)', fontSize: 12 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                    />
                    <Line
                      type="monotone"
                      dataKey="y2019"
                      name="2019 (Baseline)"
                      stroke="oklch(0.45 0.02 240)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'oklch(0.45 0.02 240)', strokeWidth: 0, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="y2021"
                      name="2021 (Drought)"
                      stroke="oklch(0.75 0.12 85)"
                      strokeWidth={2}
                      dot={{ fill: 'oklch(0.75 0.12 85)', strokeWidth: 0, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="y2023"
                      name="2023 (Recovery)"
                      stroke="oklch(0.7 0.1 220)"
                      strokeWidth={2}
                      dot={{ fill: 'oklch(0.7 0.1 220)', strokeWidth: 0, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Stress Matrix */}
          {activeChart === 'stress' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-1">Monthly Stress Index Matrix</h3>
                  <p className="text-sm text-muted-foreground">Evaporative stress anomalies (ESI) by year and month</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>Simulated Data</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                  {/* Header */}
                  <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2 mb-2">
                    <div />
                    <div className="text-center text-xs font-mono text-muted-foreground py-2">June</div>
                    <div className="text-center text-xs font-mono text-muted-foreground py-2">July</div>
                    <div className="text-center text-xs font-mono text-muted-foreground py-2">August</div>
                  </div>
                  {/* Matrix rows */}
                  {stressMatrix.map((row) => (
                    <div key={row.year} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2 mb-2">
                      <div className="flex items-center text-sm font-mono text-foreground/80">{row.year}</div>
                      <HeatmapCell value={row.jun} />
                      <HeatmapCell value={row.jul} />
                      <HeatmapCell value={row.aug} />
                    </div>
                  ))}
                  {/* Legend */}
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: 'oklch(0.65 0.12 160)' }} />
                      <span className="text-xs text-muted-foreground">No Stress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: 'oklch(0.75 0.12 85)' }} />
                      <span className="text-xs text-muted-foreground">Elevated Stress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Quality / Coverage */}
          {activeChart === 'coverage' && (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-1">Valid Data Coverage</h3>
                  <p className="text-sm text-muted-foreground">Percentage of valid pixels meeting 70% threshold</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>Simulated Data</span>
                </div>
              </div>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={coverageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.7 0.1 220)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.7 0.1 220)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240)" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: 'oklch(0.55 0.02 240)', fontSize: 12 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240)' }}
                    />
                    <YAxis 
                      domain={[60, 100]}
                      tick={{ fill: 'oklch(0.55 0.02 240)', fontSize: 12 }}
                      axisLine={{ stroke: 'oklch(0.2 0.02 240)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {/* 70% threshold line */}
                    <Line
                      type="monotone"
                      dataKey={() => 70}
                      stroke="oklch(0.75 0.12 85)"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                      name="70% Threshold"
                    />
                    <Area
                      type="monotone"
                      dataKey="coverage"
                      stroke="oklch(0.7 0.1 220)"
                      strokeWidth={2}
                      fill="url(#coverageGradient)"
                      name="Coverage"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 rounded" style={{ backgroundColor: 'oklch(0.75 0.12 85)' }} />
                  <span className="text-muted-foreground">70% Threshold</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="px-6 py-4 border-t border-border/50 bg-card/30">
            <p className="text-xs text-muted-foreground text-center">
              All visualizations use prototype/simulated data for demonstration. 
              Real analysis outputs will be integrated when available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
