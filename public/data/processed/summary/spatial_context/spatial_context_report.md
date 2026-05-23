# Phase 3 Spatial Context + Terrain Interpretation Report

## Purpose

This report summarizes where the spatial story classes occur inside Swiss National Park. It does not use XML.

## Primary class map

- `daytime`: `C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/classes/dominant_class_daytime.tif`

## Available class maps

| map_key | path |
| --- | --- |
| daytime | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/classes/dominant_class_daytime.tif |
| midday_afternoon | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/classes/dominant_class_midday_afternoon.tif |
| daytime_evening | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/classes/dominant_class_daytime_evening.tif |
| all_available_timebin | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/timebin_validation/classes/dominant_class_all_available.tif |
| phase1_all_scene | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/processed/summary/spatial_story_mining/rasters/dominant_spatial_story_class.tif |

## Optional context rasters detected

| context_layer | path |
| --- | --- |
| elevation | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/topography/elevation.tif |
| slope | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/topography/slope.tif |
| aspect | C:/Users/Stej4/OneDrive/Documents/school/research/env 231/final/data/topography/aspect.tif |
| forest_mask | not found |

## Main interpretation bullets

- The dominant map should be interpreted as a spatial mosaic, not a whole-park average.
- The largest classes in the primary map are: demand_efficiency_watch_exploratory (34.7%), esi_watch_zone_exploratory (29.8%), product_disagreement_zone (24.7%), efficient_activation_support (6.9%), high_variability_zone (2.1%).
- esi_watch_zone_exploratory covers 29.8% of the valid AOI in the primary map; this should be framed as a monitoring zone, not confirmed stress.
- demand_efficiency_watch_exploratory covers 34.7% of the valid AOI in the primary map; this should be framed as a monitoring zone, not confirmed stress.
- stable_core covers 1.0% of the valid AOI, indicating that low-variability behavior is spatially selective.
- Optional elevation overlay suggests watch zones average about 2332.4 m while stable cores average about 2010.6 m. Treat this as terrain context, not causality.

## Class location summary

| class_map | class_code | class_name | story_role | description | pixel_count | area_km2 | percent_of_valid_aoi | centroid_x | centroid_y | min_x | max_x | min_y | max_y | elevation_available | elevation_mean | elevation_median | elevation_p25 | elevation_p75 | slope_available | slope_mean | slope_median | slope_p25 | slope_p75 | aspect_available | aspect_mean | aspect_median | aspect_p25 | aspect_p75 | forest_mask_available |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| daytime | 0 | unclassified_or_no_data | not interpreted | No dominant story assigned or no valid trend support. | 135 | 0.6615 | 0.3785 | 589682.4074 | 5167779.8148 | 580725.0000 | 599065.0000 | 5159525.0000 | 5179685.0000 | True | 2373.9116 | 2342.4575 | 2264.4094 | 2470.8977 | True | 36.2408 | 35.5640 | 31.0985 | 41.1941 | True | 205.1491 | 222.9475 | 123.4040 | 299.2386 | False |
| daytime | 1 | stable_core | strong stability candidate | Low interannual variability across NDVI, ET, and ESI. | 374 | 1.8326 | 1.0486 | 590463.7968 | 5169716.9251 | 579815.0000 | 599695.0000 | 5160645.0000 | 5180315.0000 | True | 2010.6277 | 2024.0339 | 1807.6370 | 2205.1174 | True | 33.1848 | 34.0662 | 26.6678 | 39.6930 | True | 184.0936 | 223.4709 | 81.9343 | 261.3714 | False |
| daytime | 2 | coherent_june_activation | coherent activation | NDVI and ET slopes are positive and ESI is nonnegative. | 96 | 0.4704 | 0.2692 | 588441.7708 | 5170506.2500 | 584085.0000 | 598715.0000 | 5162185.0000 | 5180315.0000 | True | 1835.1753 | 1799.5369 | 1719.4495 | 1895.5482 | True | 31.4443 | 32.3152 | 24.1944 | 37.7849 | True | 189.5032 | 186.0455 | 167.0369 | 202.4698 | False |
| daytime | 4 | esi_watch_zone_exploratory | monitoring zone | NDVI and ET are positive but ESI slope is negative. | 10646 | 52.1654 | 29.8500 | 589599.2786 | 5167714.9211 | 579675.0000 | 600535.0000 | 5158615.0000 | 5180245.0000 | True | 2554.1274 | 2570.5542 | 2391.8652 | 2734.6963 | True | 31.3990 | 32.2913 | 24.7993 | 38.1005 | True | 173.7562 | 166.0775 | 99.7390 | 249.2828 | False |
| daytime | 5 | demand_efficiency_watch_exploratory | monitoring zone | NDVI, ET, and PET are positive while WUE is negative. | 12386 | 60.6914 | 34.7287 | 589716.3774 | 5167813.5629 | 579395.0000 | 600465.0000 | 5158755.0000 | 5180385.0000 | True | 2110.6375 | 2093.9937 | 1945.9043 | 2243.3940 | True | 27.8541 | 28.1631 | 20.6640 | 34.6928 | True | 161.8654 | 155.7186 | 81.6596 | 238.8857 | False |
| daytime | 6 | efficient_activation_support | efficient activation candidate | NDVI and ET are positive and WUE is nonnegative. | 2445 | 11.9805 | 6.8555 | 589899.0082 | 5168777.7975 | 579535.0000 | 600395.0000 | 5158545.0000 | 5180105.0000 | True | 2302.6558 | 2288.6707 | 2078.2854 | 2527.0420 | True | 30.7693 | 31.0822 | 24.1606 | 37.1729 | True | 181.8785 | 185.0726 | 126.6100 | 236.2597 | False |
| daytime | 7 | product_disagreement_zone | hypothesis generator | Main products point in conflicting directions. | 8817 | 43.2033 | 24.7217 | 589949.4233 | 5168306.4472 | 579465.0000 | 599975.0000 | 5158545.0000 | 5180385.0000 | True | 2331.5095 | 2359.3992 | 2060.8799 | 2613.3394 | True | 30.8415 | 31.4844 | 24.3920 | 37.3066 | True | 196.4884 | 216.2015 | 111.7551 | 273.1844 | False |
| daytime | 8 | high_variability_zone | variability zone | One or more main products show high interannual variability. | 766 | 3.7534 | 2.1478 | 588993.6815 | 5166940.7963 | 580655.0000 | 599625.0000 | 5158545.0000 | 5179615.0000 | True | 2587.6279 | 2638.3564 | 2379.8953 | 2753.6201 | True | 29.6871 | 28.1276 | 21.4282 | 36.4148 | True | 196.9988 | 200.8499 | 138.2375 | 263.9391 | False |

