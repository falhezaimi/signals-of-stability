'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Info, AlertCircle } from 'lucide-react'

const layers = [
  { id: 'ndvi', label: 'NDVI', name: 'Vegetation Index', color: '#4ade80' },
  { id: 'et', label: 'ET', name: 'Evapotranspiration', color: '#60a5fa' },
  { id: 'lst', label: 'LST', name: 'Land Surface Temp', color: '#f97316' },
  { id: 'esi', label: 'ESI', name: 'Evaporative Stress', color: '#a855f7' },
]

const years = ['2019', '2020', '2021', '2022', '2023', '2024']
const months = ['June', 'July', 'August']

// Simulated data for visualization
const generateMockData = (layer: string, year: string, month: string) => {
  const seed = layer.charCodeAt(0) + parseInt(year) + month.charCodeAt(0)
  const base = Math.sin(seed) * 0.3 + 0.5
  return {
    mean: (base * 0.6 + 0.2).toFixed(3),
    min: (base * 0.4 + 0.1).toFixed(3),
    max: (base * 0.8 + 0.15).toFixed(3),
    coverage: Math.floor(70 + Math.sin(seed * 2) * 25),
    anomaly: (Math.sin(seed * 3) * 0.15).toFixed(3),
  }
}

function RasterVisualization({ layer, year, month }: { layer: string; year: string; month: string }) {
  const layerConfig = layers.find(l => l.id === layer) || layers[0]
  
  // Generate a grid pattern based on the parameters
  const cells = []
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 30; j++) {
      const seed = (i * 30 + j + layer.charCodeAt(0) + parseInt(year) + months.indexOf(month)) * 0.1
      const value = Math.sin(seed) * 0.5 + 0.5 + Math.cos(i * 0.3) * 0.2 + Math.sin(j * 0.2) * 0.15
      const opacity = Math.max(0.1, Math.min(1, value))
      const isValid = Math.random() > 0.15 // 85% valid pixels
      cells.push({ x: j, y: i, opacity, isValid })
    }
  }

  return (
    <div className="relative w-full h-full bg-alpine-night rounded-lg overflow-hidden">
      {/* Raster grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
        {cells.map((cell, idx) => (
          <rect
            key={idx}
            x={cell.x * 10}
            y={cell.y * 10}
            width={10}
            height={10}
            fill={cell.isValid ? layerConfig.color : '#1a1a2e'}
            opacity={cell.isValid ? cell.opacity * 0.7 : 0.2}
          />
        ))}
      </svg>

      {/* Contour overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 200">
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d={`M${20 + i * 10},${100 + Math.sin(i * 0.8) * 30} Q${150 + Math.cos(i) * 30},${60 + i * 15} ${280 - i * 10},${110 + Math.cos(i * 0.6) * 40}`}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Park boundary */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
        <path
          d="M80,50 L120,40 L180,55 L220,50 L240,70 L250,100 L235,140 L200,160 L140,165 L90,145 L60,110 Z"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="6,3"
          opacity="0.5"
        />
      </svg>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ y: [-10, 210] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Corner coordinates */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-foreground/40">46.74°N 10.08°E</div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-foreground/40">46.52°N 10.38°E</div>

      {/* Prototype label */}
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-gold/20 border border-gold/30">
        <span className="text-[10px] font-mono text-gold">SIMULATED DATA</span>
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
          className="flex-1 rounded-t transition-all"
          style={{
            height: `${((value - min) / range) * 100}%`,
            minHeight: '4px',
            backgroundColor: color,
            opacity: 0.3 + (idx / data.length) * 0.7,
          }}
        />
      ))}
    </div>
  )
}

export function Observatory() {
  const [activeLayer, setActiveLayer] = useState('ndvi')
  const [activeYear, setActiveYear] = useState('2024')
  const [activeMonth, setActiveMonth] = useState('July')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const currentData = generateMockData(activeLayer, activeYear, activeMonth)
  const layerConfig = layers.find(l => l.id === activeLayer) || layers[0]

  // Generate chart data
  const chartData = years.map((y) => {
    const d = generateMockData(activeLayer, y, activeMonth)
    return parseFloat(d.mean)
  })

  return (
    <section id="observatory" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-alpine-night/50 to-background" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Interactive Dashboard
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Observatory Interface
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-balance">
            Explore vegetation, water, and thermal signals across time. 
            Toggle data layers and navigate through years of observation.
          </p>
        </motion.div>

        {/* Observatory Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
        >
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b border-border/50 bg-card/50">
            {/* Layer selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap transition-all ${
                    activeLayer === layer.id
                      ? 'bg-card border-border text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-sm font-medium">{layer.label}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{layer.name}</span>
                </button>
              ))}
            </div>

            {/* Coverage badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50">
              <div className={`w-2 h-2 rounded-full ${currentData.coverage >= 70 ? 'bg-primary' : 'bg-gold'}`} />
              <span className="text-xs font-mono text-muted-foreground">Coverage:</span>
              <span className="text-xs font-mono text-foreground">{currentData.coverage}%</span>
            </div>
          </div>

          {/* Main content area */}
          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Raster visualization */}
            <div className="p-4">
              <div className="aspect-[16/10] relative">
                <RasterVisualization layer={activeLayer} year={activeYear} month={activeMonth} />
              </div>
            </div>

            {/* Side panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-border/50 p-4 space-y-6">
              {/* Date selectors */}
              <div className="space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Year</p>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-3 py-2 text-sm font-mono rounded-lg border transition-all ${
                        activeYear === year
                          ? 'bg-primary/20 border-primary/50 text-foreground'
                          : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Month</p>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => setActiveMonth(month)}
                      className={`px-3 py-2 text-sm font-mono rounded-lg border transition-all ${
                        activeMonth === month
                          ? 'bg-primary/20 border-primary/50 text-foreground'
                          : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Statistics</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-[10px] text-muted-foreground mb-1">Mean</p>
                    <p className="text-lg font-mono" style={{ color: layerConfig.color }}>{currentData.mean}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-[10px] text-muted-foreground mb-1">Anomaly</p>
                    <p className={`text-lg font-mono ${parseFloat(currentData.anomaly) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {parseFloat(currentData.anomaly) >= 0 ? '+' : ''}{currentData.anomaly}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-[10px] text-muted-foreground mb-1">Min</p>
                    <p className="text-sm font-mono text-foreground/70">{currentData.min}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-[10px] text-muted-foreground mb-1">Max</p>
                    <p className="text-sm font-mono text-foreground/70">{currentData.max}</p>
                  </div>
                </div>
              </div>

              {/* Trend chart */}
              <div className="space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Trend (2019-2024)</p>
                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                  <MiniChart data={chartData} color={layerConfig.color} />
                  <div className="flex justify-between mt-2 text-[10px] font-mono text-muted-foreground">
                    <span>2019</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Legend</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-2 flex-1 rounded"
                    style={{
                      background: `linear-gradient(to right, ${layerConfig.color}20, ${layerConfig.color})`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology note */}
          <div className="p-4 border-t border-border/50 bg-card/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gold mb-1">Methodology Note</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Only raster scenes with at least 70% valid spatial coverage are included to reduce 
                  misleading interpretations from incomplete imagery. Current display uses simulated 
                  data for demonstration purposes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
