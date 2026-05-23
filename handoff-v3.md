# Handoff v3: Full Website Revamp — Signals of Stability

**Date:** 2026-05-12  
**Version:** 3  
**Status:** 🔄 Phase 3 active — Narrative restructure (homepage section reorder + answer surfacing)

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

## 1. Current Repo Structure

```
swiss-national-park-site/
├── app/
│   ├── globals.css                  ← Theme tokens + three-register CSS vars (Phase 2 updated)
│   ├── layout.tsx                   ← Fonts (Playfair/Inter/JetBrains), metadata, Analytics
│   ├── page.tsx                     ← Main homepage (single-page scroll, Phase 2 inline vars updated)
│   └── further-research/
│       └── page.tsx                 ← Further Research narrative (Phase 2 inline vars updated)
│
├── components/
│   ├── navigation.tsx               ← Fixed nav — "Further Research" link only (Phase 1: /signals removed)
│   ├── hero.tsx                     ← Hero with TopoArtifactSVG; CTA buttons unchanged
│   ├── earth-map.tsx                ← Raster map panel (Phase 2: panel bg updated)
│   ├── research-question.tsx        ← Terrain-structure question + 3 focus area cards (Phase 1: fixed)
│   ├── observatory.tsx              ← Raster viewer + year slider + stats dock (Phase 2: panel bg updated)
│   ├── methodology.tsx              ← SVG flowchart (Phase 1: ECOSTRESS/AppEEARS, AMJ, ESI fixed)
│   ├── timeline.tsx                 ← Film-strip horizontal scroll per season
│   ├── data-visualizations.tsx      ← Fig. 1–5 charts + raster thumbnails
│   ├── data-provenance.tsx          ← Pipeline provenance panel
│   ├── interpretation.tsx           ← Actual finding cards: mosaic, stable core, ESI watch (Phase 1: fixed)
│   ├── conservation-close.tsx       ← Poetic quote section — narratively disconnected (Phase 3 candidate)
│   ├── final-cta.tsx                ← CTA section — missing /further-research link (Phase 3 candidate)
│   ├── footer.tsx                   ← Footer
│   ├── artistic-background.tsx      ← Decorative background variants
│   ├── alpine-accents.tsx           ← Treeline/pine SVG accents
│   ├── section-reveal.tsx           ← Framer Motion scroll-reveal wrapper
│   ├── theme-provider.tsx           ← Dark-mode provider (not wired up — can be deleted)
│   │
│   ├── fr-nav.tsx                   ← Further Research nav (Phase 1: /signals removed)
│   ├── fr-opening.tsx               ← FR Section 1 — The Question + best Answer prose on site
│   ├── fr-atlas.tsx                 ← FR Section 2 — Spatial evidence maps (Phase 2: panel bg updated)
│   ├── fr-products.tsx              ← FR Section 3 — ECOSTRESS products (Phase 2: panel bg updated)
│   ├── fr-temporal.tsx              ← FR Section 4 — Yearly temporal variation (Phase 2: panel bg updated)
│   ├── fr-trust.tsx                 ← FR Section 5 — Robustness checks (Phase 2: panel bg updated)
│   └── fr-next.tsx                  ← FR Section 6 — Future research directions (Phase 1: /signals replaced)
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
| `/` | `app/page.tsx` | Live — narrative/science bugs fixed (Phase 1), palette updated (Phase 2) |
| `/further-research` | `app/further-research/page.tsx` | Live — palette updated (Phase 2) |
| `/signals` | — | **Deleted in Phase 1** |

### Homepage section order (`/`)

| # | Component | Register | Anchor |
|---|---|---|---|
| 1 | Hero | FELDSTATION | `#hero` |
| 2 | EarthMap | FELDSTATION | `#earth` |
| 3 | ResearchQuestion | FELDSTATION | `#question` |
| 4 | Observatory | RASTERBAND | `#observatory` |
| 5 | Methodology | RASTERBAND | `#method` |
| 6 | Timeline | RASTERBAND | `#timeline` |
| 7 | DataVisualizations | GRADIENTE | `#findings` |
| 8 | DataProvenance | GRADIENTE | — |
| 9 | Interpretation | GRADIENTE | — |
| 10 | ForestDivider | GRADIENTE | — |
| 11 | ConservationClose | GRADIENTE | `#conclusion` |
| 12 | FinalCTA | GRADIENTE | — |
| 13 | Footer | GRADIENTE | — |

---

## 3. Current Theme System

### Three-register palette (as of Phase 2)

| Register | Background | Sections | Character |
|---|---|---|---|
| FELDSTATION | `oklch(0.892 0.018 75)` | Hero, EarthMap, ResearchQuestion | Warm cartographic paper |
| RASTERBAND | `oklch(0.130 0.018 222)` | Observatory, Methodology, Timeline | Deep alpine slate — instrument dark |
| GRADIENTE | `oklch(0.979 0.005 195)` | Findings → Footer | Cool snowline white — scientific synthesis |

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

### Remaining cosmetic issues

- `conservation-close.tsx` — poetic quote ("A protected landscape is not a frozen landscape") is narratively disconnected from the research finding. Ghost text "RESILIENCE" is decorative. Phase 3 candidate.
- `hero.tsx` — CTA buttons still say "Explore Observatory" / "Methodology". The secondary CTA could be "See the Evidence" → `#findings`. Phase 3 candidate.
- `final-cta.tsx` — no link to `/further-research`. Users wanting depth have no forward path from this section. Phase 3 candidate.

---

