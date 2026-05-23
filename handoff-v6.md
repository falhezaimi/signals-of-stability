# Handoff: Full Website Revamp — Signals of Stability

**Date:** 2026-05-12  
**Status:** ✅ Phase 1 complete · ✅ Phase 2 complete · ✅ Phase 3 complete · ✅ Phase 4 complete · ✅ Phase 5 complete · ✅ Phase 5.5 complete

---

## Phase 5.5 — Theme Unification (Light Website)

**Executed:** 2026-05-12

### Decision

Abandoned the mixed light/dark register system. The website is now a unified light research communication site throughout. No more dramatic brightness jump from field paper → dark cinema → broad daylight.

The three spatial registers still exist and provide visual distinction, but through hue, tint, and subtle tone — not through a 7× lightness swing from L=0.13 to L=0.98.

**Site character goal:** Alpine field notebook · snow/stone/forest · research poster quality · quiet museum label. Not dark cinema, not SaaS dashboard, not cyber lab.

### Old Register Values (Phase 2)

| Register | Background | Lightness | Character |
|---|---|---|---|
| FELDSTATION | `oklch(0.892 0.018 75)` | L=0.892 | Warm paper |
| RASTERBAND | `oklch(0.130 0.018 222)` | **L=0.130 — pitch dark** | Dark alpine slate |
| GRADIENTE | `oklch(0.979 0.005 195)` | L=0.979 | Bright snowline white |

### New Register Values (Phase 5.5)

| Register | Background | Lightness | Character |
|---|---|---|---|
| FELDSTATION | `oklch(0.920 0.018 75)` | L=0.920 | Warm field paper |
| RASTERBAND | `oklch(0.900 0.010 220)` | L=0.900 | Light cool stone / pale slate |
| GRADIENTE | `oklch(0.950 0.006 195)` | L=0.950 | Snowline off-white |

All three lightness values now sit between 0.90 and 0.95. The differences come from hue (warm 75° vs. cool 220° vs. cool-neutral 195°) and subtle chroma, not brightness jumps.

RASTERBAND foreground updated from near-white `oklch(0.882 0.010 85)` to dark charcoal `oklch(0.175 0.006 80)`. All RASTERBAND component text, borders, and cards now use dark text on light stone — matching the global light system.

### Files Modified

| File | Change |
|---|---|
| `app/globals.css` | FELDSTATION: L 0.892→0.920. RASTERBAND: fully replaced — L 0.130→0.900, foreground near-white→dark charcoal, all card/border/secondary vars updated to light-mode values. GRADIENTE: L 0.979→0.950, chroma 0.005→0.006. |
| `app/page.tsx` | FELDSTATION, RASTERBAND, GRADIENTE (×2) inline style vars updated to match new register values. |
| `app/further-research/page.tsx` | FELDSTATION, RASTERBAND, GRADIENTE inline style vars updated to match new register values. |
| `components/artistic-background.tsx` | `RasterbandBackground()` rewritten: removed CRT scanlines and white pixel dot grid (dark-mode aesthetics), replaced with sparse measurement grid + survey crosshairs + corner brackets + satellite pass diagonal, all using `stroke="currentColor"` with dark foreground color. |

### Components Not Requiring Code Changes

All components in the RASTERBAND sections (Observatory, Methodology, Timeline, FrProducts, FrTemporal, FrAtlas, FrTrust) use CSS variables for text, borders, and card backgrounds — no hardcoded dark-assuming values in those elements. Updating the register vars was sufficient.

**Satellite/raster image display panels kept dark intentionally:** The Observatory raster viewer (`oklch(0.075 0.012 222)`), FR products 3D terrain panels, FR temporal 3D views, and FR atlas/trust map panels all retain their dark container backgrounds — satellite imagery renders correctly on dark, and the light-colored coordinate labels (`#DDD3BE`) remain legible on those specific panels. This is correct: dark image panels embedded within light sections, like a screen in a field instrument.

### Visual Review Summary (Playwright + DOM)

| Check | Result |
|---|---|
| FELDSTATION computed `background-color` | ✅ `oklch(0.92 0.018 75)` |
| RASTERBAND computed `background-color` | ✅ `oklch(0.9 0.01 220)` |
| GRADIENTE computed `background-color` (×2) | ✅ `oklch(0.95 0.006 195)` |
| FR page computed registers | ✅ All three match homepage values |
| Hero / FR opening screenshots | ✅ Warm field paper — clean, research-quality typography |
| Full-page screenshots (homepage + FR) | ✅ No dark cinema jump anywhere; unified light flow throughout |
| Map/terrain image panels | ✅ Dark display containers remain, correctly embedded in light sections |
| No dashboard feel | ✅ Scientific field report character preserved |

