# Fireside Tribe Homepage Redesign Guide
## Billboard.com Layout Style

**Goal:** Adopt Billboard's magazine-style layout while maintaining Fireside Tribe brand colors and identity.

---

## 📊 Current vs. Target Layout

### **Current Layout (Fireside Tribe)**
```
┌─────────────────────────────┐
│   Multi-Platform Hero       │
│   (TikTok/YT carousel)      │
└─────────────────────────────┘
┌─────────────────────────────┐
│ Trending Artists (horizontal)│
└─────────────────────────────┘
┌──────────────┬──────────────┐
│ Charts       │  Newsletter  │
│ (List)       │  Sidebar     │
└──────────────┴──────────────┘
┌─────────────────────────────┐
│ Episodes Grid (3 columns)   │
└─────────────────────────────┘
┌─────────────────────────────┐
│ Editorial Grid (3 columns)  │
└─────────────────────────────┘
```

### **Target Layout (Billboard-Style)**
```
┌────────────────┬────────────┐
│                │  Featured  │
│  MAIN HERO     │  Story 2   │
│  (Large)       ├────────────┤
│                │  Featured  │
│                │  Story 3   │
└────────────────┴────────────┘
┌─────────────────────────────┐
│  NEWS TICKER / Latest       │
└─────────────────────────────┘
┌───────┬───────┬───────┬─────┐
│ Story │ Story │ Story │Side │
│   1   │   2   │   3   │ bar │
├───────┼───────┼───────┤     │
│ Story │ Story │ Story │     │
│   4   │   5   │   6   │     │
└───────┴───────┴───────┴─────┘
┌─────────────────────────────┐
│  CATEGORY: Latest Episodes  │
│  (Grid with large feature)  │
└─────────────────────────────┘
┌─────────────────────────────┐
│  CATEGORY: Trending Artists │
│  (Grid or carousel)         │
└─────────────────────────────┘
┌─────────────────────────────┐
│  CATEGORY: Editorial        │
│  (Grid with varied sizes)   │
└─────────────────────────────┘
```

---

## 🎨 Key Design Patterns from Billboard

1. **Dominant Hero Section** (60-70% of viewport)
   - One large main feature
   - 2-3 secondary features in a grid
   - Clear call-to-action

2. **Structured Grid System**
   - 12-column grid on desktop
   - Varied card sizes (not all equal)
   - Clear visual hierarchy

3. **Category Sections**
   - Each content type has its own section
   - Section headers with "View All" links
   - Consistent spacing between sections

4. **Typography Hierarchy**
   - Large, bold headlines
   - Clear categorization labels
   - Timestamp/metadata prominently displayed

5. **Content Density**
   - More content above the fold
   - Less white space than current design
   - Tighter grid spacing

---

## 🔧 Implementation Plan

### **Step 1: Create New Hero Component**

**File:** `components/design-system/BillboardHero.tsx`

```typescript
import Link from "next/link"
import Image from "next/image"

interface HeroProps {
  mainFeature: {
    title: string
    excerpt: string
    imageUrl: string
    href: string
    category: string
  }
  secondaryFeatures: Array<{
    title: string
    imageUrl: string
    href: string
    category: string
  }>
}

export function BillboardHero({ mainFeature, secondaryFeatures }: HeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* Main Feature - Takes 2 columns */}
      <Link 
        href={mainFeature.href}
        className="lg:col-span-2 group relative overflow-hidden aspect-[16/9] lg:aspect-[21/9]"
      >
        <Image
          src={mainFeature.imageUrl}
          alt={mainFeature.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase mb-3">
            {mainFeature.category}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            {mainFeature.title}
          </h1>
          <p className="text-gray-200 text-lg line-clamp-2">
            {mainFeature.excerpt}
          </p>
        </div>
      </Link>

      {/* Secondary Features - Stack vertically */}
      <div className="flex flex-col gap-4">
        {secondaryFeatures.slice(0, 2).map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className="group relative overflow-hidden aspect-[16/9] flex-1"
          >
            <Image
              src={feature.imageUrl}
              alt={feature.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-primary text-primary-foreground px-2 py-1 text-xs font-bold uppercase mb-2">
                {feature.category}
              </span>
              <h3 className="font-heading text-xl font-bold text-white leading-tight line-clamp-2">
                {feature.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

---

### **Step 2: Create News Ticker Component**

**File:** `components/design-system/NewsTicker.tsx`

```typescript
import Link from "next/link"

interface NewsItem {
  title: string
  href: string
}

interface NewsTickerProps {
  items: NewsItem[]
}

