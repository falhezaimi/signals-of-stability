'use client'

import { SectionReveal } from './section-reveal'

export function FrTrust() {
  return (
    <section id="trust" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/25">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
              Section 5 · Robustness
            </span>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-stone/60" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                Could the pattern be an artifact?
              </span>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground/65 leading-relaxed">
              Time-bin comparisons and terrain context help separate stronger signals from fragile ones.
              Patterns that persist across filtering choices and align with terrain structure are more credible
              than those appearing under only one condition.
            </p>
          </div>
        </SectionReveal>

        {/* Two robustness maps */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <SectionReveal delay={0.05}>
            <div className="border border-border/25 bg-card/10">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/15">
                <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-[0.12em]">Time-Bin Validation</span>
                <span className="text-[8px] font-mono text-muted-foreground/25">MAP 05</span>
              </div>
              <div className="relative bg-[oklch(0.14_0.006_160)]" style={{ aspectRatio: '4/3' }}>
                <picture>
                  <source srcSet="/data/signals/nasa_quality_maps/webp/map_05_timebin_comparison.webp" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/data/signals/nasa_quality_maps/png/map_05_timebin_comparison.png"
                    alt="Time-bin comparison — 4 panels showing temporal filter robustness"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'auto' }}
                  />
                </picture>
              </div>
              <div className="px-4 py-3 border-t border-border/10">
                <p className="text-[10px] font-medium text-foreground/70 mb-1">Signal persists across time-bin choices</p>
                <p className="text-[9px] font-mono text-muted-foreground/45 leading-relaxed">
                  Four panels compare dominant classes derived from midday only, daytime, daytime+evening, and all acquisitions.
                  Core patterns are consistent, reducing the risk of a temporal sampling artifact.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="border border-border/25 bg-card/10">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/15">
                <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-[0.12em]">Terrain Context</span>
                <span className="text-[8px] font-mono text-muted-foreground/25">MAP 06</span>
              </div>
              <div className="relative bg-[oklch(0.14_0.006_160)]" style={{ aspectRatio: '4/3' }}>
                <picture>
                  <source srcSet="/data/signals/nasa_quality_maps/webp/map_06_terrain_context.webp" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/data/signals/nasa_quality_maps/png/map_06_terrain_context.png"
                    alt="Terrain context — class boundaries vs. elevation and slope"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'auto' }}
                  />
                </picture>
              </div>
              <div className="px-4 py-3 border-t border-border/10">
                <p className="text-[10px] font-medium text-foreground/70 mb-1">Class boundaries align with topographic structure</p>
                <p className="text-[9px] font-mono text-muted-foreground/45 leading-relaxed">
                  Left: class map. Right: elevation over same hillshade. Visual alignment between class transitions
                  and elevation/slope contours supports a terrain-structured interpretation.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Metadata / QC grid */}
        <SectionReveal delay={0.15}>
          <div className="border border-border/25 bg-card/8">
            <div className="px-5 pt-4 pb-3 border-b border-border/15">
              <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-[0.18em]">
                Technical Provenance
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/15">
              {/* Spatial */}
              <div className="px-5 py-4">
                <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em] mb-3">Spatial Parameters</p>
                {[
                  { k: 'CRS',            v: 'EPSG:32632 (UTM 32N)' },
                  { k: 'Pixel size',     v: '70 m nominal' },
                  { k: 'Raster shape',   v: '313 × 303 px' },
                  { k: 'Valid pixels',   v: '34,751 of 94,839' },
                  { k: 'Elevation src',  v: 'NASADEM 30 m → 70 m' },
                  { k: 'Hillshade az.',  v: '315° (NW), 45°' },
                ].map(row => (
                  <div key={row.k} className="flex justify-between py-1 border-b border-border/8 last:border-0">
                    <span className="text-[9px] font-mono text-muted-foreground/35">{row.k}</span>
                    <span className="text-[9px] font-mono text-foreground/55 text-right">{row.v}</span>
                  </div>
                ))}
              </div>

              {/* Classification */}
              <div className="px-5 py-4">
                <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em] mb-3">Classification QC</p>
                {[
                  { k: 'Class codes detected',  v: '0,1,2,4,5,6,7,8' },
                  { k: 'Code 3 (strong act.)',  v: 'Absent from daytime' },
                  { k: 'Nodata (255)',           v: 'Transparent' },
                  { k: 'Unclassified (0)',       v: 'Transparent' },
                  { k: 'Color consistency',      v: 'All maps same dict' },
                  { k: 'QC exit code',           v: '0 — clean run' },
                ].map(row => (
                  <div key={row.k} className="flex justify-between py-1 border-b border-border/8 last:border-0">
                    <span className="text-[9px] font-mono text-muted-foreground/35">{row.k}</span>
                    <span className="text-[9px] font-mono text-foreground/55 text-right">{row.v}</span>
                  </div>
                ))}
              </div>

              {/* Known limitations */}
              <div className="px-5 py-4">
                <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em] mb-3">Known Limitations</p>
                {[
                  'Short observation window (7 seasons).',
                  'Daytime-only; nighttime acquisitions excluded.',
                  'WUE 2024 absent — insufficient overpasses.',
                  'Raster extent slightly exceeds SNP boundary.',
                  'Product disagreement zone ~50% of pixels.',
                  'Not peer reviewed. Exploratory only.',
                ].map((lim, i) => (
                  <div key={i} className="flex items-start gap-2 py-1 border-b border-border/8 last:border-0">
                    <span className="text-muted-foreground/20 text-[9px] font-mono shrink-0 mt-0.5">—</span>
                    <span className="text-[9px] font-mono text-muted-foreground/40 leading-relaxed">{lim}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Confidence note */}
        <SectionReveal delay={0.20}>
          <p className="text-[9px] font-mono text-muted-foreground/30 mt-6 text-center uppercase tracking-[0.12em]">
            Raster-derived ECOSTRESS/AppEEARS output · EPSG:32632 · 70 m nominal · Swiss National Park 2019–2025 · Exploratory prototype
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
