'use client'

import { SectionReveal } from './section-reveal'

const sourceProducts = [
  { key: 'NDVI', product: 'ECO_L2T_STARS.002', label: 'ECOSTRESS Tiled Ancillary NDVI and Albedo L2 Global',          rasters: 930,  coverage: 99.9 },
  { key: 'ET',   product: 'ECO_L3T_JET.002',   label: 'ECOSTRESS Tiled Evapotranspiration Instantaneous L3 Global',  rasters: 308,  coverage: 78.5 },
  { key: 'ESI',  product: 'ECO_L4T_ESI.002',   label: 'ECOSTRESS Tiled Evaporative Stress Index PT-JPL L4 Global',   rasters: 309,  coverage: 78.6 },
  { key: 'PET',  product: '—',                  label: 'Derived from ECOSTRESS thermal / ET products',                rasters: 309,  coverage: 78.6 },
  { key: 'WUE',  product: 'ECO_L4T_WUE.002',   label: 'ECOSTRESS Tiled Water Use Efficiency L4 Global',              rasters: 266,  coverage: 30.9 },
]

export function SignalsProvenance() {
  return (
    <section id="provenance" className="relative overflow-hidden py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="mb-14 md:mb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-foreground/30" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/40">
                Section IV
              </span>
            </div>
            <h2
              className="font-serif font-medium text-foreground leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
            >
              Provenance
            </h2>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-md">
              Technical notes on data sources, pipeline parameters, and known limitations.
            </p>
          </div>
        </SectionReveal>

        {/* Three-column notes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {/* Render parameters */}
          <SectionReveal delay={0}>
            <div className="border border-border/20 bg-card/40 p-6 h-full">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-5">
                Render Parameters
              </p>
              <div className="space-y-2.5">
                {[
                  { label: 'Generated UTC',    value: '2026-05-11T17:09Z' },
                  { label: 'DEM Source',       value: 'NASADEM 30 m' },
                  { label: 'DEM Resample',     value: '→ 70 m ECOSTRESS grid' },
                  { label: 'CRS',              value: 'EPSG:32632' },
                  { label: 'Pixel Size',       value: '70 m nominal' },
                  { label: 'Raster Shape',     value: '313 × 303 px' },
                  { label: 'Camera Elevation', value: '38°' },
                  { label: 'Camera Azimuth',   value: '225°' },
                  { label: 'Vert. Exaggeration', value: '3.0×' },
                  { label: 'Render Max Dim.',  value: '280 px' },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-[9px] font-mono text-muted-foreground/40 shrink-0">{item.label}</span>
                    <span className="text-[10px] font-mono text-foreground/65 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Map provenance */}
          <SectionReveal delay={0.05}>
            <div className="border border-border/20 bg-card/40 p-6 h-full">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-5">
                Map Provenance
              </p>
              <div className="space-y-2.5">
                {[
                  { label: 'Export Phase',   value: 'Phase 6 — NASA-Quality' },
                  { label: 'Maps',           value: '6 (map_01 – map_06)' },
                  { label: 'Map CRS',        value: 'EPSG:32632' },
                  { label: 'Map Pixel',      value: '70 m' },
                  { label: 'Map Shape',      value: '313 × 303 px' },
                  { label: 'Legend Files',   value: 'class_legend.svg / .png' },
                  { label: 'Overlays',       value: '4 transparent PNGs' },
                  { label: 'GeoTIFF files',  value: '5 (not browser-renderable)' },
                  { label: 'Hillshade',      value: 'NASADEM 30 m, resampled' },
                  { label: 'Season',         value: 'Daytime June multi-year' },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-[9px] font-mono text-muted-foreground/40 shrink-0">{item.label}</span>
                    <span className="text-[10px] font-mono text-foreground/65 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Known absences + caveats */}
          <SectionReveal delay={0.1}>
            <div className="border border-border/20 bg-card/40 p-6 h-full">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-5">
                Absences &amp; Caveats
              </p>

              <div className="border-l-2 border-destructive/30 pl-3 mb-6">
                <p className="text-[9px] font-mono text-foreground/60 mb-1">WUE · 2024 · Yearly 3D</p>
                <p className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed">
                  Insufficient June satellite coverage for a reliable composite. WUE multi-year mean uses 6 of 7 seasons (2019–2023, 2025).
                </p>
              </div>

              <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 mb-3">
                Important Caveats
              </p>
              <div className="space-y-2">
                {[
                  'Short-window analysis: Jan–Jun only',
                  'Not a full JJA or growing-season record',
                  '3D terrain renders are exploratory proxies',
                  'Terrain context is interpretive, not confirmatory',
                  '2024 ET & ESI: low confidence (2 overpasses only)',
                ].map((note) => (
                  <div key={note} className="flex items-start gap-2">
                    <span className="text-[8px] font-mono text-muted-foreground/25 mt-0.5 shrink-0">—</span>
                    <span className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

        </div>

        {/* Source products table */}
        <SectionReveal delay={0.1}>
          <div className="border border-border/20 bg-card/40">
            <div className="px-6 py-4 border-b border-border/15">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40">
                Source Products — AppEEARS
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/10">
                    <th className="text-left px-6 py-3 text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 font-normal">Signal</th>
                    <th className="text-left px-4 py-3 text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 font-normal hidden md:table-cell">Product ID</th>
                    <th className="text-left px-4 py-3 text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 font-normal hidden lg:table-cell">Description</th>
                    <th className="text-right px-4 py-3 text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 font-normal">Rasters</th>
                    <th className="text-right px-6 py-3 text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground/35 font-normal">AOI Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceProducts.map((p, i) => (
                    <tr
                      key={p.key}
                      className={`border-b border-border/10 last:border-0 ${i % 2 === 0 ? 'bg-foreground/[0.01]' : ''}`}
                    >
                      <td className="px-6 py-3 text-[10px] font-mono text-foreground/70">{p.key}</td>
                      <td className="px-4 py-3 text-[9px] font-mono text-muted-foreground/50 hidden md:table-cell">{p.product}</td>
                      <td className="px-4 py-3 text-[9px] font-mono text-muted-foreground/40 hidden lg:table-cell max-w-[220px]">
                        <span className="truncate block">{p.label}</span>
                      </td>
                      <td className="px-4 py-3 text-[10px] font-mono text-foreground/60 text-right">{p.rasters.toLocaleString()}</td>
                      <td className="px-6 py-3 text-[10px] font-mono text-foreground/60 text-right">{p.coverage.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionReveal>

        {/* Bottom provenance note */}
        <SectionReveal delay={0.15}>
          <div className="mt-8 pt-6 border-t border-border/10">
            <p className="text-[9px] font-mono text-muted-foreground/30 leading-relaxed max-w-2xl">
              Data retrieved via AppEEARS (Application for Extracting and Exploring Analysis Ready Samples).
              All rasters use EPSG:32632 (UTM Zone 32N). Processing pipeline: raster composite → SNP AOI mask
              → NASADEM drape → 3D render → Phase 6 NASA-quality map export.{' '}
              <span className="opacity-60">SNP·OBS·001 · 46.6603°N 10.2176°E · Graubünden, Switzerland</span>
            </p>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
