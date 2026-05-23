# Swiss National Park Signal Validity Check

## Target question

Is the June pattern scientifically plausible, or is it likely caused by data/processing problems?

## Operational interpretation

Assumption used here: higher ESI indicates better evaporative condition / lower stress. Confirm this against the ECOSTRESS ESI product documentation before final wording.

**June signal class:** watch signal

## June trend diagnostics

- **NDVI**: slope = 0.007644 per year, R² = 0.391, p-value = 0.1335, net change = 0.068572 from 2019 to 2025.
- **ET**: slope = 0.110739 per year, R² = 0.483, p-value = 0.0830, net change = 0.620174 from 2019 to 2025.
- **ESI**: slope = -0.005548 per year, R² = 0.031, p-value = 0.7072, net change = -0.124892 from 2019 to 2025.

## Data quality checks

- **NDVI**: min observations = 24.0, min pixel-observation coverage = 69.63%, sampling-bias flag = True.
- **ET**: min observations = 2.0, min pixel-observation coverage = 44.79%, sampling-bias flag = False.
- **ESI**: min observations = 2.0, min pixel-observation coverage = 44.79%, sampling-bias flag = False.

## Leave-one-year-out sensitivity

- ESI slope is sensitive to removing individual years. Full sign: negative. Leave-one-out signs: ['negative', 'positive'].

## CRS / coverage notes

- ESI has some June rasters below 95% AOI coverage.
- ET has some June rasters below 95% AOI coverage.
- June rasters use EPSG:32632 based on raster inventory.

## Interpretation guidance

If NDVI and ET rise while ESI declines slightly in June, this is not automatically bad data. It can mean vegetation activity and water exchange are increasing while early-summer moisture stress deserves monitoring. However, call it a **watch signal**, not a confirmed ecological problem, unless the trend is robust, statistically meaningful, and spatially coherent.

## Files written

- `june_year_values.csv`
- `june_trend_diagnostics.csv`
- `june_leave_one_year_out.csv`
- `june_observation_bias_checks.csv`
- `june_raster_crs_coverage_summary.csv`
- `june_timebin_by_year.csv`
- `june_missing_years.csv`
- `june_stability_context.csv`