### Build Result

| Check | Result |
|---|---|
| `npm run build` | ✅ SUCCESS — compiled 6.1s, TypeScript clean |
| Static routes | `/ ` `/_not-found` `/further-research` — 3 routes |
| ESLint | ⚠️ Pre-existing — binary not installed. Does not affect build. |

### Data Integrity Confirmation

| Check | Result |
|---|---|
| `public/data/signals` untouched | ✅ Not touched — zero file modifications in that directory |
| Python pipeline scripts untouched | ✅ Not touched |
| `/signals` route not reintroduced | ✅ Zero `href="/signals"` references |
| Scientific values, captions, classifications | ✅ Not changed |

### Known Remaining Issues

| Issue | Notes |
|---|---|
| Section distinction is now subtle | With all registers in L=0.90–0.95, the register boundaries are felt through hue shift and border/card contrast rather than brightness. This is intentional but worth reviewing at larger viewport sizes. If more visual separation is desired, RASTERBAND bg could go slightly lower (e.g., L=0.88) without breaking the light-website constraint. |
| ESLint not installed | Pre-existing. Unrelated to this phase. |
| `public/data/` uncommitted changes | Pre-existing pipeline outputs. Unrelated to this phase. |

### Next Objective

Final visual review at desktop viewport width (1280px+) to confirm the three-register tonal rhythm reads clearly at full scale. Then: commit all Phase 1–5.5 changes with a single clean commit message.

---

## Phase 5 Completion Report

**Executed:** 2026-05-12

### Objective

Final QA, unused file cleanup, and production readiness. No redesign, no new features — targeted cleanup and verification only.

### Files Modified

| File | Change |
|---|---|
| `app/further-research/page.tsx` | Metadata updated: `title` → "Signals of Stability — Inside the Evidence Layer \| Swiss National Park"; `description` updated to match Phase 4 framing (evidence layer, spatial maps, products, yearly variation, robustness checks, future directions) |

### Files Deleted

| File | Reason |
|---|---|
| `components/theme-provider.tsx` | Unused — not imported anywhere in `app/` or `components/`. Confirmed via grep before deletion. |

### Metadata Update

| Field | Before | After |
|---|---|---|
| `title` | "Signals of Stability — Inside the Signal \| Swiss National Park" | "Signals of Stability — Inside the Evidence Layer \| Swiss National Park" |
| `description` | Old "Inside the Signal" framing | Describes spatial maps, ECOSTRESS product evidence, yearly variation, robustness checks, and future research directions |

### Debug Output Audit

Grep across all `app/` and `components/` files for: `console.log`, `console.warn`, `console.error`, `debugger`, `TODO`, `FIXME`.

**Result: Zero matches.** No debug output found.

### Broken Link / Path Audit

| Check | Result |
|---|---|
| `href="/signals"` references | ✅ Zero — /signals route not referenced anywhere |
| "Data Atlas" text references | ✅ Zero |
| JSON import paths (`@/public/data/signals/`) | ✅ All resolve — tsconfig alias `@/*` → `./` confirmed correct |
| Image `src`/`srcSet` attributes | ✅ All use `/data/...` format (correct for Next.js `public/` serving) |
| Spot-check of 7 key image files (maps WebP/PNG, 3D product renders) | ✅ All present |
| Raster directory | ✅ 96 PNG + 96 JSON sidecar files confirmed |

### Mobile Layout Review (390px CSS viewport)

Tested via Playwright DOM metrics at 390px CSS viewport width.

| Section | Result |
|---|---|
| Hero | ✅ Correct — no overflow, layout clean |
| AnswerBrief | ✅ Correct |
| `#findings` SVG overflow | ✅ Recharts `<line>` elements extend beyond viewport edge but parent `<section class="overflow-hidden">` clips them — `overflowX: hidden` confirmed via `getComputedStyle`. Not user-visible. |
| All other homepage sections | ✅ No unexpected horizontal overflow |
| FR opening at 390px CSS | ✅ Bridge paragraph, badge, h1, research question, answer card all render correctly |

Note: Framer Motion `SectionReveal` wrappers keep content at `opacity:0` until in-viewport — this is expected scroll-reveal behavior, not a layout bug.

### Anchor / Nav Match Review

All six Further Research nav links confirmed to match actual DOM anchor IDs:

