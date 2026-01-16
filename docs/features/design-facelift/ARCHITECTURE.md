# Design Facelift Architecture

## Design System Architecture (Spotify Encore Approach)

We will adopt a token-based architecture to ensure consistency.

### Foundation Tokens (`globals.css`)

| Token Category | Naming Convention | Example |
|----------------|-------------------|---------|
| **Colors** | `--color-{role}` | `--color-bg-page`, `--color-text-primary` |
| **Typography** | `--font-{role}` | `--font-headline`, `--font-editorial` |
| **Spacing** | `--space-{scale}` | `--space-4` (16px) |
| **Radius** | `--radius-{size}` | `--radius-md` (8px) |

### Source of Truth

**CSS Variables are the source of truth.** Tailwind config consumes these variables:

```
globals.css (defines variables)
    ↓
tailwind.config.ts (maps to Tailwind utilities)
    ↓
Components (use Tailwind classes)
```

---

## Neobrutalist Pattern Audit

The following files contain patterns that must be replaced:

### Critical Files (Layout/Global)

| File | Patterns Found | Priority |
|------|----------------|----------|
| [app/layout.tsx](../../../app/layout.tsx) | `border-b-4 border-red-500` (header), `border-t-8 border-red-500` (footer), `font-black` | **P0** |
| [app/globals.css](../../../app/globals.css) | `border-l-4 border-black` (blockquotes), `font-black` (prose headings) | **P0** |
| [app/fonts.css](../../../app/fonts.css) | Bricolage Grotesque font import | **P0** |
| [tailwind.config.ts](../../../tailwind.config.ts) | HSL color variables mapping | **P0** |

### Page Files

| File | Patterns Found | Priority |
|------|----------------|----------|
| [app/page.tsx](../../../app/page.tsx) | `border-b-8`, `border-4 border-black`, `shadow-[8px_8px_0px_...]`, `font-black`, `bg-red-500`, `bg-blue-100` | **P1** |
| [app/episodes/page.tsx](../../../app/episodes/page.tsx) | `font-black`, `bg-red-500` badge | **P1** |
| [app/blog/page.tsx](../../../app/blog/page.tsx) | `font-black`, `bg-purple-600` badge | **P1** |
| [app/artists/page.tsx](../../../app/artists/page.tsx) | `font-black`, `bg-blue-600` badge | **P1** |
| [app/about/page.tsx](../../../app/about/page.tsx) | `border-4 border-black`, `shadow-[8px_8px_...]`, brutal color boxes | **P2** |
| [app/blog/[slug]/page.tsx](../../../app/blog/%5Bslug%5D/page.tsx) | `border-4 border-black`, `shadow-[8px_8px_...]` | **P1** |
| [app/artists/[slug]/page.tsx](../../../app/artists/%5Bslug%5D/page.tsx) | `border-4 border-black`, `shadow-[8px_8px_...]` | **P2** |

### Component Files

| File | Patterns Found | Priority |
|------|----------------|----------|
| [components/podcast-card.tsx](../../../components/podcast-card.tsx) | `border-4 border-black`, `shadow-[8px_8px_...]`, `hover:shadow-[12px_12px_...]` | **P1** |
| [components/artist-card.tsx](../../../components/artist-card.tsx) | `border-4 border-black`, `shadow-[8px_8px_...]`, `border-2 border-black` | **P1** |
| [components/blog-card.tsx](../../../components/blog-card.tsx) | `border-4 border-black`, `shadow-[8px_8px_...]`, `border-2 border-black` | **P1** |
| [components/SocialFollowStack.tsx](../../../components/SocialFollowStack.tsx) | `border-4 border-black`, `shadow-[6px_6px_...]` | **P2** |
| [components/aaa/AAAPageClient.tsx](../../../components/aaa/AAAPageClient.tsx) | `border-4 border-black`, `border-4 border-white`, multiple brutal shadows | **P3** |

### Admin Files (Lower Priority)

Admin pages use `font-black` for headings but can remain unchanged initially as they are not public-facing.

---

## Component Layer

### Components to Refactor

| Current Component | Action | New Pattern |
|-------------------|--------|-------------|
| `podcast-card.tsx` | Rename to `VideoCard` | 16:9 aspect, subtle hover scale, no brutal border |
| `artist-card.tsx` | Keep name, restyle | Dark surface card, rounded corners |
| `blog-card.tsx` | Rename to `EditorialCard` | Typography-focused, minimal image |

### New Components to Create

| Component | Purpose | Reference |
|-----------|---------|-----------|
| `SiteHeader` | Premium dark header | Billboard navigation |
| `SiteFooter` | Minimal dark footer | Clean link groups |
| `SectionHeader` | Uppercase bold + "See All" | Billboard section titles |
| `VideoCard` | 16:9 thumbnail with hover | Billboard video cards |
| `EditorialCard` | Typography-first blog card | Pitchfork articles |
| `ChartRow` | Numbered list item | Billboard Hot 100 rows |
| `FeaturedHero` | Large featured content area | Billboard featured video |

---

## Data Flow

No backend changes required. Convex schema remains the same.

| Resource | Fields Used | Notes |
|----------|-------------|-------|
| Episodes | `title`, `thumbnail`, `videoUrl`, `publishedAt` | Add `featured` boolean if needed |
| Blog | `title`, `excerpt`, `content`, `author`, `image` | No changes |
| Artists | `name`, `image`, `bio`, `genres` | No changes |

---

## Integration Points

### Tailwind Config Updates

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // Map to CSS variables
      page: 'var(--color-bg-page)',
      surface: 'var(--color-bg-surface)',
      elevated: 'var(--color-bg-elevated)',
      accent: 'var(--color-accent)',
    },
    fontFamily: {
      headline: ['var(--font-headline)'],
      body: ['var(--font-body)'],
      editorial: ['var(--font-editorial)'],
    },
  },
}
```

### Radix UI Theming

Radix primitives inherit from CSS variables. Ensure these are updated:
- `Dialog`: Background should use `--color-bg-elevated`
- `Popover`: Background should use `--color-bg-surface`
- `Select`: Dropdown should match dark theme

### Framer Motion Tokens

Create shared transition presets:

```typescript
// lib/motion.ts
export const transitions = {
  default: { duration: 0.2, ease: 'easeOut' },
  slow: { duration: 0.4, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
}

export const variants = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scaleUp: { initial: { scale: 0.95 }, animate: { scale: 1 } },
}
```
