# Phase 1 Spatial Story Mining Report

## Purpose

This script searches for spatial story candidates inside Swiss National Park. It avoids XML metadata and uses processed rasters, Phase 0 availability outputs, and optional PET/WUE statistics CSVs only.

## Reference raster

- `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/trends/ndvi_june_slope.tif`

## Scientific framing

The main question is not whether the entire park is simply better or worse. The main question is where the early-growing-season signal is stable, strong, mixed, or uncertain.

June is treated as the primary interpretation window because Phase 0 identified it as the strongest window across NDVI, ET, ESI, PET, and WUE. Jan-Mar and Apr-Jun are used as seasonal context.

## Phase 0 window summary

| product | window | window_confidence | years_with_all_months_usable_count | years_with_partial_usable_count | total_usable_records_in_window | min_monthly_usable_records |
| --- | --- | --- | --- | --- | --- | --- |
| esi | apr_jun | medium_partial | 1 | 5 | 126 | 0 |
| esi | jan_jun | medium_partial | 0 | 6 | 214 | 0 |
| esi | jan_mar | medium_partial | 0 | 5 | 88 | 0 |
| esi | june | high | 6 | 0 | 47 | 1 |
| esi | may_jun | medium_partial | 1 | 5 | 59 | 0 |
| et | apr_jun | medium_partial | 1 | 5 | 126 | 0 |
| et | jan_jun | medium_partial | 0 | 6 | 214 | 0 |
| et | jan_mar | medium_partial | 0 | 5 | 88 | 0 |
| et | june | high | 6 | 0 | 47 | 1 |
| et | may_jun | medium_partial | 1 | 5 | 59 | 0 |
| ndvi | apr_jun | medium_partial | 4 | 3 | 496 | 0 |
| ndvi | jan_jun | medium_partial | 2 | 5 | 704 | 0 |
| ndvi | jan_mar | medium_partial | 2 | 5 | 208 | 0 |
| ndvi | june | high | 7 | 0 | 234 | 18 |
| ndvi | may_jun | medium_partial | 4 | 3 | 292 | 0 |
| pet | apr_jun | medium_partial | 1 | 5 | 126 | 0 |
| pet | jan_jun | medium_partial | 0 | 6 | 214 | 0 |
| pet | jan_mar | medium_partial | 0 | 5 | 88 | 0 |
| pet | june | high | 6 | 0 | 47 | 1 |
| pet | may_jun | medium_partial | 1 | 5 | 59 | 0 |
| wue | apr_jun | medium_partial | 0 | 6 | 40 | 0 |
| wue | jan_jun | medium_partial | 0 | 6 | 40 | 0 |
| wue | jan_mar | low | 0 | 0 | 0 | 0 |
| wue | june | high | 6 | 0 | 37 | 0 |
| wue | may_jun | medium_partial | 1 | 5 | 40 | 0 |

## June time-bin availability

These counts are used as an interpretation warning. The current spatial rasters are all-scene products. A future pipeline update should generate time-bin-controlled composites, especially for ET, ESI, PET, and WUE.

