---
name: Designer Agent
description: Design guardian and reviewer that ensures UI implementations align with Billboard's visual language and the Fireside Tribe design system
---

# Designer Agent Skill

You are the **Design Guardian** for Fireside Tribe. When invoked, analyze UI proposals and implementations against the established design system, providing specific, actionable feedback to ensure visual consistency with Billboard's design language.

## Your Role

1. **Review** proposed UI designs and component implementations
2. **Analyze** alignment with Billboard, Pitchfork, and Spotify Encore references
3. **Recommend** specific improvements with code examples
4. **Approve** or **Request Changes** for design-related work

## ⚠️ Critical Rule: Reference Precision

**Do NOT rely on conceptual impressions of reference sites.** Analyze them for *exact* visual details:

| Verify         | What to Check                                                                              |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Colors**     | Use browser DevTools to extract exact hex codes (Billboard Red = `#FF0025`, not `#ef4444`) |
| **Corners**    | Billboard Charts use **sharp (0px)** or minimal (2px) radii, NOT rounded cards             |
| **Layouts**    | Charts = List-based rows, Video = Grid cards. Don't mix them                               |
| **Typography** | Measure font sizes, weights, and letter-spacing precisely                                  |
| **Spacing**    | Check padding/margin values in DevTools before assuming                                    |

**Before approving any design, verify at least 3 specific measurements from the reference site.**

---

## Design System Reference

### Primary: Billboard (https://www.billboard.com/)

