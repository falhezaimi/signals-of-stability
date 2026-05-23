# Handoff: Full Website Revamp — Signals of Stability

**Date:** 2026-05-12  
**Status:** ✅ Phase 1 complete — Data Atlas removed, narrative/scientific bugs fixed

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

Confirmed before deletion: none of the `signals-*` components were imported by any file other than `app/signals/page.tsx`.

### Files Modified

| File | Change |
|---|---|
| `components/navigation.tsx` | Removed "Data Atlas" Link pointing to /signals. Kept "Further Research" link and coordinates intact. |
| `components/fr-nav.tsx` | Removed "Data Atlas" Link pointing to /signals (this was a third link not noted in original audit). Kept page label text. |
| `components/fr-next.tsx` | Replaced "Explore Data Atlas" Link (href="/signals") with "Review Main Evidence" (href="/#findings"). |
| `components/methodology.tsx` | Fixed NODES array: Node 1 sublabel MODIS→ECOSTRESS·AppEEARS; Node 4 label Monthly→April–June Composite, sublabel JJA→AMJ; Node 5 sublabel LST→ESI. Fixed parameter strip: resolution 30m/10m→70m nominal, coverage end 2024→2025, "Quality Threshold" row replaced with "Analysis Window: April–June (AMJ)". |
| `components/research-question.tsx` | Replaced vague question with specific terrain-structure question: "Is ecological stability in Swiss National Park randomly distributed, or is it structured by terrain and water stress?" Fixed ESI range from "−2 – +2 σ" to "0–1 (0 = max stress)". Updated ESI card description to correctly describe the 0–1 scale. |
| `components/interpretation.tsx` | Replaced three generic hypothesis cards with three actual-finding cards (terrain-structured mosaic, stable core locations, ESI stress watch zones). Replaced rounded-full badge with rectangular badge (gold/25 border, gold/[0.05] bg). Replaced rounded-xl card containers and icon boxes with rectangular equivalents. Updated heading from "Reading the Signals" to "What the Signal Suggests". Updated caveat text to state directional signals with correct confidence caveats. |

### /signals Removal Status

✅ Route `/signals` deleted  
✅ `app/signals/` directory deleted  
✅ All `signals-*` components deleted  
✅ `navigation.tsx` — Data Atlas link removed  
✅ `fr-nav.tsx` — Data Atlas link removed (extra link discovered during grep)  
✅ `fr-next.tsx` — /signals replaced with /#findings  
✅ Grep confirms: zero remaining `"/signals"` references in any .tsx/.ts/.jsx/.js file  

### Methodology Fixes Made

| Location | Before | After |
|---|---|---|
| `NODES[0].sublabel` | `MODIS · Landsat · S2` | `ECOSTRESS · AppEEARS` |
| `NODES[3].label` | `Monthly\nComposite` | `April–June\nComposite` |
| `NODES[3].sublabel` | `JJA season focus` | `AMJ season focus` |
| `NODES[4].sublabel` | `NDVI · ET · LST` | `NDVI · ET · ESI` |
| Parameter strip — Spatial Resolution | `30m / 10m` | `70m nominal` |
| Parameter strip — Temporal Coverage | `2019 – 2024` | `2019 – 2025` |
| Parameter strip — row 3 | `Quality Threshold: ≥ 70% Valid` | `Analysis Window: April – June (AMJ)` |

### Research Question Fixes Made

- Question text replaced: vague "Can satellite observations reveal..." → specific "Is ecological stability in Swiss National Park randomly distributed, or is it structured by terrain and water stress?"
- ESI range fixed: `−2 – +2 σ` → `0–1 (0 = max stress)`
- ESI card description updated to correctly describe the ESI 0–1 scale (not a standardized anomaly)

### Interpretation Fixes Made

- Badge style: `rounded-full` → rectangular (border border-gold/25, bg-gold/[0.05])
- Badge label: "Interpretation" → "Directional Findings"
- Card containers: `rounded-xl` → no radius (plain border)
- Icon containers: `rounded-xl` → plain border
- Highlight tags: `rounded-full` → rectangular (border border-gold/20, bg-gold/[0.05])
- Heading: "Reading the Signals" → "What the Signal Suggests"
- Description: updated to state "Directional findings from seven April–June seasons"
- Three cards replaced:
  1. Old "Stability may be a signal" → New "A terrain-structured ecological mosaic"
  2. Old "Water stress may appear before greenness declines" → New "Stable core locations persist through time"
  3. Old "Protected landscapes still need monitoring" → New "Evaporative stress watch zones indicate potential vulnerability"
