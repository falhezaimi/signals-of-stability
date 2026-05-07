'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Mountain, Satellite, Leaf, Thermometer, Droplets, Info } from 'lucide-react'

const mapLayers = [
  { id: 'terrain', label: 'Terrain', icon: Mountain },
  { id: 'satellite', label: 'Satellite', icon: Satellite },
  { id: 'vegetation', label: 'Vegetation', icon: Leaf },
  { id: 'thermal', label: 'Thermal', icon: Thermometer },
  { id: 'water', label: 'Water Stress', icon: Droplets },
]

function FallbackMap({ activeLayer }: { activeLayer: string }) {
  const layerColors: Record<string, { primary: string; secondary: string; name: string }> = {
    terrain: { primary: '#4a5568', secondary: '#2d3748', name: 'Elevation Model' },
    satellite: { primary: '#1a365d', secondary: '#2a4365', name: 'True Color' },
    vegetation: { primary: '#276749', secondary: '#22543d', name: 'NDVI Index' },
    thermal: { primary: '#9b2c2c', secondary: '#742a2a', name: 'Land Surface Temp' },
    water: { primary: '#2b6cb0', secondary: '#2c5282', name: 'ET Anomaly' },
  }

  const layer = layerColors[activeLayer] || layerColors.terrain

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-alpine-night">
      {/* Simplified terrain visualization */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse at 45% 40%, ${layer.primary}30 0%, transparent 50%),
            radial-gradient(ellipse at 60% 55%, ${layer.secondary}40 0%, transparent 45%),
            radial-gradient(ellipse at 35% 65%, ${layer.primary}35 0%, transparent 40%)
          `
        }}
      />
      
      {/* Minimalist contour lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${60 + i * 8},${150 + Math.sin(i * 0.8) * 25} Q${200 + Math.cos(i) * 40},${110 + i * 12} ${340 - i * 8},${155 + Math.cos(i * 0.6) * 30}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground/30"
          />
        ))}
      </svg>

      {/* Park boundary */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <path
          d="M120,80 L180,70 L240,90 L280,85 L300,110 L310,150 L290,190 L260,210 L200,220 L140,200 L100,160 L110,120 Z"
          fill="none"
          stroke="oklch(0.65 0.12 160)"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          className="opacity-60"
        />
        <circle cx="200" cy="140" r="3" fill="oklch(0.65 0.12 160)" className="opacity-60" />
      </svg>

      {/* Layer label */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-background/60 backdrop-blur-sm border border-border/30">
        <span className="text-[11px] font-mono text-muted-foreground">{layer.name}</span>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-background/60 backdrop-blur-sm border border-border/30 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <span className="text-[11px] font-mono text-muted-foreground">PREVIEW</span>
      </div>

      {/* Prototype notice */}
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-gold/10 border border-gold/20">
        <span className="text-[10px] font-mono text-gold/80">PROTOTYPE</span>
      </div>
    </div>
  )
}

interface MapboxMapProps {
  activeLayer: string
  mapboxToken?: string
}

function MapboxMap({ activeLayer, mapboxToken }: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current || mapRef.current) return

    const initMap = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')

      mapboxgl.accessToken = mapboxToken

      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [10.2176, 46.6603],
        zoom: 11,
        pitch: 45,
        bearing: -15,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.on('load', () => {
        setIsLoaded(true)
        
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

        map.addSource('park-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [10.08, 46.58],
                [10.12, 46.72],
                [10.32, 46.74],
                [10.38, 46.68],
                [10.35, 46.55],
                [10.20, 46.52],
                [10.08, 46.58],
              ]],
            },
          },
        })

        map.addLayer({
          id: 'park-boundary-line',
          type: 'line',
          source: 'park-boundary',
          paint: {
            'line-color': '#4ade80',
            'line-width': 2,
            'line-dasharray': [2, 2],
          },
        })
      })

      mapRef.current = map
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [mapboxToken])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return

    const styleMap: Record<string, string> = {
      terrain: 'mapbox://styles/mapbox/outdoors-v12',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
      vegetation: 'mapbox://styles/mapbox/satellite-v9',
      thermal: 'mapbox://styles/mapbox/dark-v11',
      water: 'mapbox://styles/mapbox/light-v11',
    }

    const newStyle = styleMap[activeLayer] || styleMap.terrain
    mapRef.current.setStyle(newStyle)
  }, [activeLayer, isLoaded])

  return (
    <div ref={mapContainerRef} className="w-full h-full rounded-lg">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function EarthMap() {
  const [activeLayer, setActiveLayer] = useState('terrain')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  return (
    <section id="earth" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm mb-6">
            <Layers className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Earth Observation
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Study Region
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground/80 text-sm text-balance">
            Interactive visualization of the Swiss National Park with multiple data layers
          </p>
        </motion.div>

        {/* Map Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="rounded-xl border border-border/30 bg-card/10 backdrop-blur-sm overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary/40" />
                <span className="text-sm font-mono text-foreground/70">Swiss National Park</span>
                <span className="text-[11px] font-mono text-muted-foreground/60 hidden sm:inline">46.6603°N, 10.2176°E</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/50">
                <span>170 km²</span>
              </div>
            </div>

            {/* Map container */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              {mapboxToken ? (
                <MapboxMap activeLayer={activeLayer} mapboxToken={mapboxToken} />
              ) : (
                <FallbackMap activeLayer={activeLayer} />
              )}

              {/* Layer controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                {mapLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                      activeLayer === layer.id
                        ? 'bg-primary/15 border-primary/30 text-foreground'
                        : 'bg-background/60 border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40'
                    }`}
                  >
                    <layer.icon className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium hidden sm:block">{layer.label}</span>
                  </button>
                ))}
              </div>

              {/* Info panel */}
              <div className="absolute bottom-4 left-4 max-w-xs hidden md:block">
                <div className="px-4 py-3 rounded-lg bg-background/70 backdrop-blur-sm border border-border/20">
                  <div className="flex items-start gap-3">
                    <Info className="w-3.5 h-3.5 text-primary/60 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                      The Swiss National Park, established in 1914, is the only national park in Switzerland.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border/20">
              {[
                { label: 'Coverage', value: '170 km²' },
                { label: 'Elevation Range', value: '1,674m' },
                { label: 'Protected Since', value: '1914' },
                { label: 'Data Points', value: '~2.4M' },
              ].map((stat, i) => (
                <div 
                  key={stat.label} 
                  className={`px-4 py-3 text-center ${i < 3 ? 'border-r border-border/10' : ''}`}
                >
                  <p className="text-[10px] text-muted-foreground/60 mb-0.5">{stat.label}</p>
                  <p className="text-xs font-mono text-foreground/80">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
