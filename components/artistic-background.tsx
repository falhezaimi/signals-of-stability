// Server component — no 'use client'
// Renders purely decorative SVG + CSS backgrounds for each section variant

type Variant = 'hero' | 'observatory' | 'methodology' | 'timeline' | 'findings' | 'conclusion' | 'feldstation' | 'rasterband' | 'gradiente'

interface ArtisticBackgroundProps {
  variant: Variant
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient — warm pull toward bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/50" />

      {/* Primary radial atmosphere — stronger, more visible */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full blur-[200px]"
        style={{ background: 'rgba(63, 107, 74, 0.055)' }}
      />
      {/* Brass accent atmosphere — right side */}
      <div
        className="absolute top-[20%] right-[5%] w-[600px] h-[450px] rounded-full blur-[160px]"
        style={{ background: 'rgba(179, 146, 74, 0.04)' }}
      />
      {/* Satellite-blue atmosphere — left side */}
      <div
        className="absolute bottom-[10%] left-[5%] w-[500px] h-[400px] rounded-full blur-[150px]"
        style={{ background: 'rgba(73, 107, 122, 0.025)' }}
      />

      {/* Topographic contour rings — centered on virtual alpine summit */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Concentric contour ellipses */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <ellipse
            key={i}
            cx={490 + Math.sin(i * 0.65) * 35}
            cy={650 + Math.cos(i * 0.45) * 20}
            rx={90 + i * 72}
            ry={55 + i * 42}
            fill="none"
            stroke="currentColor"
            strokeWidth={i < 3 ? '0.8' : '0.5'}
            className="text-foreground"
            opacity={0.09 - i * 0.006}
          />
        ))}

        {/* Left edge coordinate tick marks */}
        {[...Array(9)].map((_, i) => (
          <line
            key={`tl${i}`}
            x1="0"
            y1={80 + i * 105}
            x2={i % 3 === 0 ? 22 : i % 2 === 0 ? 14 : 8}
            y2={80 + i * 105}
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-foreground"
            opacity="0.14"
          />
        ))}

        {/* Right edge coordinate tick marks */}
        {[...Array(9)].map((_, i) => (
          <line
            key={`tr${i}`}
            x1="1000"
            y1={80 + i * 105}
            x2={1000 - (i % 3 === 0 ? 22 : i % 2 === 0 ? 14 : 8)}
            y2={80 + i * 105}
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-foreground"
            opacity="0.14"
          />
        ))}

        {/* Top edge coordinate tick marks */}
        {[...Array(11)].map((_, i) => (
          <line
            key={`tt${i}`}
            x1={50 + i * 90}
            y1="0"
            x2={50 + i * 90}
            y2={i % 3 === 0 ? 18 : i % 2 === 0 ? 11 : 6}
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-foreground"
            opacity="0.14"
          />
        ))}

        {/* Coordinate cross marks — field observation points */}
        {[
          [120, 160], [870, 195], [95, 820], [910, 730],
          [200, 480], [780, 380], [500, 940],
        ].map(([cx, cy], i) => (
          <g key={`cross${i}`} opacity="0.08">
            <line x1={cx - 9} y1={cy} x2={cx + 9} y2={cy} stroke="currentColor" strokeWidth="0.6" className="text-foreground" />
            <line x1={cx} y1={cy - 9} x2={cx} y2={cy + 9} stroke="currentColor" strokeWidth="0.6" className="text-foreground" />
            <circle cx={cx} cy={cy} r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
          </g>
        ))}

        {/* Mountain ridge line — subtle landform suggestion */}
        <path
          d="M0,820 L80,780 L160,760 L230,730 L310,690 L390,710 L440,680 L500,640 L560,670 L630,700 L700,720 L780,740 L860,770 L950,790 L1000,800"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          className="text-foreground"
          opacity="0.06"
        />
        {/* Secondary ridge — depth */}
        <path
          d="M0,870 L120,845 L250,835 L360,810 L470,795 L540,810 L620,820 L730,830 L850,845 L1000,855"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground"
          opacity="0.04"
        />
      </svg>

      {/* Grain texture via SVG noise */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true" style={{ opacity: 0.035 }}>
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
    </div>
  )
}

function ObservatoryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-secondary/25 to-transparent" />

      {/* Primary glow */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[160px]"
        style={{ background: 'rgba(63, 107, 74, 0.03)' }}
      />

      {/* Scan line grid — horizontal */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal scan lines — more visible */}
        {Array.from({ length: 50 }, (_, i) => (
          <line
            key={`hs${i}`}
            x1="0" y1={10 + i * 20}
            x2="1000" y2={10 + i * 20}
            stroke="currentColor" strokeWidth="0.4"
            className="text-foreground"
            opacity="0.025"
          />
        ))}

        {/* Vertical measurement lines — sparse */}
        {[100, 250, 500, 750, 900].map((x, i) => (
          <line
            key={`vs${i}`}
            x1={x} y1="0"
            x2={x} y2="1000"
            stroke="currentColor" strokeWidth="0.3"
            className="text-foreground"
            opacity="0.018"
          />
        ))}

        {/* Crosshair measurement points */}
        {[[100, 200], [900, 180], [200, 800], [800, 820], [500, 120], [500, 880]].map(([cx, cy], i) => (
          <g key={`ch${i}`} opacity="0.1">
            <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            <circle cx={cx} cy={cy} r="2" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
          </g>
        ))}

        {/* Corner bracket marks */}
        <g opacity="0.12" className="text-foreground" stroke="currentColor" strokeWidth="0.7" fill="none">
          <path d="M40,40 L40,70 M40,40 L70,40" />
          <path d="M960,40 L960,70 M960,40 L930,40" />
          <path d="M40,960 L40,930 M40,960 L70,960" />
          <path d="M960,960 L960,930 M960,960 L930,960" />
        </g>
      </svg>
    </div>
  )
}

function MethodologyBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/12 to-background" />

      <div
        className="absolute top-1/3 right-[15%] w-[600px] h-[400px] rounded-full blur-[160px]"
        style={{ background: 'rgba(63, 107, 74, 0.03)' }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Offset contour bezier curves — data flow suggestion */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M${-50 + i * 18},${280 + i * 55} C${220 + i * 28},${180 + i * 38} ${580 + i * 18},${320 + i * 28} ${1050 - i * 12},${265 + i * 45}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-foreground"
            opacity={0.065 - i * 0.006}
          />
        ))}

        {/* Left margin tick marks */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`mt${i}`}
            x1="0" y1={60 + i * 80}
            x2={i % 4 === 0 ? 24 : i % 2 === 0 ? 14 : 7} y2={60 + i * 80}
            stroke="currentColor" strokeWidth="0.6"
            className="text-foreground"
            opacity="0.10"
          />
        ))}
      </svg>
    </div>
  )
}

function TimelineBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />

      {/* Brass atmosphere — left */}
      <div
        className="absolute top-[15%] left-[5%] w-[500px] h-[700px] rounded-full blur-[180px]"
        style={{ background: 'rgba(179, 146, 74, 0.02)' }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Year epoch markers — left rail */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`year${i}`}>
            {/* Long tick */}
            <line
              x1="28" y1={120 + i * 140}
              x2="60" y2={120 + i * 140}
              stroke="currentColor" strokeWidth="0.8"
              className="text-foreground"
              opacity="0.10"
            />
            {/* Short secondary ticks between years */}
            {[1, 2].map((j) => (
              <line
                key={j}
                x1="28" y1={120 + i * 140 + j * 47}
                x2="44" y2={120 + i * 140 + j * 47}
                stroke="currentColor" strokeWidth="0.5"
                className="text-foreground"
                opacity="0.06"
              />
            ))}
          </g>
        ))}

        {/* Vertical axis line */}
        <line
          x1="28" y1="80"
          x2="28" y2="920"
          stroke="currentColor" strokeWidth="0.6"
          className="text-foreground"
          opacity="0.08"
        />

        {/* Contour ellipses — right side suggestion */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx={830 + i * 22}
            cy={480 + Math.sin(i * 0.9) * 70}
            rx={100 + i * 48}
            ry={65 + i * 28}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground"
            opacity={0.05 - i * 0.006}
          />
        ))}

        {/* Subtle diagonal scan — satellite pass suggestion */}
        <line
          x1="900" y1="50"
          x2="100" y2="950"
          stroke="currentColor" strokeWidth="0.4"
          className="text-foreground"
          opacity="0.025"
          strokeDasharray="8,6"
        />
      </svg>
    </div>
  )
}

function FindingsBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Satellite-blue atmosphere */}
      <div
        className="absolute top-[20%] right-[10%] w-[600px] h-[500px] rounded-full blur-[170px]"
        style={{ background: 'rgba(73, 107, 122, 0.035)' }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Coordinate grid — more visible */}
        {Array.from({ length: 21 }, (_, i) => (
          <line
            key={`gv${i}`}
            x1={i * 50} y1="0"
            x2={i * 50} y2="1000"
            stroke="currentColor" strokeWidth="0.35"
            className="text-foreground"
            opacity="0.030"
          />
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <line
            key={`gh${i}`}
            x1="0" y1={i * 50}
            x2="1000" y2={i * 50}
            stroke="currentColor" strokeWidth="0.35"
            className="text-foreground"
            opacity="0.030"
          />
        ))}

        {/* Corner coordinate annotations */}
        {[[0, 0], [1000, 0], [0, 1000], [1000, 1000]].map(([cx, cy], i) => (
          <g key={`ca${i}`} opacity="0.12">
            <line x1={cx === 0 ? cx : cx - 18} y1={cy === 0 ? cy + 18 : cy - 18}
              x2={cx === 0 ? cx + 18 : cx - 18} y2={cy === 0 ? cy + 18 : cy - 18}
              stroke="currentColor" strokeWidth="0.6" className="text-foreground" />
            <circle cx={cx === 0 ? cx + 18 : cx - 18} cy={cy === 0 ? cy + 18 : cy - 18}
              r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
          </g>
        ))}

        {/* Satellite pass diagonal */}
        <line
          x1="850" y1="0"
          x2="150" y2="1000"
          stroke="currentColor" strokeWidth="0.4"
          className="text-foreground"
          opacity="0.04"
          strokeDasharray="10,8"
        />
      </svg>
    </div>
  )
}

function ConclusionBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* Brass glow — conclusion warmth */}
      <div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px]"
        style={{ background: 'rgba(179, 146, 74, 0.035)' }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Concentric contour curves — centered conclusion */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse
            key={i}
            cx={500 + Math.sin(i * 0.7) * 50}
            cy={680 + Math.cos(i * 0.5) * 30}
            rx={160 + i * 60}
            ry={90 + i * 32}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-foreground"
            opacity={0.075 - i * 0.007}
          />
        ))}

        {/* Bottom horizon line */}
        <line
          x1="0" y1="920"
          x2="1000" y2="920"
          stroke="currentColor" strokeWidth="0.5"
          className="text-foreground"
          opacity="0.07"
        />

        {/* Margin tick marks — both sides */}
        {[...Array(8)].map((_, i) => (
          <g key={i}>
            <line x1="0" y1={100 + i * 110} x2={i % 2 === 0 ? 18 : 10} y2={100 + i * 110}
              stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.10" />
            <line x1="1000" y1={100 + i * 110} x2={1000 - (i % 2 === 0 ? 18 : 10)} y2={100 + i * 110}
              stroke="currentColor" strokeWidth="0.6" className="text-foreground" opacity="0.10" />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── FELDSTATION ── Cartographic paper: heavy topo contours, grain, margin ticks */
function FeldstationBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* No radial atmospheres — let the cartographic texture speak */}

      {/* Heavy topographic contour rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dense concentric contours — much heavier than hero variant */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <ellipse
            key={i}
            cx={480 + Math.sin(i * 0.65) * 40}
            cy={640 + Math.cos(i * 0.45) * 25}
            rx={70 + i * 65}
            ry={42 + i * 38}
            fill="none"
            stroke="currentColor"
            strokeWidth={i < 4 ? '0.9' : '0.55'}
            className="text-foreground"
            opacity={Math.max(0.018, 0.22 - i * 0.014)}
          />
        ))}

        {/* Left margin tick marks — cartographic scale */}
        {[...Array(14)].map((_, i) => (
          <line
            key={`lm${i}`}
            x1="0" y1={40 + i * 70}
            x2={i % 4 === 0 ? 32 : i % 2 === 0 ? 20 : 11}
            y2={40 + i * 70}
            stroke="currentColor" strokeWidth="0.8"
            className="text-foreground"
            opacity="0.22"
          />
        ))}

        {/* Right margin tick marks */}
        {[...Array(14)].map((_, i) => (
          <line
            key={`rm${i}`}
            x1="1000" y1={40 + i * 70}
            x2={1000 - (i % 4 === 0 ? 32 : i % 2 === 0 ? 20 : 11)}
            y2={40 + i * 70}
            stroke="currentColor" strokeWidth="0.8"
            className="text-foreground"
            opacity="0.22"
          />
        ))}

        {/* Top margin tick marks */}
        {[...Array(16)].map((_, i) => (
          <line
            key={`tm${i}`}
            x1={30 + i * 62} y1="0"
            x2={30 + i * 62}
            y2={i % 4 === 0 ? 26 : i % 2 === 0 ? 16 : 8}
            stroke="currentColor" strokeWidth="0.8"
            className="text-foreground"
            opacity="0.22"
          />
        ))}

        {/* Bottom margin tick marks */}
        {[...Array(16)].map((_, i) => (
          <line
            key={`bm${i}`}
            x1={30 + i * 62} y1="1000"
            x2={30 + i * 62}
            y2={1000 - (i % 4 === 0 ? 26 : i % 2 === 0 ? 16 : 8)}
            stroke="currentColor" strokeWidth="0.8"
            className="text-foreground"
            opacity="0.18"
          />
        ))}

        {/* Cartographic observation points — field station marks */}
        {[
          [120, 140], [870, 175], [88, 800], [920, 720],
          [195, 460], [790, 360], [490, 920], [310, 300], [680, 550],
        ].map(([cx, cy], i) => (
          <g key={`fp${i}`} opacity="0.15">
            <line x1={cx - 11} y1={cy} x2={cx + 11} y2={cy} stroke="currentColor" strokeWidth="0.65" className="text-foreground" />
            <line x1={cx} y1={cy - 11} x2={cx} y2={cy + 11} stroke="currentColor" strokeWidth="0.65" className="text-foreground" />
            <circle cx={cx} cy={cy} r="2" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
          </g>
        ))}

        {/* Mountain ridge lines — bold landform */}
        <path
          d="M0,830 L70,790 L150,765 L220,740 L300,705 L380,722 L430,688 L495,648 L555,675 L620,705 L700,728 L775,745 L860,768 L945,788 L1000,800"
          fill="none" stroke="currentColor" strokeWidth="0.7"
          className="text-foreground" opacity="0.12"
        />
        <path
          d="M0,875 L110,852 L240,842 L355,818 L465,802 L535,818 L615,828 L720,838 L840,852 L1000,862"
          fill="none" stroke="currentColor" strokeWidth="0.5"
          className="text-foreground" opacity="0.08"
        />

        {/* Cartographic corner box frames */}
        <g className="text-foreground" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.18">
          <path d="M20,20 L20,60 M20,20 L60,20" />
          <path d="M980,20 L980,60 M980,20 L940,20" />
          <path d="M20,980 L20,940 M20,980 L60,980" />
          <path d="M980,980 L980,940 M980,980 L940,980" />
        </g>
      </svg>

      {/* Strong grain texture — cartographic paper feel */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true" style={{ opacity: 0.09 }}>
        <filter id="feldstation-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#feldstation-grain)" />
      </svg>
    </div>
  )
}

