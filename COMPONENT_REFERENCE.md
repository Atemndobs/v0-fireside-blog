# Billboard Components - Quick Reference

Quick reference for the three new Billboard-style components.

---

## 🎯 BillboardHero

**File:** `components/design-system/BillboardHero.tsx`

### Usage
```tsx
import { BillboardHero } from "@/components/design-system"

<BillboardHero
  mainFeature={{
    title: "Main Story Title",
    excerpt: "Brief description...",
    imageUrl: "/path/to/image.jpg",
    href: "/link/to/content",
    category: "Category Name"
  }}
  secondaryFeatures={[
    {
      title: "Secondary Story 1",
      imageUrl: "/path/to/image1.jpg",
      href: "/link/to/content1",
      category: "Category"
    },
    {
      title: "Secondary Story 2",
      imageUrl: "/path/to/image2.jpg",
      href: "/link/to/content2",
      category: "Category"
    }
  ]}
/>
```

### Props
- `mainFeature`: Object with title, excerpt (optional), imageUrl, href, category
- `secondaryFeatures`: Array of objects (up to 2) with title, imageUrl, href, category
- `className`: Optional additional CSS classes

### Features
- Large main feature (2/3 width desktop)
- Two stacked secondary features (1/3 width desktop)
- Gradient overlays for text legibility
- Skewed category badges with primary color
- Hover scale effects
- Fully responsive

---

## 📰 NewsTicker

**File:** `components/design-system/NewsTicker.tsx`

### Usage
```tsx
import { NewsTicker } from "@/components/design-system"

<NewsTicker
  items={[
    { title: "Breaking news item 1", href: "/news/1" },
    { title: "Latest update 2", href: "/news/2" },
    { title: "New release 3", href: "/news/3" }
  ]}
/>
```

### Props
- `items`: Array of objects with title and href
- `className`: Optional additional CSS classes

### Features
- Horizontal scrolling bar
- "Latest:" label with visual accent
- Subtle background (secondary color)
- Hidden scrollbar (scroll functionality retained)
- Hover color transitions

### Best Practices
- Limit to 10-15 items for performance
- Keep titles concise (50 chars or less)
- Mix different content types for variety

---

## 📊 MagazineGrid

**File:** `components/design-system/MagazineGrid.tsx`

### Usage
```tsx
import { MagazineGrid } from "@/components/design-system"

<MagazineGrid
  items={[
    {
      title: "Featured Article",
      excerpt: "This will be the large featured item...",
      imageUrl: "/path/to/image.jpg",
      href: "/articles/featured",
      category: "Feature",
      publishedAt: "2024-01-15T12:00:00Z"
    },
    {
      title: "Regular Article",
      imageUrl: "/path/to/image2.jpg",
      href: "/articles/2",
      category: "News",
      publishedAt: "2024-01-14T12:00:00Z"
    }
    // ... more items
  ]}
/>
```

### Props
- `items`: Array of objects with:
  - `title`: Article title (required)
  - `excerpt`: Description (optional, shown only for first item)
  - `imageUrl`: Image path (required)
  - `href`: Link destination (required)
  - `category`: Category name (required)
  - `publishedAt`: ISO date string (required)
- `className`: Optional additional CSS classes

### Features
- First item spans 2×2 grid (featured)
- Remaining items standard size
- Category badges with border
- Formatted timestamps
- Hover scale effects
- Responsive grid (3→2→1 columns)

### Layout Behavior
- **Desktop (lg):** 3 columns, first item 2×2
- **Tablet (md):** 2 columns, first item 2×2
- **Mobile:** 1 column, all items full width

---

## 🎨 Styling Notes

### Color Scheme
- **Primary:** #FF0025 (Billboard Red)
- **Secondary:** #1c1c1c (Dark surface)
- **Background:** #0a0a0a (Dark)
- **Foreground:** #ffffff (White)

### Typography
- **Font Family:** Inter (via `--font-heading`)
- **Headlines:** Uppercase, bold, tight tracking
- **Body:** Relaxed leading, readable

### Spacing
- **Grid gaps:** `gap-6` (24px)
- **Section margins:** `mb-16` (64px)
- **Card padding:** `p-6` to `p-10` (varies by breakpoint)

### Transitions
- **Duration:** 500ms
- **Easing:** `ease-out`
- **Transform:** `scale(1.05)` on hover

---

## 🔧 Customization Examples

### Change Grid Columns
```tsx
// 4 columns instead of 3
<MagazineGrid
  className="lg:grid-cols-4"
  items={items}
/>
```

### Hide Ticker on Mobile
```tsx
<NewsTicker
  className="hidden md:flex"
  items={items}
/>
```

### Different Hero Aspect Ratio
```tsx
// Edit BillboardHero.tsx
className="aspect-[21/9] lg:aspect-[32/9]"
// Makes hero wider
```

### Remove Skewed Badges
```tsx
// In component files, change:
className="skew-x-[-5deg]"
// To:
className=""
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm:  640px   /* Small phones */
md:  768px   /* Tablets */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Component Behavior

**BillboardHero:**
- Mobile: Stack vertically
- Tablet: 2-column grid for secondary
- Desktop: 2+1 layout

**NewsTicker:**
- All: Horizontal scroll maintained

**MagazineGrid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

## 🚀 Performance Tips

1. **Image Optimization**
   - Always use Next.js Image component
   - Set proper `sizes` attribute
   - Use `priority` for above-fold images

2. **Content Limits**
   - Hero: 3 items max (1 main + 2 secondary)
   - Ticker: 10-15 items recommended
   - Grid: 6-9 items per section optimal

3. **Lazy Loading**
   - Below-fold content loads automatically
   - No manual intervention needed

---

## 🐛 Troubleshooting

### Images Not Loading
```tsx
// Check image path is correct
imageUrl: "/images/my-image.jpg"  // ✅ Relative to public/
imageUrl: "images/my-image.jpg"   // ❌ Missing leading slash
```

### Grid Not Responsive
```tsx
// Ensure parent has container class
<div className="container mx-auto px-4">
  <MagazineGrid items={items} />
</div>
```

### Dates Not Formatting
```tsx
// Ensure valid ISO date string
publishedAt: "2024-01-15T12:00:00Z"  // ✅ ISO format
publishedAt: "01/15/2024"            // ❌ Invalid
```

### Hover Effects Not Working
```tsx
// Ensure group class on parent
<Link className="group">
  <img className="group-hover:scale-105" />
</Link>
```

---

## 📚 Related Files

- **Global Styles:** `app/globals.css`
- **Utilities:** `lib/utils.ts`
- **Homepage:** `app/(frontend)/page.tsx`
- **Full Documentation:** `REDESIGN_COMPLETE.md`

---

**Last Updated:** February 24, 2026  
**Version:** 1.0.0
