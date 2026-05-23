# QC Report -- Phase 7 3D Product Terrain Export
Generated: 2026-05-11T10:34:02.718198

## Elevation Raster
Path: C:\Users\Stej4\OneDrive\Documents\school\research\env 231\final\data\topography\elevation.tif

## Products Discovered

- **esi**: 7 rasters
    - esi_2019_june_daytime_mean.tif
    - esi_2020_june_daytime_mean.tif
    - esi_2021_june_daytime_mean.tif
    - esi_2022_june_daytime_mean.tif
    - esi_2023_june_daytime_mean.tif
    - esi_2024_june_daytime_mean.tif
    - esi_2025_june_daytime_mean.tif
- **et**: 7 rasters
    - et_2019_june_daytime_mean.tif
    - et_2020_june_daytime_mean.tif
    - et_2021_june_daytime_mean.tif
    - et_2022_june_daytime_mean.tif
    - et_2023_june_daytime_mean.tif
    - et_2024_june_daytime_mean.tif
    - et_2025_june_daytime_mean.tif
- **ndvi**: 7 rasters
    - ndvi_2019_june_daytime_mean.tif
    - ndvi_2020_june_daytime_mean.tif
    - ndvi_2021_june_daytime_mean.tif
    - ndvi_2022_june_daytime_mean.tif
    - ndvi_2023_june_daytime_mean.tif
    - ndvi_2024_june_daytime_mean.tif
    - ndvi_2025_june_daytime_mean.tif
- **pet**: 7 rasters
    - pet_2019_june_daytime_mean.tif
    - pet_2020_june_daytime_mean.tif
    - pet_2021_june_daytime_mean.tif
    - pet_2022_june_daytime_mean.tif
    - pet_2023_june_daytime_mean.tif
    - pet_2024_june_daytime_mean.tif
    - pet_2025_june_daytime_mean.tif
- **wue**: 6 rasters
    - wue_2019_june_daytime_mean.tif
    - wue_2020_june_daytime_mean.tif
    - wue_2021_june_daytime_mean.tif
    - wue_2022_june_daytime_mean.tif
    - wue_2023_june_daytime_mean.tif
    - wue_2025_june_daytime_mean.tif

## Products Rendered

- **esi**: render shape [313, 303], clipped to [0.650, 0.905] (index (0–1))
- **et**: render shape [313, 303], clipped to [1.501, 3.231] (mm day⁻¹ (proxy))
- **pet**: render shape [313, 303], clipped to [157.233, 297.137] (W m⁻²)
- **ndvi**: render shape [313, 303], clipped to [0.066, 0.341] (index (−1 to 1))
- **wue**: render shape [313, 303], clipped to [0.095, 3.976] (proxy index)

## Missing Products (not found)

- lst
- ndmi
- msi
- pri
- sif

## Rendering Parameters
- RENDER_MAX_DIM: 280
- VERTICAL_EXAG:  3.0
- CAMERA_ELEV:    38
- CAMERA_AZIM:    225
- HS_BLEND:       0.55
- PERCENTILE_CLIP: (2.0, 98.0)

## Known Limitations
- 3D terrain plots are illustrative hero visuals, not primary evidence.
- WUE missing 2024 data; multi-year mean computed from 6 seasons.
- LST not available in processed composites for this project.
- Vertical exaggeration is applied; interpret terrain heights with caution.
- Downsampling to RENDER_MAX_DIM may reduce spatial detail.