| FR Nav href | Section component | DOM `id` | Match |
|---|---|---|---|
| `#question` | `fr-opening.tsx` | `id="question"` | ✅ |
| `#spatial` | `fr-atlas.tsx` | `id="spatial"` | ✅ |
| `#products` | `fr-products.tsx` | `id="products"` | ✅ |
| `#temporal` | `fr-temporal.tsx` | `id="temporal"` | ✅ |
| `#trust` | `fr-trust.tsx` | `id="trust"` | ✅ |
| `#next` | `fr-next.tsx` | `id="next"` | ✅ |

### Build Results

| Check | Result |
|---|---|
| `npm run build` | ✅ SUCCESS — compiled 6.2s, TypeScript clean |
| Static routes generated | `/ ` `/_not-found` `/further-research` — 3 routes |
| ESLint | ⚠️ Pre-existing — `eslint` binary not installed. Does not affect build. |

Build output:
```
▲ Next.js 16.2.4 (Turbopack)
✓ Compiled successfully in 6.2s
✓ Generating static pages using 5 workers (4/4)

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /further-research
```

### Git Status — Phase 5 Changes

**Modified by Phase 5:**
- `app/further-research/page.tsx` — metadata update

**Deleted by Phase 5:**
- `components/theme-provider.tsx` — unused component removed

**Pre-existing changes (earlier phases, not Phase 5):**
- All other modified/deleted files (`app/globals.css`, `app/page.tsx`, all `components/*.tsx`, deleted `signals-*.tsx`, `app/signals/page.tsx`, etc.) — these are Phase 1–4 changes committed as part of those phases
- `public/data/` — pipeline output files (processed summaries, raster JSONs) show as modified in git; these are data pipeline outputs, not touched by any Phase 1–5 work

**Confirmation:** `public/data/signals/` was not touched by Phase 5.  
**Confirmation:** Python pipeline scripts were not touched by Phase 5.  
**Confirmation:** `/signals` route was not reintroduced.

---

## Phase 1 Completion Report

**Executed:** 2026-05-12

### Files Deleted

| File | Reason |
|---|---|
| `app/signals/page.tsx` | Data Atlas route removed |
| `app/signals/` (directory) | Route directory removed |
| `components/signals-navigation.tsx` | Only used by deleted /signals route |
| `components/signals-intro.tsx` | Only used by deleted /signals route |
| `components/signals-map-atlas.tsx` | Only used by deleted /signals route |
| `components/signals-3d-products.tsx` | Only used by deleted /signals route |
| `components/signals-yearly-timeline.tsx` | Only used by deleted /signals route |
| `components/signals-provenance.tsx` | Only used by deleted /signals route |
| `components/signals-footer.tsx` | Only used by deleted /signals route |

### Files Modified

| File | Change |
|---|---|
| `components/navigation.tsx` | Removed "Data Atlas" Link → /signals. Kept "Further Research" link. |
| `components/fr-nav.tsx` | Removed "Data Atlas" Link → /signals (third link, discovered during grep). |
| `components/fr-next.tsx` | Replaced "Explore Data Atlas" (href="/signals") with "Review Main Evidence" (href="/#findings"). |
| `components/methodology.tsx` | Fixed NODES: MODIS→ECOSTRESS·AppEEARS, JJA→AMJ, LST→ESI. Fixed param strip: 30m/10m→70m nominal, 2024→2025, added Analysis Window row. |
| `components/research-question.tsx` | Replaced vague question with terrain-structure question. Fixed ESI range −2–+2σ→0–1 (0=max stress). |
| `components/interpretation.tsx` | Replaced generic hypothesis cards with actual finding cards. Rectangular badge style. Heading → "What the Signal Suggests". |

### Build Results

| Check | Result |
|---|---|
| `npm run build` | ✅ SUCCESS — 3 routes (/, /_not-found, /further-research) |
| ESLint | ⚠️ Pre-existing — eslint binary not installed locally, does not affect build |

---

## Phase 2 Completion Report

**Executed:** 2026-05-12

### Design Decisions

| Register | Before | After | Narrative intent |
|---|---|---|---|
| FELDSTATION | `oklch(0.892 0.018 75)` | unchanged | Warm cartographic paper |
| RASTERBAND | `oklch(0.095 0.006 160)` teal near-black | `oklch(0.130 0.018 222)` deep alpine slate | Granite schist at dusk — not server-room teal |
| GRADIENTE | `oklch(0.974 0.006 85)` warm ivory | `oklch(0.979 0.005 195)` cool snowline white | Visually distinct from FELDSTATION; clear synthesis register |

Narrative arc: **warm field paper → deep alpine slate → cool snowline clarity**.

### Files Changed