## North/south and west/east distribution

| class_map | axis | bin | class_code | class_name | pixel_count | area_km2 | percent_of_class |
| --- | --- | --- | --- | --- | --- | --- | --- |
| daytime | north_south | middle_north | 0 | unclassified_or_no_data | 33 | 0.1617 | 24.4444 |
| daytime | north_south | middle_south | 0 | unclassified_or_no_data | 57 | 0.2793 | 42.2222 |
| daytime | north_south | north | 0 | unclassified_or_no_data | 13 | 0.0637 | 9.6296 |
| daytime | north_south | south | 0 | unclassified_or_no_data | 32 | 0.1568 | 23.7037 |
| daytime | north_south | middle_north | 1 | stable_core | 78 | 0.3822 | 20.8556 |
| daytime | north_south | middle_south | 1 | stable_core | 217 | 1.0633 | 58.0214 |
| daytime | north_south | north | 1 | stable_core | 67 | 0.3283 | 17.9144 |
| daytime | north_south | south | 1 | stable_core | 12 | 0.0588 | 3.2086 |
| daytime | north_south | middle_north | 2 | coherent_june_activation | 72 | 0.3528 | 75.0000 |
| daytime | north_south | middle_south | 2 | coherent_june_activation | 17 | 0.0833 | 17.7083 |
| daytime | north_south | north | 2 | coherent_june_activation | 4 | 0.0196 | 4.1667 |
| daytime | north_south | south | 2 | coherent_june_activation | 3 | 0.0147 | 3.1250 |
| daytime | north_south | middle_north | 4 | esi_watch_zone_exploratory | 3087 | 15.1263 | 28.9968 |
| daytime | north_south | middle_south | 4 | esi_watch_zone_exploratory | 3846 | 18.8454 | 36.1262 |
| daytime | north_south | north | 4 | esi_watch_zone_exploratory | 895 | 4.3855 | 8.4069 |
| daytime | north_south | south | 4 | esi_watch_zone_exploratory | 2818 | 13.8082 | 26.4700 |
| daytime | north_south | middle_north | 5 | demand_efficiency_watch_exploratory | 2243 | 10.9907 | 18.1092 |
| daytime | north_south | middle_south | 5 | demand_efficiency_watch_exploratory | 7987 | 39.1363 | 64.4841 |
| daytime | north_south | north | 5 | demand_efficiency_watch_exploratory | 651 | 3.1899 | 5.2559 |
| daytime | north_south | south | 5 | demand_efficiency_watch_exploratory | 1505 | 7.3745 | 12.1508 |
| daytime | north_south | middle_north | 6 | efficient_activation_support | 639 | 3.1311 | 26.1350 |
| daytime | north_south | middle_south | 6 | efficient_activation_support | 1121 | 5.4929 | 45.8487 |
| daytime | north_south | north | 6 | efficient_activation_support | 345 | 1.6905 | 14.1104 |
| daytime | north_south | south | 6 | efficient_activation_support | 340 | 1.6660 | 13.9059 |
| daytime | north_south | middle_north | 7 | product_disagreement_zone | 2426 | 11.8874 | 27.5150 |
| daytime | north_south | middle_south | 7 | product_disagreement_zone | 4220 | 20.6780 | 47.8621 |
| daytime | north_south | north | 7 | product_disagreement_zone | 840 | 4.1160 | 9.5271 |
| daytime | north_south | south | 7 | product_disagreement_zone | 1331 | 6.5219 | 15.0958 |
| daytime | north_south | middle_north | 8 | high_variability_zone | 192 | 0.9408 | 25.0653 |
| daytime | north_south | middle_south | 8 | high_variability_zone | 253 | 1.2397 | 33.0287 |
| daytime | north_south | north | 8 | high_variability_zone | 67 | 0.3283 | 8.7467 |
| daytime | north_south | south | 8 | high_variability_zone | 254 | 1.2446 | 33.1593 |
| daytime | west_east | east | 0 | unclassified_or_no_data | 23 | 0.1127 | 17.0370 |
| daytime | west_east | middle_east | 0 | unclassified_or_no_data | 30 | 0.1470 | 22.2222 |
| daytime | west_east | middle_west | 0 | unclassified_or_no_data | 68 | 0.3332 | 50.3704 |
| daytime | west_east | west | 0 | unclassified_or_no_data | 14 | 0.0686 | 10.3704 |
| daytime | west_east | east | 1 | stable_core | 96 | 0.4704 | 25.6684 |
| daytime | west_east | middle_east | 1 | stable_core | 48 | 0.2352 | 12.8342 |
| daytime | west_east | middle_west | 1 | stable_core | 200 | 0.9800 | 53.4759 |
| daytime | west_east | west | 1 | stable_core | 30 | 0.1470 | 8.0214 |
| daytime | west_east | east | 2 | coherent_june_activation | 10 | 0.0490 | 10.4167 |
| daytime | west_east | middle_east | 2 | coherent_june_activation | 12 | 0.0588 | 12.5000 |
| daytime | west_east | middle_west | 2 | coherent_june_activation | 72 | 0.3528 | 75.0000 |
| daytime | west_east | west | 2 | coherent_june_activation | 2 | 0.0098 | 2.0833 |
| daytime | west_east | east | 4 | esi_watch_zone_exploratory | 2878 | 14.1022 | 27.0336 |
| daytime | west_east | middle_east | 4 | esi_watch_zone_exploratory | 1828 | 8.9572 | 17.1708 |
| daytime | west_east | middle_west | 4 | esi_watch_zone_exploratory | 2629 | 12.8821 | 24.6947 |
| daytime | west_east | west | 4 | esi_watch_zone_exploratory | 3311 | 16.2239 | 31.1009 |
| daytime | west_east | east | 5 | demand_efficiency_watch_exploratory | 2306 | 11.2994 | 18.6178 |
| daytime | west_east | middle_east | 5 | demand_efficiency_watch_exploratory | 4067 | 19.9283 | 32.8355 |
| daytime | west_east | middle_west | 5 | demand_efficiency_watch_exploratory | 3112 | 15.2488 | 25.1251 |
| daytime | west_east | west | 5 | demand_efficiency_watch_exploratory | 2901 | 14.2149 | 23.4216 |
| daytime | west_east | east | 6 | efficient_activation_support | 621 | 3.0429 | 25.3988 |
| daytime | west_east | middle_east | 6 | efficient_activation_support | 554 | 2.7146 | 22.6585 |
| daytime | west_east | middle_west | 6 | efficient_activation_support | 618 | 3.0282 | 25.2761 |
| daytime | west_east | west | 6 | efficient_activation_support | 652 | 3.1948 | 26.6667 |
| daytime | west_east | east | 7 | product_disagreement_zone | 2350 | 11.5150 | 26.6531 |
| daytime | west_east | middle_east | 7 | product_disagreement_zone | 1584 | 7.7616 | 17.9653 |
| daytime | west_east | middle_west | 7 | product_disagreement_zone | 3026 | 14.8274 | 34.3201 |
| daytime | west_east | west | 7 | product_disagreement_zone | 1857 | 9.0993 | 21.0616 |
| daytime | west_east | east | 8 | high_variability_zone | 141 | 0.6909 | 18.4073 |
| daytime | west_east | middle_east | 8 | high_variability_zone | 137 | 0.6713 | 17.8851 |
| daytime | west_east | middle_west | 8 | high_variability_zone | 272 | 1.3328 | 35.5091 |
| daytime | west_east | west | 8 | high_variability_zone | 216 | 1.0584 | 28.1984 |