| product | year | evening | midday_afternoon | morning | night | unknown | daytime | all_usable |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| esi | 2019 | 0 | 4 | 3 | 0 | 0 | 7 | 7 |
| esi | 2020 | 0 | 2 | 3 | 0 | 0 | 5 | 5 |
| esi | 2021 | 1 | 2 | 6 | 0 | 0 | 8 | 9 |
| esi | 2022 | 2 | 4 | 5 | 0 | 0 | 9 | 11 |
| esi | 2023 | 0 | 3 | 7 | 0 | 0 | 10 | 10 |
| esi | 2024 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| esi | 2025 | 0 | 1 | 3 | 0 | 0 | 4 | 4 |
| et | 2019 | 0 | 4 | 3 | 0 | 0 | 7 | 7 |
| et | 2020 | 0 | 2 | 3 | 0 | 0 | 5 | 5 |
| et | 2021 | 1 | 2 | 6 | 0 | 0 | 8 | 9 |
| et | 2022 | 2 | 4 | 5 | 0 | 0 | 9 | 11 |
| et | 2023 | 0 | 3 | 7 | 0 | 0 | 10 | 10 |
| et | 2024 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| et | 2025 | 0 | 1 | 3 | 0 | 0 | 4 | 4 |
| ndvi | 2019 | 4 | 14 | 6 | 0 | 0 | 20 | 24 |
| ndvi | 2020 | 6 | 16 | 16 | 0 | 0 | 32 | 38 |
| ndvi | 2021 | 8 | 10 | 14 | 0 | 0 | 24 | 32 |
| ndvi | 2022 | 8 | 24 | 12 | 0 | 0 | 36 | 44 |
| ndvi | 2023 | 8 | 16 | 22 | 2 | 0 | 38 | 48 |
| ndvi | 2024 | 0 | 8 | 6 | 4 | 0 | 14 | 18 |
| ndvi | 2025 | 2 | 12 | 16 | 0 | 0 | 28 | 30 |
| pet | 2019 | 0 | 4 | 3 | 0 | 0 | 7 | 7 |
| pet | 2020 | 0 | 2 | 3 | 0 | 0 | 5 | 5 |
| pet | 2021 | 1 | 2 | 6 | 0 | 0 | 8 | 9 |
| pet | 2022 | 2 | 4 | 5 | 0 | 0 | 9 | 11 |
| pet | 2023 | 0 | 3 | 7 | 0 | 0 | 10 | 10 |
| pet | 2024 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| pet | 2025 | 0 | 1 | 3 | 0 | 0 | 4 | 4 |
| wue | 2019 | 0 | 1 | 3 | 0 | 0 | 4 | 4 |
| wue | 2020 | 0 | 2 | 2 | 0 | 0 | 4 | 4 |
| wue | 2021 | 0 | 2 | 4 | 0 | 0 | 6 | 6 |
| wue | 2022 | 2 | 3 | 5 | 0 | 0 | 8 | 10 |
| wue | 2023 | 0 | 2 | 7 | 0 | 0 | 9 | 9 |
| wue | 2024 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| wue | 2025 | 0 | 1 | 3 | 0 | 0 | 4 | 4 |

## Spatial story definitions

| class_code | class_name | description |
| --- | --- | --- |
| 0 | unclassified_or_no_data | No dominant spatial story assigned, often because data are missing or mixed. |
| 1 | stable_core | Low interannual variability across NDVI, ET, and ESI in June. |
| 2 | coherent_june_activation | June NDVI and ET slopes are positive and ESI is nonnegative. |
| 3 | strong_june_activation | June NDVI and ET slopes are both in the upper activation range. |
| 4 | esi_watch_zone_exploratory | June NDVI and ET are positive but ESI slope is negative. Exploratory only. |
| 5 | demand_efficiency_watch_exploratory | June NDVI and ET are positive, PET is positive, and WUE is negative. Exploratory PET/WUE support watch zone. |
| 6 | efficient_activation_support | June NDVI and ET are positive and WUE is nonnegative where WUE raster support exists. |
| 7 | product_disagreement_zone | Main products point in conflicting directions. |
| 8 | high_variability_zone | One or more main products show high interannual variability. |
| 9 | seasonal_activation_zone | Winter-to-spring activation is consistently positive for NDVI and ET. |
| 10 | low_support_zone | Too few valid years or weak support for spatial interpretation. |

## Thresholds used

| threshold | value |
| --- | --- |
| ndvi_cv_low | 0.1816 |
| et_cv_low | 0.1930 |
| esi_cv_low | 0.1118 |
| ndvi_cv_high | 0.4624 |
| et_cv_high | 0.2572 |
| esi_cv_high | 0.1690 |
| ndvi_strong_slope | 0.0123 |
| et_strong_slope | 0.1846 |
| consistent_fraction | 0.7000 |
| min_valid_years_for_activation | 3 |
| pet_raster_support_available | True |
| wue_raster_support_available | True |

## Overlapping zone summary

These zones are diagnostic masks and may overlap. Percentages in this table should not be added together. Use `dominant_class_summary.csv` for mutually exclusive map classes.

