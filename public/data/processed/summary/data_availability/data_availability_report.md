# Phase 0 Data Availability + Trust Audit

## Purpose

This audit checks whether each product has enough usable observations, coverage, time-bin consistency, and spatial footprint to support interpretation. It does not make ecological claims.

## Inputs

- Raster inventory: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/raster_inventory.csv`
- Master metadata CSV: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/metadata/snp_jan_jun_all_products_master_with_pet_wue.csv`

## Record counts

- All normalized records: **3277**
- Preferred analysis records: **2122**
- Low-coverage records: **792**
- Tiny-footprint raster records: **263**

## Product roles

| product | role | time_of_day_rule |
| --- | --- | --- |
| esi | main: evaporative stress / moisture condition | time sensitive, prefer midday_afternoon or daytime fallback |
| et | main: water exchange / ecosystem activity | time sensitive, prefer midday_afternoon or daytime fallback |
| ndvi | main: greenness / vegetation activity | lower sensitivity, still audit time bins |
| pet | support: atmospheric or energy demand | time sensitive, prefer midday_afternoon or daytime fallback |
| wue | support: water-use efficiency | time sensitive, prefer midday_afternoon or daytime fallback |

## CRS summary from rasters

| product | raster_records | usable_records | epsg_values | crs_values | min_coverage_percent | mean_coverage_percent | tiny_footprint_records |
| --- | --- | --- | --- | --- | --- | --- | --- |
| esi | 309 | 214 | ['32632'] | ['EPSG:32632'] | 0.006 | 78.577 | 19 |
| et | 308 | 214 | ['32632'] | ['EPSG:32632'] | 0.006 | 78.508 | 18 |
| ndvi | 930 | 704 | ['32632'] | ['EPSG:32632'] | 97.154 | 99.905 | 226 |

## Window usability summary

| product | window | years_with_all_months_usable_count | years_with_partial_usable_count | window_confidence | total_usable_records_in_window | min_monthly_usable_records |
| --- | --- | --- | --- | --- | --- | --- |
| esi | jan_mar | 0 | 5 | medium_partial | 88 | 0 |
| esi | apr_jun | 1 | 5 | medium_partial | 126 | 0 |
| esi | jan_jun | 0 | 6 | medium_partial | 214 | 0 |
| esi | may_jun | 1 | 5 | medium_partial | 59 | 0 |
| esi | june | 6 | 0 | high | 47 | 1 |
| et | jan_mar | 0 | 5 | medium_partial | 88 | 0 |
| et | apr_jun | 1 | 5 | medium_partial | 126 | 0 |
| et | jan_jun | 0 | 6 | medium_partial | 214 | 0 |
| et | may_jun | 1 | 5 | medium_partial | 59 | 0 |
| et | june | 6 | 0 | high | 47 | 1 |
| ndvi | jan_mar | 2 | 5 | medium_partial | 208 | 0 |
| ndvi | apr_jun | 4 | 3 | medium_partial | 496 | 0 |
| ndvi | jan_jun | 2 | 5 | medium_partial | 704 | 0 |
| ndvi | may_jun | 4 | 3 | medium_partial | 292 | 0 |
| ndvi | june | 7 | 0 | high | 234 | 18 |
| pet | jan_mar | 0 | 5 | medium_partial | 88 | 0 |
| pet | apr_jun | 1 | 5 | medium_partial | 126 | 0 |
| pet | jan_jun | 0 | 6 | medium_partial | 214 | 0 |
| pet | may_jun | 1 | 5 | medium_partial | 59 | 0 |
| pet | june | 6 | 0 | high | 47 | 1 |
| wue | jan_mar | 0 | 0 | low | 0 | 0 |
| wue | apr_jun | 0 | 6 | medium_partial | 40 | 0 |
| wue | jan_jun | 0 | 6 | medium_partial | 40 | 0 |
| wue | may_jun | 1 | 5 | medium_partial | 40 | 0 |
| wue | june | 6 | 0 | high | 37 | 0 |

## Missing / low-confidence product-month-years

