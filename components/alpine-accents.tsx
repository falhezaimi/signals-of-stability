// Panoramic treeline: [x_center, height, half_width]
const treeData: [number, number, number][] = [
  [8, 45, 7], [22, 62, 10], [38, 38, 6], [52, 70, 11], [66, 48, 8],
  [80, 55, 9], [96, 40, 7], [112, 74, 12], [128, 52, 8], [144, 65, 10],
  [160, 42, 7], [176, 78, 12], [194, 46, 7], [210, 60, 9], [228, 38, 6],
  [245, 72, 11], [262, 50, 8], [280, 66, 10], [298, 44, 7], [315, 80, 13],
  [333, 48, 8], [350, 58, 9], [368, 40, 6], [385, 70, 11], [402, 52, 8],
  [420, 64, 10], [438, 42, 7], [456, 76, 12], [475, 50, 8], [493, 60, 9],
  [511, 38, 6], [528, 68, 11], [546, 45, 7], [563, 72, 11], [582, 52, 8],
  [600, 42, 7], [618, 65, 10], [636, 50, 8], [655, 78, 12], [673, 44, 7],
  [692, 60, 9], [710, 38, 6], [728, 70, 11], [746, 48, 8], [765, 56, 9],
  [783, 42, 7], [800, 74, 12], [818, 50, 8], [836, 62, 10], [855, 40, 7],
  [873, 68, 10], [892, 48, 8], [910, 55, 9], [928, 38, 6], [946, 72, 11],
  [964, 46, 7], [982, 58, 9], [998, 40, 7],
]

// Full-width panoramic pine treeline, bottom-anchored
export function TreelineAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-full text-primary pointer-events-none ${className}`}
      viewBox="0 0 1000 100"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {treeData.map(([x, h, hw], i) => {
        const trunkH = h * 0.13
        const trunkTop = 100 - trunkH
        const b1apex = 100 - h * 0.38
        const m1y = 100 - h * 0.35
        const m1apex = 100 - h * 0.68
        const t1y = 100 - h * 0.65
        const tip = 100 - h
        return (
          <g key={i} fill="currentColor">
            <rect x={x - 1} y={trunkTop} width={2} height={trunkH} />
            <polygon points={`${x - hw},${trunkTop} ${x + hw},${trunkTop} ${x + hw * 0.55},${b1apex} ${x - hw * 0.55},${b1apex}`} />
            <polygon points={`${x - hw * 0.65},${m1y} ${x + hw * 0.65},${m1y} ${x + hw * 0.3},${m1apex} ${x - hw * 0.3},${m1apex}`} />
            <polygon points={`${x - hw * 0.42},${t1y} ${x + hw * 0.42},${t1y} ${x},${tip}`} />
          </g>
        )
      })}
    </svg>
  )
}

// Centered ornamental 3-tree cluster for section transitions
export function ForestDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-10 md:py-14 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/15" />
      <svg
        className="mx-6 text-primary opacity-[0.35] shrink-0"
        width="52" height="40"
        viewBox="-26 -38 52 42"
      >
        {/* Center tree */}
        <g fill="currentColor">
          <rect x="-1" y="-3" width="2" height="3" />
          <polygon points="-8.5,0 8.5,0 5.5,-10 -5.5,-10" />
          <polygon points="-5.5,-9 5.5,-9 3.5,-21 -3.5,-21" />
          <polygon points="-3,-20 3,-20 0,-31" />
        </g>
        {/* Left tree */}
        <g fill="currentColor" opacity="0.65" transform="translate(-15, 3)">
          <rect x="-0.8" y="-2.5" width="1.6" height="2.5" />
          <polygon points="-6,0 6,0 4,-7.5 -4,-7.5" />
          <polygon points="-4,-7 4,-7 2,-16 -2,-16" />
          <polygon points="-2,-15 2,-15 0,-23" />
        </g>
        {/* Right tree */}
        <g fill="currentColor" opacity="0.65" transform="translate(15, 3)">
          <rect x="-0.8" y="-2.5" width="1.6" height="2.5" />
          <polygon points="-6,0 6,0 4,-7.5 -4,-7.5" />
          <polygon points="-4,-7 4,-7 2,-16 -2,-16" />
          <polygon points="-2,-15 2,-15 0,-23" />
        </g>
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/15" />
    </div>
  )
}

// Diagonal pine sprig for corner accents — opacity and rotation via className
export function PineSprigs({ className = '' }: { className?: string }) {
  const needles: [number, number][] = [
    [18, 65], [34, 60], [50, 55], [65, 50], [80, 46],
    [96, 42], [111, 38], [126, 34], [141, 30], [156, 27], [171, 24],
  ]
  return (
    <svg
      className={`text-primary pointer-events-none ${className}`}
      width="200" height="90"
      viewBox="0 0 200 90"
      aria-hidden="true"
    >
      <path
        d="M 10 72 Q 60 57 100 42 Q 140 27 190 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      {needles.map(([bx, by], i) => (
        <g key={i}>
          <line x1={bx} y1={by} x2={bx - 9} y2={by - 11} stroke="currentColor" strokeWidth="0.6" />
          <line x1={bx} y1={by} x2={bx + 7} y2={by + 10} stroke="currentColor" strokeWidth="0.6" />
        </g>
      ))}
    </svg>
  )
}
