'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Filter } from 'lucide-react'
import { ArtisticBackground } from './artistic-background'

const NODES = [
  {
    id: 1,
    label: 'Satellite\nAcquisition',
    sublabel: 'MODIS · Landsat · S2',
    tag: 'RAW INGESTION',
  },
  {
    id: 2,
    label: 'QA Band\nMasking',
    sublabel: 'Cloud / shadow filter',
    tag: 'QA MASK',
  },
  {
    id: 3,
    label: '70% Coverage\nThreshold',
    sublabel: 'Scene validity gate',
    tag: 'CLOUD FILTER',
  },
  {
    id: 4,
    label: 'Monthly\nComposite',
    sublabel: 'JJA season focus',
    tag: 'TEMPORAL WINDOW',
  },
  {
    id: 5,
    label: 'Index\nDerivation',
    sublabel: 'NDVI · ET · LST',
    tag: 'SIGNAL DELTA',
  },
  {
    id: 6,
    label: 'Ecological\nInterpretation',
    sublabel: 'Stability assessment',
    tag: 'SYNTHESIS',
  },
]

// Layout: snake pattern — row 1 left-to-right (nodes 1,2,3), row 2 right-to-left (nodes 4,5,6)
// SVG canvas: 720 × 340 for desktop

const NODE_W = 160
const NODE_H = 84
const ROW1_Y = 30
const ROW2_Y = 218

const nodePositions = [
  { x: 40,  y: ROW1_Y }, // 1
  { x: 280, y: ROW1_Y }, // 2
  { x: 520, y: ROW1_Y }, // 3
  { x: 520, y: ROW2_Y }, // 4 — snake turn
  { x: 280, y: ROW2_Y }, // 5
  { x: 40,  y: ROW2_Y }, // 6
]

// Connector segments between nodes
// format: [x1,y1,x2,y2] — drawn center-to-center with elbow for snake turn
const connectors = [
  // 1 → 2: horizontal row 1
  { x1: 40 + NODE_W, y1: ROW1_Y + NODE_H / 2, x2: 280, y2: ROW1_Y + NODE_H / 2 },
  // 2 → 3: horizontal row 1
  { x1: 280 + NODE_W, y1: ROW1_Y + NODE_H / 2, x2: 520, y2: ROW1_Y + NODE_H / 2 },
  // 3 → 4: vertical snake turn
  { x1: 520 + NODE_W / 2, y1: ROW1_Y + NODE_H, x2: 520 + NODE_W / 2, y2: ROW2_Y },
  // 4 → 5: horizontal row 2 (right to left)
  { x1: 520, y1: ROW2_Y + NODE_H / 2, x2: 280 + NODE_W, y2: ROW2_Y + NODE_H / 2 },
  // 5 → 6: horizontal row 2 (right to left)
  { x1: 280, y1: ROW2_Y + NODE_H / 2, x2: 40 + NODE_W, y2: ROW2_Y + NODE_H / 2 },
]