## Elevation-bin summary

| class_map | elevation_bin | class_code | class_name | pixel_count | area_km2 | percent_of_class | mean_elevation | median_elevation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| daytime | lowest_elevation_quartile | 0 | unclassified_or_no_data | 3 | 0.0147 | 2.2556 | 1954.5869 | 1943.7675 |
| daytime | low_mid_elevation | 0 | unclassified_or_no_data | 55 | 0.2695 | 41.3534 | 2238.2437 | 2255.7715 |
| daytime | high_mid_elevation | 0 | unclassified_or_no_data | 56 | 0.2744 | 42.1053 | 2417.6008 | 2388.8079 |
| daytime | highest_elevation_quartile | 0 | unclassified_or_no_data | 19 | 0.0931 | 14.2857 | 2704.0774 | 2660.7993 |
| daytime | lowest_elevation_quartile | 1 | stable_core | 201 | 0.9849 | 54.0323 | 1827.4073 | 1824.5713 |
| daytime | low_mid_elevation | 1 | stable_core | 142 | 0.6958 | 38.1720 | 2193.9688 | 2197.6914 |
| daytime | high_mid_elevation | 1 | stable_core | 29 | 0.1421 | 7.7957 | 2382.7944 | 2365.7476 |
| daytime | lowest_elevation_quartile | 2 | coherent_june_activation | 81 | 0.3969 | 88.0435 | 1770.8528 | 1791.6104 |
| daytime | low_mid_elevation | 2 | coherent_june_activation | 9 | 0.0441 | 9.7826 | 2193.7075 | 2190.4648 |
| daytime | highest_elevation_quartile | 2 | coherent_june_activation | 2 | 0.0098 | 2.1739 | 2826.8320 | 2826.8320 |
| daytime | lowest_elevation_quartile | 4 | esi_watch_zone_exploratory | 343 | 1.6807 | 3.2810 | 1911.9380 | 1939.5161 |
| daytime | low_mid_elevation | 4 | esi_watch_zone_exploratory | 1339 | 6.5611 | 12.8085 | 2227.9548 | 2246.0144 |
| daytime | high_mid_elevation | 4 | esi_watch_zone_exploratory | 3827 | 18.7523 | 36.6080 | 2459.9194 | 2463.9517 |
| daytime | highest_elevation_quartile | 4 | esi_watch_zone_exploratory | 4945 | 24.2305 | 47.3025 | 2759.9006 | 2744.7146 |
| daytime | lowest_elevation_quartile | 5 | demand_efficiency_watch_exploratory | 5407 | 26.4943 | 44.2399 | 1898.7812 | 1924.5020 |
| daytime | low_mid_elevation | 5 | demand_efficiency_watch_exploratory | 4617 | 22.6233 | 37.7761 | 2171.5251 | 2164.3147 |
| daytime | high_mid_elevation | 5 | demand_efficiency_watch_exploratory | 1685 | 8.2565 | 13.7866 | 2436.9802 | 2427.6697 |
| daytime | highest_elevation_quartile | 5 | demand_efficiency_watch_exploratory | 513 | 2.5137 | 4.1973 | 2723.7007 | 2688.3523 |
| daytime | lowest_elevation_quartile | 6 | efficient_activation_support | 547 | 2.6803 | 23.0316 | 1898.5472 | 1922.3547 |
| daytime | low_mid_elevation | 6 | efficient_activation_support | 732 | 3.5868 | 30.8211 | 2196.6372 | 2202.6128 |
| daytime | high_mid_elevation | 6 | efficient_activation_support | 605 | 2.9645 | 25.4737 | 2436.0315 | 2428.3074 |
| daytime | highest_elevation_quartile | 6 | efficient_activation_support | 491 | 2.4059 | 20.6737 | 2746.5674 | 2729.6541 |
| daytime | lowest_elevation_quartile | 7 | product_disagreement_zone | 2189 | 10.7261 | 25.1522 | 1863.4285 | 1876.1572 |
| daytime | low_mid_elevation | 7 | product_disagreement_zone | 1754 | 8.5946 | 20.1540 | 2201.7134 | 2208.1743 |
| daytime | high_mid_elevation | 7 | product_disagreement_zone | 2385 | 11.6865 | 27.4043 | 2444.7900 | 2439.5527 |
| daytime | highest_elevation_quartile | 7 | product_disagreement_zone | 2375 | 11.6375 | 27.2894 | 2745.0325 | 2731.7695 |
| daytime | lowest_elevation_quartile | 8 | high_variability_zone | 6 | 0.0294 | 0.7937 | 1931.3867 | 1967.7852 |
| daytime | low_mid_elevation | 8 | high_variability_zone | 129 | 0.6321 | 17.0635 | 2226.9563 | 2242.9033 |
| daytime | high_mid_elevation | 8 | high_variability_zone | 189 | 0.9261 | 25.0000 | 2446.6223 | 2443.5193 |
| daytime | highest_elevation_quartile | 8 | high_variability_zone | 432 | 2.1168 | 57.1429 | 2766.1331 | 2741.3271 |

