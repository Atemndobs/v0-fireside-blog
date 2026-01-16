# Design Facelift Dependencies

## Already Installed (No Action Needed)

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^12.9.2 | Animations & page transitions |
| `tailwindcss` | ^3.4.17 | Utility CSS framework |
| `tailwindcss-animate` | ^1.0.7 | Animation utilities |
| `@tailwindcss/typography` | latest | Prose styling for blog content |
| `next-themes` | ^0.4.4 | Dark mode support |
| Radix UI primitives | various | Accessible component primitives |

## Typography Changes

### Current Setup
- **Font**: Bricolage Grotesque (via Google Fonts)
- **Weights**: 300 (paragraph), 600 (headline)
- **Source**: [app/fonts.css](../../../app/fonts.css)

### New Typography Stack (Decision Required)

| Role | Recommended Font | Alternative | Notes |
|------|------------------|-------------|-------|
| **Headlines** | Inter (Bold 700) | Oswald | Inter aligns with Billboard's clean aesthetic |
| **Body** | Inter (Regular 400) | System stack | Consistent with headlines |
| **Editorial** | Playfair Display | Merriweather | Serif for blog article emphasis |

### Font Implementation

**Option A: Google Fonts (Recommended)**
```css
/* app/fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap');
```

**Option B: Next.js Font Optimization**
```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
```

> **Recommendation**: Use Option B for better performance (automatic font optimization, no layout shift).

## New CSS Variables

Add to `app/globals.css`:

```css
:root {
  /* Colors - Premium Dark */
  --color-bg-page: #0a0a0a;
  --color-bg-surface: #171717;
  --color-bg-elevated: #262626;
  --color-accent: #ef4444;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a3a3a3;

  /* Typography */
  --font-headline: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-editorial: 'Inter', system-ui, sans-serif;

  /* Spacing (4px grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

## External Assets

No external assets required. All icons and images are already local.

## Breaking Changes

| Current | Replacement | Impact |
|---------|-------------|--------|
| Bricolage Grotesque | Inter | All typography will change |
| `font-black` (900) | `font-bold` (700) | Lighter headline weight |
| HSL color variables | Hex color variables | Tailwind config update needed |

## Rollback Strategy

1. Create feature branch: `feature/design-facelift`
2. Keep original `fonts.css` as `fonts.legacy.css`
3. Use CSS custom properties for easy theme switching
4. Test in staging before production deploy
