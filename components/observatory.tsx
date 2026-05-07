'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const layers = [
  { id: 'ndvi', label: 'NDVI', name: 'Vegetation Index', color: '#4ade80' },
  { id: 'et', label: 'ET', name: 'Evapotranspiration', color: '#60a5fa' },
  { id: 'lst', label: 'LST', name: 'Land Surface Temp', color: '#f97316' },
  { id: 'esi', label: 'ESI', name: 'Evaporative Stress', color: '#a78bfa' },
]

const years = ['2019', '2020', '2021', '2022', '2023', '2024']
const months = ['June', 'July', 'August']

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
  
  const cells = []
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 24; j++) {
      const seed = (i * 24 + j + layer.charCodeAt(0) + parseInt(year) + months.indexOf(month)) * 0.1
      const value = Math.sin(seed) * 0.5 + 0.5 + Math.cos(i * 0.3) * 0.2 + Math.sin(j * 0.2) * 0.15
      const opacity = Math.max(0.1, Math.min(1, value))
      const isValid = Math.random() > 0.12
      cells.push({ x: j, y: i, opacity, isValid })
    }
  }

  return (
    <div className="relative w-full h-full bg-alpine-night rounded-lg overflow-hidden">
      {/* Raster grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 160" preserveAspectRatio="none">
        {cells.map((cell, idx) => (
          <rect
            key={idx}
            x={cell.x * 10}
            y={cell.y * 10}
            width={10}
            height={10}
            fill={cell.isValid ? layerConfig.color : '#0f0f1a'}
            opacity={cell.isValid ? cell.opacity * 0.6 : 0.15}
          />
        ))}
      </svg>

      {/* Subtle contour overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 240 160">
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M${15 + i * 8},${80 + Math.sin(i * 0.8) * 20} Q${120 + Math.cos(i) * 25},${50 + i * 12} ${225 - i * 8},${85 + Math.cos(i * 0.6) * 25}`}
            fill="none"
            stroke="white"
            strokeWidth="0.4"
          />
        ))}
      </svg>

      {/* Park boundary */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 160">
        <path
          d="M60,35 L90,30 L135,40 L165,35 L180,50 L185,75 L175,105 L150,115 L105,118 L70,105 L50,80 Z"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="4,2"
          opacity="0.35"
        />
      </svg>

      {/* Corner coordinates */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-foreground/25">46.74°N</div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-foreground/25">10.38°E</div>

      {/* Prototype label */}
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-gold/15 border border-gold/20">
        <span className="text-[9px] font-mono text-gold/70">SIMULATED</span>
      </div>
    </div>
  )
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  return (
    <div className="flex items-end gap-0.5 h-6">
      {data.map((value, idx) => (
        <div
          key={idx}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: `${((value - min) / range) * 100}%`,
            minHeight: '3px',
            backgroundColor: color,
            opacity: 0.25 + (idx / data.length) * 0.55,
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

  const chartData = years.map((y) => {
    const d = generateMockData(activeLayer, y, activeMonth)
    return parseFloat(d.mean)
  })

  return (
    <section id="observatory" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background with subtle accent */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.015] blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary/80">
              Interactive Dashboard
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Observatory Interface
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground/80 text-sm text-balance">
            Explore vegetation, water, and thermal signals across time
          </p>
        </motion.div>

        {/* Observatory Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="rounded-xl border border-border/30 bg-card/10 backdrop-blur-sm overflow-hidden"
        >
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b border-border/20">
            {/* Layer selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border whitespace-nowrap transition-all duration-300 ${
                    activeLayer === layer.id
                      ? 'bg-card/80 border-border/50 text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: layer.color, opacity: activeLayer === layer.id ? 1 : 0.5 }}
                  />
                  <span className="text-xs font-medium">{layer.label}</span>
                </button>
              ))}
            </div>

            {/* Coverage badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/40 border border-border/20">
              <span className={`w-1.5 h-1.5 rounded-full ${currentData.coverage >= 70 ? 'bg-primary/60' : 'bg-gold/60'}`} />
              <span className="text-[11px] font-mono text-muted-foreground/70">Coverage:</span>
              <span className="text-[11px] font-mono text-foreground/80">{currentData.coverage}%</span>
            </div>
          </div>

          {/* Main content area */}
          <div className="grid lg:grid-cols-[1fr_280px]">
            {/* Raster visualization */}
            <div className="p-4">
              <div className="aspect-[16/10] relative">
                <RasterVisualization layer={activeLayer} year={activeYear} month={activeMonth} />
              </div>
            </div>

            {/* Side panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-border/20 p-4 space-y-5">
              {/* Year selector */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">Year</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 ${
                        activeYear === year
                          ? 'bg-primary/15 border-primary/30 text-foreground'
                          : 'border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month selector */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">Month</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => setActiveMonth(month)}
                      className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 ${
                        activeMonth === month
                          ? 'bg-primary/15 border-primary/30 text-foreground'
                          : 'border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40'
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">Statistics</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-background/30 border border-border/15">
                    <p className="text-[9px] text-muted-foreground/60 mb-0.5">Mean</p>
                    <p className="text-base font-mono" style={{ color: layerConfig.color }}>{currentData.mean}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background/30 border border-border/15">
                    <p className="text-[9px] text-muted-foreground/60 mb-0.5">Anomaly</p>
                    <p className={`text-base font-mono ${parseFloat(currentData.anomaly) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {parseFloat(currentData.anomaly) >= 0 ? '+' : ''}{currentData.anomaly}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trend chart */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">Trend (2019-2024)</p>
                <div className="p-2.5 rounded-lg bg-background/30 border border-border/15">
                  <MiniChart data={chartData} color={layerConfig.color} />
                  <div className="flex justify-between mt-1.5 text-[9px] font-mono text-muted-foreground/50">
                    <span>2019</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">Legend</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-1.5 flex-1 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${layerConfig.color}15, ${layerConfig.color})`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-muted-foreground/50">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology note */}
          <div className="p-4 border-t border-border/20">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-3.5 h-3.5 text-gold/70 mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                Only raster scenes with at least 70% valid spatial coverage are included. 
                Current display uses simulated data for demonstration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