| File | Change |
|---|---|
| `app/globals.css` | RASTERBAND: hue 160→222, L 0.095→0.130, C 0.006→0.018. Full var set added. GRADIENTE: hue 85→195. |
| `app/page.tsx` | Inline RASTERBAND and GRADIENTE vars updated. |
| `app/further-research/page.tsx` | Same inline register vars updated. |
| `components/observatory.tsx` | Panel bg + gradient overlay: h=160→222. |
| `components/earth-map.tsx` | Raster panel bg: h=160→222. |
| `components/fr-atlas.tsx` | Both Tailwind arbitrary-value bg classes: h=160→222. |
| `components/fr-products.tsx` | Panel bg, gradient, thumbnail bg: h=160→222. |
| `components/fr-temporal.tsx` | Thumbnail bg, panel bg, gradient: h=160→222. |
| `components/fr-trust.tsx` | Both map panel bg classes: h=160→222. |

### Verification

| Check | Result |
|---|---|
| Grep for h=160 | ✅ Zero remaining |
| `npm run build` | ✅ SUCCESS — compiled 7.1s, TypeScript clean |
| Computed CSS (Playwright) | ✅ FELDSTATION `0.892 0.018 75`, RASTERBAND `0.13 0.018 222`, GRADIENTE `0.979 0.005 195` |
| `/signals` absent | ✅ Zero href="/signals" references |
| Scientific values unchanged | ✅ No captions, maps, chart data, or analysis results modified |

---

## Phase 3 Completion Report

**Executed:** 2026-05-12

### Objective

Restructure the homepage narrative so first-time visitors (professors, mentors, classmates, symposium attendees with no prior ECOSTRESS/ESI context) understand the project quickly. Goal: surface the answer early, then evidence, then depth.

Narrative arc: **Context → Question → Answer → Evidence → How we got there → Where next**

### Files Modified

| File | Change |
|---|---|
| `components/answer-brief.tsx` | **New component.** Compact section immediately after ResearchQuestion. States the finding directly. |
| `app/page.tsx` | Full rewrite of register wrapper structure. New section order. `AnswerBrief` imported and placed. |
| `components/hero.tsx` | Primary CTA: "Explore Observatory" → "See the Evidence" (scrolls to `#findings`). Secondary CTA: button→Methodology replaced with `<a href="/further-research">Further Research →</a>`. |
| `components/conservation-close.tsx` | Complete rewrite. Ghost text "RESILIENCE" → "STRUCTURE". Poetic quote replaced with direct finding statement tied to terrain-structured mosaic. |
| `components/final-cta.tsx` | Heading → "Continue into the evidence layer". New primary CTA: `<a href="/further-research">Open Further Research →</a>`. Secondary scroll links: Signal Observatory / Findings / Methodology. |

### New Homepage Section Order

| # | Component | Register | Anchor | Change |
|---|---|---|---|---|
| 1 | Hero | FELDSTATION | `#hero` | CTAs updated |
| 2 | ResearchQuestion | FELDSTATION | `#question` | Unchanged |
| 3 | **AnswerBrief** | FELDSTATION | `#answer` | **New** |
| 4 | EarthMap | FELDSTATION | `#earth` | Unchanged |
| 5 | DataVisualizations | GRADIENTE | `#findings` | Moved up from #7 |
| 6 | Interpretation | GRADIENTE | — | Moved up from #9 |
| 7 | Observatory | RASTERBAND | `#observatory` | Moved down from #4 |
| 8 | Methodology | RASTERBAND | `#method` | Moved down from #5 |
| 9 | Timeline | RASTERBAND | `#timeline` | Moved down from #6 |
| 10 | DataProvenance | GRADIENTE | — | Unchanged position |
| 11 | ForestDivider | GRADIENTE | — | Unchanged |
| 12 | ConservationClose | GRADIENTE | `#conclusion` | Rewritten |
| 13 | FinalCTA | GRADIENTE | — | Rewritten |
| 14 | Footer | GRADIENTE | — | Unchanged |

### AnswerBrief Component Details

- Section `id="answer"`, FELDSTATION register (warm paper — same as Hero and ResearchQuestion)
- Label badge: "What the evidence suggests"
- Headline: **"Structure, not randomness."**
- Answer paragraph: terrain-structured ecological mosaic, April–June 2019–2025, directional signal only
- Three evidence tags:
  - Stable cores · ~3.8% of AOI · ~6.7 km²
  - ESI watch zones · ~6.2% of AOI · ~10.9 km²
  - Demand-efficiency areas · ~29% of AOI · ~50.7 km²
