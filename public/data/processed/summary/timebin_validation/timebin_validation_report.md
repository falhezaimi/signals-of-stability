# Phase 2 Time-Bin Validation Report

## Purpose

This report tests whether the Phase 1 spatial story survives when June rasters are filtered by time of day. It does not use XML.

## Reference raster

- `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/dominant_spatial_story_class.tif`

## Scenarios

| scenario | label | time_bins |
| --- | --- | --- |
| midday_afternoon | Midday/Afternoon only | midday_afternoon |
| daytime | Morning + Midday/Afternoon | morning,midday_afternoon |
| daytime_evening | Morning + Midday/Afternoon + Evening | morning,midday_afternoon,evening |
| all_available | All usable time bins | morning,midday_afternoon,evening,night,unknown |

## Scene counts by scenario

| scenario | product | years_with_composites | total_scenes | min_scene_count | mean_scene_count | mean_scene_coverage |
| --- | --- | --- | --- | --- | --- | --- |
| all_available | esi | 7 | 47 | 1 | 6.7143 | 94.6196 |
| all_available | et | 7 | 47 | 1 | 6.7143 | 94.6196 |
| all_available | ndvi | 7 | 234 | 18 | 33.4286 | 99.9137 |
| all_available | pet | 7 | 47 | 1 | 6.7143 | 94.6196 |
| all_available | wue | 6 | 37 | 0 | 5.2857 | 88.8798 |
| daytime | esi | 7 | 44 | 1 | 6.2857 | 94.6384 |
| daytime | et | 7 | 44 | 1 | 6.2857 | 94.6384 |
| daytime | ndvi | 7 | 192 | 14 | 27.4286 | 99.9074 |
| daytime | pet | 7 | 44 | 1 | 6.2857 | 94.6384 |
| daytime | wue | 6 | 35 | 0 | 5.0000 | 88.8813 |
| daytime_evening | esi | 7 | 47 | 1 | 6.7143 | 94.6196 |
| daytime_evening | et | 7 | 47 | 1 | 6.7143 | 94.6196 |
| daytime_evening | ndvi | 7 | 228 | 14 | 32.5714 | 99.9129 |
| daytime_evening | pet | 7 | 47 | 1 | 6.7143 | 94.6196 |
| daytime_evening | wue | 6 | 37 | 0 | 5.2857 | 88.8798 |
| midday_afternoon | esi | 7 | 17 | 1 | 2.4286 | 90.9811 |
| midday_afternoon | et | 7 | 17 | 1 | 2.4286 | 90.9811 |
| midday_afternoon | ndvi | 7 | 100 | 8 | 14.2857 | 99.9256 |
| midday_afternoon | pet | 7 | 17 | 1 | 2.4286 | 90.9811 |
| midday_afternoon | wue | 6 | 11 | 0 | 1.5714 | 87.6470 |

## Trend summary by scenario

