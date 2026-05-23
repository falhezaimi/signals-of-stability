'use client'

import { SectionReveal } from './section-reveal'
import limitationsRaw from '@/public/data/signals/limitations.json'
import provenanceRaw from '@/public/data/signals/data-provenance.json'

const severityColor: Record<string, string> = {
  critical: '#A6523A',
  high:     '#B99B45',
  medium:   '#7B837A',
  low:      '#667067',
}

export function DataProvenance() {
  return (
    <section id="limitations" className="relative py-16 md:py-24 overflow-hidden">
      <div id="provenance" className="max-w-5xl mx-auto px-6 md:px-8">
        <SectionReveal>
          {/* Coordinate strip */}
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/25">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
              Interpretation Limits · Data Provenance · Research Constraints
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Provenance block */}
            <div className="border border-border/30 bg-card/15 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[8px] font-mono text-muted-foreground/45 uppercase tracking-[0.18em]">Data Source</span>
                <span className="w-3 h-px bg-border/30" />
                <span className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.15em]">ECOSTRESS / AppEEARS</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Platform',         value: 'ECOSTRESS (ISS)' },
                  { label: 'Operator',         value: 'NASA / JPL' },
                  { label: 'Resolution',       value: '70 m nominal' },
                  { label: 'Access',           value: 'NASA AppEEARS' },
                  { label: 'Available months',  value: 'January–June (months 1–6)' },
                  { label: 'Products',         value: 'NDVI · ET · ESI · PET · WUE' },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-[9px] font-mono text-muted-foreground/45 shrink-0">{item.label}</span>
                    <span className="text-[10px] font-mono text-foreground/65 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] font-mono text-muted-foreground/30 mt-4 italic leading-relaxed">
                {provenanceRaw.important_note}
              </p>
            </div>

            {/* Known limitations */}
            <div className="border border-border/30 bg-card/15 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[8px] font-mono text-muted-foreground/45 uppercase tracking-[0.18em]">Known Limitations</span>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Short time window',      note: limitationsRaw.short_time_window,    color: severityColor.high },
                  { title: 'Coverage variability',   note: limitationsRaw.coverage,              color: severityColor.medium },
                  { title: 'ISS overpass timing',    note: limitationsRaw.iss_overpass_timing,   color: severityColor.medium },
                  { title: 'Trend interpretation',   note: limitationsRaw.trend,                 color: severityColor.low },
                  { title: 'Stability metrics',      note: limitationsRaw.stability,             color: severityColor.low },
                ].map((lim) => (
                  <div key={lim.title} className="border-l-2 pl-3" style={{ borderColor: `${lim.color}55` }}>
                    <span className="text-[9px] font-mono text-foreground/65">{lim.title}</span>
                    <p className="text-[9px] font-mono text-muted-foreground/50 leading-relaxed mt-0.5">
                      {lim.note.length > 120 ? `${lim.note.slice(0, 120)}…` : lim.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products table */}
          <div className="border border-border/25 bg-card/8">
            <div className="px-5 pt-4 pb-3 border-b border-border/15">
              <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-[0.18em]">ECOSTRESS Products Used</span>
            </div>
            <div className="divide-y divide-border/10">
              {Object.entries(provenanceRaw.products).map(([key, p]) => (
                <div key={key} className="flex items-start justify-between px-5 py-3 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-foreground/70 uppercase">{key}</span>
                    <span className="text-[9px] font-mono text-muted-foreground/40 ml-3">{p.label ?? p.product ?? '—'}</span>
                  </div>
                  <span className="text-[8px] font-mono text-muted-foreground/35 shrink-0">
                    {p.raster_inventory.raster_count} rasters
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[9px] font-mono text-muted-foreground/30 mt-5 uppercase tracking-[0.12em]">
            Short-window raster-derived ECOSTRESS/AppEEARS output · EPSG:32632 · 70 m nominal · Swiss National Park · January–June observations · Exploratory use only
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