- Caveat line: "Directional signal only · Seven April–June seasons · 2024 ET & ESI low confidence · Validation pending"

### Register Wrapper Structure (app/page.tsx)

```
FELDSTATION  — Hero, ResearchQuestion, AnswerBrief, EarthMap
GRADIENTE    — DataVisualizations, Interpretation
RASTERBAND   — Observatory, Methodology, Timeline
GRADIENTE    — DataProvenance, ForestDivider, ConservationClose, FinalCTA, Footer
```

The GRADIENTE register is applied to two separate `data-register` divs — one before RASTERBAND (evidence), one after (closure). Both carry identical inline CSS var overrides. This is valid; each is an independent wrapper.

### Verification

| Check | Result |
|---|---|
| Research question appears early | ✅ Section 2 (ResearchQuestion) |
| Short answer appears early | ✅ Section 3 (AnswerBrief) — before study map |
| Evidence follows the answer | ✅ Section 5–6 (DataVisualizations, Interpretation) |
| `/further-research` linked from hero | ✅ Secondary CTA in Hero |
| `/further-research` linked from CTA | ✅ Primary CTA in FinalCTA |
| `public/data/signals` untouched | ✅ No data files modified |
| `/signals` not reintroduced | ✅ Zero href="/signals" references |
| Scientific values unchanged | ✅ No captions, chart data, analysis results, or raster files modified |
| All confidence caveats carried | ✅ AnswerBrief, ConservationClose, FinalCTA all carry directional-signal / validation-pending language |
| `npm run build` | ✅ SUCCESS — TypeScript clean |
| Visual review (Playwright) | ✅ Hero CTAs correct; AnswerBrief visible with evidence tags; DataVisualizations in GRADIENTE white; RASTERBAND dark section for Observatory/Methodology/Timeline |

---

## Phase 4 Completion Report

**Executed:** 2026-05-12

### Objective

Polish the `/further-research` page and align it with the new homepage narrative. The homepage CTA says "Continue into the evidence layer" — the FR page must feel like the natural next chapter, not a dashboard or appendix. The audience includes visitors with no prior ECOSTRESS/ESI context.

### Files Modified

| File | Change |
|---|---|
| `components/fr-opening.tsx` | Coord strip → "Evidence Layer · Swiss National Park · Signals of Stability". Badge → "The Evidence Layer". H1 → "Inside the Evidence Layer / Swiss National Park". Added bridge paragraph connecting to homepage CTA. |
| `components/fr-atlas.tsx` | Intro paragraph rewritten for non-specialist clarity; explicitly links spatial pattern to homepage finding. |
| `components/fr-products.tsx` | Added one-sentence ECOSTRESS context ("NASA thermal sensor on the ISS that measures how land surfaces use water") for visitors with no prior satellite context. Updated intro to list each product's ecological role. |
| `components/fr-temporal.tsx` | Intro updated to reference the multi-year composite as "the average picture behind the homepage finding" and make directional-signal caveat explicit in the paragraph. |
| `components/fr-trust.tsx` | Badge question changed from "Could the pattern be an artifact?" to "How carefully should this pattern be trusted?". Intro rewritten to frame as confidence calibration rather than artifact defense. |
| `components/fr-next.tsx` | Added full confidence caveat line to the summary answer box. Navigation: "Back to Main Story" → "Return to Homepage", "Review" → "Review on Homepage". |

### Section-by-Section Question/Answer Framing

| Section | Badge Question | Answer Framing |
|---|---|---|
| fr-opening | (The Evidence Layer) | Bridge paragraph + research question + answer card stating "Structure." |
| fr-atlas | Where does the signal appear? | Six maps show terrain-organized mosaic, not random scatter |
| fr-products | What environmental signals explain the pattern? | ET/PET/ESI/NDVI/WUE each capture a different lens; together they explain stable vs. watch zones |
| fr-temporal | Does the signal persist through time? | Multi-year composite vs. yearly view reveals persistence, variability, and low-confidence years |
| fr-trust | How carefully should this pattern be trusted? | Patterns persistent across filter choices + terrain-aligned earn more weight; limitations listed explicitly |
| fr-next | What should be tested next? | Six specific hypotheses from visual → testable |

### Confidence Caveats — Status

| Caveat | Location |
|---|---|
| Directional signal only | fr-opening bridge, fr-temporal intro, fr-next summary |
| Not a confirmed trend | fr-temporal intro ("directional only"), fr-trust intro ("exploratory, not peer-reviewed") |
| Seven April–June seasons | fr-next summary caveat line |
| 2024 ET & ESI low confidence | fr-temporal LOW CONF badge (existing, preserved), fr-next summary caveat line |
| Validation pending | fr-next summary caveat line |
| Exploratory only / not peer-reviewed | fr-trust intro, fr-trust technical provenance table, fr-next footnote |