| scenario | scenario_label | product | composite_years | n_composite_years | mean_slope | median_slope | mean_cv | mean_valid_year_count |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| midday_afternoon | Midday/Afternoon only | ndvi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.0047 | 0.0040 | 0.4778 | 7.0000 |
| midday_afternoon | Midday/Afternoon only | et | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.0112 | 0.0075 | 0.2551 | 6.8331 |
| midday_afternoon | Midday/Afternoon only | esi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | -0.0153 | -0.0103 | 0.1801 | 6.8331 |
| midday_afternoon | Midday/Afternoon only | pet | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 9.6897 | 10.6771 | 0.2134 | 6.8331 |
| midday_afternoon | Midday/Afternoon only | wue | [2019, 2020, 2021, 2022, 2023, 2025] | 6 | -0.2147 | -0.2022 | 0.8237 | 5.5791 |
| daytime | Morning + Midday/Afternoon | ndvi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.0069 | 0.0065 | 0.3395 | 7.0000 |
| daytime | Morning + Midday/Afternoon | et | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.1028 | 0.0960 | 0.2247 | 6.9925 |
| daytime | Morning + Midday/Afternoon | esi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | -0.0055 | -0.0059 | 0.1579 | 6.9925 |
| daytime | Morning + Midday/Afternoon | pet | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 10.0895 | 9.8438 | 0.2494 | 6.9925 |
| daytime | Morning + Midday/Afternoon | wue | [2019, 2020, 2021, 2022, 2023, 2025] | 6 | -0.0292 | 0.0045 | 0.6942 | 5.9037 |
| daytime_evening | Morning + Midday/Afternoon + Evening | ndvi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.0073 | 0.0068 | 0.3580 | 7.0000 |
| daytime_evening | Morning + Midday/Afternoon + Evening | et | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.1047 | 0.0983 | 0.2240 | 6.9925 |
| daytime_evening | Morning + Midday/Afternoon + Evening | esi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | -0.0060 | -0.0064 | 0.1552 | 6.9925 |
| daytime_evening | Morning + Midday/Afternoon + Evening | pet | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 10.0315 | 9.8125 | 0.2468 | 6.9925 |
| daytime_evening | Morning + Midday/Afternoon + Evening | wue | [2019, 2020, 2021, 2022, 2023, 2025] | 6 | -0.0291 | 0.0056 | 0.7066 | 5.9037 |
| all_available | All usable time bins | ndvi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.0078 | 0.0075 | 0.3403 | 7.0000 |
| all_available | All usable time bins | et | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 0.1047 | 0.0983 | 0.2240 | 6.9925 |
| all_available | All usable time bins | esi | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | -0.0060 | -0.0064 | 0.1552 | 6.9925 |
| all_available | All usable time bins | pet | [2019, 2020, 2021, 2022, 2023, 2024, 2025] | 7 | 10.0315 | 9.8125 | 0.2468 | 6.9925 |
| all_available | All usable time bins | wue | [2019, 2020, 2021, 2022, 2023, 2025] | 6 | -0.0291 | 0.0056 | 0.7066 | 5.9037 |

## Dominant class summary by scenario

