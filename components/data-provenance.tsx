'use client'

import { SectionReveal } from './section-reveal'
import limitationsRaw from '@/public/data/signals/limitations.json'
import provenanceRaw from '@/public/data/signals/data-provenance.json'

const severityColor: Record<string, string> = {
  critical: '#A6523A',
  high:     '#B99B45',
  medium:   'oklch(0.52 0.010 80)',
  low:      'oklch(0.42 0.010 80)',
}

export function DataProvenance() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <SectionReveal>
          {/* Coordinate strip */}
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/25">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
              Data Provenance · Limitations · Research Constraints
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
                  { label: 'Platform', value: provenanceRaw.platform },
                  { label: 'Operator', value: provenanceRaw.operator },
                  { label: 'Resolution', value: `${provenanceRaw.nominal_spatial_resolution_m}m nominal` },
                  { label: 'Access', value: 'NASA AppEEARS' },
                  { label: 'Analysis window', value: provenanceRaw.analysis_window.months },
                  { label: 'Products', value: provenanceRaw.products_used.map((p) => p.product).join(' · ') },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-[9px] font-mono text-muted-foreground/45 shrink-0">{item.label}</span>
                    <span className="text-[10px] font-mono text-foreground/65 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] font-mono text-muted-foreground/30 mt-4 italic leading-relaxed">
                {provenanceRaw.processing_pipeline}
              </p>
            </div>

            {/* Critical limitations */}
            <div className="border border-border/30 bg-card/15 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[8px] font-mono text-muted-foreground/45 uppercase tracking-[0.18em]">Known Limitations</span>
              </div>
              <div className="space-y-3">
                {limitationsRaw.limitations.map((lim) => (
                  <div key={lim.id} className="border-l-2 pl-3" style={{ borderColor: `${severityColor[lim.severity]}55` }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-mono text-foreground/65">{lim.title}</span>
                      <span
                        className="text-[7px] font-mono uppercase tracking-[0.1em] px-1 py-0.5 border"
                        style={{
                          color: severityColor[lim.severity],
                          borderColor: `${severityColor[lim.severity]}40`,
                          backgroundColor: `${severityColor[lim.severity]}08`,
                        }}
                      >
                        {lim.severity}
                      </span>
                    </div>
                    <p className="text-[9px] font-mono text-muted-foreground/50 leading-relaxed">
                      {lim.description.slice(0, 120)}{lim.description.length > 120 ? '…' : ''}
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
              {provenanceRaw.products_used.map((p) => (
                <div key={p.product} className="flex items-start justify-between px-5 py-3 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-foreground/70">{p.product}</span>
                    <span className="text-[9px] font-mono text-muted-foreground/40 ml-3">{p.description}</span>
                  </div>
                  <span className="text-[8px] font-mono text-muted-foreground/35 shrink-0">v{p.version}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[9px] font-mono text-muted-foreground/30 mt-5 uppercase tracking-[0.12em]">
            {provenanceRaw.citation_note}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