- Bottom caveat updated: states directional signals, 2024 low confidence, research prototype

### Build / Lint Results

| Check | Result |
|---|---|
| `npm run build` | ✅ SUCCESS — compiled in 6.1s, TypeScript clean, 3 routes generated (/, /_not-found, /further-research) |
| `npm run lint` | ⚠️ eslint binary not found — pre-existing issue, ESLint not installed as a local package. Not caused by Phase 1 changes. |

### Unresolved Issues Carried Forward

| Issue | Severity | Notes |
|---|---|---|
| ESLint not installed | Low | Pre-existing. `eslint .` in package.json scripts but no `eslint` in devDependencies. Does not affect build or runtime. |
| `theme-provider.tsx` unused | Low | Pre-existing. Component exists but not used in layout.tsx. Can be deleted without risk in a later phase. |
| `data-register` CSS vars duplication | Low | Pre-existing. RASTERBAND/GRADIENTE vars defined in both globals.css and inline in page.tsx files. Inline values take precedence. No functional issue. |
| Methodology body text still says "A rigorous six-stage pipeline" | Informational | The description paragraph is generically accurate — no incorrect platform references. No change needed. |
| Methodology `p` tag says "Prototype Pipeline · Data Processing Under Validation" | Informational | Fine for now — could be updated in Phase 2 to reference ECOSTRESS specifically. |
| `hero.tsx` CTA button still says "Explore Observatory" / "Methodology" | Phase 2 scope | Not addressed in Phase 1 per instructions. Flagged in handoff for Phase 2. |
| `final-cta.tsx` lacks /further-research link | Phase 2 scope | Not addressed in Phase 1 per instructions. Flagged for Phase 2. |
| `conservation-close.tsx` quote is narratively disconnected | Phase 2 scope | Not addressed in Phase 1 per instructions. Flagged for Phase 2. |

---

---

## 1. Current Repo Structure Summary

```
swiss-national-park-site/
├── app/
│   ├── globals.css              ← Theme tokens, three-register CSS vars
│   ├── layout.tsx               ← Fonts (Playfair/Inter/JetBrains), metadata, Analytics
│   ├── page.tsx                 ← Main homepage (single-page scroll)
│   ├── signals/
│   │   └── page.tsx             ← DATA ATLAS page (to be removed)
│   └── further-research/
│       └── page.tsx             ← Further Research narrative page
│
├── components/
│   ├── navigation.tsx           ← Fixed nav — links to /signals + /further-research
│   ├── hero.tsx                 ← Hero with TopoArtifactSVG
│   ├── earth-map.tsx            ← Interactive raster map panel
│   ├── research-question.tsx    ← Question + 3 focus area cards
│   ├── observatory.tsx          ← Raster viewer + year slider + stats dock
│   ├── methodology.tsx          ← SVG flowchart (has platform/season bugs)
│   ├── timeline.tsx             ← Film-strip horizontal scroll per season
│   ├── data-visualizations.tsx  ← Fig. 1–5 charts + raster thumbnails
│   ├── data-provenance.tsx      ← Pipeline provenance panel
│   ├── interpretation.tsx       ← "Reading the Signals" cards (vague)
│   ├── conservation-close.tsx   ← Poetic quote section
│   ├── final-cta.tsx            ← CTA section
│   ├── footer.tsx               ← Footer
│   ├── artistic-background.tsx  ← Decorative background variants
│   ├── alpine-accents.tsx       ← Treeline/pine SVG accents
│   ├── section-reveal.tsx       ← Framer Motion scroll-reveal wrapper
│   ├── theme-provider.tsx       ← Dark-mode provider (not wired up)
│   │
│   ├── signals-navigation.tsx   ← DATA ATLAS nav
│   ├── signals-intro.tsx        ← DATA ATLAS hero
│   ├── signals-map-atlas.tsx    ← DATA ATLAS map grid
│   ├── signals-3d-products.tsx  ← DATA ATLAS 3D terrain
│   ├── signals-yearly-timeline.tsx ← DATA ATLAS yearly timeline
│   ├── signals-provenance.tsx   ← DATA ATLAS provenance
│   ├── signals-footer.tsx       ← DATA ATLAS footer
│   │
│   ├── fr-nav.tsx               ← Further Research nav
│   ├── fr-opening.tsx           ← FR Section 1 — The Question + Answer
│   ├── fr-atlas.tsx             ← FR Section 2 — The Maps
│   ├── fr-products.tsx          ← FR Section 3 — The Products
│   ├── fr-temporal.tsx          ← FR Section 4 — Yearly variation
│   ├── fr-trust.tsx             ← FR Section 5 — Robustness checks
│   └── fr-next.tsx              ← FR Section 6 — Future research directions
│
├── public/data/
│   ├── signals/                 ← 8 JSON data files + nasa_quality_maps images
│   └── rasters/                 ← Per-year raster PNGs + sidecar JSONs
│
└── handoff.md                   ← this file
```