| scenario | class_code | class_name | description | pixel_count | area_km2 | percent_of_valid_aoi |
| --- | --- | --- | --- | --- | --- | --- |
| midday_afternoon | 0 | unclassified_or_no_data | No dominant story assigned or no valid trend support. | 640 | 3.1360 | 1.7945 |
| midday_afternoon | 1 | stable_core | Low interannual variability across NDVI, ET, and ESI. | 1370 | 6.7130 | 3.8413 |
| midday_afternoon | 2 | coherent_june_activation | NDVI and ET slopes are positive and ESI is nonnegative. | 187 | 0.9163 | 0.5243 |
| midday_afternoon | 3 | strong_june_activation | NDVI and ET slopes are both in the upper activation range. | 24 | 0.1176 | 0.0673 |
| midday_afternoon | 4 | esi_watch_zone_exploratory | NDVI and ET are positive but ESI slope is negative. | 2225 | 10.9025 | 6.2386 |
| midday_afternoon | 5 | demand_efficiency_watch_exploratory | NDVI, ET, and PET are positive while WUE is negative. | 10350 | 50.7150 | 29.0200 |
| midday_afternoon | 6 | efficient_activation_support | NDVI and ET are positive and WUE is nonnegative. | 977 | 4.7873 | 2.7394 |
| midday_afternoon | 7 | product_disagreement_zone | Main products point in conflicting directions. | 17934 | 87.8766 | 50.2846 |
| midday_afternoon | 8 | high_variability_zone | One or more main products show high interannual variability. | 1958 | 9.5942 | 5.4900 |
| daytime | 0 | unclassified_or_no_data | No dominant story assigned or no valid trend support. | 135 | 0.6615 | 0.3785 |
| daytime | 1 | stable_core | Low interannual variability across NDVI, ET, and ESI. | 374 | 1.8326 | 1.0486 |
| daytime | 2 | coherent_june_activation | NDVI and ET slopes are positive and ESI is nonnegative. | 96 | 0.4704 | 0.2692 |
| daytime | 4 | esi_watch_zone_exploratory | NDVI and ET are positive but ESI slope is negative. | 10646 | 52.1654 | 29.8500 |
| daytime | 5 | demand_efficiency_watch_exploratory | NDVI, ET, and PET are positive while WUE is negative. | 12386 | 60.6914 | 34.7287 |
| daytime | 6 | efficient_activation_support | NDVI and ET are positive and WUE is nonnegative. | 2445 | 11.9805 | 6.8555 |
| daytime | 7 | product_disagreement_zone | Main products point in conflicting directions. | 8817 | 43.2033 | 24.7217 |
| daytime | 8 | high_variability_zone | One or more main products show high interannual variability. | 766 | 3.7534 | 2.1478 |
| daytime_evening | 0 | unclassified_or_no_data | No dominant story assigned or no valid trend support. | 116 | 0.5684 | 0.3252 |
| daytime_evening | 1 | stable_core | Low interannual variability across NDVI, ET, and ESI. | 377 | 1.8473 | 1.0571 |
| daytime_evening | 2 | coherent_june_activation | NDVI and ET slopes are positive and ESI is nonnegative. | 99 | 0.4851 | 0.2776 |
| daytime_evening | 4 | esi_watch_zone_exploratory | NDVI and ET are positive but ESI slope is negative. | 11239 | 55.0711 | 31.5127 |
| daytime_evening | 5 | demand_efficiency_watch_exploratory | NDVI, ET, and PET are positive while WUE is negative. | 12176 | 59.6624 | 34.1399 |
| daytime_evening | 6 | efficient_activation_support | NDVI and ET are positive and WUE is nonnegative. | 2366 | 11.5934 | 6.6340 |
| daytime_evening | 7 | product_disagreement_zone | Main products point in conflicting directions. | 8714 | 42.6986 | 24.4329 |
| daytime_evening | 8 | high_variability_zone | One or more main products show high interannual variability. | 578 | 2.8322 | 1.6206 |
| all_available | 0 | unclassified_or_no_data | No dominant story assigned or no valid trend support. | 97 | 0.4753 | 0.2720 |
| all_available | 1 | stable_core | Low interannual variability across NDVI, ET, and ESI. | 416 | 2.0384 | 1.1664 |
| all_available | 2 | coherent_june_activation | NDVI and ET slopes are positive and ESI is nonnegative. | 94 | 0.4606 | 0.2636 |
| all_available | 4 | esi_watch_zone_exploratory | NDVI and ET are positive but ESI slope is negative. | 11458 | 56.1442 | 32.1267 |
| all_available | 5 | demand_efficiency_watch_exploratory | NDVI, ET, and PET are positive while WUE is negative. | 11829 | 57.9621 | 33.1670 |
| all_available | 6 | efficient_activation_support | NDVI and ET are positive and WUE is nonnegative. | 2390 | 11.7110 | 6.7012 |
| all_available | 7 | product_disagreement_zone | Main products point in conflicting directions. | 9032 | 44.2568 | 25.3245 |
| all_available | 8 | high_variability_zone | One or more main products show high interannual variability. | 349 | 1.7101 | 0.9786 |

## Phase 1 class persistence

