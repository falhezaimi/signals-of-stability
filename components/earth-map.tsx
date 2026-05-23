'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Mountain, Leaf, Thermometer, Droplets, Satellite } from 'lucide-react'

// Real raster layer definitions — ECOSTRESS/AppEEARS output, January–June 2023 reference
type LayerDef = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  png: string | null
  title: string
  caption: string
  mean: number | null
  unit: string | null
  meanLabel: string | null
}

const mapLayers: LayerDef[] = [
  {
    id: 'context',
    label: 'Context',
    icon: Mountain,
    png: null,
    title: 'Cartographic Context',
    caption: 'Topographic reference overlay — Swiss National Park boundary · Graubünden, CH · 46.6603°N 10.2176°E. No ECOSTRESS signal on this layer.',
    mean: null,
    unit: null,
    meanLabel: null,
  },
  {
    id: 'ndvi',
    label: 'NDVI',
    icon: Leaf,
    png: '/data/rasters/ndvi_2023_apr_jun_mean.png',
    title: 'NDVI Raster Composite',
    caption: 'Vegetation Index area mean · January–June 2023 · Highest area-mean NDVI in the 2019–2025 series · ECOSTRESS ECO2LSTE · AppEEARS output.',
    mean: 0.1632,
    unit: 'index',
    meanLabel: 'area mean',
  },
  {
    id: 'et',
    label: 'ET',
    icon: Thermometer,
    png: '/data/rasters/et_2023_apr_jun_mean.png',
    title: 'ET Short-Window Signal',
    caption: 'Evapotranspiration area mean · January–June 2023 · ECOSTRESS ECO3ETPTJPL product · mm/day · Raster-derived, requires validation.',
    mean: 1.4058,
    unit: 'mm/day',
    meanLabel: 'area mean',
  },
  {
    id: 'esi',
    label: 'ESI',
    icon: Droplets,
    png: '/data/rasters/esi_2023_apr_jun_mean.png',
    title: 'ESI Short-Window Signal',
    caption: 'Evaporative Stress Index · January–June 2023 · Scale 0–1, higher = lower stress · ECOSTRESS ECO4ESIPTJPL · Directional signal only.',
    mean: 0.7811,
    unit: '0–1',
    meanLabel: 'area mean',
  },
  {
    id: 'coverage',
    label: 'Coverage',
    icon: Satellite,
    png: '/data/rasters/ndvi_2023_apr_jun_observation_coverage.png',
    title: 'Observation Coverage',
    caption: 'ECOSTRESS overpass count per pixel · January–June 2023 · ~37% of AOI pixels have valid composite data · ISS orbital constraint.',
    mean: null,
    unit: null,
    meanLabel: null,
  },
]

// Real bottom-strip metadata — verified against pipeline outputs
const BOTTOM_STATS = [
  { label: 'Study Area', value: '170 km²' },
  { label: 'Protected Since', value: '1914' },
  { label: 'Analysis Window', value: 'Jan–Jun · 2019–2025' },
  { label: 'Raster Inputs', value: '1,059' },
]