---

## 2. Current Routes / Pages

| Route | File | Purpose | Status |
|---|---|---|---|
| `/` | `app/page.tsx` | Main scroll narrative | Keep — refactor |
| `/signals` | `app/signals/page.tsx` | Data Atlas (6 maps, 3D terrain, yearly timeline) | **REMOVE** |
| `/further-research` | `app/further-research/page.tsx` | Deep narrative dive (6 sections) | Keep — minor refactor |

### Main page section order (/)
1. Hero (`#hero`)
2. EarthMap (`#earth`)
3. ResearchQuestion (`#question`)
4. Observatory (`#observatory`)
5. Methodology (`#method`)
6. Timeline (`#timeline`)
7. DataVisualizations (`#findings`)
8. DataProvenance
9. Interpretation
10. ForestDivider
11. ConservationClose (`#conclusion`)
12. FinalCTA
13. Footer

---

## 3. Current Theme / Color Observations

### Three-register system (applied via `data-register` divs in page.tsx)

| Register | Background | Hue (h) | Character | Sections |
|---|---|---|---|---|
| FELDSTATION | `oklch(0.892 0.018 75)` | Warm amber | Cartographic paper | Hero, EarthMap, ResearchQuestion |
| RASTERBAND | `oklch(0.095 0.006 160)` | Near-black, slight green | Alpine night / instrument | Observatory, Methodology, Timeline |
| GRADIENTE | `oklch(0.974 0.006 85)` | Near-white, warm | Clean scientific | Findings, Interpretation, Conclusion |

### What does not fit

- **RASTERBAND's hue 160 is a teal/green undertone.** On screen it reads as cold green-black — more like a server room than "alpine night." The narrative reason for plunging into dark mode at the Observatory section is unclear to first-time visitors.

- **FELDSTATION (paper) and GRADIENTE (near-white) are too similar visually.** Without the RASTERBAND break they would be indistinct. This means the entire register system depends on the jarring dark section to create contrast, which is architecturally fragile.

- **The transition from warm paper → cold near-black → near-white creates a jarring emotional arc** that doesn't match the research narrative. The user transitions from "explore the landscape" → "look at data in darkness" → "read findings in clean white" with no narrative motivation for the mood shifts.

- **Root palette (globals.css) is coherent** — warm ivory + alpine green + soft gold + satellite blue. These colors fit the theme. The issue is only in the three-register application.

- **Interpretation and ConservationClose** live in GRADIENTE but the ghost text ("RESILIENCE") and quote ("A protected landscape is not a frozen landscape") are poetic, not scientific. In the near-white register they feel unanchored.

---

## 4. Where the Data Atlas Page Exists

### Route
```
/signals
```

### File
```
app/signals/page.tsx
```

### Components used (all in components/ root, prefixed `signals-`)
- `signals-navigation.tsx` — dedicated nav bar for the Atlas page
- `signals-intro.tsx` — hero with product inventory (ESI/ET/NDVI/PET/WUE raster counts)
- `signals-map-atlas.tsx` — 6-map grid using nasa_quality_maps images
- `signals-3d-products.tsx` — 3D terrain renders
- `signals-yearly-timeline.tsx` — yearly signal timeline
- `signals-provenance.tsx` — pipeline provenance
- `signals-footer.tsx` — footer with back/next navigation

### How it is linked (2 locations)