export function NewsTicker({ items }: NewsTickerProps) {
  return (
    <div className="bg-secondary border-y border-border py-3 mb-8">
      <div className="container mx-auto px-4 flex items-center gap-6 overflow-x-auto scrollbar-hide">
        <span className="font-bold text-xs uppercase text-muted-foreground whitespace-nowrap">
          Latest:
        </span>
        <div className="flex gap-8">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

### **Step 3: Create Magazine Grid Component**

**File:** `components/design-system/MagazineGrid.tsx`

```typescript
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface GridItem {
  title: string
  excerpt?: string
  imageUrl: string
  href: string
  category: string
  publishedAt: string
  size?: "small" | "medium" | "large"
}

interface MagazineGridProps {
  items: GridItem[]
}

export function MagazineGrid({ items }: MagazineGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const isLarge = index === 0
        
        return (
          <Link
            key={index}
            href={item.href}
            className={`group ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <div className="relative overflow-hidden aspect-[16/9] mb-3">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 text-xs font-bold uppercase mb-2">
                {item.category}
              </span>
              <h3 className={`font-heading font-bold group-hover:text-primary transition-colors leading-tight mb-2 ${
                isLarge ? "text-2xl lg:text-3xl" : "text-lg"
              }`}>
                {item.title}
              </h3>
              {isLarge && item.excerpt && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                  {item.excerpt}
                </p>
              )}
              <time className="text-xs text-muted-foreground">
                {formatDate(item.publishedAt)}
              </time>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
```

---

### **Step 4: Redesigned Homepage**

**File:** `app/(frontend)/page.tsx`

```typescript
import { getFeaturedArtists, getLatestEpisodes, getLatestBlogPosts } from "@/lib/repositories/content"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import { BillboardHero } from "@/components/design-system/BillboardHero"
import { NewsTicker } from "@/components/design-system/NewsTicker"
import { MagazineGrid } from "@/components/design-system/MagazineGrid"
import { SectionHeader } from "@/components/design-system"
import { ArtistCircle } from "@/components/design-system/ArtistCircle"

export const revalidate = 0

export default async function Home() {
  const { artists: showArtists, blog: showBlog } = publicContentVisibility

  const [episodes, artists, posts] = await Promise.all([
    getLatestEpisodes(10),
    showArtists ? getFeaturedArtists(8) : Promise.resolve([]),
    showBlog ? getLatestBlogPosts(6) : Promise.resolve([]),
  ])

  // Prepare hero content (use latest episode as main feature)
  const mainFeature = episodes[0] ? {
    title: episodes[0].title,
    excerpt: episodes[0].description || "",
    imageUrl: episodes[0].coverImageUrl || "/placeholder.svg",
    href: `/episodes/${episodes[0].slug}`,
    category: "Latest Episode"
  } : null

  const secondaryFeatures = episodes.slice(1, 3).map(ep => ({
    title: ep.title,
    imageUrl: ep.coverImageUrl || "/placeholder.svg",
    href: `/episodes/${ep.slug}`,
    category: "Episode"
  }))

  // News ticker items
  const tickerItems = [
    ...episodes.slice(0, 5).map(ep => ({
      title: ep.title,
      href: `/episodes/${ep.slug}`
    })),
    ...posts.slice(0, 3).map(post => ({
      title: post.title,
      href: `/blog/${post.slug}`
    }))
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        
        {/* 1. BILLBOARD-STYLE HERO */}
        {mainFeature && (
          <BillboardHero
            mainFeature={mainFeature}
            secondaryFeatures={secondaryFeatures}
          />
        )}

        {/* 2. NEWS TICKER */}
        {tickerItems.length > 0 && <NewsTicker items={tickerItems} />}

        {/* 3. LATEST EPISODES - Magazine Grid */}
        <section className="mb-16">
          <SectionHeader title="Latest Episodes" href="/episodes" linkText="All Episodes" />
          {episodes.length > 3 && (
            <MagazineGrid
              items={episodes.slice(3, 9).map(ep => ({
                title: ep.title,
                excerpt: ep.description,
                imageUrl: ep.coverImageUrl || "/placeholder.svg",
                href: `/episodes/${ep.slug}`,
                category: "Podcast",
                publishedAt: ep.publishedAt
              }))}
            />
          )}
        </section>

        {/* 4. TRENDING ARTISTS - Billboard Style */}
        {showArtists && artists.length > 0 && (
          <section className="mb-16">
            <SectionHeader title="Trending Artists" href="/artists" linkText="All Artists" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {artists.map((artist) => (
                <ArtistCircle
                  key={artist.id}
                  name={artist.name}
                  imageUrl={artist.profileImageUrl || "/placeholder.svg"}
                  href={`/artists/${artist.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* 5. EDITORIAL - Magazine Grid */}
        {showBlog && posts.length > 0 && (
          <section className="mb-16">
            <SectionHeader title="Editorial" href="/blog" linkText="Read More" />
            <MagazineGrid
              items={posts.map(post => ({
                title: post.title,
                excerpt: post.excerpt,
                imageUrl: post.featuredImageUrl || "/placeholder.svg",
                href: `/blog/${post.slug}`,
                category: "News",
                publishedAt: post.publishedAt
              }))}
            />
          </section>
        )}
      </div>
    </div>
  )
}
```

---

## 🎨 Color Scheme Adjustments

**Keep your brand colors**, but use Billboard's contrast patterns:

```css
/* globals.css - Add these utility classes */

/* Hero overlays - darker for better text contrast */
.hero-overlay {
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.9) 0%, 
    rgba(0, 0, 0, 0.6) 50%, 
    rgba(0, 0, 0, 0) 100%
  );
}

/* Category badges - use your primary color */
.category-badge {
  @apply bg-primary text-primary-foreground;
}

/* Section backgrounds - subtle contrast */
.section-bg {
  @apply bg-secondary/30;
}
```

---

## 📐 Typography Hierarchy (Billboard Style)

Update your font sizes to match Billboard's bold hierarchy:

```css
/* globals.css */

/* Hero headlines */
.hero-title {
  @apply text-4xl lg:text-6xl font-bold leading-tight;
}

/* Section titles */
.section-title {
  @apply text-3xl lg:text-4xl font-bold uppercase tracking-tight;
}

/* Card titles (large) */
.card-title-large {
  @apply text-2xl lg:text-3xl font-bold leading-tight;
}

/* Card titles (standard) */
.card-title {
  @apply text-lg lg:text-xl font-bold leading-tight;
}

/* Category labels */
.category-label {
  @apply text-xs font-bold uppercase tracking-wider;
}
```

---

## 🚀 Implementation Checklist

- [ ] **Step 1:** Create `BillboardHero.tsx` component
- [ ] **Step 2:** Create `NewsTicker.tsx` component
- [ ] **Step 3:** Create `MagazineGrid.tsx` component
- [ ] **Step 4:** Update homepage `page.tsx`
- [ ] **Step 5:** Add utility CSS classes to `globals.css`
- [ ] **Step 6:** Test responsive behavior (mobile, tablet, desktop)
- [ ] **Step 7:** Verify brand colors are maintained
- [ ] **Step 8:** Deploy to staging for review

---

## 📱 Mobile Responsiveness

Billboard's mobile layout:
- Hero stacks vertically
- Grid becomes 1-column
- News ticker scrolls horizontally
- Larger tap targets
- Less dense content

**Mobile-first classes to use:**
```tsx
// Grid - mobile first, then responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Hero - full width on mobile
className="w-full lg:col-span-2"

// Typography - smaller on mobile
className="text-2xl lg:text-4xl"
```

---

## 🎯 Key Differences from Current Design

| Aspect | Current | Billboard-Style |
|--------|---------|-----------------|
| **Hero** | TikTok/YT carousel | Large feature + 2 secondary |
| **Content Density** | Spacious, lots of white space | Tight, more content above fold |
| **Grid** | Equal-sized cards | Varied sizes (feature larger) |
| **Typography** | Modern, clean | Bold, magazine-style |
| **Navigation** | Horizontal scrolls | Structured grids |
| **Categories** | Separate sections | Integrated with badges |

---

## 💡 Pro Tips

1. **Use `aspect-ratio`** utilities instead of fixed heights
2. **Implement lazy loading** for images below fold
3. **Add skeleton loaders** while content fetches
4. **Use `transition-all`** for hover effects
5. **Test with real content** - avoid placeholder text
6. **Optimize images** - use Next.js Image component
7. **Keep accessibility** - proper alt text, ARIA labels

---

## 🔄 Next Steps

1. **Create components** in this order:
   - BillboardHero (1 hour)
   - NewsTicker (30 min)
   - MagazineGrid (1 hour)

2. **Update homepage** (2 hours)
   - Replace current layout
   - Test with real data
   - Adjust spacing/colors

3. **Refine & polish** (2-3 hours)
   - Mobile testing
   - Animation refinements
   - Performance optimization

**Total estimated time:** 6-8 hours

---

**Need help implementing any specific component? Let me know!**