/* ── RASTERBAND ── Light instrument panel: sparse measurement grid, survey marks */
function RasterbandBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: '#1F2421' }}
      >
        {/* Sparse measurement grid — horizontal */}
        {[250, 500, 750].map((y, i) => (
          <line
            key={`gh${i}`}
            x1="0" y1={y}
            x2="1000" y2={y}
            stroke="currentColor" strokeWidth="0.4"
            opacity="0.040"
          />
        ))}

        {/* Sparse measurement grid — vertical */}
        {[250, 500, 750].map((x, i) => (
          <line
            key={`gv${i}`}
            x1={x} y1="0"
            x2={x} y2="1000"
            stroke="currentColor" strokeWidth="0.4"
            opacity="0.040"
          />
        ))}

        {/* Crosshair observation marks — survey feel */}
        {[[80, 100], [920, 90], [80, 900], [920, 910], [500, 50], [500, 950], [180, 500], [820, 500]].map(([cx, cy], i) => (
          <g key={`cross${i}`} opacity="0.10">
            <line x1={cx - 14} y1={cy} x2={cx + 14} y2={cy} stroke="currentColor" strokeWidth="0.6" />
            <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 14} stroke="currentColor" strokeWidth="0.6" />
            <circle cx={cx} cy={cy} r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </g>
        ))}

        {/* Corner bracket marks — instrument frame */}
        <g stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.14">
          <path d="M35,35 L35,75 M35,35 L75,35" />
          <path d="M965,35 L965,75 M965,35 L925,35" />
          <path d="M35,965 L35,925 M35,965 L75,965" />
          <path d="M965,965 L965,925 M965,965 L925,965" />
        </g>

        {/* Satellite pass diagonal — reference line */}
        <line
          x1="880" y1="20"
          x2="120" y2="980"
          stroke="currentColor" strokeWidth="0.35"
          opacity="0.045"
          strokeDasharray="12,8"
        />
      </svg>
    </div>
  )
}

export function ArtisticBackground({ variant }: ArtisticBackgroundProps) {
  switch (variant) {
    case 'feldstation':
      return <FeldstationBackground />
    case 'rasterband':
      return <RasterbandBackground />
    case 'gradiente':
      return null  /* GRADIENTE: no decorative background — let the white breathe */
    case 'hero':
      return <HeroBackground />
    case 'observatory':
      return <ObservatoryBackground />
    case 'methodology':
      return <MethodologyBackground />
    case 'timeline':
      return <TimelineBackground />
    case 'findings':
      return <FindingsBackground />
    case 'conclusion':
      return <ConclusionBackground />
    default:
      return <HeroBackground />
  }
}