### Navigation / CTA Changes

| Location | Before | After |
|---|---|---|
| fr-opening coord strip | "Further Research · Inside the Signal · Swiss National Park" | "Evidence Layer · Swiss National Park · Signals of Stability" |
| fr-opening badge | "Section 1 · The Question" | "The Evidence Layer" |
| fr-opening h1 | "Further Research: Inside the Signal" | "Inside the Evidence Layer / Swiss National Park" |
| fr-next back link label | "Back to / Main Story" | "Return to / Homepage" |
| fr-next forward link label | "Review / Main Evidence" | "Review on Homepage / Main Evidence" |
| /signals links | None (already absent from Phase 1) | Still absent ✅ |

### Build / Lint Results

| Check | Result |
|---|---|
| `npm run build` | ✅ SUCCESS — 3 routes (/, /_not-found, /further-research) · TypeScript clean |
| ESLint | ⚠️ Pre-existing — `eslint` binary not installed. Does not affect build. |

### Data Integrity

| Check | Result |
|---|---|
| `public/data/signals` untouched | ✅ No files in that directory modified by Phase 4 |
| `/signals` route not reintroduced | ✅ Zero `href="/signals"` references in any component or page |
| `/data/signals/` image paths | ✅ All existing `src`/`srcSet` paths preserved — these are data reads, not route links |
| Python scripts unchanged | ✅ Not touched |
| Scientific values, captions, classifications | ✅ Not changed |

---

## 1. Current Repo Structure

```
swiss-national-park-site/
├── app/
│   ├── globals.css                  ← Theme tokens + three-register CSS vars (Phase 2 updated)
│   ├── layout.tsx                   ← Fonts (Playfair/Inter/JetBrains), metadata, Analytics
│   ├── page.tsx                     ← Main homepage (Phase 3: reordered, 4-register wrapper structure)
│   └── further-research/
│       └── page.tsx                 ← Further Research narrative (Phase 2 inline vars; Phase 5: metadata updated)
│
├── components/
│   ├── navigation.tsx               ← Fixed nav — "Further Research" link only (Phase 1: /signals removed)
│   ├── hero.tsx                     ← Hero with TopoArtifactSVG; CTAs updated Phase 3
│   ├── answer-brief.tsx             ← NEW (Phase 3) — compact finding statement, #answer anchor
│   ├── earth-map.tsx                ← Raster map panel (Phase 2: panel bg updated)
│   ├── research-question.tsx        ← Terrain-structure question + 3 focus area cards (Phase 1: fixed)
│   ├── observatory.tsx              ← Raster viewer + year slider + stats dock (Phase 2: panel bg updated)
│   ├── methodology.tsx              ← SVG flowchart (Phase 1: ECOSTRESS/AppEEARS, AMJ, ESI fixed)
│   ├── timeline.tsx                 ← Film-strip horizontal scroll per season
│   ├── data-visualizations.tsx      ← Fig. 1–5 charts + raster thumbnails
│   ├── data-provenance.tsx          ← Pipeline provenance panel
│   ├── interpretation.tsx           ← Actual finding cards: mosaic, stable core, ESI watch (Phase 1: fixed)
│   ├── conservation-close.tsx       ← Phase 3: rewritten — tied to terrain finding, ghost text "STRUCTURE"
│   ├── final-cta.tsx                ← Phase 3: rewritten — /further-research primary CTA
│   ├── footer.tsx                   ← Footer
│   ├── artistic-background.tsx      ← Decorative background variants
│   ├── alpine-accents.tsx           ← Treeline/pine SVG accents
│   └── section-reveal.tsx           ← Framer Motion scroll-reveal wrapper
│   │
│   ├── fr-nav.tsx                   ← Further Research nav (Phase 1: /signals removed)
│   ├── fr-opening.tsx               ← FR Section 1 — Evidence layer opening, bridge paragraph, Q+A (Phase 4)
│   ├── fr-atlas.tsx                 ← FR Section 2 — Spatial evidence maps (Phase 2: panel bg; Phase 4: intro)
│   ├── fr-products.tsx              ← FR Section 3 — ECOSTRESS products (Phase 2: panel bg; Phase 4: context)
│   ├── fr-temporal.tsx              ← FR Section 4 — Yearly temporal variation (Phase 2; Phase 4: intro)
│   ├── fr-trust.tsx                 ← FR Section 5 — Robustness/confidence checks (Phase 4: badge + intro)
│   └── fr-next.tsx                  ← FR Section 6 — Future research directions (Phase 4: caveat + nav)
│
├── public/data/
│   ├── signals/                     ← DO NOT TOUCH — JSON data + nasa_quality_maps images
│   └── rasters/                     ← DO NOT TOUCH — per-year raster PNGs + sidecar JSONs
│
└── handoff.md
```