## Aspect-bin summary

| class_map | aspect_bin | class_code | class_name | pixel_count | area_km2 | percent_of_class |
| --- | --- | --- | --- | --- | --- | --- |
| daytime | north_facing | 0 | unclassified_or_no_data | 25 | 0.1225 | 18.7970 |
| daytime | east_facing | 0 | unclassified_or_no_data | 25 | 0.1225 | 18.7970 |
| daytime | south_facing | 0 | unclassified_or_no_data | 33 | 0.1617 | 24.8120 |
| daytime | west_facing | 0 | unclassified_or_no_data | 50 | 0.2450 | 37.5940 |
| daytime | north_facing | 1 | stable_core | 36 | 0.1764 | 9.6774 |
| daytime | east_facing | 1 | stable_core | 100 | 0.4900 | 26.8817 |
| daytime | south_facing | 1 | stable_core | 63 | 0.3087 | 16.9355 |
| daytime | west_facing | 1 | stable_core | 173 | 0.8477 | 46.5054 |
| daytime | north_facing | 2 | coherent_june_activation | 1 | 0.0049 | 1.0870 |
| daytime | east_facing | 2 | coherent_june_activation | 8 | 0.0392 | 8.6957 |
| daytime | south_facing | 2 | coherent_june_activation | 70 | 0.3430 | 76.0870 |
| daytime | west_facing | 2 | coherent_june_activation | 13 | 0.0637 | 14.1304 |
| daytime | north_facing | 4 | esi_watch_zone_exploratory | 1135 | 5.5615 | 10.8571 |
| daytime | east_facing | 4 | esi_watch_zone_exploratory | 3547 | 17.3803 | 33.9296 |
| daytime | south_facing | 4 | esi_watch_zone_exploratory | 2896 | 14.1904 | 27.7023 |
| daytime | west_facing | 4 | esi_watch_zone_exploratory | 2876 | 14.0924 | 27.5110 |
| daytime | north_facing | 5 | demand_efficiency_watch_exploratory | 1394 | 6.8306 | 11.4057 |
| daytime | east_facing | 5 | demand_efficiency_watch_exploratory | 4399 | 21.5551 | 35.9925 |
| daytime | south_facing | 5 | demand_efficiency_watch_exploratory | 3231 | 15.8319 | 26.4359 |
| daytime | west_facing | 5 | demand_efficiency_watch_exploratory | 3198 | 15.6702 | 26.1659 |
| daytime | north_facing | 6 | efficient_activation_support | 134 | 0.6566 | 5.6421 |
| daytime | east_facing | 6 | efficient_activation_support | 600 | 2.9400 | 25.2632 |
| daytime | south_facing | 6 | efficient_activation_support | 993 | 4.8657 | 41.8105 |
| daytime | west_facing | 6 | efficient_activation_support | 648 | 3.1752 | 27.2842 |
| daytime | north_facing | 7 | product_disagreement_zone | 1086 | 5.3214 | 12.4785 |
| daytime | east_facing | 7 | product_disagreement_zone | 2171 | 10.6379 | 24.9454 |
| daytime | south_facing | 7 | product_disagreement_zone | 2031 | 9.9519 | 23.3368 |
| daytime | west_facing | 7 | product_disagreement_zone | 3415 | 16.7335 | 39.2393 |
| daytime | north_facing | 8 | high_variability_zone | 73 | 0.3577 | 9.6561 |
| daytime | east_facing | 8 | high_variability_zone | 157 | 0.7693 | 20.7672 |
| daytime | south_facing | 8 | high_variability_zone | 270 | 1.3230 | 35.7143 |
| daytime | west_facing | 8 | high_variability_zone | 256 | 1.2544 | 33.8624 |

