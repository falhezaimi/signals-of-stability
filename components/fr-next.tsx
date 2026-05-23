'use client'

import Link from 'next/link'
import { SectionReveal } from './section-reveal'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const directions = [
  {
    num: '01',
    title: 'Extend the seasonal window',
    body: 'Compare June-only signals to Jan–Mar and Apr–Jun composites. Test whether high-ESI signal boundaries shift with season or remain spatially consistent.',
    tag: 'Temporal',
  },
  {
    num: '02',
    title: 'Examine snowmelt timing',
    body: 'Snowmelt phenology shapes early-season water availability. Isolate years with early vs. late snowmelt and test whether ESI watch patterns follow the snowmelt gradient.',
    tag: 'Phenology',
  },
  {
    num: '03',
    title: 'Isolate forested valley zones',
    body: 'High-ET and high-ESI signal pixels may concentrate in sheltered valley corridors with mature canopy. Mask by forest cover and compare signal variability to exposed slopes.',
    tag: 'Vegetation',
  },
  {
    num: '04',
    title: 'Test elevation and aspect controls',
    body: 'Quantify whether class boundaries follow elevation bands or aspect-driven solar exposure. A regression of class code on elevation + aspect would formalize the terrain-structure hypothesis.',
    tag: 'Terrain',
  },
  {
    num: '05',
    title: 'Compare high-ESI signal areas across time-bin filters',
    body: 'Do high-ESI pixels identified from daytime-only data persist under all-available-time filtering? Consistent signal areas across time bins are stronger candidates for follow-up field study.',
    tag: 'Robustness',
  },
  {
    num: '06',
    title: 'Validate demand-efficiency watch zones',
    body: 'Test whether demand-efficiency watch pixels correspond to known ecological vulnerability zones or high-sensitivity habitats in SNP management maps.',
    tag: 'Validation',
  },
]

export function FrNext() {
  return (
    <section id="next" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/25">
            <span className="w-4 h-px bg-foreground/18" />
            <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
              Section 6 · What This Suggests Next
            </span>
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
                What should be tested next?
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-balance text-foreground">
                From Visual Evidence
                <br />
                <span className="text-foreground/50">to Hypothesis Testing</span>
              </h2>
              <p className="text-sm text-muted-foreground/65 leading-relaxed">
                The next step is to move from visual signal patterns to testable hypotheses: compare signal areas across seasons,
                isolate forested valleys, examine snowmelt timing, test elevation and aspect controls, and validate whether
                elevated-stress signal areas correspond to known ecological sensitivity zones.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Research directions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {directions.map((d, i) => (
            <SectionReveal key={d.num} delay={0.05 * i}>
              <div className="group border border-border/20 bg-card/8 hover:bg-card/15 hover:border-border/35 transition-all duration-500 p-5 h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[8px] font-mono text-muted-foreground/25 uppercase tracking-[0.15em]">{d.num}</span>
                  <span className="text-[8px] font-mono text-primary/50 uppercase tracking-[0.12em] border border-primary/20 px-2 py-0.5">
                    {d.tag}
                  </span>
                </div>
                <h3 className="text-[13px] font-medium text-foreground/80 mb-2 leading-snug">{d.title}</h3>
                <p className="text-[11px] text-muted-foreground/55 leading-relaxed">{d.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Final summary */}
        <SectionReveal delay={0.3}>
          <div className="border border-border/25 bg-card/12 p-6 md:p-8 mb-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="text-[9px] font-mono text-muted-foreground/35 uppercase tracking-[0.18em] mb-3">
                  Summary Answer
                </p>
                <p className="font-serif text-lg md:text-xl font-medium text-foreground/80 leading-snug text-balance mb-4">
                  Short-window ECOSTRESS-derived signals do not appear uniformly distributed across Swiss National Park. Available January–June observations show spatially structured patterns — areas with consistently higher ESI signals, elevated stress signals, and variable-demand patterns — that correlate with terrain structure. These are candidate patterns, not confirmed ecological findings.
                </p>
                <p className="text-[9px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em]">
                  Short-window signal only · January–June observations · 2024 ET &amp; ESI limited coverage · Exploratory · Validation pending
                </p>
              </div>
              <div className="hidden md:block text-right space-y-1">
                <p className="text-[8px] font-mono text-muted-foreground/25 uppercase tracking-[0.12em]">ECOSTRESS</p>
                <p className="text-[8px] font-mono text-muted-foreground/25">2019–2025</p>
                <p className="text-[8px] font-mono text-muted-foreground/20">Exploratory</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Page navigation */}
        <SectionReveal delay={0.35}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-border/20">
            <Link
              href="/"
              className="flex items-center gap-3 group border border-border/25 px-5 py-3 hover:border-primary/30 hover:bg-card/15 transition-all duration-500"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary/60 group-hover:-translate-x-0.5 transition-all duration-300" />
              <div>
                <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em] mb-0.5">Return to</p>
                <p className="text-[11px] font-medium text-foreground/70">Homepage</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 text-[8px] font-mono text-muted-foreground/25 uppercase tracking-[0.10em]">
              <span>SNP · 46.6603°N</span>
              <span className="w-px h-2.5 bg-border/25" />
              <span>10.2176°E</span>
              <span className="w-px h-2.5 bg-border/25" />
              <span>ECOSTRESS</span>
            </div>

            <Link
              href="/#findings"
              className="flex items-center justify-end gap-3 group border border-border/25 px-5 py-3 hover:border-primary/30 hover:bg-card/15 transition-all duration-500"
            >
              <div className="text-right">
                <p className="text-[8px] font-mono text-muted-foreground/35 uppercase tracking-[0.12em] mb-0.5">Review on Homepage</p>
                <p className="text-[11px] font-medium text-foreground/70">Main Evidence</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all duration-300" />
            </Link>
          </div>
        </SectionReveal>

        {/* Footnote */}
        <SectionReveal delay={0.4}>
          <p className="text-[8px] font-mono text-muted-foreground/25 text-center mt-10 uppercase tracking-[0.10em]">
            Raster-derived ECOSTRESS/AppEEARS output · EPSG:32632 · 70 m nominal · Swiss National Park 2019–2025 · Exploratory research prototype · Not peer reviewed
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