## 4. Site Purpose

> **Signals of Stability** presents ECOSTRESS/AppEEARS satellite-derived evidence (NDVI, ET, ESI) for the Swiss National Park across April–June composites from 2019–2025. Its purpose is to show whether ecological stability in this protected alpine landscape is spatially random or structured by terrain and water stress — and to present the directional evidence (maps, figures, yearly variation, robustness checks) that supports that finding.

---

## 5. Research Question (live on homepage)

> **"Is ecological stability in Swiss National Park randomly distributed, or is it structured by terrain and water stress?"**

Now correctly displayed in `components/research-question.tsx` (fixed Phase 1). Also in `fr-opening.tsx` on the Further Research page.

---

## 6. Short Answer (live on homepage)

> **Structure.** Swiss National Park does not behave like a uniform green landscape. ECOSTRESS/AppEEARS evidence (April–June, 2019–2025) points to a terrain-structured ecological mosaic: stable cores, evaporative stress watch zones, and demand-efficiency areas emerge from interactions among elevation, water flux, atmospheric demand, vegetation greenness, and water-use behavior. This is a directional signal only — not a confirmed trend. Seven seasons; validation pending.

The finding is now surfaced on the homepage via `interpretation.tsx` (three finding cards, fixed Phase 1) and partially in `research-question.tsx`. The full narrative version lives in `fr-opening.tsx` on the Further Research page.

---

## 7. Known Open Issues

| Issue | Severity | Location | Notes |
|---|---|---|---|
| **Narrative: Answer is fragmented** | Medium | Homepage | `interpretation.tsx` shows three bullet findings. There is no single clear "The answer is: Structure." statement near the top of the homepage. Visitors must scroll to section 9 to encounter the finding. Phase 3 would surface this earlier. |
| **`conservation-close.tsx` narratively disconnected** | Medium | Homepage — GRADIENTE | Poetic quote not tied to research finding. Phase 3 scope. |
| **`hero.tsx` CTA: "Methodology" is weak** | Low | Homepage — FELDSTATION | Secondary CTA button targets `#method`. "See the Evidence" → `#findings` would be more useful. Phase 3 scope. |
| **`final-cta.tsx` missing /further-research link** | Low | Homepage — GRADIENTE | No forward path for visitors wanting depth. Phase 3 scope. |
| **`theme-provider.tsx` unused** | Low | `components/` | Component exists but is not imported in `layout.tsx`. Safe to delete. |
| **ESLint not installed** | Low | `package.json` | `eslint .` script exists but no `eslint` in devDependencies. Pre-existing; does not affect build. |
| **`data-register` CSS var duplication** | Low | `globals.css` + `page.tsx` | RASTERBAND/GRADIENTE vars defined in both places. Inline values take precedence. Intentional pattern — keep both in sync. |
| **2024/2025 confidence caveats** | Ongoing | Observatory, DataVisualizations | Correctly badged. Any new section surfacing the finding must carry: "directional signal only · 2024 ET & ESI low confidence (2 overpasses) · 2025 partial". |

---

## 8. Phase 3 Objective

**Narrative restructure of the homepage** — surface the research answer earlier and improve the editorial flow for first-time visitors (professors, research mentors, symposium attendees with no prior context).

### Problem

The homepage currently reads as a tool/dashboard: Hero → Map → Question → Observatory → Methodology → Timeline → Findings → Interpretation. The actual answer to the research question doesn't appear until section 9. A visitor who bounces at section 4 (Observatory) never sees the finding.

### Goal

Restructure so the homepage reads as a research narrative: **Context → Question → Answer → Evidence → How we got there → Where next**. The key move is surfacing the "terrain-structured mosaic" answer early — ideally in the first three visible sections — and positioning the Observatory/Methodology as supporting evidence rather than the lead content.

### Proposed section order (Phase 3)

| # | Component | Change needed |
|---|---|---|
| 1 | Hero | Update secondary CTA: "Explore Observatory" → "See the Evidence" (`#findings`) |
| 2 | ResearchQuestion | Keep as-is — terrain-structure question already correct |
| 3 | **New: AnswerBrief** | New compact section (~2 sentences) stating the finding directly: terrain-structured mosaic, directional only. Could be a lightweight addition to an existing section rather than a new component. |
| 4 | EarthMap | Keep — grounds the question spatially |
| 5 | DataVisualizations | Move up — the evidence immediately follows the answer |
| 6 | Interpretation | Keep — expands the three finding cards |
| 7 | Observatory | Keep — exploratory tool, now positioned as "dig into the data" |
| 8 | Methodology | Keep — provenance for the methodologically curious |
| 9 | Timeline | Keep or condense |
| 10 | DataProvenance | Keep |
| 11 | ConservationClose | Rewrite or replace — tie to the actual finding or remove |
| 12 | FinalCTA | Add `/further-research` link |
| 13 | Footer | Keep |

### Constraints for Phase 3

- Do NOT touch `public/data/signals`, generated data, images, rasters, maps, JSON files, or pipeline scripts
- Do NOT change scientific values, captions, classifications, or analysis results
- Do NOT re-add the `/signals` Data Atlas page
- Do NOT change the three-register register assignments (FELDSTATION/RASTERBAND/GRADIENTE) without careful review — the dark RASTERBAND section must remain plausible in its new position
- Carry all existing confidence caveats (2024 low confidence, 2025 partial, directional signal) to any new content

---

*Audit by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 1 executed by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 2 executed by Claude Sonnet 4.6 — 2026-05-12*