## Largest connected patches

| class_map | class_code | class_name | patch_id | pixel_count | area_km2 | centroid_x | centroid_y | min_x | max_x | min_y | max_y |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| daytime | 1 | stable_core | 63 | 42 | 0.2058 | 588091.6667 | 5169246.6667 | 587865.0000 | 588495.0000 | 5168905.0000 | 5169535.0000 |
| daytime | 1 | stable_core | 137 | 16 | 0.0784 | 586176.2500 | 5165208.1250 | 586045.0000 | 586255.0000 | 5164915.0000 | 5165475.0000 |
| daytime | 1 | stable_core | 14 | 13 | 0.0637 | 599248.0769 | 5177983.4615 | 599065.0000 | 599415.0000 | 5177865.0000 | 5178075.0000 |
| daytime | 1 | stable_core | 58 | 11 | 0.0539 | 589411.3636 | 5169783.1818 | 589265.0000 | 589475.0000 | 5169605.0000 | 5169885.0000 |
| daytime | 1 | stable_core | 46 | 10 | 0.0490 | 590504.0000 | 5170781.0000 | 590315.0000 | 590665.0000 | 5170725.0000 | 5170865.0000 |
| daytime | 2 | coherent_june_activation | 9 | 38 | 0.1862 | 586317.6316 | 5170898.1579 | 585975.0000 | 586605.0000 | 5170655.0000 | 5171355.0000 |
| daytime | 2 | coherent_june_activation | 20 | 11 | 0.0539 | 592052.2727 | 5168338.6364 | 591925.0000 | 592205.0000 | 5168205.0000 | 5168485.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 223 | 2773 | 13.5877 | 584643.9903 | 5162608.2059 | 581495.0000 | 588355.0000 | 5158615.0000 | 5167015.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 27 | 2249 | 11.0201 | 597857.3833 | 5171167.3788 | 595425.0000 | 600535.0000 | 5167645.0000 | 5176465.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 216 | 620 | 3.0380 | 581137.6613 | 5164264.5645 | 579885.0000 | 581915.0000 | 5162325.0000 | 5167085.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 31 | 581 | 2.8469 | 586497.8916 | 5175129.6988 | 585205.0000 | 587655.0000 | 5174085.0000 | 5176325.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 88 | 498 | 2.4402 | 594887.2088 | 5170529.1968 | 593465.0000 | 597245.0000 | 5169325.0000 | 5171495.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 211 | 488 | 2.3912 | 593429.1393 | 5166264.3648 | 591925.0000 | 595005.0000 | 5165195.0000 | 5167225.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 119 | 398 | 1.9502 | 586762.7638 | 5168576.2814 | 585485.0000 | 588005.0000 | 5166945.0000 | 5169955.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 139 | 343 | 1.6807 | 583728.6735 | 5168177.2449 | 582825.0000 | 584645.0000 | 5167155.0000 | 5169115.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 68 | 262 | 1.2838 | 590336.1069 | 5172126.3359 | 588985.0000 | 591715.0000 | 5171495.0000 | 5172685.0000 |
| daytime | 4 | esi_watch_zone_exploratory | 7 | 180 | 0.8820 | 597989.7222 | 5177805.8889 | 597455.0000 | 598365.0000 | 5176395.0000 | 5179125.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 60 | 5698 | 27.9202 | 591991.9779 | 5167560.8231 | 587375.0000 | 597035.0000 | 5164145.0000 | 5171985.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 86 | 1674 | 8.2026 | 585247.5269 | 5167442.9869 | 583385.0000 | 586955.0000 | 5163865.0000 | 5171075.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 295 | 1200 | 5.8800 | 581423.4833 | 5161949.6833 | 579395.0000 | 583595.0000 | 5159945.0000 | 5163865.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 19 | 1132 | 5.5468 | 598619.3993 | 5174556.8816 | 596125.0000 | 600185.0000 | 5172615.0000 | 5176885.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 111 | 755 | 3.6995 | 582151.7020 | 5167570.3642 | 580025.0000 | 583805.0000 | 5164845.0000 | 5170305.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 236 | 134 | 0.6566 | 582847.4627 | 5165637.4627 | 582055.0000 | 583595.0000 | 5164845.0000 | 5166175.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 89 | 117 | 0.5733 | 586367.4786 | 5170400.1282 | 585765.0000 | 586885.0000 | 5169885.0000 | 5170865.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 259 | 116 | 0.5684 | 580090.7759 | 5164406.8966 | 579605.0000 | 580725.0000 | 5163865.0000 | 5165125.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 1 | 95 | 0.4655 | 598516.7895 | 5179841.2105 | 598085.0000 | 598995.0000 | 5179405.0000 | 5180385.0000 |
| daytime | 5 | demand_efficiency_watch_exploratory | 67 | 78 | 0.3822 | 585587.3077 | 5171198.8462 | 585345.0000 | 586115.0000 | 5170655.0000 | 5171705.0000 |
| daytime | 6 | efficient_activation_support | 437 | 105 | 0.5145 | 580782.3333 | 5160934.3333 | 580165.0000 | 581355.0000 | 5160295.0000 | 5161555.0000 |
| daytime | 6 | efficient_activation_support | 4 | 100 | 0.4900 | 598363.6000 | 5178860.4000 | 597945.0000 | 598925.0000 | 5178145.0000 | 5179475.0000 |
| daytime | 6 | efficient_activation_support | 123 | 98 | 0.4802 | 586382.1429 | 5170045.7143 | 585415.0000 | 587235.0000 | 5169745.0000 | 5170515.0000 |
| daytime | 6 | efficient_activation_support | 242 | 90 | 0.4410 | 593048.8889 | 5167371.2222 | 592205.0000 | 593815.0000 | 5166945.0000 | 5167855.0000 |
| daytime | 6 | efficient_activation_support | 138 | 85 | 0.4165 | 590664.1765 | 5169662.6471 | 590245.0000 | 591155.0000 | 5169185.0000 | 5170025.0000 |
| daytime | 6 | efficient_activation_support | 331 | 57 | 0.2793 | 589132.3684 | 5165918.3333 | 588775.0000 | 589615.0000 | 5165685.0000 | 5166105.0000 |
| daytime | 6 | efficient_activation_support | 272 | 47 | 0.2303 | 583286.7021 | 5166901.8085 | 582825.0000 | 583665.0000 | 5166595.0000 | 5167225.0000 |
| daytime | 6 | efficient_activation_support | 110 | 45 | 0.2205 | 598708.7778 | 5171182.3333 | 598505.0000 | 598925.0000 | 5170865.0000 | 5171425.0000 |
| daytime | 6 | efficient_activation_support | 173 | 35 | 0.1715 | 600125.0000 | 5169021.0000 | 599835.0000 | 600395.0000 | 5168835.0000 | 5169185.0000 |
| daytime | 6 | efficient_activation_support | 370 | 34 | 0.1666 | 590084.4118 | 5164931.4706 | 589755.0000 | 590385.0000 | 5164565.0000 | 5165405.0000 |
| daytime | 7 | product_disagreement_zone | 232 | 1066 | 5.2234 | 587252.7298 | 5165918.4428 | 585205.0000 | 589195.0000 | 5163095.0000 | 5168835.0000 |
| daytime | 7 | product_disagreement_zone | 17 | 909 | 4.4541 | 598045.9571 | 5175687.5303 | 596475.0000 | 599625.0000 | 5173805.0000 | 5178495.0000 |
| daytime | 7 | product_disagreement_zone | 174 | 599 | 2.9351 | 597799.6244 | 5168473.0801 | 596195.0000 | 599485.0000 | 5166665.0000 | 5170165.0000 |
| daytime | 7 | product_disagreement_zone | 330 | 518 | 2.5382 | 582017.0270 | 5164801.2162 | 581215.0000 | 583105.0000 | 5163655.0000 | 5166875.0000 |
| daytime | 7 | product_disagreement_zone | 119 | 306 | 1.4994 | 593651.6667 | 5171120.2941 | 592415.0000 | 594585.0000 | 5169815.0000 | 5172125.0000 |
| daytime | 7 | product_disagreement_zone | 113 | 240 | 1.1760 | 591181.5417 | 5171411.5833 | 589895.0000 | 592205.0000 | 5170585.0000 | 5172265.0000 |
| daytime | 7 | product_disagreement_zone | 312 | 235 | 1.1515 | 590087.1277 | 5166557.4681 | 588845.0000 | 590945.0000 | 5165755.0000 | 5167225.0000 |
| daytime | 7 | product_disagreement_zone | 216 | 227 | 1.1123 | 588600.4626 | 5168247.5551 | 588145.0000 | 589195.0000 | 5167295.0000 | 5169255.0000 |
| daytime | 7 | product_disagreement_zone | 181 | 223 | 1.0927 | 587303.7444 | 5169420.4260 | 586255.0000 | 587865.0000 | 5168625.0000 | 5170025.0000 |
| daytime | 7 | product_disagreement_zone | 434 | 210 | 1.0290 | 590488.6667 | 5164215.0000 | 589265.0000 | 591785.0000 | 5163305.0000 | 5165265.0000 |
| daytime | 8 | high_variability_zone | 115 | 54 | 0.2646 | 587498.1481 | 5163107.9630 | 587025.0000 | 587935.0000 | 5162605.0000 | 5163515.0000 |
| daytime | 8 | high_variability_zone | 27 | 51 | 0.2499 | 593265.9804 | 5170908.9216 | 592905.0000 | 593605.0000 | 5170585.0000 | 5171215.0000 |
| daytime | 8 | high_variability_zone | 78 | 44 | 0.2156 | 584081.8182 | 5165121.8182 | 583665.0000 | 584435.0000 | 5164775.0000 | 5165405.0000 |
| daytime | 8 | high_variability_zone | 61 | 40 | 0.1960 | 582762.0000 | 5166336.0000 | 582475.0000 | 583175.0000 | 5166175.0000 | 5166595.0000 |
| daytime | 8 | high_variability_zone | 123 | 39 | 0.1911 | 583785.2564 | 5162407.5641 | 583385.0000 | 584015.0000 | 5162115.0000 | 5162745.0000 |
| daytime | 8 | high_variability_zone | 2 | 37 | 0.1813 | 597818.2432 | 5177605.8108 | 597595.0000 | 598015.0000 | 5177375.0000 | 5177865.0000 |
| daytime | 8 | high_variability_zone | 44 | 37 | 0.1813 | 595506.3514 | 5169875.5405 | 595145.0000 | 595845.0000 | 5169675.0000 | 5170025.0000 |
| daytime | 8 | high_variability_zone | 25 | 36 | 0.1764 | 592461.6667 | 5171804.1667 | 592275.0000 | 592695.0000 | 5171565.0000 | 5171985.0000 |
| daytime | 8 | high_variability_zone | 83 | 28 | 0.1372 | 584995.0000 | 5164662.5000 | 584855.0000 | 585205.0000 | 5164215.0000 | 5164985.0000 |
| daytime | 8 | high_variability_zone | 113 | 16 | 0.0784 | 586972.5000 | 5163340.0000 | 586885.0000 | 587095.0000 | 5163025.0000 | 5163585.0000 |