function RasterMapPanel({ activeLayer }: { activeLayer: string }) {
  const layer = mapLayers.find((l) => l.id === activeLayer) || mapLayers[0]
  const hasPNG = Boolean(layer.png)

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'oklch(0.085 0.012 222)' }}>

      {/* Terrain gradient blobs — context layer only */}
      {!hasPNG && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 42% 38%, #3F6F4238 0%, transparent 52%),
              radial-gradient(ellipse at 62% 58%, #3F6F4245 0%, transparent 48%),
              radial-gradient(ellipse at 32% 68%, #3F6F4230 0%, transparent 42%),
              radial-gradient(ellipse at 72% 32%, #3F6F4225 0%, transparent 35%)
            `,
          }}
        />
      )}

      {/* Real raster PNG — animated fade on layer switch */}
      {hasPNG && (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layer.png!}
            alt={layer.title}
            loading="eager"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
          />
        </motion.div>
      )}

      {/* Scan-line texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <defs>
          <pattern id="em-scanline" x="0" y="0" width="1" height="2" patternUnits="userSpaceOnUse">
            <rect y="1" width="1" height="1" fill="black" fillOpacity="0.07" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#em-scanline)" />
      </svg>

      {/* Instrument overlay: coordinate grid + contours + boundary + marks */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 270" aria-hidden>
        {/* Grid lines */}
        {[0,1,2,3].map((i) => (
          <g key={`g${i}`} opacity={hasPNG ? 0.12 : 0.10}>
            <line x1={80 + i * 80} y1="12" x2={80 + i * 80} y2="258" stroke="#DDD3BE" strokeWidth="0.4" strokeDasharray="2 4" />
            <line x1="20" y1={45 + i * 60} x2="390" y2={45 + i * 60} stroke="#DDD3BE" strokeWidth="0.4" strokeDasharray="2 4" />
          </g>
        ))}
        {/* Longitude labels */}
        {[0,1,2,3].map((i) => (
          <text key={`lon${i}`} x={80 + i * 80} y="10" textAnchor="middle" fontSize="6" fill="#DDD3BE" opacity="0.28" fontFamily="monospace">
            {(10.08 + i * 0.10).toFixed(2)}°E
          </text>
        ))}
        {/* Latitude labels */}
        {[0,1,2,3].map((i) => (
          <text key={`lat${i}`} x="16" y={49 + i * 60} textAnchor="end" fontSize="6" fill="#DDD3BE" opacity="0.28" fontFamily="monospace">
            {(46.72 - i * 0.05).toFixed(2)}N
          </text>
        ))}

        {/* Topographic contours — dimmer when raster PNG is the base */}
        {[0,1,2,3,4,5,6].map((i) => (
          <ellipse key={`ec${i}`} cx="195" cy="128" rx={20+i*18} ry={14+i*13}
            fill="none" stroke="#DDD3BE" strokeWidth={i===0?0.8:0.35}
            opacity={(hasPNG ? 0.07 : 0.22) - i*(hasPNG ? 0.008 : 0.025)}
            transform={`rotate(${-8+i*4} 195 128)`} />
        ))}
        {/* Ridge spur SE — context layer only */}
        {!hasPNG && [0,1,2,3].map((i) => (
          <ellipse key={`rs${i}`} cx="270" cy="175" rx={12+i*14} ry={8+i*10}
            fill="none" stroke="#DDD3BE" strokeWidth="0.3" opacity={0.14-i*0.02}
            transform="rotate(20 270 175)" />
        ))}
        {/* Index contours bold */}
        {[2,5].map((i) => (
          <ellipse key={`ic${i}`} cx="195" cy="128" rx={20+i*18} ry={14+i*13}
            fill="none" stroke="#DDD3BE" strokeWidth="0.65" opacity={hasPNG ? 0.05 : 0.16}
            transform={`rotate(${-8+i*4} 195 128)`} />
        ))}
        {/* Elevation labels — context layer only */}
        {!hasPNG && (
          <>
            <text x="200" y="118" fontSize="6" fill="#DDD3BE" opacity="0.35" fontFamily="monospace">2847m</text>
            <text x="228" y="144" fontSize="5.5" fill="#DDD3BE" opacity="0.22" fontFamily="monospace">2600</text>
            <text x="246" y="166" fontSize="5.5" fill="#DDD3BE" opacity="0.17" fontFamily="monospace">2400</text>
          </>
        )}

        {/* SNP boundary — more prominent over raster */}
        <path
          d="M118,78 L178,68 L242,88 L282,84 L302,108 L312,148 L292,190 L262,212 L202,222 L142,202 L98,160 L108,118 Z"
          fill="none" stroke="#3F6B4A" strokeWidth={hasPNG ? 1.6 : 1.4}
          strokeDasharray="5,3" opacity={hasPNG ? 0.82 : 0.65}
        />
        {/* Center point */}
        <circle cx="200" cy="140" r="2.5" fill="#3F6B4A" opacity="0.70" />
        <circle cx="200" cy="140" r="6" fill="none" stroke="#3F6B4A" strokeWidth="0.5" opacity="0.30" />

        {/* Corner registration marks */}
        {[[22,14],[378,14],[22,256],[378,256]].map(([cx,cy],i) => (
          <g key={`rm${i}`} opacity="0.22">
            <line x1={cx-5} y1={cy} x2={cx+5} y2={cy} stroke="#DDD3BE" strokeWidth="0.6"/>
            <line x1={cx} y1={cy-5} x2={cx} y2={cy+5} stroke="#DDD3BE" strokeWidth="0.6"/>
          </g>
        ))}

        {/* Scale bar */}
        <g transform="translate(24, 248)" opacity="0.28">
          <line x1="0" y1="0" x2="40" y2="0" stroke="#DDD3BE" strokeWidth="0.6"/>
          <line x1="0" y1="-2" x2="0" y2="2" stroke="#DDD3BE" strokeWidth="0.6"/>
          <line x1="40" y1="-2" x2="40" y2="2" stroke="#DDD3BE" strokeWidth="0.6"/>
          <text x="20" y="-4" textAnchor="middle" fontSize="5.5" fill="#DDD3BE" fontFamily="monospace">5 km</text>
        </g>

        {/* Transect line */}
        <line x1="110" y1="195" x2="305" y2="95" stroke="#DDD3BE" strokeWidth="0.4" strokeDasharray="3 4" opacity={hasPNG ? 0.06 : 0.12}/>

        {/* SNP label */}
        <text x="195" y="158" textAnchor="middle" fontSize="7" fill="#DDD3BE"
          opacity={hasPNG ? 0.06 : 0.14} fontFamily="monospace" letterSpacing="0.1em">SNP BOUNDARY</text>
      </svg>

      {/* Top-left: data source badge (raster layers) */}
      {hasPNG && (
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-background/58 border border-border/22 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
          <span className="text-[9px] font-mono text-foreground/70 uppercase tracking-[0.12em]">
            ECOSTRESS raster · 2023 · Jan–Jun
          </span>
        </div>
      )}

      {/* Bottom-left: caption panel */}
      <div className="absolute bottom-4 left-4 max-w-[280px] hidden md:block">
        <div className="px-3 py-2.5 bg-background/65 backdrop-blur-sm border border-border/20">
          <p className="text-[10px] font-mono text-foreground/80 mb-0.5">{layer.title}</p>
          {layer.mean !== null && (
            <p className="text-[9px] font-mono text-muted-foreground/60 mb-1">
              {layer.meanLabel}: <span className="text-foreground/75">{layer.mean.toFixed(4)}</span>
              {layer.unit && <span className="text-muted-foreground/40 ml-1">{layer.unit}</span>}
            </p>
          )}
          <p className="text-[9px] font-mono text-muted-foreground/50 leading-snug">{layer.caption}</p>
        </div>
      </div>

      {/* Bottom-right: source attribution */}
      <div className="absolute bottom-4 right-4 px-2.5 py-1.5 bg-background/55 border border-border/20 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/55" />
        <span className="text-[9px] font-mono text-muted-foreground/65">Jan–Jun · SNP · 2023</span>
      </div>
    </div>
  )
}

// ── MapboxMap (token-gated, unchanged except layer-id mapping) ──────────────
interface MapboxMapProps {
  activeLayer: string
  mapboxToken: string
}

function MapboxMap({ activeLayer, mapboxToken }: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)
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
              coordinates: [[[10.08,46.58],[10.12,46.72],[10.32,46.74],[10.38,46.68],[10.35,46.55],[10.20,46.52],[10.08,46.58]]],
            },
          },
        })
        map.addLayer({
          id: 'park-boundary-line',
          type: 'line',
          source: 'park-boundary',
          paint: { 'line-color': '#6F8F5B', 'line-width': 2, 'line-dasharray': [2, 2] },
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
      context:  'mapbox://styles/mapbox/outdoors-v12',
      ndvi:     'mapbox://styles/mapbox/satellite-v9',
      et:       'mapbox://styles/mapbox/satellite-v9',
      esi:      'mapbox://styles/mapbox/satellite-v9',
      coverage: 'mapbox://styles/mapbox/satellite-v9',
    }
    mapRef.current.setStyle(styleMap[activeLayer] || styleMap.context)
  }, [activeLayer, isLoaded])

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <span className="text-sm text-muted-foreground">Loading map…</span>
        </div>
      )}
    </div>
  )
}

// ── EarthMap ────────────────────────────────────────────────────────────────
export function EarthMap() {
  const [activeLayer, setActiveLayer] = useState('ndvi')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  return (
    <section id="earth" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15">
              <Layers className="w-3 h-3 text-primary/70" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80 whitespace-nowrap">
                Earth Observation · 46.6603°N 10.2176°E
              </span>
            </div>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
            Study Region
          </h2>
          <p className="max-w-lg text-muted-foreground/70 text-sm text-balance leading-relaxed">
            Swiss National Park — 170 km² of protected alpine terrain · Graubünden, Switzerland · ECOSTRESS/AppEEARS January–June observation window
          </p>
        </motion.div>

        {/* Map interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="border border-border/30 bg-card/10 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary/40" />
                <span className="text-sm font-mono text-foreground/70">Swiss National Park</span>
                <span className="text-[11px] font-mono text-muted-foreground/60 hidden sm:inline">46.6603°N, 10.2176°E</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground/50">
                <span>170 km²</span>
                <span className="hidden sm:inline text-muted-foreground/30">·</span>
                <span className="hidden sm:inline">ECOSTRESS · AppEEARS · 70 m nominal</span>
              </div>
            </div>

            {/* Map container */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              {mapboxToken ? (
                <MapboxMap activeLayer={activeLayer} mapboxToken={mapboxToken} />
              ) : (
                <RasterMapPanel activeLayer={activeLayer} />
              )}

              {/* Layer controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                {mapLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex items-center gap-2 px-3 py-2 border backdrop-blur-sm transition-all duration-300 ${
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
            </div>

            {/* Science caption strip */}
            <div className="px-5 py-3 border-t border-border/15 bg-card/5">
              <p className="text-[9px] font-mono text-muted-foreground/45 leading-relaxed">
                Raster-derived ECOSTRESS/AppEEARS output for Swiss National Park ·
                January–June observations · 2019–2025 · ~37% AOI pixel coverage ·
                This is not a full growing-season or long-term ecological trend assessment ·
                Research prototype — requires independent validation
              </p>
            </div>

            {/* Bottom stats — real pipeline values */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border/20">
              {BOTTOM_STATS.map((stat, i) => (
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
