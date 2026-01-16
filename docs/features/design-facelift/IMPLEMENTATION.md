# Design Facelift Implementation Plan

## Pre-Implementation Checklist

- [ ] Create feature branch: `git checkout -b feature/design-facelift`
- [ ] Back up current fonts: `cp app/fonts.css app/fonts.legacy.css`
- [ ] Review mockups in [README.md](./README.md)

---

## Phase 1: Foundation (Theme & Global Styles)

### 1.1 Update Typography

**Files to modify:**
- [app/fonts.css](../../../app/fonts.css)
- [app/layout.tsx](../../../app/layout.tsx)

**Tasks:**
| Task | File | Changes |
|------|------|---------|
| Replace Google Fonts import | `app/fonts.css` | Change from Bricolage Grotesque to Inter + Playfair Display |
| Update Next.js font config | `app/layout.tsx` | Use `next/font/google` for Inter and Playfair Display |
| Update CSS variables | `app/fonts.css` | Set `--font-headline`, `--font-body`, `--font-editorial` |

**Code snippet:**
```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700']
})
```

---

### 1.2 Update Color Tokens

**Files to modify:**
- [app/globals.css](../../../app/globals.css)

**Tasks:**
| Task | Line Range | Changes |
|------|------------|---------|
| Replace `:root` color variables | Lines 6-42 | New premium dark palette |
| Remove `.dark` override | Lines 44-72 | Dark is now default |
| Update prose styles | Lines 98-113 | Remove Neobrutalist blockquote styling |

**Before → After:**
```css
/* BEFORE */
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;

/* AFTER */
--color-bg-page: #0a0a0a;
--color-bg-surface: #171717;
--color-bg-elevated: #262626;
--color-accent: #ef4444;
--color-text-primary: #ffffff;
--color-text-secondary: #a3a3a3;
```

---

### 1.3 Update Tailwind Config

**Files to modify:**
- [tailwind.config.ts](../../../tailwind.config.ts)

**Tasks:**
| Task | Section | Changes |
|------|---------|---------|
| Add custom colors | `theme.extend.colors` | Map `page`, `surface`, `elevated`, `accent` to CSS vars |
| Add font families | `theme.extend.fontFamily` | Map `headline`, `body`, `editorial` |
| Keep existing config | All | Preserve Radix animation keyframes |

---

### 1.4 Clean Root Layout

**Files to modify:**
- [app/layout.tsx](../../../app/layout.tsx)

**Tasks:**
| Task | Line Range | Changes |
|------|------------|---------|
| Update header | Lines 68-99 | Remove `border-b-4 border-red-500`, add dark solid bg |
| Update footer | Lines 103-148 | Remove `border-t-8 border-red-500`, simplify |
| Replace `font-black` | Lines 72, 108 | Use `font-bold` or new headline class |
| Update ThemeProvider | Line 67 | Set `defaultTheme="dark"` |

---

## Phase 2: Core Components

### 2.1 Create Design System Components

**New files to create:**
| File | Purpose |
|------|---------|
| `components/ui/section-header.tsx` | Uppercase heading + "See All" link |
| `components/ui/video-card.tsx` | 16:9 thumbnail card |
| `components/ui/editorial-card.tsx` | Typography-focused blog card |
| `components/ui/chart-row.tsx` | Numbered list item |
| `components/ui/featured-hero.tsx` | Large featured content block |

**Component specs:**

```typescript
// components/ui/video-card.tsx
interface VideoCardProps {
  title: string
  thumbnail: string
  duration?: string
  href: string
}
// 16:9 aspect ratio, rounded-lg, hover:scale-[1.02], overlay gradient
```

```typescript
// components/ui/section-header.tsx
interface SectionHeaderProps {
  title: string
  href?: string
  linkText?: string // defaults to "See All"
}
// uppercase, font-bold, tracking-wide, flex justify-between
```

---

### 2.2 Refactor Existing Cards

**Files to modify:**
| File | Changes |
|------|---------|
| [components/podcast-card.tsx](../../../components/podcast-card.tsx) | Remove `border-4 border-black`, `shadow-[8px_8px_...]`, add `bg-surface rounded-lg` |
| [components/artist-card.tsx](../../../components/artist-card.tsx) | Remove brutal styling, add subtle hover |
| [components/blog-card.tsx](../../../components/blog-card.tsx) | Remove brutal styling, add editorial focus |
| [components/SocialFollowStack.tsx](../../../components/SocialFollowStack.tsx) | Remove `border-4 border-black`, update shadows |