| zone | pixel_count | area_km2 | percent_of_valid_june_aoi | mean_ndvi_june_slope | mean_et_june_slope | mean_esi_june_slope | mean_pet_june_slope | mean_wue_june_slope | mean_ndvi_june_cv | mean_et_june_cv | mean_esi_june_cv | mean_pet_june_cv | mean_wue_june_cv | mean_ndvi_activation_consistency | mean_et_activation_consistency | mean_esi_activation_consistency | mean_ndvi_activation | mean_et_activation | mean_esi_shift | mean_pet_demand_shift | mean_wue_efficiency_shift |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| stable_core | 1952 | 9.5648 | 5.6171 | 0.0044 | 0.1369 | 0.0069 | 12.0874 | -0.0070 | 0.1254 | 0.1685 | 0.0849 | 0.2275 | 0.4777 | 0.7665 | 1.0000 | 0.9035 | 0.0672 | 1.8272 | 0.2638 |  |  |
| coherent_june_activation | 9906 | 48.5394 | 28.5057 | 0.0087 | 0.1812 | 0.0163 | 13.2563 | -0.0679 | 0.2063 | 0.2341 | 0.1097 | 0.2555 | 0.5476 | 0.7211 | 0.9999 | 0.8896 | 0.0579 | 1.7484 | 0.2193 |  |  |
| strong_june_activation | 2028 | 9.9372 | 5.8358 | 0.0188 | 0.2377 | -0.0008 | 17.3597 | 0.0064 | 0.3108 | 0.2508 | 0.1066 | 0.2568 | 0.6313 | 0.8338 | 1.0000 | 0.8579 | 0.1018 | 1.5822 | 0.2113 |  |  |
| watch_zone_exploratory | 16483 | 80.7667 | 47.4317 | 0.0107 | 0.1018 | -0.0200 | 10.9658 | 0.1055 | 0.4285 | 0.2073 | 0.1529 | 0.2270 | 0.7508 | 0.8819 | 0.9997 | 0.8740 | 0.0950 | 1.2721 | 0.2773 |  |  |
| demand_efficiency_watch_exploratory | 10099 | 49.4851 | 29.0610 | 0.0092 | 0.1671 | 0.0064 | 13.1491 | -0.1304 | 0.2384 | 0.2278 | 0.1169 | 0.2471 | 0.5764 | 0.7726 | 1.0000 | 0.8896 | 0.0712 | 1.6571 | 0.2341 |  |  |
| efficient_activation_support | 16172 | 79.2428 | 46.5368 | 0.0105 | 0.1100 | -0.0146 | 11.1002 | 0.1488 | 0.4129 | 0.2104 | 0.1490 | 0.2316 | 0.7357 | 0.8538 | 0.9997 | 0.8732 | 0.0877 | 1.3210 | 0.2688 |  |  |
| demand_increase_support | 33431 | 163.8119 | 96.2015 | 0.0079 | 0.1194 | -0.0053 | 11.1415 | 0.0271 | 0.3330 | 0.2169 | 0.1398 | 0.2381 | 0.6648 | 0.8142 | 0.9998 | 0.8824 | 0.0791 | 1.4679 | 0.2577 |  |  |
| product_disagreement_zone | 24439 | 119.7511 | 70.3260 | 0.0076 | 0.0887 | -0.0143 | 9.6816 | 0.0655 | 0.3861 | 0.2131 | 0.1531 | 0.2336 | 0.7107 | 0.8478 | 0.9994 | 0.8814 | 0.0864 | 1.3474 | 0.2777 |  |  |
| high_variability_zone | 18759 | 91.9191 | 53.9812 | 0.0093 | 0.0843 | -0.0147 | 9.2770 | 0.0652 | 0.4486 | 0.2380 | 0.1685 | 0.2413 | 0.7716 | 0.8414 | 0.9989 | 0.8757 | 0.0859 | 1.2716 | 0.2674 |  |  |
| seasonal_activation_zone | 27953 | 136.9697 | 80.4380 | 0.0085 | 0.1023 | -0.0092 | 10.4404 | 0.0484 | 0.3510 | 0.2171 | 0.1426 | 0.2348 | 0.6695 | 0.9089 | 0.9994 | 0.8732 | 0.1061 | 1.3934 | 0.2614 |  |  |
| seasonal_activation_with_esi_support | 27776 | 136.1024 | 79.9286 | 0.0085 | 0.1023 | -0.0092 | 10.4305 | 0.0487 | 0.3499 | 0.2168 | 0.1416 | 0.2348 | 0.6676 | 0.9086 | 0.9995 | 0.8763 | 0.1058 | 1.3953 | 0.2633 |  |  |
| low_support_zone | 0 | 0.0000 | 0.0000 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## Dominant class summary