## Cross-map persistence / comparison

| primary_map | comparison_map | class_code | class_name | primary_pixel_count | comparison_pixel_count | overlap_pixel_count | percent_primary_persisting | percent_comparison_overlapping_primary |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| daytime | midday_afternoon | 1 | stable_core | 374 | 1370 | 90 | 24.0642 | 6.5693 |
| daytime | midday_afternoon | 4 | esi_watch_zone_exploratory | 10646 | 2225 | 1729 | 16.2408 | 77.7079 |
| daytime | midday_afternoon | 5 | demand_efficiency_watch_exploratory | 12386 | 10350 | 6360 | 51.3483 | 61.4493 |
| daytime | midday_afternoon | 6 | efficient_activation_support | 2445 | 977 | 168 | 6.8712 | 17.1955 |
| daytime | midday_afternoon | 7 | product_disagreement_zone | 8817 | 17934 | 6581 | 74.6399 | 36.6957 |
| daytime | midday_afternoon | 8 | high_variability_zone | 766 | 1958 | 409 | 53.3943 | 20.8887 |
| daytime | midday_afternoon | 9 | seasonal_activation_zone | 0 | 0 | 0 |  |  |
| daytime | daytime_evening | 1 | stable_core | 374 | 377 | 301 | 80.4813 | 79.8408 |
| daytime | daytime_evening | 4 | esi_watch_zone_exploratory | 10646 | 11239 | 10574 | 99.3237 | 94.0831 |
| daytime | daytime_evening | 5 | demand_efficiency_watch_exploratory | 12386 | 12176 | 11841 | 95.5999 | 97.2487 |
| daytime | daytime_evening | 6 | efficient_activation_support | 2445 | 2366 | 2260 | 92.4335 | 95.5199 |
| daytime | daytime_evening | 7 | product_disagreement_zone | 8817 | 8714 | 7974 | 90.4389 | 91.5079 |
| daytime | daytime_evening | 8 | high_variability_zone | 766 | 578 | 552 | 72.0627 | 95.5017 |
| daytime | daytime_evening | 9 | seasonal_activation_zone | 0 | 0 | 0 |  |  |
| daytime | all_available_timebin | 1 | stable_core | 374 | 416 | 303 | 81.0160 | 72.8365 |
| daytime | all_available_timebin | 4 | esi_watch_zone_exploratory | 10646 | 11458 | 10581 | 99.3894 | 92.3460 |
| daytime | all_available_timebin | 5 | demand_efficiency_watch_exploratory | 12386 | 11829 | 11410 | 92.1201 | 96.4579 |
| daytime | all_available_timebin | 6 | efficient_activation_support | 2445 | 2390 | 2234 | 91.3701 | 93.4728 |
| daytime | all_available_timebin | 7 | product_disagreement_zone | 8817 | 9032 | 7643 | 86.6848 | 84.6213 |
| daytime | all_available_timebin | 8 | high_variability_zone | 766 | 349 | 340 | 44.3864 | 97.4212 |
| daytime | all_available_timebin | 9 | seasonal_activation_zone | 0 | 0 | 0 |  |  |
| daytime | phase1_all_scene | 1 | stable_core | 374 | 384 | 182 | 48.6631 | 47.3958 |
| daytime | phase1_all_scene | 4 | esi_watch_zone_exploratory | 10646 | 13005 | 9244 | 86.8307 | 71.0804 |
| daytime | phase1_all_scene | 5 | demand_efficiency_watch_exploratory | 12386 | 10099 | 8263 | 66.7124 | 81.8200 |
| daytime | phase1_all_scene | 6 | efficient_activation_support | 2445 | 3185 | 1425 | 58.2822 | 44.7410 |
| daytime | phase1_all_scene | 7 | product_disagreement_zone | 8817 | 1965 | 1446 | 16.4001 | 73.5878 |
| daytime | phase1_all_scene | 8 | high_variability_zone | 766 | 38 | 37 | 4.8303 | 97.3684 |
| daytime | phase1_all_scene | 9 | seasonal_activation_zone | 0 | 5978 | 0 |  | 0.0000 |

## Interpretation guidance

- Use this report to describe where classes occur, not to infer causality.
- If elevation, slope, aspect, or forest mask rasters are missing, this report still provides coordinate-based north/south and west/east summaries.
- Terrain association becomes stronger only after adding actual DEM/slope/aspect rasters and verifying time-bin-controlled classes.
- Watch zones should be described as monitoring or hypothesis zones, not confirmed stress zones.