**Deleted across all phases:**
- `components/theme-provider.tsx` — unused dark-mode provider (Phase 5)
- `components/signals-*.tsx` (7 files) — only used by /signals route (Phase 1)
- `app/signals/page.tsx` + `app/signals/` directory — Data Atlas route (Phase 1)

---

## 2. Current Routes

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Live — bugs fixed (Phase 1), palette updated (Phase 2), narrative restructured (Phase 3) |
| `/further-research` | `app/further-research/page.tsx` | Live — palette updated (Phase 2), narrative polished (Phase 4), metadata updated (Phase 5) |
| `/signals` | — | **Deleted in Phase 1** — not reintroduced |

---

## 3. Current Theme System

### Three-register palette (as of Phase 5.5 — unified light)

| Register | Background | Sections | Character |
|---|---|---|---|
| FELDSTATION | `oklch(0.920 0.018 75)` | Hero, ResearchQuestion, AnswerBrief, EarthMap | Warm field paper — hue 75° |
| GRADIENTE | `oklch(0.950 0.006 195)` | DataVisualizations, Interpretation + DataProvenance→Footer | Snowline off-white — hue 195° |
| RASTERBAND | `oklch(0.900 0.010 220)` | Observatory, Methodology, Timeline | Light cool stone — hue 220° |

All three lightness values are L=0.90–0.95. Register transitions are tonal (warm↔cool) not brightness-based.

### Root palette tokens (`app/globals.css`)

| Token | Value | Role |
|---|---|---|
| `--primary` | `oklch(0.565 0.095 140)` | Muted alpine green |
| `--accent` / `--gold` | `oklch(0.687 0.115 79)` | Soft gold — badges, highlights |
| `--ice-blue` | `oklch(0.527 0.092 234)` | Satellite/instrument blue |
| `--stone` | `oklch(0.728 0.016 80)` | Stone gray |
| `--forest` | `oklch(0.35 0.08 140)` | Deep forest green |

### Implementation pattern

Registers are applied as `data-register` divs in `app/page.tsx` and `app/further-research/page.tsx` with **inline `style` CSS var overrides** (not via CSS attribute selectors, which Turbopack strips at build time). The inline values take precedence over the `[data-register]` blocks in `globals.css`. Both must be kept in sync.

---

## 4. Site Purpose

> **Signals of Stability** presents ECOSTRESS/AppEEARS satellite-derived evidence (NDVI, ET, ESI) for the Swiss National Park across April–June composites from 2019–2025. Its purpose is to show whether ecological stability in this protected alpine landscape is spatially random or structured by terrain and water stress — and to present the directional evidence (maps, figures, yearly variation, robustness checks) that supports that finding.

---

## 5. Research Question (live on homepage)

> **"Is ecological stability in Swiss National Park randomly distributed, or is it structured by terrain and water stress?"**

Displayed in `components/research-question.tsx` (fixed Phase 1). Also in `fr-opening.tsx` on the Further Research page.

---

## 6. Short Answer (live on homepage)

> **Structure.** Swiss National Park does not behave like a uniform green landscape. ECOSTRESS/AppEEARS evidence (April–June, 2019–2025) points to a terrain-structured ecological mosaic: stable cores, evaporative stress watch zones, and demand-efficiency areas emerge from interactions among elevation, water flux, atmospheric demand, vegetation greenness, and water-use behavior. This is a directional signal only — not a confirmed trend. Seven seasons; validation pending.

Now surfaced early via `answer-brief.tsx` (section 3, Phase 3 new) and expanded in `interpretation.tsx` (section 6). Full narrative version in `fr-opening.tsx` on the Further Research page.

---

## 7. Final Site Narrative Structure

### Homepage (`/`)