| product | year | month_label | total_records | usable_records | usable_midday_afternoon_records | status |
| --- | --- | --- | --- | --- | --- | --- |
| esi | 2019 | January | 1 | 1 | 0 | low_observation_count |
| esi | 2019 | March | 0 | 0 | 0 | missing |
| esi | 2019 | April | 0 | 0 | 0 | missing |
| esi | 2019 | May | 0 | 0 | 0 | missing |
| esi | 2020 | January | 1 | 1 | 0 | low_observation_count |
| esi | 2020 | February | 3 | 2 | 2 | low_observation_count |
| esi | 2020 | March | 3 | 1 | 0 | low_observation_count |
| esi | 2020 | May | 1 | 1 | 0 | low_observation_count |
| esi | 2021 | January | 3 | 0 | 0 | no_usable_records |
| esi | 2021 | March | 5 | 5 | 0 | time_bin_limited |
| esi | 2022 | January | 2 | 1 | 0 | low_observation_count |
| esi | 2022 | March | 2 | 2 | 0 | low_observation_count |
| esi | 2022 | May | 5 | 2 | 0 | low_observation_count |
| esi | 2023 | January | 3 | 3 | 1 | time_bin_limited |
| esi | 2023 | March | 6 | 4 | 1 | time_bin_limited |
| esi | 2023 | May | 3 | 2 | 0 | low_observation_count |
| esi | 2024 | January | 0 | 0 | 0 | missing |
| esi | 2024 | February | 2 | 2 | 2 | low_observation_count |
| esi | 2024 | March | 0 | 0 | 0 | missing |
| esi | 2024 | April | 0 | 0 | 0 | missing |
| esi | 2024 | May | 0 | 0 | 0 | missing |
| esi | 2024 | June | 2 | 1 | 1 | low_observation_count |
| esi | 2025 | January | 2 | 2 | 0 | low_observation_count |
| esi | 2025 | March | 1 | 1 | 1 | low_observation_count |
| esi | 2025 | May | 3 | 2 | 2 | low_observation_count |
| et | 2019 | January | 1 | 1 | 0 | low_observation_count |
| et | 2019 | March | 0 | 0 | 0 | missing |
| et | 2019 | April | 0 | 0 | 0 | missing |
| et | 2019 | May | 0 | 0 | 0 | missing |
| et | 2020 | January | 1 | 1 | 0 | low_observation_count |
| et | 2020 | February | 3 | 2 | 2 | low_observation_count |
| et | 2020 | March | 3 | 1 | 0 | low_observation_count |
| et | 2020 | May | 1 | 1 | 0 | low_observation_count |
| et | 2021 | January | 3 | 0 | 0 | no_usable_records |
| et | 2021 | March | 5 | 5 | 0 | time_bin_limited |
| et | 2022 | January | 2 | 1 | 0 | low_observation_count |
| et | 2022 | March | 2 | 2 | 0 | low_observation_count |
| et | 2022 | May | 5 | 2 | 0 | low_observation_count |
| et | 2023 | January | 3 | 3 | 1 | time_bin_limited |
| et | 2023 | March | 6 | 4 | 1 | time_bin_limited |
| et | 2023 | May | 3 | 2 | 0 | low_observation_count |
| et | 2024 | January | 0 | 0 | 0 | missing |
| et | 2024 | February | 2 | 2 | 2 | low_observation_count |
| et | 2024 | March | 0 | 0 | 0 | missing |
| et | 2024 | April | 0 | 0 | 0 | missing |
| et | 2024 | May | 0 | 0 | 0 | missing |
| et | 2024 | June | 2 | 1 | 1 | low_observation_count |
| et | 2025 | January | 2 | 2 | 0 | low_observation_count |
| et | 2025 | March | 1 | 1 | 1 | low_observation_count |
| et | 2025 | May | 3 | 2 | 2 | low_observation_count |
| ndvi | 2019 | January | 2 | 2 | 0 | low_observation_count |
| ndvi | 2019 | March | 0 | 0 | 0 | missing |
| ndvi | 2019 | April | 0 | 0 | 0 | missing |
| ndvi | 2019 | May | 0 | 0 | 0 | missing |
| ndvi | 2020 | January | 4 | 2 | 0 | low_observation_count |
| ndvi | 2020 | May | 4 | 2 | 0 | low_observation_count |
| ndvi | 2022 | January | 3 | 1 | 0 | low_observation_count |
| ndvi | 2022 | March | 3 | 3 | 0 | low_observation_count |
| ndvi | 2024 | January | 6 | 4 | 0 | low_observation_count |
| ndvi | 2024 | March | 6 | 4 | 0 | low_observation_count |
| ndvi | 2024 | May | 4 | 4 | 0 | low_observation_count |
| ndvi | 2025 | March | 5 | 4 | 3 | low_observation_count |
| pet | 2019 | January | 1 | 1 | 0 | low_observation_count |
| pet | 2019 | March | 0 | 0 | 0 | missing |
| pet | 2019 | April | 0 | 0 | 0 | missing |
| pet | 2019 | May | 0 | 0 | 0 | missing |
| pet | 2020 | January | 1 | 1 | 0 | low_observation_count |
| pet | 2020 | February | 3 | 2 | 2 | low_observation_count |
| pet | 2020 | March | 3 | 1 | 0 | low_observation_count |
| pet | 2020 | May | 1 | 1 | 0 | low_observation_count |
| pet | 2021 | January | 3 | 0 | 0 | no_usable_records |
| pet | 2021 | March | 5 | 5 | 0 | time_bin_limited |
| pet | 2022 | January | 2 | 1 | 0 | low_observation_count |
| pet | 2022 | March | 2 | 2 | 0 | low_observation_count |
| pet | 2022 | May | 5 | 2 | 0 | low_observation_count |
| pet | 2023 | January | 3 | 3 | 1 | time_bin_limited |
| pet | 2023 | March | 6 | 4 | 1 | time_bin_limited |
| pet | 2023 | May | 3 | 2 | 0 | low_observation_count |
| pet | 2024 | January | 0 | 0 | 0 | missing |
| pet | 2024 | February | 2 | 2 | 2 | low_observation_count |

_Showing first 80 of 122 rows._

## Time-of-day rule

For ET, ESI, PET, WUE, and LST, main ecological interpretation should avoid blindly mixing all time bins. Prefer `midday_afternoon` when coverage is sufficient. Use `morning + midday_afternoon` as a fallback. Patterns are stronger if they survive comparison between all-scenes and time-bin-controlled summaries.

## Phase 0 decision

A product/window is suitable for interpretation only if it has enough usable records, acceptable AOI coverage, no dominance by tiny-footprint rasters, and a defensible time-bin distribution. If not, it may still be used as context, but not as a primary claim.