function FlowchartSVG({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 720 342" className="w-full" aria-hidden style={{ overflow: 'visible' }}>
      {/* Connector lines */}
      {connectors.map((c, i) => (
        <motion.line
          key={i}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
          animate={inView ? { opacity: 0.28 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.18 }}
        />
      ))}

      {/* Arrow heads */}
      {[
        { x: 280, y: ROW1_Y + NODE_H / 2, dir: 'right' },
        { x: 520, y: ROW1_Y + NODE_H / 2, dir: 'right' },
        { x: 520 + NODE_W / 2, y: ROW2_Y, dir: 'down' },
        { x: 280 + NODE_W, y: ROW2_Y + NODE_H / 2, dir: 'left' },
        { x: 40 + NODE_W, y: ROW2_Y + NODE_H / 2, dir: 'left' },
      ].map((a, i) => {
        let pts = ''
        if (a.dir === 'right') pts = `${a.x},${a.y - 3.5} ${a.x + 6},${a.y} ${a.x},${a.y + 3.5}`
        if (a.dir === 'left') pts = `${a.x},${a.y - 3.5} ${a.x - 6},${a.y} ${a.x},${a.y + 3.5}`
        if (a.dir === 'down') pts = `${a.x - 3.5},${a.y} ${a.x},${a.y + 6} ${a.x + 3.5},${a.y}`
        return (
          <motion.polygon
            key={i}
            points={pts}
            fill="currentColor"
            opacity="0"
            animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.18 }}
          />
        )
      })}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const { x, y } = nodePositions[i]
        const isLast = i === 5
        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.55, delay: 0.08 + i * 0.12 }}
          >
            {/* Node box */}
            <rect
              x={x} y={y}
              width={NODE_W} height={NODE_H}
              fill="none"
              stroke="currentColor"
              strokeWidth={isLast ? 1.2 : 0.7}
              opacity={isLast ? 0.5 : 0.3}
            />
            {/* Left accent bar */}
            <rect
              x={x} y={y}
              width="3" height={NODE_H}
              fill="currentColor"
              opacity={isLast ? 0.5 : 0.2}
            />
            {/* Step number */}
            <text
              x={x + 12} y={y + 16}
              fontSize="7" fill="currentColor" opacity="0.35"
              fontFamily="monospace" letterSpacing="0.08em"
            >
              {String(node.id).padStart(2, '0')}
            </text>
            {/* Tag */}
            <text
              x={x + NODE_W - 6} y={y + 14}
              fontSize="5.5" fill="currentColor" opacity="0.28"
              fontFamily="monospace" letterSpacing="0.12em"
              textAnchor="end"
            >
              {node.tag}
            </text>
            {/* Main label — split on \n */}
            {node.label.split('\n').map((line, li) => (
              <text
                key={li}
                x={x + 12} y={y + 36 + li * 14}
                fontSize="11" fill="currentColor" opacity="0.78"
                fontFamily="serif" fontWeight="500"
              >
                {line}
              </text>
            ))}
            {/* Sublabel */}
            <text
              x={x + 12} y={y + NODE_H - 10}
              fontSize="6.5" fill="currentColor" opacity="0.32"
              fontFamily="monospace"
            >
              {node.sublabel}
            </text>
          </motion.g>
        )
      })}

      {/* Terminal output label */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
      >
        <text
          x={40 + NODE_W / 2} y={ROW2_Y + NODE_H + 18}
          textAnchor="middle"
          fontSize="6" fill="currentColor" opacity="0.22"
          fontFamily="monospace" letterSpacing="0.12em"
        >
          ▸ STABILITY SIGNAL OUTPUT
        </text>
      </motion.g>
    </svg>
  )
}

// Mobile vertical flowchart (single column)
function FlowchartMobile({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col gap-0">
      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: 0.5, delay: 0.06 + i * 0.1 }}
          className="flex items-stretch gap-4"
        >
          {/* Left rail */}
          <div className="flex flex-col items-center">
            <div className="w-px flex-1 bg-primary/20" style={{ minHeight: i === 0 ? 0 : 16 }} />
            <div className="w-6 h-6 border border-primary/30 bg-primary/[0.08] flex items-center justify-center shrink-0">
              <span className="text-[9px] font-mono text-primary/60">{String(node.id).padStart(2, '0')}</span>
            </div>
            {i < NODES.length - 1 && <div className="w-px flex-1 bg-primary/20" style={{ minHeight: 16 }} />}
          </div>
          {/* Content */}
          <div className={`py-3 ${i < NODES.length - 1 ? 'border-b border-border/20 mb-0 pb-4' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-primary/45">{node.tag}</span>
            </div>
            <p className="text-sm font-serif font-medium text-foreground/80 leading-tight mb-0.5">
              {node.label.replace('\n', ' ')}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground/45">{node.sublabel}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function Methodology() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="method" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      <ArtisticBackground variant="rasterband" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border/30 bg-card/15 mb-6">
            <Filter className="w-3 h-3 text-ice-blue/70" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80 whitespace-nowrap">
              Processing Pipeline · Remote Sensing
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-balance text-foreground">
            Methodology
          </h2>
          <p className="max-w-lg text-muted-foreground/70 text-sm text-balance leading-relaxed">
            A rigorous six-stage pipeline from satellite acquisition to ecological interpretation
          </p>
        </motion.div>

        {/* Desktop flowchart */}
        <div className="hidden md:block text-foreground/70">
          <FlowchartSVG inView={isInView} />
        </div>

        {/* Mobile vertical flow */}
        <div className="block md:hidden">
          <FlowchartMobile inView={isInView} />
        </div>

        {/* Key parameters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-px border border-border/20 bg-border/20"
        >
          {[
            { label: 'Spatial Resolution', value: '30m / 10m' },
            { label: 'Temporal Coverage', value: '2019 – 2024' },
            { label: 'Quality Threshold', value: '≥ 70% Valid' },
          ].map((item) => (
            <div key={item.label} className="px-5 py-4 bg-card/8 text-center">
              <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-1">{item.label}</p>
              <p className="text-xs font-mono text-foreground/65">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Simulation disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-6 text-[9px] font-mono text-muted-foreground/30 text-center uppercase tracking-[0.15em]"
        >
          Prototype Pipeline · Data Processing Under Validation
        </motion.p>
      </div>
    </section>
  )
}