| Order | Section | Register | Anchor | Role |
|---|---|---|---|---|
| 1 | Hero | FELDSTATION | `#hero` | Entry — field paper, SNP context |
| 2 | ResearchQuestion | FELDSTATION | `#question` | The question this project answers |
| 3 | AnswerBrief | FELDSTATION | `#answer` | Short answer surfaced early |
| 4 | EarthMap | FELDSTATION | `#earth` | Study area map |
| 5 | DataVisualizations | GRADIENTE | `#findings` | Figures 1–5 charts + raster thumbnails |
| 6 | Interpretation | GRADIENTE | — | Actual finding cards: mosaic, stable core, ESI watch |
| 7 | Observatory | RASTERBAND | `#observatory` | Raster viewer + year slider |
| 8 | Methodology | RASTERBAND | `#method` | SVG pipeline flowchart |
| 9 | Timeline | RASTERBAND | `#timeline` | Film-strip per season |
| 10 | DataProvenance | GRADIENTE | — | Pipeline provenance |
| 11 | ForestDivider | GRADIENTE | — | Visual divider |
| 12 | ConservationClose | GRADIENTE | `#conclusion` | Terrain-structure finding statement |
| 13 | FinalCTA | GRADIENTE | — | "Continue into the evidence layer" → /further-research |
| 14 | Footer | GRADIENTE | — | Footer |

### Further Research Page (`/further-research`)

| Order | Section | Anchor | Role |
|---|---|---|---|
| 1 | FrOpening | `#question` | Bridge paragraph from homepage → evidence layer; Q+A |
| 2 | FrAtlas | `#spatial` | Six spatial maps — terrain-organized mosaic |
| 3 | FrProducts | `#products` | Five ECOSTRESS products — each a different lens |
| 4 | FrTemporal | `#temporal` | Yearly variation 2019–2025 |
| 5 | FrTrust | `#trust` | Robustness and confidence calibration |
| 6 | FrNext | `#next` | Six future research hypotheses |

---

## 8. Known Remaining Issues

| Issue | Severity | Location | Notes |
|---|---|---|---|
| **ESLint not installed** | Low | `package.json` | `eslint .` script exists but no `eslint` in devDependencies. Pre-existing; does not affect build. |
| **`data-register` CSS var duplication** | Low | `globals.css` + `page.tsx` | RASTERBAND/GRADIENTE vars defined in both places. Inline values take precedence. Intentional pattern — keep both in sync. |
| **2024/2025 confidence caveats** | Ongoing | Observatory, DataVisualizations, AnswerBrief, fr-next | Correctly badged throughout. Any new section surfacing the finding must carry: "directional signal only · 2024 ET & ESI low confidence (2 overpasses) · 2025 partial". |
| **Pre-existing uncommitted changes in `public/data/`** | Low | `public/data/` | Processed summary CSVs and raster JSON sidecar files show as modified in git status. These are pipeline outputs — do not commit without verifying against source pipeline run. |
| **Register distinction subtle at desktop** | Low | Homepage / FR page | With all registers at L=0.90–0.95, section boundaries are felt through hue/tint rather than brightness. This is intentional and consistent with the light-website decision. If more separation is wanted, RASTERBAND bg could go to L=0.88 without breaking the light constraint. |

---

## 9. How to Run Locally

```bash
cd swiss-national-park-site
npm install
npm run dev
```

Opens at `http://localhost:3000`. Uses Next.js Turbopack (`--turbopack` flag in dev script).

**Production build:**
```bash
npm run build
npm run start
```

---

## 10. How to Deploy

This is a static Next.js site (all routes are `○ Static`). It can be deployed to any static host or Next.js platform:

**Vercel (recommended):**
```bash
npx vercel --prod
```

**Static export (if needed):**
Add `output: 'export'` to `next.config.ts`, then `npm run build` — outputs to `out/`.

**Environment:** Node.js 18+. No server-side runtime required for the built output.

---

## 11. Suggested Future Improvements

| Improvement | Type | Notes |
|---|---|---|
| Install ESLint + `@next/eslint-plugin-next` | Dev tooling | `npm install -D eslint eslint-config-next` — pre-existing gap |
| Add `2025 partial` badge to AnswerBrief | Data fidelity | 2025 data is partial-season; caveat is in text but no visual badge yet |
| Commit `public/data/` changes | Data hygiene | Verify pipeline outputs against source run before committing |
| Add `og:image` and Twitter card metadata | SEO/sharing | Currently no social preview image |
| Add `robots.txt` and `sitemap.xml` | SEO | Not present; low priority for research prototype |
| Test ESI 2025 yearly output once data matures | Data | 2025 currently partial — update temporal section when complete season available |
| Validate watch zones against SNP management maps | Science | FR Section 6 hypothesis #6: "Test whether demand-efficiency watch pixels correspond to known ecological vulnerability zones" |

---

*Phases 1–5 executed by Claude Sonnet 4.6 — 2026-05-12*
