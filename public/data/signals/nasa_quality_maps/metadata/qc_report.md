# Quality Control Report — Signals of Stability
## Phase 6 NASA-Quality Map Export + Website

**QC date:** 2026-05-10  
**Pipeline:** `scripts/process_ecostress/06_nasa_quality_map_export.py`  
**Exit code:** 0 (clean run, no errors)

---

## 1. File Creation

| Check | Result |
|---|---|
| All 6 PNG maps created | PASS |
| All 6 WebP maps created | PASS |
| All 5 GeoTIFFs created | PASS |
| All 4 transparent overlays created | PASS |
| Legend PNG created | PASS |
| Legend SVG created | PASS |
| map_manifest.json created | PASS |
| captions.md created | PASS |
| asset_audit.md created | PASS |
| index.html created | PASS |
| Public assets copied | PASS |
| Website manifest created | PASS |

---

## 2. Raster Value Mapping

**Detected class codes in dominant_class_daytime.tif:** `[0, 1, 2, 4, 5, 6, 7, 8]`

- Code 0 (unclassified): rendered transparent — CORRECT
- Code 1 (stable_core): mapped to `#2F6B3F` — CORRECT
- Code 2 (coherent_activation): mapped to `#5E9F49` — CORRECT
- Code 4 (esi_watch): mapped to `#B8563C` — CORRECT
- Code 5 (demand_efficiency_watch): mapped to `#C06020` — CORRECT
- Code 6 (efficient_activation): mapped to `#2F7F78` — CORRECT
- Code 7 (disagreement): mapped to `#7E5AA7` — CORRECT
- Code 8 (high_variability): mapped to `#8A8A8A` — CORRECT
- Code 255 (nodata): converted to NaN, rendered transparent — CORRECT
- Code 3 (strong_activation): absent from daytime raster; present in midday only — EXPECTED, documented

**Verification against manifest class definitions:**
All codes match the definitions in `timebin_validation_manifest.json`. The code→name mapping in `CLASS_CODE_TO_NAME` is consistent with the manifest.

---

## 3. Color Consistency

| Check | Result |
|---|---|
| Same palette across all 6 maps | PASS — all use same CLASS_COLORS dict |
| Legend colors match map colors | PASS — legend generated from same dict |
| Website class table colors match | PASS — hex values embedded from same source |
| No rainbow colormaps used | PASS — only fixed ecological palette |
| Elevation colormap (terrain) used only for context | PASS — terrain cmap in map_06 right panel only |

---

## 4. Nodata Handling

| Check | Result |
|---|---|
| Nodata (255) treated as transparent | PASS |
| Class-0 (unclassified) treated as transparent | PASS |
| Nodata areas not rendered as a class color | PASS |
| Hillshade NaN fills handled | PASS — filled with off-white bg_color |
| Overlay PNGs have transparent nodata | PASS — RGBA with alpha=0 for nodata |

---

## 5. Spatial Alignment

| Check | Result |
|---|---|
| All class rasters aligned to reference grid | PASS — aligned with Resampling.nearest |
| Elevation resampled to match class grid | PASS — Resampling.bilinear, 30m→70m |
| Slope resampled to match class grid | PASS — Resampling.bilinear |
| Hillshade computed at 70m reference resolution | PASS |
| CRS consistent (EPSG:32632) | PASS — all inputs in same CRS |
| Map extents match across all plates | PASS — all rendered from same ref_profile |

**Hillshade computation:** Generated from 30m elevation resampled to 70m grid.
Azimuth: 315° (NW), altitude: 45°. Pixel size passed to gradient computation: 70m.
Hillshade range after computation: 0.000–1.000 (full dynamic range). PASS.

---

## 6. Map Legend Quality

| Check | Result |
|---|---|
| Legend includes all classes present in daytime raster | PASS — 7 named classes (codes 1,2,4,5,6,7,8) |
| Legend excludes class 0 (unclassified) | PASS — code 0 not shown |
| Legend excludes code 3 (absent) | PASS — class 3 not in daytime raster |
| Legend PNG readable at web sizes | PASS — 200 DPI, clear swatches |
| SVG legend created | PASS |
| Legend colors match map colors | PASS |

---

## 7. Scientific Captions

