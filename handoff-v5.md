# Handoff v5: Full Website Revamp — Signals of Stability

**Date:** 2026-05-12  
**Version:** 5  
**Status:** ✅ Phase 1 complete · ✅ Phase 2 complete · ✅ Phase 3 complete · ✅ Phase 4 complete — Phase 5 (Final QA + cleanup) pending

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

### Visual Review (Playwright)

| Check | Result |
|---|---|
| Opening feels like evidence layer arrival | ✅ Bridge paragraph visible in first screen; badge and h1 echo homepage CTA language |
| Bridge paragraph visible | ✅ "The homepage states the directional finding. This page opens the evidence behind it — moving through six spatial maps..." |
| Research question + answer visible | ✅ Bordered question block + answer card both present |
| Section preview grid present | ✅ Four cards: Maps, Products, Yearly Outputs, Robustness Checks |
| Spatial section readable | ✅ Updated intro visible; map panel renders correctly in FELDSTATION warm register |
| RASTERBAND transition correct | ✅ Products section renders in dark alpine slate (oklch 0.130 0.018 222) |
| No dashboard feel | ✅ Page reads as a research chapter; evidence sequence is clear |
| Phase 2 colors intact | ✅ FELDSTATION/RASTERBAND/GRADIENTE all correct |

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
│       └── page.tsx                 ← Further Research narrative (Phase 2 inline vars; Phase 4 components updated)
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
│   ├── section-reveal.tsx           ← Framer Motion scroll-reveal wrapper
│   ├── theme-provider.tsx           ← Dark-mode provider (unused — safe to delete in Phase 5)
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

---

## 2. Current Routes

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Live — bugs fixed (Phase 1), palette updated (Phase 2), narrative restructured (Phase 3) |
| `/further-research` | `app/further-research/page.tsx` | Live — palette updated (Phase 2), narrative polished (Phase 4) |
| `/signals` | — | **Deleted in Phase 1** |

---

## 3. Current Theme System

### Three-register palette (as of Phase 2)

| Register | Background | Sections | Character |
|---|---|---|---|
| FELDSTATION | `oklch(0.892 0.018 75)` | Hero, ResearchQuestion, AnswerBrief, EarthMap + FR Opening, FR Atlas | Warm cartographic paper |
| GRADIENTE | `oklch(0.979 0.005 195)` | DataVisualizations, Interpretation + DataProvenance→Footer + FR Trust, FR Next | Cool snowline white — scientific synthesis |
| RASTERBAND | `oklch(0.130 0.018 222)` | Observatory, Methodology, Timeline + FR Products, FR Temporal | Deep alpine slate — instrument dark |

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

## 5. Research Question (live on both pages)

> **"Is ecological stability in Swiss National Park randomly distributed, or is it structured by terrain and water stress?"**

Displayed in `components/research-question.tsx` (Phase 1 fixed) and `components/fr-opening.tsx` (Phase 4 retained).

---

## 6. Short Answer (live on both pages)

> **Structure.** Swiss National Park does not behave like a uniform green landscape. ECOSTRESS/AppEEARS evidence (April–June, 2019–2025) points to a terrain-structured ecological mosaic: stable cores, evaporative stress watch zones, and demand-efficiency areas emerge from interactions among elevation, water flux, atmospheric demand, vegetation greenness, and water-use behavior. This is a directional signal only — not a confirmed trend. Seven seasons; validation pending.

Homepage: surfaced early via `answer-brief.tsx` (section 3) and expanded in `interpretation.tsx` (section 6).  
Further Research: in `fr-opening.tsx` answer card + `fr-next.tsx` summary box.

---

## 7. Known Open Issues

| Issue | Severity | Location | Notes |
|---|---|---|---|
| **Page title still says "Inside the Signal"** | Low | `app/further-research/page.tsx` metadata | `title` and `description` in page metadata still reference old subtitle. Phase 5 cleanup candidate. |
| **`theme-provider.tsx` unused** | Low | `components/` | Component exists but is not imported in `layout.tsx`. Safe to delete in Phase 5. |
| **ESLint not installed** | Low | `package.json` | `eslint .` script exists but no `eslint` in devDependencies. Pre-existing; does not affect build. |
| **`data-register` CSS var duplication** | Low | `globals.css` + `page.tsx` | RASTERBAND/GRADIENTE vars defined in both places. Inline values take precedence. Intentional pattern — keep both in sync. |
| **2024/2025 confidence caveats** | Ongoing | Observatory, DataVisualizations, AnswerBrief, fr-next | Correctly badged throughout. Any new section surfacing the finding must carry: "directional signal only · 2024 ET & ESI low confidence (2 overpasses) · 2025 partial". |
| **Pre-existing uncommitted changes in `public/data/`** | Low | `public/data/` | ~18 processed summary/raster JSON files show as modified in git status. These are pipeline outputs — do not commit without verifying against source pipeline run. |

---

## 8. Phase 5 Objective

**Phase 5: Final QA, cleanup unused files, and production readiness.**

With all four narrative/visual phases complete, Phase 5 focuses on cleanup and hardening:

1. Update page `<title>` and `<meta description>` in `app/further-research/page.tsx` to match Phase 4 framing ("Inside the Evidence Layer" rather than "Inside the Signal")
2. Delete `components/theme-provider.tsx` — unused component not imported anywhere
3. Audit all remaining `console.log` / debug output if any
4. Confirm no broken image references (all `/data/signals/` and `/data/rasters/` paths resolve)
5. Review mobile layout of new AnswerBrief (Phase 3) and fr-opening bridge paragraph (Phase 4) at small viewports
6. Verify all six FR nav section anchors (#question, #spatial, #products, #temporal, #trust, #next) still scroll correctly
7. Final build + confirm zero TypeScript errors
8. Consider whether `public/data/` uncommitted changes should be committed with the rest of the site changes

---

*Audit by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 1 executed by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 2 executed by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 3 executed by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 4 executed by Claude Sonnet 4.6 — 2026-05-12*