**Pattern replacement:**
```css
/* REMOVE */
border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]

/* REPLACE WITH */
bg-surface rounded-lg hover:bg-elevated transition-colors
```

---

## Phase 3: Page Redesigns

### 3.1 Home Page

**File:** [app/page.tsx](../../../app/page.tsx)

**Sections to update:**
| Section | Lines | Changes |
|---------|-------|---------|
| Hero | 167-226 | Use `FeaturedHero`, remove brutal CTA buttons |
| Episodes | 205-228 | Use `SectionHeader` + `VideoCard` grid |
| Artists | 229-252 | Dark bg section, use updated `artist-card` |
| Blog | 253-275 | Use `SectionHeader` + `EditorialCard` |
| Newsletter | 277-295 | Simplify form, remove brutal input styling |

---

### 3.2 Episodes Page

**File:** [app/episodes/page.tsx](../../../app/episodes/page.tsx)

**Tasks:**
| Task | Changes |
|------|---------|
| Add featured hero | Show latest/featured episode prominently |
| Remove badge rotation | Remove `rotate-1` class from "PODCAST" badge |
| Update grid | Use `VideoCard` components, 16:9 aspect |
| Add categories | Optional: group episodes by category sections |

---

### 3.3 Blog Page

**File:** [app/blog/page.tsx](../../../app/blog/page.tsx)

**Tasks:**
| Task | Changes |
|------|---------|
| Update badge | Remove `rotate-1`, use accent underline instead |
| Editorial layout | More whitespace, typography hierarchy |
| Use `EditorialCard` | Replace `blog-card` with new component |

---

### 3.4 Blog Article Page

**File:** [app/blog/[slug]/page.tsx](../../../app/blog/%5Bslug%5D/page.tsx)

**Tasks:**
| Task | Line Range | Changes |
|------|------------|---------|
| Remove article border | Line 180 | Remove `border-4 border-black shadow-[...]` |
| Update image container | Line 194 | Remove `border-4 border-black` |
| Add editorial typography | Throughout | Use `font-editorial` for body text |

---

### 3.5 Artists Pages

**Files:**
- [app/artists/page.tsx](../../../app/artists/page.tsx)
- [app/artists/[slug]/page.tsx](../../../app/artists/%5Bslug%5D/page.tsx)

**Tasks:**
| Task | Changes |
|------|---------|
| Update listing page | Remove badge rotation, use dark bg |
| Update detail page | Remove brutal card styling, use surfaces |

---

### 3.6 About Page

**File:** [app/about/page.tsx](../../../app/about/page.tsx)

**Tasks:**
| Task | Changes |
|------|---------|
| Remove brutal card | Lines 19-70: Replace with clean dark surface |
| Update stat boxes | Lines 48-60: Remove colored backgrounds |

---

## Phase 4: Polish & Mobile

### 4.1 Mobile Navigation

**Files to review:**
- [components/MobileHeader.tsx](../../../components/MobileHeader.tsx)

**Tasks:**
| Task | Changes |
|------|---------|
| Update drawer styling | Match premium dark aesthetic |
| Add smooth animations | Framer Motion slide-in |

---

### 4.2 Animations

**New file to create:**
- `lib/motion.ts`

**Tasks:**
| Task | Details |
|------|---------|
| Create transition presets | `default`, `slow`, `spring` |
| Create animation variants | `fadeIn`, `scaleUp`, `slideIn` |
| Apply to page transitions | Wrap page content in `motion.div` |

---

### 4.3 A³ Page (Lower Priority)

**File:** [components/aaa/AAAPageClient.tsx](../../../components/aaa/AAAPageClient.tsx)

This page has extensive Neobrutalist styling. Consider:
1. Updating in a separate PR
2. Or maintaining Neobrutalist as intentional "creative" style for this page

---

## Phase 5: Verification

### 5.1 Designer Agent Review

Run `designer-agent` skill to verify:
- [ ] Color contrast meets WCAG AA
- [ ] Typography hierarchy is clear
- [ ] Spacing follows 4px grid
- [ ] Components match Billboard reference

### 5.2 Manual Testing

| Test | Breakpoints |
|------|-------------|
| Home page | Mobile (375px), Tablet (768px), Desktop (1280px) |
| Episodes page | All breakpoints |
| Blog pages | All breakpoints |
| Navigation | Mobile drawer, desktop nav |

### 5.3 Performance Check

```bash
npm run build
# Check for any TypeScript errors
# Verify bundle size hasn't increased significantly
```

---

## Rollback Plan

If issues arise:
1. `git checkout main -- app/globals.css app/fonts.css`
2. Restore individual component files as needed
3. Keep feature branch for future reference