1. **`components/navigation.tsx` lines 116–123** — "Data Atlas" link in the top-right header pill button, visible on every page load of the main site.

2. **`components/fr-next.tsx` lines 143–151** — "Explore Data Atlas" link at the bottom of the Further Research page (page navigation row).

---

## 5. Recommended Removal Plan for Data Atlas

### Step 1 — Remove the route
Delete `app/signals/page.tsx` and the `app/signals/` directory.

### Step 2 — Remove the nav link
In `components/navigation.tsx`:
- Remove the "Data Atlas" `<Link href="/signals">` block (lines 116–123, desktop nav right area)
- The mobile menu currently shows no link to /signals, so no mobile change needed

### Step 3 — Remove the fr-next link
In `components/fr-next.tsx`:
- Remove or replace the "Explore Data Atlas" `<Link href="/signals">` block (lines 143–151)
- Replace with a link to a different section (e.g., back to `/` findings section)

### Step 4 — Keep or reassign signals-* components
The following components can be deleted after the route is removed:
- `components/signals-navigation.tsx`
- `components/signals-intro.tsx`
- `components/signals-map-atlas.tsx`
- `components/signals-3d-products.tsx`
- `components/signals-yearly-timeline.tsx`
- `components/signals-provenance.tsx`
- `components/signals-footer.tsx`

No other component imports from any `signals-*` file.

### Step 5 — Verify no dead links remain
After removal: grep the codebase for `/signals` to confirm no remaining href or redirect points there.

---

## 6. Main Website Purpose Statement

> **Signals of Stability** is a research communication website that presents ECOSTRESS/AppEEARS satellite-derived evidence (NDVI, ET, ESI) for the Swiss National Park across April–June composites from 2019–2025. Its purpose is to show whether ecological stability in this protected alpine landscape is spatially random or structured by terrain and water stress — and to present the evidence (maps, figures, yearly variation, robustness checks) that supports the directional finding.

---

## 7. Proposed Research Question

> **"Is ecological stability in Swiss National Park randomly distributed, or is it structured by terrain and water stress?"**

This question already exists in `components/fr-opening.tsx` (line 67) and `fr-next.tsx` (line 109). It is the correct, specific question.

The current `components/research-question.tsx` asks a much vaguer version: "Can satellite observations reveal whether a protected alpine ecosystem is changing, stabilizing, or quietly resisting environmental stress?" This needs to be replaced with the specific terrain-structure question above.

---

## 8. Proposed Short Answer

> **Structure. Swiss National Park does not behave like a uniform green landscape. ECOSTRESS/AppEEARS evidence (April–June, 2019–2025) points to a terrain-structured ecological mosaic: stable cores, evaporative stress watch zones, and demand-efficiency areas emerge from interactions among elevation, water flux, atmospheric demand, vegetation greenness, and water-use behavior. This is a directional signal only — not a confirmed trend. Seven seasons; validation pending.**

This answer already exists verbatim in `fr-opening.tsx` and `fr-next.tsx`. It needs to be surfaced on the homepage.

---

## 9. Proposed Future Page Structure

### Route `/` — Main narrative (single-page scroll)

| Section | New Name | Purpose | Source Component |
|---|---|---|---|
| 1 | Context | Why SNP, why ECOSTRESS, what the analysis window covers | Hero + new intro text |
| 2 | Research Question | The specific terrain-structure question | `research-question.tsx` — rewritten |
| 3 | The Answer | 2–3 sentences: terrain-structured mosaic, directional only | New component or inline section |
| 4 | Study Region | Interactive map for spatial grounding | `earth-map.tsx` — keep |
| 5 | The Evidence | Figures 1–5: NDVI/ET/ESI charts + raster thumbnails | `data-visualizations.tsx` — keep |
| 6 | Signal Observatory | Interactive raster viewer for exploration | `observatory.tsx` — keep |
| 7 | Methodology | Corrected flowchart (ECOSTRESS/AppEEARS, AMJ window) | `methodology.tsx` — fix bugs |
| 8 | Future Research | Compact 6-direction summary | From `fr-next.tsx` — condensed |
| 9 | Footer | — | `footer.tsx` — keep |

### Route `/further-research` — Deep evidence dive (keep as-is)

Keep all 6 sections. Update the bottom navigation to not link to the removed `/signals` page.