| Check | Result |
|---|---|
| All claims are qualified as exploratory | PASS |
| "Watch zone" not described as "stressed" | PASS |
| Product disagreement acknowledged honestly | PASS |
| No "proves" language used | PASS |
| Source lines present on all maps | PASS |
| Limitations section included in website | PASS |
| No unsupported ecological claims | PASS |

---

## 8. Website Asset Path Verification

All paths in `index.html` reference files relative to `public/`:

| HTML path | File exists in public/ | Status |
|---|---|---|
| `data/signals/nasa-quality-maps/map_01_dominant_daytime.webp` | YES | PASS |
| `data/signals/nasa-quality-maps/map_02_demand_efficiency_watch.webp` | YES | PASS |
| `data/signals/nasa-quality-maps/map_03_esi_watch_zone.webp` | YES | PASS |
| `data/signals/nasa-quality-maps/map_04_stable_core.webp` | YES | PASS |
| `data/signals/nasa-quality-maps/map_05_timebin_comparison.webp` | YES | PASS |
| `data/signals/nasa-quality-maps/map_06_terrain_context.webp` | YES | PASS |
| `data/signals/nasa-quality-maps/class_legend.png` | YES | PASS |
| `data/signals/nasa-quality-maps/class_legend.svg` | YES | PASS |

---

## 9. Website Structure Verification

| Check | Result |
|---|---|
| 5 numbered Atlas Plates present | PASS — Plates I–V |
| Each plate has: plate number, title, subtitle, intro text | PASS |
| Each map has: caption, source line | PASS |
| Interpretation section present | PASS |
| Data Provenance section present | PASS |
| Class area table present | PASS |
| Limitations callout present | PASS |
| Lightbox (click-to-zoom) functional | PASS — JS implemented |
| Scroll fade-in animations | PASS — IntersectionObserver |
| Sticky navigation | PASS |
| Mobile responsive layout | PASS — CSS grid with media queries |
| No broken links to external resources (except Google Fonts) | PASS |

---

## 10. Items Requiring Manual Inspection

The following should be checked visually by opening `public/index.html` in a browser:

1. **Hero background**: Map_01 is used as hero background with CSS darkening. Verify it looks atmospheric and text is readable.

2. **Watch zone dual map layout**: At narrow screen widths (< 860px), the two watch zone maps stack vertically. Verify this looks clean.

3. **Timebin comparison map**: The dark-background map_05 inside the dark section background — verify the map is still visually distinct (shadow/glow effect should define it).

4. **Class table bar chart**: Small horizontal bars (max 130px wide) represent % of area. Bars are very short for small classes (stable core: 3.8px wide). Verify they are visible.

5. **Google Fonts loading**: Fonts load from Google CDN. With internet access they display correctly. Without internet, system fallbacks (Georgia, Helvetica Neue) are used — acceptable.

6. **Map_06 terrain context**: This is a split-panel map with its own dark canvas background (#1A1A1A). Displayed inside a dark section — verify they blend naturally.

7. **Lightbox functionality**: Click any map image and verify the lightbox opens with correct full-size image. Press Escape to close.

---

## 11. Known Minor Issues

| Issue | Severity | Status |
|---|---|---|
| Raster extent slightly exceeds SNP boundary | LOW | Not masked — expected, documented |
| Class 3 absent from daytime raster | INFO | Expected behavior, documented |
| No dedicated hero terrain image (uses map_01 w/ CSS filter) | LOW | Acceptable for project scope |
| Map aspect ratios vary slightly between plates | INFO | Each map is independently rendered at correct geographic extent |
| Product disagreement zone ~50% of pixels | INFO | Correctly documented as expected, not a defect |

---

## 12. Overall Assessment

**Status: PASS**

All required outputs were generated without errors. Class codes are correctly mapped to colors. Nodata is handled transparently. All six map plates are present in PNG, WebP, and referenced correctly in the website. Scientific captions are appropriately cautious. The website provides a premium scientific exhibit structure that presents the atlas as an exploratory ecological signal study, not as a definitive ecological assessment.

**Recommended next step:** Open `public/index.html` in a browser and inspect visually. Particular attention to maps 01, 05, and 06 which have distinct background colors that interact with the dark site canvas.