| phase1_target_class | phase1_target_code | scenario | scenario_comparison_class | phase1_pixel_count | phase1_pixels_valid_in_scenario | overlap_pixel_count | percent_of_phase1_class_persisting | percent_of_phase1_class_with_scenario_data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| esi_watch_zone_exploratory | 4 | midday_afternoon | any_watch | 13005 | 13005 | 4865 | 37.4087 | 100.0000 |
| esi_watch_zone_exploratory | 4 | midday_afternoon | esi_watch_zone_exploratory | 13005 | 13005 | 1712 | 13.1642 | 100.0000 |
| esi_watch_zone_exploratory | 4 | midday_afternoon | demand_efficiency_watch_exploratory | 13005 | 13005 | 3153 | 24.2445 | 100.0000 |
| esi_watch_zone_exploratory | 4 | midday_afternoon | efficient_activation_support | 13005 | 13005 | 678 | 5.2134 | 100.0000 |
| esi_watch_zone_exploratory | 4 | midday_afternoon | stable_core | 13005 | 13005 | 143 | 1.0996 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime | any_watch | 13005 | 13005 | 10717 | 82.4068 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime | esi_watch_zone_exploratory | 13005 | 13005 | 9244 | 71.0804 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime | demand_efficiency_watch_exploratory | 13005 | 13005 | 1473 | 11.3264 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime | efficient_activation_support | 13005 | 13005 | 480 | 3.6909 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime | stable_core | 13005 | 13005 | 23 | 0.1769 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime_evening | any_watch | 13005 | 13005 | 11157 | 85.7901 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime_evening | esi_watch_zone_exploratory | 13005 | 13005 | 9681 | 74.4406 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime_evening | demand_efficiency_watch_exploratory | 13005 | 13005 | 1476 | 11.3495 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime_evening | efficient_activation_support | 13005 | 13005 | 440 | 3.3833 | 100.0000 |
| esi_watch_zone_exploratory | 4 | daytime_evening | stable_core | 13005 | 13005 | 18 | 0.1384 | 100.0000 |
| esi_watch_zone_exploratory | 4 | all_available | any_watch | 13005 | 13005 | 11348 | 87.2587 | 100.0000 |
| esi_watch_zone_exploratory | 4 | all_available | esi_watch_zone_exploratory | 13005 | 13005 | 9853 | 75.7632 | 100.0000 |
| esi_watch_zone_exploratory | 4 | all_available | demand_efficiency_watch_exploratory | 13005 | 13005 | 1495 | 11.4956 | 100.0000 |
| esi_watch_zone_exploratory | 4 | all_available | efficient_activation_support | 13005 | 13005 | 452 | 3.4756 | 100.0000 |
| esi_watch_zone_exploratory | 4 | all_available | stable_core | 13005 | 13005 | 13 | 0.1000 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | midday_afternoon | any_watch | 10099 | 10099 | 5143 | 50.9258 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | midday_afternoon | esi_watch_zone_exploratory | 10099 | 10099 | 248 | 2.4557 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | midday_afternoon | demand_efficiency_watch_exploratory | 10099 | 10099 | 4895 | 48.4701 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | midday_afternoon | efficient_activation_support | 10099 | 10099 | 73 | 0.7228 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | midday_afternoon | stable_core | 10099 | 10099 | 486 | 4.8124 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime | any_watch | 10099 | 10099 | 9021 | 89.3257 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime | esi_watch_zone_exploratory | 10099 | 10099 | 758 | 7.5057 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime | demand_efficiency_watch_exploratory | 10099 | 10099 | 8263 | 81.8200 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime | efficient_activation_support | 10099 | 10099 | 336 | 3.3271 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime | stable_core | 10099 | 10099 | 15 | 0.1485 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime_evening | any_watch | 10099 | 10099 | 9128 | 90.3852 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime_evening | esi_watch_zone_exploratory | 10099 | 10099 | 849 | 8.4068 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime_evening | demand_efficiency_watch_exploratory | 10099 | 10099 | 8279 | 81.9784 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime_evening | efficient_activation_support | 10099 | 10099 | 335 | 3.3172 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | daytime_evening | stable_core | 10099 | 10099 | 18 | 0.1782 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | all_available | any_watch | 10099 | 10099 | 9365 | 92.7320 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | all_available | esi_watch_zone_exploratory | 10099 | 10099 | 873 | 8.6444 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | all_available | demand_efficiency_watch_exploratory | 10099 | 10099 | 8492 | 84.0875 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | all_available | efficient_activation_support | 10099 | 10099 | 356 | 3.5251 | 100.0000 |
| demand_efficiency_watch_exploratory | 5 | all_available | stable_core | 10099 | 10099 | 9 | 0.0891 | 100.0000 |
| efficient_activation_support | 6 | midday_afternoon | any_watch | 3185 | 3185 | 1771 | 55.6044 | 100.0000 |
| efficient_activation_support | 6 | midday_afternoon | esi_watch_zone_exploratory | 3185 | 3185 | 96 | 3.0141 | 100.0000 |
| efficient_activation_support | 6 | midday_afternoon | demand_efficiency_watch_exploratory | 3185 | 3185 | 1675 | 52.5903 | 100.0000 |
| efficient_activation_support | 6 | midday_afternoon | efficient_activation_support | 3185 | 3185 | 144 | 4.5212 | 100.0000 |
| efficient_activation_support | 6 | midday_afternoon | stable_core | 3185 | 3185 | 151 | 4.7410 | 100.0000 |
| efficient_activation_support | 6 | daytime | any_watch | 3185 | 3185 | 1603 | 50.3297 | 100.0000 |
| efficient_activation_support | 6 | daytime | esi_watch_zone_exploratory | 3185 | 3185 | 139 | 4.3642 | 100.0000 |
| efficient_activation_support | 6 | daytime | demand_efficiency_watch_exploratory | 3185 | 3185 | 1464 | 45.9655 | 100.0000 |
| efficient_activation_support | 6 | daytime | efficient_activation_support | 3185 | 3185 | 1425 | 44.7410 | 100.0000 |
| efficient_activation_support | 6 | daytime | stable_core | 3185 | 3185 | 13 | 0.4082 | 100.0000 |
| efficient_activation_support | 6 | daytime_evening | any_watch | 3185 | 3185 | 1628 | 51.1146 | 100.0000 |
| efficient_activation_support | 6 | daytime_evening | esi_watch_zone_exploratory | 3185 | 3185 | 155 | 4.8666 | 100.0000 |
| efficient_activation_support | 6 | daytime_evening | demand_efficiency_watch_exploratory | 3185 | 3185 | 1473 | 46.2480 | 100.0000 |
| efficient_activation_support | 6 | daytime_evening | efficient_activation_support | 3185 | 3185 | 1423 | 44.6782 | 100.0000 |
| efficient_activation_support | 6 | daytime_evening | stable_core | 3185 | 3185 | 10 | 0.3140 | 100.0000 |
| efficient_activation_support | 6 | all_available | any_watch | 3185 | 3185 | 1648 | 51.7425 | 100.0000 |
| efficient_activation_support | 6 | all_available | esi_watch_zone_exploratory | 3185 | 3185 | 160 | 5.0235 | 100.0000 |
| efficient_activation_support | 6 | all_available | demand_efficiency_watch_exploratory | 3185 | 3185 | 1488 | 46.7190 | 100.0000 |
| efficient_activation_support | 6 | all_available | efficient_activation_support | 3185 | 3185 | 1450 | 45.5259 | 100.0000 |
| efficient_activation_support | 6 | all_available | stable_core | 3185 | 3185 | 10 | 0.3140 | 100.0000 |
| stable_core | 1 | midday_afternoon | any_watch | 384 | 384 | 34 | 8.8542 | 100.0000 |
| stable_core | 1 | midday_afternoon | esi_watch_zone_exploratory | 384 | 384 | 0 | 0.0000 | 100.0000 |
| stable_core | 1 | midday_afternoon | demand_efficiency_watch_exploratory | 384 | 384 | 34 | 8.8542 | 100.0000 |
| stable_core | 1 | midday_afternoon | efficient_activation_support | 384 | 384 | 0 | 0.0000 | 100.0000 |
| stable_core | 1 | midday_afternoon | stable_core | 384 | 384 | 102 | 26.5625 | 100.0000 |
| stable_core | 1 | daytime | any_watch | 384 | 384 | 82 | 21.3542 | 100.0000 |
| stable_core | 1 | daytime | esi_watch_zone_exploratory | 384 | 384 | 2 | 0.5208 | 100.0000 |
| stable_core | 1 | daytime | demand_efficiency_watch_exploratory | 384 | 384 | 80 | 20.8333 | 100.0000 |
| stable_core | 1 | daytime | efficient_activation_support | 384 | 384 | 9 | 2.3438 | 100.0000 |
| stable_core | 1 | daytime | stable_core | 384 | 384 | 182 | 47.3958 | 100.0000 |
| stable_core | 1 | daytime_evening | any_watch | 384 | 384 | 48 | 12.5000 | 100.0000 |
| stable_core | 1 | daytime_evening | esi_watch_zone_exploratory | 384 | 384 | 0 | 0.0000 | 100.0000 |
| stable_core | 1 | daytime_evening | demand_efficiency_watch_exploratory | 384 | 384 | 48 | 12.5000 | 100.0000 |
| stable_core | 1 | daytime_evening | efficient_activation_support | 384 | 384 | 7 | 1.8229 | 100.0000 |
| stable_core | 1 | daytime_evening | stable_core | 384 | 384 | 206 | 53.6458 | 100.0000 |
| stable_core | 1 | all_available | any_watch | 384 | 384 | 4 | 1.0417 | 100.0000 |
| stable_core | 1 | all_available | esi_watch_zone_exploratory | 384 | 384 | 0 | 0.0000 | 100.0000 |
| stable_core | 1 | all_available | demand_efficiency_watch_exploratory | 384 | 384 | 4 | 1.0417 | 100.0000 |
| stable_core | 1 | all_available | efficient_activation_support | 384 | 384 | 3 | 0.7812 | 100.0000 |
| stable_core | 1 | all_available | stable_core | 384 | 384 | 239 | 62.2396 | 100.0000 |
| seasonal_activation_zone | 9 | midday_afternoon | any_watch | 5978 | 5978 | 380 | 6.3566 | 100.0000 |
| seasonal_activation_zone | 9 | midday_afternoon | esi_watch_zone_exploratory | 5978 | 5978 | 98 | 1.6393 | 100.0000 |
| seasonal_activation_zone | 9 | midday_afternoon | demand_efficiency_watch_exploratory | 5978 | 5978 | 282 | 4.7173 | 100.0000 |
| seasonal_activation_zone | 9 | midday_afternoon | efficient_activation_support | 5978 | 5978 | 23 | 0.3847 | 100.0000 |
| seasonal_activation_zone | 9 | midday_afternoon | stable_core | 5978 | 5978 | 270 | 4.5166 | 100.0000 |
| seasonal_activation_zone | 9 | daytime | any_watch | 5978 | 5978 | 589 | 9.8528 | 100.0000 |
| seasonal_activation_zone | 9 | daytime | esi_watch_zone_exploratory | 5978 | 5978 | 148 | 2.4757 | 100.0000 |
| seasonal_activation_zone | 9 | daytime | demand_efficiency_watch_exploratory | 5978 | 5978 | 441 | 7.3770 | 100.0000 |
| seasonal_activation_zone | 9 | daytime | efficient_activation_support | 5978 | 5978 | 65 | 1.0873 | 100.0000 |
| seasonal_activation_zone | 9 | daytime | stable_core | 5978 | 5978 | 83 | 1.3884 | 100.0000 |
| seasonal_activation_zone | 9 | daytime_evening | any_watch | 5978 | 5978 | 531 | 8.8826 | 100.0000 |
| seasonal_activation_zone | 9 | daytime_evening | esi_watch_zone_exploratory | 5978 | 5978 | 191 | 3.1950 | 100.0000 |
| seasonal_activation_zone | 9 | daytime_evening | demand_efficiency_watch_exploratory | 5978 | 5978 | 340 | 5.6875 | 100.0000 |
| seasonal_activation_zone | 9 | daytime_evening | efficient_activation_support | 5978 | 5978 | 38 | 0.6357 | 100.0000 |
| seasonal_activation_zone | 9 | daytime_evening | stable_core | 5978 | 5978 | 65 | 1.0873 | 100.0000 |
| seasonal_activation_zone | 9 | all_available | any_watch | 5978 | 5978 | 266 | 4.4496 | 100.0000 |
| seasonal_activation_zone | 9 | all_available | esi_watch_zone_exploratory | 5978 | 5978 | 201 | 3.3623 | 100.0000 |
| seasonal_activation_zone | 9 | all_available | demand_efficiency_watch_exploratory | 5978 | 5978 | 65 | 1.0873 | 100.0000 |
| seasonal_activation_zone | 9 | all_available | efficient_activation_support | 5978 | 5978 | 16 | 0.2676 | 100.0000 |
| seasonal_activation_zone | 9 | all_available | stable_core | 5978 | 5978 | 80 | 1.3382 | 100.0000 |

## Interpretation rules

- If a Phase 1 watch zone persists in `midday_afternoon`, it is stronger evidence.
- If it disappears in `midday_afternoon` but remains in `all_available`, it may be a time-of-day artifact.
- If `midday_afternoon` is too sparse, use `daytime` as the practical fallback.
- Do not make final ET, ESI, PET, or WUE claims from all-scene outputs unless the pattern survives this validation.

## Output files

- Composites: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/composites`
- Trends: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/trends`
- Variability: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/variability`
- Classes: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/classes`
- Tables: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/tables`
- PNG previews: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/png`