This table is mutually exclusive and should be used for the final class breakdown.

| class_code | class_name | description | pixel_count | area_km2 | percent_of_valid_june_aoi | percent_total_check | percent_total_note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | unclassified_or_no_data | No dominant spatial story assigned, often because data are missing or mixed. | 2 | 0.0098 | 0.0058 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 1 | stable_core | Low interannual variability across NDVI, ET, and ESI in June. | 384 | 1.8816 | 1.1050 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 2 | coherent_june_activation | June NDVI and ET slopes are positive and ESI is nonnegative. | 95 | 0.4655 | 0.2734 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 4 | esi_watch_zone_exploratory | June NDVI and ET are positive but ESI slope is negative. Exploratory only. | 13005 | 63.7245 | 37.4234 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 5 | demand_efficiency_watch_exploratory | June NDVI and ET are positive, PET is positive, and WUE is negative. Exploratory PET/WUE support watch zone. | 10099 | 49.4851 | 29.0610 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 6 | efficient_activation_support | June NDVI and ET are positive and WUE is nonnegative where WUE raster support exists. | 3185 | 15.6065 | 9.1652 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 7 | product_disagreement_zone | Main products point in conflicting directions. | 1965 | 9.6285 | 5.6545 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 8 | high_variability_zone | One or more main products show high interannual variability. | 38 | 0.1862 | 0.1093 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |
| 9 | seasonal_activation_zone | Winter-to-spring activation is consistently positive for NDVI and ET. | 5978 | 29.2922 | 17.2024 | 100.0000 | Should be close to 100 because dominant classes are mutually exclusive. |

## PET/WUE raster support status

| product | june_slope_raster | june_cv_raster | slope_loaded | cv_loaded |
| --- | --- | --- | --- | --- |
| pet | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/trends/pet_june_slope.tif | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/stability/pet_june_coefficient_of_variation.tif | True | True |
| wue | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/trends/wue_june_slope.tif | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/stability/wue_june_coefficient_of_variation.tif | True | True |

## PET/WUE support statistics

| product | season | n_years | slope_per_year | r2 | p_value | first_year | last_year | mean_value |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pet | june | 7 | 9.9093 | 0.1937 | 0.3230 | 2019 | 2025 | 213.6503 |
| wue | june | 6 | -0.0672 | 0.0842 | 0.5769 | 2019 | 2025 | 1.6673 |

## Main interpretation guidance

- Treat `stable_core`, `strong_june_activation`, and `seasonal_activation_zone` as the strongest story candidates.
- Treat `esi_watch_zone_exploratory` and `demand_efficiency_watch_exploratory` as monitoring layers, not confirmed stress results.
- Treat `product_disagreement_zone` as a hypothesis generator. It may indicate ecology, snow effects, topography, timing artifacts, or product-specific uncertainty.
- Do not claim long-term climate change from these maps. The products support short-window spatial pattern analysis.
- Do not make final ET/ESI/PET/WUE claims until time-bin-controlled composites are compared against the all-scene maps.

## Key outputs