### Remove
- `/signals` — Data Atlas

---

## 10. Components to Keep (No Changes)

These are correctly implemented and should be preserved as-is:

| Component | Why Keep |
|---|---|
| `data-visualizations.tsx` | Contains real figures (1–5) with actual chart data and raster thumbnails |
| `observatory.tsx` | Interactive raster viewer — genuinely explanatory |
| `earth-map.tsx` | Shows actual raster data over the study region |
| `timeline.tsx` | Useful temporal film strip with actual signal data |
| `section-reveal.tsx` | Clean scroll animation utility |
| `data-provenance.tsx` | Useful pipeline provenance detail |
| `footer.tsx` | Standard; works |
| `fr-opening.tsx` | Contains the actual research question and answer — best writing on the site |
| `fr-atlas.tsx` | Spatial evidence section |
| `fr-products.tsx` | ECOSTRESS product explanation |
| `fr-temporal.tsx` | Yearly temporal evidence |
| `fr-trust.tsx` | Robustness checks — essential for scientific credibility |
| `fr-next.tsx` | 6 future research directions — excellent content |
| `fr-nav.tsx` | Navigation for the further-research page |
| `alpine-accents.tsx` | Distinctive visual branding (treeline, pine) |

---

## 11. Components to Modify

| Component | Problem | Required Change |
|---|---|---|
| `research-question.tsx` | Asks the wrong, vague question. Focus area cards use wrong ranges (ESI "−2 – +2σ" is wrong — ESI is 0–1 scale). | Replace question text with terrain-structure question. Fix ESI range to "0–1". |
| `methodology.tsx` | **Critical bug**: Node 1 says "MODIS · Landsat · S2" (wrong — should be ECOSTRESS/AppEEARS). Node 4 says "JJA season focus" (wrong — should be AMJ / April–June). Node 5 says "NDVI · ET · LST" (wrong — should be NDVI · ET · ESI). | Fix all three factual errors in the NODES array. |
| `interpretation.tsx` | Generic hypothetical interpretations ("Stability may be a signal"). Doesn't state the actual finding. Uses rounded-full badge (against the anti-template rule). | Rewrite to state the actual terrain-structure finding. Replace rounded-full badge with rectangular style. |
| `conservation-close.tsx` | Poetic but narratively disconnected. Quote says nothing about the actual research finding. Ghost text ("RESILIENCE") is decorative with no information value. | Replace or remove the quote. Keep the ghost text if it can be tied to the finding. |
| `navigation.tsx` | Links to `/signals` (Data Atlas) which will be removed. | Remove the "Data Atlas" link. Optionally replace with a "Further Research" link (already has one) or a direct scroll link. |
| `final-cta.tsx` | "Reading the Alpine Signal" heading sounds like a section title, not a call to action. Links to Observatory / Methodology / Findings are scroll links — fine — but no forward link to `/further-research` for users wanting depth. | Add a `/further-research` link. Rename heading to something that calls the visitor to explore the evidence. |
| `hero.tsx` | CTA buttons say "Explore Observatory" and "Methodology" — the Observatory is useful but "Methodology" is a strange first CTA. No mention of the research finding. | Change secondary CTA to "Read the Findings" or "See the Evidence" targeting `#findings`. |
| `fr-next.tsx` | Bottom navigation has a "Explore Data Atlas" link pointing to `/signals` which will be removed. | Replace with a link to `#findings` on the homepage or to a relevant section. |

---

## 12. Files Likely Needing Changes

**Direct changes required:**
- `app/signals/page.tsx` — DELETE entire file + directory
- `components/navigation.tsx` — remove `/signals` link
- `components/fr-next.tsx` — remove `/signals` link, replace with homepage findings
- `components/methodology.tsx` — fix NODES: platform name, season name, signal names
- `components/research-question.tsx` — rewrite question, fix ESI range
- `components/interpretation.tsx` — rewrite to state actual finding
- `components/hero.tsx` — update CTA buttons
- `components/final-cta.tsx` — add /further-research link

**Signal-component deletions (after route removal):**
- `components/signals-navigation.tsx`
- `components/signals-intro.tsx`
- `components/signals-map-atlas.tsx`
- `components/signals-3d-products.tsx`
- `components/signals-yearly-timeline.tsx`
- `components/signals-provenance.tsx`
- `components/signals-footer.tsx`

