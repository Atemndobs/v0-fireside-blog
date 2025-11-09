# Branding Assets Integration

## Current Implementation

### Logo
- **URL**: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/Logo%20design.jpg
- **Used in**:
  - Navigation header (40px x 40px, rounded)
  - Footer (48px x 48px, rounded)
  - Favicon (direct JPEG)

### Banner
- **URL**: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/Banner.jpg
- **Used in**:
  - Homepage hero section background (30% opacity with gradient overlay)
  - Homepage hero section featured image (desktop only, right side)

### YouTube Banner
- **URL**: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/Youtube%20banner.jpg
- **Status**: Available but not currently in use on the website

## Recommended Improvements

### Favicon Optimization
For better browser compatibility and performance, the logo should be converted to proper favicon formats:

1. **Generate these sizes from the logo**:
   - `favicon.ico` (16x16, 32x32 multi-size)
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

2. **Tools to use**:
   - [Favicon.io](https://favicon.io/) - Upload the logo JPG and generate all sizes
   - [Real Favicon Generator](https://realfavicongenerator.net/) - Comprehensive favicon generator

3. **After generation**:
   - Upload generated files to Supabase Storage under `fireside_assets/icons/`
   - Update [app/layout.tsx](app/layout.tsx:34-36) to reference the new files
   - Update `public/icons/manifest.json` with correct icon paths

### Current Favicon Setup
Currently using the JPEG logo directly as favicon, which works but is not optimal:
```tsx
<link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />
<link rel="icon" type="image/jpeg" href={logoUrl} />
<link rel="shortcut icon" type="image/jpeg" href={logoUrl} />
```

### Next Steps
1. Download the logo from Supabase storage
2. Use favicon generator tool to create all required sizes
3. Upload generated icons to Supabase storage
4. Update layout.tsx to use the new icon files