- `ndvi_activation_mean`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_activation_mean.tif`
- `ndvi_activation_median`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_activation_median.tif`
- `ndvi_activation_std`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_activation_std.tif`
- `ndvi_activation_consistency`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_activation_consistency.tif`
- `ndvi_activation_valid_year_count`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_activation_valid_year_count.tif`
- `et_activation_mean`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_activation_mean.tif`
- `et_activation_median`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_activation_median.tif`
- `et_activation_std`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_activation_std.tif`
- `et_activation_consistency`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_activation_consistency.tif`
- `et_activation_valid_year_count`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_activation_valid_year_count.tif`
- `esi_activation_mean`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_activation_mean.tif`
- `esi_activation_median`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_activation_median.tif`
- `esi_activation_std`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_activation_std.tif`
- `esi_activation_consistency`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_activation_consistency.tif`
- `esi_activation_valid_year_count`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_activation_valid_year_count.tif`
- `pet_activation_mean`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_activation_mean.tif`
- `pet_activation_median`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_activation_median.tif`
- `pet_activation_std`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_activation_std.tif`
- `pet_activation_consistency`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_activation_consistency.tif`
- `pet_activation_valid_year_count`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_activation_valid_year_count.tif`
- `wue_activation_mean`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_activation_mean.tif`
- `wue_activation_median`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_activation_median.tif`
- `wue_activation_std`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_activation_std.tif`
- `wue_activation_consistency`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_activation_consistency.tif`
- `wue_activation_valid_year_count`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_activation_valid_year_count.tif`
- `ndvi_june_slope_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_june_slope_aligned.tif`
- `ndvi_june_cv_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_june_cv_aligned.tif`
- `ndvi_june_interannual_std_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_june_interannual_std_aligned.tif`
- `ndvi_june_interannual_range_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/ndvi_june_interannual_range_aligned.tif`
- `et_june_slope_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_june_slope_aligned.tif`
- `et_june_cv_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_june_cv_aligned.tif`
- `et_june_interannual_std_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_june_interannual_std_aligned.tif`
- `et_june_interannual_range_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/et_june_interannual_range_aligned.tif`
- `esi_june_slope_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_june_slope_aligned.tif`
- `esi_june_cv_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_june_cv_aligned.tif`
- `esi_june_interannual_std_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_june_interannual_std_aligned.tif`
- `esi_june_interannual_range_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/esi_june_interannual_range_aligned.tif`
- `pet_june_slope_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_june_slope_aligned.tif`
- `pet_june_cv_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_june_cv_aligned.tif`
- `pet_june_interannual_std_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_june_interannual_std_aligned.tif`
- `pet_june_interannual_range_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/pet_june_interannual_range_aligned.tif`
- `wue_june_slope_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_june_slope_aligned.tif`
- `wue_june_cv_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_june_cv_aligned.tif`
- `wue_june_interannual_std_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_june_interannual_std_aligned.tif`
- `wue_june_interannual_range_aligned`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/wue_june_interannual_range_aligned.tif`
- `valid_june_mask`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/valid_june_mask.tif`
- `stable_core`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/stable_core.tif`
- `coherent_june_activation`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/coherent_june_activation.tif`
- `strong_june_activation`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/strong_june_activation.tif`
- `watch_zone_exploratory`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/watch_zone_exploratory.tif`
- `demand_efficiency_watch_exploratory`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/demand_efficiency_watch_exploratory.tif`
- `efficient_activation_support`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/efficient_activation_support.tif`
- `demand_increase_support`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/demand_increase_support.tif`
- `product_disagreement_zone`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/product_disagreement_zone.tif`
- `high_variability_zone`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/high_variability_zone.tif`
- `seasonal_activation_zone`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/seasonal_activation_zone.tif`
- `seasonal_activation_with_esi_support`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/seasonal_activation_with_esi_support.tif`
- `low_support_zone`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/low_support_zone.tif`
- `dominant_spatial_story_class`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/dominant_spatial_story_class.tif`
- `story_zone_summary_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/story_zone_summary.csv`
- `story_zone_definitions_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/story_zone_definitions.csv`
- `dominant_class_summary_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/dominant_class_summary.csv`
- `phase0_window_summary_used_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/phase0_window_summary_used.csv`
- `june_timebin_summary_used_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/june_timebin_summary_used.csv`
- `support_pet_wue_year_month_values_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/support_pet_wue_year_month_values.csv`
- `support_pet_wue_june_trends_csv`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/tables/support_pet_wue_june_trends.csv`
- `dominant_class_png`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/png/dominant_spatial_story_class.png`
- `spatial_story_report`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/spatial_story_report.md`