**Color/theme changes (revamp scope):**
- `app/globals.css` — update RASTERBAND hue, potentially reconsider the three-register hue angles
- `app/page.tsx` — update inline CSS vars for registers
- `app/signals/page.tsx` — DELETE (already listed)
- `app/further-research/page.tsx` — update inline CSS vars if palette changes

---

## 13. Known Risks

| Risk | Severity | Detail |
|---|---|---|
| **Methodology factual errors** | High | `methodology.tsx` NODES array still references MODIS/Landsat/S2 (not ECOSTRESS), JJA (not AMJ), and LST (not ESI). Any visitor reading this will see incorrect platform/season information. |
| **ResearchQuestion ESI range bug** | Medium | `research-question.tsx` shows ESI range as "−2 – +2 σ" — this is the standardized anomaly scale, not the ESI 0–1 scale. Misleading. |
| **Three-register hue mismatch** | Medium | RASTERBAND's hue angle h=160 is a teal/green undertone. On screen this reads as cold greenish-black, not warm alpine night. Any palette redesign must coordinate the RASTERBAND hue with the overall warm green palette (h=75–90 range would be more cohesive). |
| **Narrative disconnect: Finding is on page 2** | High | The actual research answer ("terrain-structured mosaic") appears only in `fr-opening.tsx` on the `/further-research` page. First-time visitors who don't navigate there never see it. The homepage must surface this. |
| **/signals removal breaks fr-next link** | Low | Two links point to `/signals`. Both must be updated before removing the route or visitors will hit 404s. |
| **theme-provider.tsx is imported nowhere** | Low | `components/theme-provider.tsx` exists but is not used in layout.tsx. Can be deleted without risk. |
| **`data-register` CSS vars duplication** | Low | RASTERBAND vars are defined in both `globals.css` (lines 116–133) and inline in each page.tsx. The inline styles take precedence and override the CSS file values. The CSS file definitions are therefore unused for RASTERBAND/GRADIENTE. Keep inline approach (established working pattern) but clean up the CSS file to avoid confusion. |
| **2024/2025 low-confidence data** | Ongoing | These are already correctly badged in the Observatory and DataVisualizations. Any new section that surfaces the finding must carry the same hedging: "directional signal only, 2024 ET/ESI low confidence, 2025 partial". |

---

## 14. Exact Next Prompt Objective

> **Phase 2: Redesign the color palette and three visual themes.**
>
> Context:
> - Phase 1 is complete. The Data Atlas is gone. Narrative and scientific bugs are fixed.
> - The three-register system (FELDSTATION / RASTERBAND / GRADIENTE) works structurally but the colors do not fit well.
> - RASTERBAND's hue h=160 reads as cold greenish-black — does not feel like "alpine night."
> - FELDSTATION (warm paper) and GRADIENTE (near-white) are visually indistinct without the dark break.
> - The transition warm paper → cold near-black → near-white has no narrative motivation.
>
> Phase 2 objectives:
> 1. Redesign the RASTERBAND background: replace h=160 (teal-green-black) with a warmer deep hue (h=75–85 range, consistent with the warm amber/earth palette). Keep the register dark but give it a warmer, alpine night character.
> 2. Reconsider whether the three-register system serves the narrative — if all three registers have warm-earth hues, consider whether increasing contrast between them in a different way (e.g., GRADIENTE becoming a cooler off-white, or a textured paper) would work better.
> 3. Update the root CSS custom properties in `app/globals.css` and the inline CSS vars in `app/page.tsx` and `app/further-research/page.tsx` to reflect the new palette.
> 4. Ensure text contrast is accessible (≥4.5:1) in all three registers.
> 5. Do NOT restructure the homepage sections in Phase 2. Do NOT add new routes. Do NOT change content.
>
> Files to modify in Phase 2:
> - `app/globals.css` — root vars + three-register CSS vars
> - `app/page.tsx` — inline register CSS vars
> - `app/further-research/page.tsx` — inline register CSS vars
> - Possibly `components/artistic-background.tsx` — if background art variants need color adjustments

---

*Audit by Claude Sonnet 4.6 — 2026-05-12*  
*Phase 1 executed by Claude Sonnet 4.6 — 2026-05-12*
