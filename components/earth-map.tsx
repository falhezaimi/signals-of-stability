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

// Fallback visual when no Mapbox token
function FallbackMap({ activeLayer }: { activeLayer: string }) {
  const layerColors: Record<string, { primary: string; secondary: string; name: string }> = {
    terrain: { primary: '#4a5568', secondary: '#2d3748', name: 'Elevation Model' },
    satellite: { primary: '#1a365d', secondary: '#2a4365', name: 'True Color' },
    vegetation: { primary: '#276749', secondary: '#22543d', name: 'NDVI Index' },
    thermal: { primary: '#c53030', secondary: '#9b2c2c', name: 'Land Surface Temp' },
    water: { primary: '#2b6cb0', secondary: '#2c5282', name: 'ET Anomaly' },
  }

  const layer = layerColors[activeLayer] || layerColors.terrain

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Simulated satellite view with terrain */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(ellipse at 45% 40%, ${layer.primary}40 0%, transparent 50%),
            radial-gradient(ellipse at 60% 55%, ${layer.secondary}60 0%, transparent 45%),
            radial-gradient(ellipse at 35% 65%, ${layer.primary}50 0%, transparent 40%),
            radial-gradient(ellipse at 70% 35%, ${layer.secondary}40 0%, transparent 35%),
            linear-gradient(180deg, ${layer.secondary}80 0%, ${layer.primary}90 100%)
          `
        }}
      />
      
      {/* Contour lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M${50 + i * 5},${150 + Math.sin(i * 0.8) * 30} Q${200 + Math.cos(i) * 50},${100 + i * 10} ${350 - i * 5},${160 + Math.cos(i * 0.6) * 40}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground/20"
          />
        ))}
      </svg>

      {/* Park boundary indicator */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <path
          d="M120,80 L180,70 L240,90 L280,85 L300,110 L310,150 L290,190 L260,210 L200,220 L140,200 L100,160 L110,120 Z"
          fill="none"
          stroke="oklch(0.65 0.12 160)"
          strokeWidth="2"
          strokeDasharray="8,4"
          className="animate-pulse"
        />
        <circle cx="200" cy="140" r="4" fill="oklch(0.65 0.12 160)" />
      </svg>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.65 0.12 160) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.65 0.12 160) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scanning line */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ y: [-10, 310] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Layer label */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-background/80 backdrop-blur-sm border border-border/50">
        <span className="text-xs font-mono text-muted-foreground">{layer.name}</span>
      </div>

      {/* Data quality indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-background/80 backdrop-blur-sm border border-border/50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-mono text-muted-foreground">LIVE PREVIEW</span>
      </div>

      {/* Prototype notice */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded bg-gold/10 border border-gold/30">
        <span className="text-xs font-mono text-gold">PROTOTYPE VISUALIZATION</span>
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
        center: [10.2176, 46.6603], // Swiss National Park coordinates
        zoom: 11,
        pitch: 45,
        bearing: -15,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.on('load', () => {
        setIsLoaded(true)
        
        // Add terrain
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

        // Add park boundary (approximate)
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

  // Update layer style
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
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
  
  // Check for Mapbox token
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  return (
    <section id="earth" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm mb-6">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Earth Observation
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Live Earth Context
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-balance">
            Interactive visualization of the Swiss National Park study region with multiple data layers
          </p>
        </motion.div>

        {/* Map Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary/50" />
                <span className="text-sm font-mono text-foreground/80">Swiss National Park</span>
                <span className="text-xs font-mono text-muted-foreground">46.6603°N, 10.2176°E</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span>ELEV: 1,500-3,174m</span>
                <span className="w-px h-3 bg-border" />
                <span>AREA: 170km²</span>
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
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {mapLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all ${
                      activeLayer === layer.id
                        ? 'bg-primary/20 border-primary/50 text-foreground'
                        : 'bg-background/80 border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <layer.icon className="w-4 h-4" />
                    <span className="text-xs font-medium hidden sm:block">{layer.label}</span>
                  </button>
                ))}
              </div>

              {/* Info panel */}
              <div className="absolute bottom-4 left-4 max-w-xs">
                <div className="px-4 py-3 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50">
                  <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">Study Region</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        The Swiss National Park, established in 1914, is the only national park in Switzerland 
                        and one of the oldest in the Alps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/50">
              {[
                { label: 'Coverage', value: '170 km²' },
                { label: 'Elevation Range', value: '1,674m' },
                { label: 'Protected Since', value: '1914' },
                { label: 'Data Points', value: '~2.4M' },
              ].map((stat) => (
                <div key={stat.label} className="px-4 py-3 bg-card/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-sm font-mono text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