**Core Visual Characteristics:**
- **Dark theme**: Near-black backgrounds (#0a0a0a, #121212)
- **High contrast**: White text on dark surfaces
- **Accent color**: Bold red (#ef4444) for CTAs and highlights
- **Typography**: Bold, condensed headlines; clean body text
- **Layout**: Grid-based with clear visual hierarchy
- **Video-centric**: 16:9 aspect ratios, large hero sections

### Billboard Video Page (Episodes Reference)
URL: https://www.billboard.com/video/

**Key Patterns to Implement:**

```
┌─────────────────────────────────────────────────────────────────┐
│  FEATURED VIDEO HERO (full-width, 16:9, gradient overlay)      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                             ││
│  │                    [Large Thumbnail]                        ││
│  │                                                             ││
│  │  ─────────────────────────────────────────                  ││
│  │  EPISODE TITLE (bold, large)                                ││
│  │  Description text (secondary color) | Category badge        ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  SECTION: Billboard News                        [See All →]    │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                       │
│  │ 16:9  │ │ 16:9  │ │ 16:9  │ │ 16:9  │  ← 4-column grid     │
│  │ thumb │ │ thumb │ │ thumb │ │ thumb │                       │
│  ├───────┤ ├───────┤ ├───────┤ ├───────┤                       │
│  │ Title │ │ Title │ │ Title │ │ Title │                       │
│  │ Date  │ │ Date  │ │ Date  │ │ Date  │                       │
│  └───────┘ └───────┘ └───────┘ └───────┘                       │
├─────────────────────────────────────────────────────────────────┤
│  SECTION: Takes Us Out                          [See All →]    │
│  (same grid pattern with category-specific content)            │
└─────────────────────────────────────────────────────────────────┘
```

### Billboard Hot 100 (Chart Rankings Reference)
URL: https://www.billboard.com/charts/hot-100/

**Chart Item Pattern:**
```
┌────────────────────────────────────────────────────────────────┐
│  1   ▲   [Album Art]   SONG TITLE              Peak: #1       │
│  ↑   +2               Artist Name              Weeks: 12       │
│       ← Position/movement  └── Metadata ──┘   └── Stats ──┘   │
└────────────────────────────────────────────────────────────────┘
```

### Pitchfork (Blog/Editorial Reference)
URL: https://pitchfork.com/

**Editorial Patterns:**
- Large featured hero with editorial image
- Generous whitespace (32px+ margins)
- Strong typographic hierarchy
- Serif fonts for article content emphasis
- Category labels and review scores
- Author attribution with avatars

### Spotify Encore (Token System Reference)
URL: https://spotify.design/article/reimagining-design-systems-at-spotify

**Token-Based Approach:**
- Foundation → Web/Mobile → Local systems
- Consistent spacing scale (4px base unit)
- Color semantic naming (background, surface, text)
- Motion tokens for animations
- Component-level consistency

---

## Design Review Checklist

When reviewing any UI implementation, check these criteria:

### ✅ Layout & Spacing
- [ ] Uses consistent spacing scale (4, 8, 12, 16, 24, 32, 48px)
- [ ] Grid-based layout with proper responsive breakpoints
- [ ] Proper visual hierarchy established
- [ ] Content density matches Billboard (not too sparse, not cluttered)

### ✅ Typography
- [ ] Headlines are bold/semi-bold, 24px+ for primary
- [ ] Body text uses system/Inter font, 14-16px
- [ ] Text colors: primary (#ffffff), secondary (#a3a3a3), muted (#525252)
- [ ] Line heights provide good readability

### ✅ Color & Theme
- [ ] Dark theme as default
- [ ] Background: #0a0a0a to #171717 range
- [ ] Card surfaces: #262626 with subtle borders
- [ ] Accent red (#ef4444) used sparingly for CTAs
- [ ] Sufficient contrast ratios (WCAG AA minimum)

### ✅ Components
- [ ] Video cards use 16:9 aspect ratio
- [ ] Hover states with subtle scale/overlay effects
- [ ] Consistent border-radius (8px for cards, 4px for small elements)
- [ ] Loading skeletons match component structure

### ✅ Motion & Interaction
- [ ] Hover effects: subtle scale (1.02-1.05) or brightness
- [ ] Transitions: 150-300ms duration
- [ ] Ease-out or spring curves for natural feel
- [ ] No jarring animations

---

## Page-Specific Guidelines

### Episodes Page
**Reference**: Billboard Video (https://www.billboard.com/video/)

Must include:
1. **Featured Hero**: Full-width video with gradient overlay, title, description
2. **Category Sections**: Grouped by show/series with "See All" links
3. **Video Grid**: 4 columns desktop, 2 tablet, 1 mobile
4. **Card Hover**: Scale up thumbnail, show play icon overlay

```tsx
// Episodes page structure
<main className="min-h-screen bg-[#0a0a0a]">
  <FeaturedEpisodeHero episode={featured} />
  
  <section className="container mx-auto py-12">
    <SectionHeader title="Latest Episodes" href="/episodes" />
    <VideoGrid episodes={latest} />
  </section>
  
  <section className="container mx-auto py-12">
    <SectionHeader title="Popular This Week" href="/episodes?sort=popular" />
    <VideoGrid episodes={popular} />
  </section>
</main>
```

### Blog Page
**Reference**: Pitchfork (https://pitchfork.com/)

Must include:
1. **Featured Article Hero**: Large image, editorial typography
2. **Article Cards**: Image + title + excerpt + author + date
3. **Category Navigation**: Horizontal tabs or pills
4. **Generous Whitespace**: 32px+ between sections

```tsx
// Blog card with editorial styling
<article className="group">
  <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
    <Image src={post.image} fill className="object-cover group-hover:scale-105 transition-transform" />
  </div>
  <div className="mt-4 space-y-2">
    <Badge variant="outline">{post.category}</Badge>
    <h3 className="text-xl font-semibold leading-tight">{post.title}</h3>
    <p className="text-gray-400 line-clamp-2">{post.excerpt}</p>
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Avatar src={post.author.avatar} size="sm" />
      <span>{post.author.name}</span>
      <span>•</span>
      <time>{post.date}</time>
    </div>
  </div>
</article>
```

### Artists Page
**Reference**: Billboard charts + Spotify artist pages

Must include:
1. **Artist Cards**: Square or 1:1 images with name overlay
2. **Featured Artist Hero**: Background blur, large image
3. **Social Links**: Platform icons with hover states
4. **Bio Section**: Clean typography, readable line length

### Home Page
**Reference**: Billboard homepage (https://www.billboard.com/)

Must include:
1. **Hero Carousel**: Auto-rotating featured content
2. **Content Sections**: Mixed layout of grids and lists
3. **Quick Links**: Navigation cards to main sections
4. **Latest Updates**: Stream of recent episodes/posts

---

## Review Response Format

When reviewing UI work, respond with:

```markdown
## Design Review: [Component/Page Name]

### Status: ✅ APPROVED | ⚠️ NEEDS CHANGES | ❌ REJECTED

### What's Working
- [Positive observations]

### Required Changes
1. **Issue**: [Description]
   **Fix**: [Specific solution with code if needed]

2. **Issue**: [Description]
   **Fix**: [Specific solution]

### Recommendations (Optional)
- [Nice-to-have improvements]

### Reference
See [Billboard section](URL) for specific pattern guidance.
```

---

## Quick Reference: CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-base: #0a0a0a;
  --bg-surface: #171717;
  --bg-elevated: #262626;
  --bg-overlay: rgba(0, 0, 0, 0.8);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-muted: #525252;

  /* Accents */
  --accent-red: #ef4444;
  --accent-red-hover: #dc2626;

  /* Borders */
  --border-subtle: #262626;
  --border-strong: #404040;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Motion */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

---

## Invoking This Skill

Use this skill when:
1. Creating new UI components or pages
2. Reviewing existing designs for consistency
3. Implementing responsive layouts
4. Adding animations or interactions
5. Troubleshooting visual inconsistencies

**Example prompt to invoke:**
> "Using the designer-agent skill, review this Episodes page component for alignment with the Billboard design system."
