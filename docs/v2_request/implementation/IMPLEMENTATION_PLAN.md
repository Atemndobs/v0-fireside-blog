# Fireside Tribe V2 - Implementation Plan

## Document Purpose
This document outlines the complete implementation plan for the Fireside Tribe website redesign. It serves as a continuation guide for any developer/agent picking up this work.

---

## Current State Analysis (As of 2025-11-16)

### Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Bricolage Grotesque (Light for body, SemiBold for headings)
- **Components:** React Server Components + Client Components
- **Database:** Supabase (for content management)
- **Deployment:** Vercel (inferred from vercel.json)

### Current Color Scheme
- Primary: Black (#000000)
- Accent: Red (#EF4444 / red-500)
- Secondary Accents: Blue, Purple
- Background: Yellow-50, Blue-100
- Text: White on dark, Black on light

### Current Typography
- Body: Bricolage Grotesque Light (weight 300)
- Headlines: Bricolage Grotesque SemiBold (weight 600)
- Button text: Bold, uppercase

### Current Styling Approach
- Neobrutalist design with thick borders (4px)
- Box shadows for depth (8px_8px_0px_0px)
- Mobile-first responsive design
- Different mobile/desktop styling for cards

### Existing Components
1. **Layout** - [app/layout.tsx](../../../app/layout.tsx:1-178)
   - Black header with red border
   - Desktop and mobile navigation
   - Footer with social links

2. **Homepage** - [app/page.tsx](../../../app/page.tsx:1-285)
   - Hero section (black background)
   - Latest Episodes section (yellow-50 background)
   - Featured Artists section (blue-100 background)
   - Latest Articles section (yellow-50 background)
   - Newsletter section (red-500 background)

3. **Card Components**
   - [podcast-card.tsx](../../../components/podcast-card.tsx:1-116) - Episode cards with Spotify/YouTube tabs
   - [artist-card.tsx](../../../components/artist-card.tsx:1-34) - Artist profile cards
   - [blog-card.tsx](../../../components/blog-card.tsx:1-49) - Blog post cards

---

## Required Changes (From Design Guide)

### Phase 1: Foundation (HIGH PRIORITY)

#### 1.1 Color System Implementation
**Files to modify:**
- `tailwind.config.ts` - Add brand colors to theme
- `app/globals.css` - Add CSS custom properties for colors

**New Colors to Add:**
```typescript
// tailwind.config.ts
fireside: {
  red: '#A41E22',
  gold: '#FFD700',
  green: '#26C000',
  charcoal: '#1A1A1A',
}
```

**CSS Variables:**
```css
/* app/globals.css */
--fireside-red: #A41E22;
--tribe-gold: #FFD700;
--accent-green: #26C000;
--charcoal-text: #1A1A1A;
```

**Completion Criteria:**
- [ ] Colors added to Tailwind config
- [ ] CSS variables defined
- [ ] Can use classes like `bg-fireside-red` and `text-tribe-gold`

---

#### 1.2 Typography System Update
**Files to modify:**
- `app/globals.css` - Update font families
- `next.config.mjs` - Verify font loading (if using Google Fonts)

**Required Fonts:**
- Headings: Montserrat ExtraBold (or keep Bricolage Grotesque if preferred)
- Body: Poppins Regular (or keep Bricolage Grotesque Light)
- Buttons: Montserrat Bold, ALL CAPS

**Decision Needed:**
- Keep current Bricolage Grotesque OR switch to Montserrat/Poppins?
- **Recommendation:** Keep Bricolage Grotesque for brand consistency unless stakeholder explicitly wants change

**Completion Criteria:**
- [ ] Font families configured
- [ ] Typography classes working
- [ ] Button text is uppercase by default

---

### Phase 2: Header & Navigation (HIGH PRIORITY)

#### 2.1 Header Redesign
**Files to modify:**
- `app/layout.tsx` (lines 60-89)

**Current State:**
```tsx
<header className="bg-black text-white py-4 px-4 border-b-4 border-red-500">
```

**Target State:**
```tsx
<header className="bg-white text-fireside-red py-4 px-4 border-b-4 border-fireside-red">
```

**Changes Required:**
1. Background: black → white (#FFFFFF)
2. Text color: white → Fireside Red (#A41E22)
3. Logo: Increase size by 25% (h-10 → h-12 or h-13)
4. Font: Change to Montserrat Bold or keep current font-black
5. Border: red-500 → Fireside Red
6. Hover states: Update to Fireside Red

**Mobile Header:**
- Keep as-is (already optimized)
- May need color adjustments for consistency

**Completion Criteria:**
- [ ] Header background is white
- [ ] Navigation text is Fireside Red
- [ ] Logo is 25% larger on desktop
- [ ] Hover states work correctly
- [ ] Mobile header tested and working

---

### Phase 3: Homepage Sections (HIGH PRIORITY)

#### 3.1 Hero Section Redesign
**Files to modify:**
- `app/page.tsx` (lines 149-184)

**Current State:**
- Background: black with banner image overlay
- Text: white
- PODCAST badge: red-500 background

**Target State:**
- Background: Fireside Red (#A41E22)
- Title/Subtitle: White
- PODCAST badge: Tribe Gold background with red text
- Add microphone icon (black/dark gray) to right of title
- Remove complex background patterns

**Changes Required:**
```tsx
// Old
<section className="relative bg-black text-white...">
  <div className="inline-block bg-red-500 px-4 py-2 text-black...">PODCAST</div>

// New
<section className="relative bg-fireside-red text-white...">
  <div className="inline-block bg-tribe-gold px-4 py-2 text-fireside-red...">PODCAST</div>
  {/* Add Mic icon from lucide-react */}
```

**Completion Criteria:**
- [ ] Background is Fireside Red
- [ ] PODCAST badge has gold background with red text
- [ ] Microphone icon added
- [ ] Background image removed or significantly simplified
- [ ] Text remains readable and impactful

---

#### 3.2 Latest Episodes Section
**Files to modify:**
- `app/page.tsx` (lines 186-208)
- `components/podcast-card.tsx`

**Section Changes:**
- Background: Keep white or yellow-50 → white
- Title: Change to Fireside Red

**Episode Card Changes:**
Current design has mobile (black) and desktop (white) variants.

**Target Design:**
- Card Background: Fireside Red (#A41E22)
- Card Outline: Tribe Gold (#FFD700) border
- Card Shadow: Light yellow tint
- Text: White (#FFFFFF)

**"All Episodes" Button:**
- Background: Tribe Gold (#FFD700)
- Text: Red (#A41E22)

**Completion Criteria:**
- [ ] Section background is white
- [ ] Section title is Fireside Red
- [ ] Cards have red background with gold border
- [ ] Card shadows have yellow tint
- [ ] Card text is white
- [ ] Button has gold background with red text
- [ ] Spotify/YouTube tabs remain functional

---

#### 3.3 Featured Artists Section
**Files to modify:**
- `app/page.tsx` (lines 210-232)
- `components/artist-card.tsx`

**Section Changes:**
- Background: blue-100 → Fireside Red (#A41E22)
- Title: text-black → white (inferred)

**Artist Card Changes:**
- Card Background: White (#FFFFFF)
- Card Outline: Tribe Gold (#FFD700) border
- Text Color: Charcoal (#1A1A1A)

**Button Changes:**
- "View Profile" Button: Tribe Gold background with red text
- "All Artists" Button: Tribe Gold background with WHITE text (not red)

**Completion Criteria:**
- [ ] Section background is Fireside Red
- [ ] Section title is white
- [ ] Cards have white background
- [ ] Cards have gold border
- [ ] Card text is charcoal
- [ ] View Profile button: gold bg, red text
- [ ] All Artists button: gold bg, white text

---

#### 3.4 Latest Articles Section
**Files to modify:**
- `app/page.tsx` (lines 234-256)
- `components/blog-card.tsx`

**Section Changes:**
- Background: Keep white
- Title: Change to Fireside Red

**Article Card Changes:**
- Card Background: Fireside Red (#A41E22)
- Card Outline: Tribe Gold (#FFD700) border
- Text: White (#FFFFFF)

**"Read More" Button:**
- Background: Tribe Gold (#FFD700)
- Text: Red (#A41E22)

**Completion Criteria:**
- [ ] Section background is white
- [ ] Section title is Fireside Red
- [ ] Cards have red background with gold border
- [ ] Card text is white
- [ ] Button has gold background with red text

---

#### 3.5 Newsletter Section Redesign
**Files to modify:**
- `app/page.tsx` (lines 258-281)

**Current State:**
- Background: red-500
- Title: white
- Input: white background
- Button: black background

**Target State:**
- Background: Tribe Gold (#FFD700)
- Title: Red (#A41E22)
- Email Input: White background with black text
- Subscribe Button: Fireside Red background with white text

**Completion Criteria:**
- [ ] Section background is Tribe Gold
- [ ] Title is Fireside Red
- [ ] Input has white background
- [ ] Button has red background with white text
- [ ] Form remains functional

---

### Phase 4: Footer & Social Media (MEDIUM PRIORITY)

#### 4.1 Footer Redesign
**Files to modify:**
- `app/layout.tsx` (lines 93-170)

**Current State:**
- Background: black
- Text: white
- Border: red-500

**Suggested Changes:**
- Keep black background OR change to Charcoal (#1A1A1A)
- Update border color to Fireside Red
- Update hover states to Tribe Gold
- Ensure social links are prominent

**Completion Criteria:**
- [ ] Footer colors updated
- [ ] Hover states use brand colors
- [ ] Social media links functional

---

#### 4.2 Social Media Integration
**Files to modify:**
- `app/layout.tsx` (footer section)
- Consider adding social icons to header

**Required Platforms:**
- Spotify
- YouTube
- Instagram

**Current State:**
- Links are in footer as text
- Need to add proper URLs (currently placeholder)

**Target State:**
- Flat monochrome icons
- Equal spacing
- Minimal size (24px or 32px recommended)
- Active and visible
- Open in new tab

**Completion Criteria:**
- [ ] All 3 platforms have working links
- [ ] Icons are monochrome and consistent
- [ ] Icons have hover states
- [ ] Links open in new tab

---

### Phase 5: Responsive & Polish (MEDIUM PRIORITY)

#### 5.1 Responsive Testing
**Breakpoints to test:**
- Mobile: < 768px
- Tablet: 768-1024px
- Desktop: > 1024px

**Completion Criteria:**
- [ ] All sections tested on mobile
- [ ] All sections tested on tablet
- [ ] All sections tested on desktop
- [ ] No layout breaking
- [ ] Touch targets at least 44x44px on mobile

---

#### 5.2 Accessibility Audit
**Files to check:**
- All components with interactive elements
- Color contrast ratios

**Tasks:**
- [ ] Check color contrast (Fireside Red on white, etc.)
- [ ] Ensure all images have alt text
- [ ] Test keyboard navigation
- [ ] Add ARIA labels where needed
- [ ] Test with screen reader (if possible)

---

#### 5.3 Performance Optimization
**Tasks:**
- [ ] Optimize images (convert to WebP)
- [ ] Check bundle size
- [ ] Test page load speed
- [ ] Implement lazy loading (if not already)
- [ ] Check Core Web Vitals

---

### Phase 6: Additional Features (LOW PRIORITY)

#### 6.1 Animations & Transitions
**Recommended:**
- Consistent transition timing (300ms ease-in-out)
- Hover effects on cards and buttons
- Smooth page transitions

**Completion Criteria:**
- [ ] All transitions use consistent timing
- [ ] No jarring animations
- [ ] Reduced motion respected (prefers-reduced-motion)

---

#### 6.2 SEO Enhancements
**Files to modify:**
- `app/layout.tsx` (metadata)
- Individual page files

**Tasks:**
- [ ] Update meta descriptions
- [ ] Add Open Graph tags
- [ ] Add Schema.org markup for podcasts
- [ ] Generate sitemap
- [ ] Add robots.txt

---

## File Modification Checklist

### CSS/Config Files
- [ ] `tailwind.config.ts` - Add brand colors
- [ ] `app/globals.css` - Add CSS variables and update theme
- [ ] `app/fonts.css` - Update if changing fonts

### Layout Files
- [ ] `app/layout.tsx` - Header and Footer redesign
- [ ] `components/MobileHeader.tsx` - Update colors if needed

### Page Files
- [ ] `app/page.tsx` - All homepage sections
- [ ] `app/episodes/page.tsx` - Episode listing (if exists)
- [ ] `app/artists/page.tsx` - Artist listing (if exists)
- [ ] `app/blog/page.tsx` - Blog listing (if exists)

### Component Files
- [ ] `components/podcast-card.tsx` - Episode card redesign
- [ ] `components/artist-card.tsx` - Artist card redesign
- [ ] `components/blog-card.tsx` - Blog card redesign

---

## Testing Checklist

### Functional Testing
- [ ] All links work correctly
- [ ] Form submission works (newsletter)
- [ ] Spotify/YouTube embeds work
- [ ] Navigation works on all devices
- [ ] Search functionality (if exists)

### Visual Testing
- [ ] All colors match design guide exactly
- [ ] Typography is consistent
- [ ] Spacing is uniform
- [ ] Borders are consistent thickness
- [ ] Shadows render correctly

### Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Device Testing
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad/Tablet
- [ ] Desktop (various sizes)

---

## Known Issues / Questions

### Decisions Needed
1. **Fonts:** Keep Bricolage Grotesque or switch to Montserrat/Poppins?
2. **Accent Green (#26C000):** Where should this be used? Not specified in guide.
3. **Mobile Navigation:** Keep hamburger menu style or change?
4. **Footer Background:** Keep black or change to Charcoal?
5. **Card Border Radius:** Keep sharp corners or add slight rounding (8px)?

### Potential Issues
1. **Color Contrast:** Need to verify Fireside Red (#A41E22) on white meets WCAG AA standards
2. **Yellow Shadow:** "Light yellow tint" - exact color/opacity not specified
3. **Logo Size:** 25% increase might be too much/little - may need adjustment
4. **Microphone Icon:** Exact placement and size not specified

---

## Implementation Order (Recommended)

### Day 1: Foundation
1. Add color system to Tailwind config
2. Update CSS variables
3. Test that colors work across the app

### Day 2: Layout
4. Update header/navigation
5. Update footer
6. Test navigation on all devices

### Day 3: Homepage Sections (Part 1)
7. Redesign hero section
8. Update latest episodes section
9. Update episode cards

### Day 4: Homepage Sections (Part 2)
10. Update featured artists section
11. Update artist cards
12. Update latest articles section
13. Update blog cards

### Day 5: Polish
14. Update newsletter section
15. Add/update social media icons
16. Responsive testing
17. Accessibility checks

### Day 6: Final QA
18. Cross-browser testing
19. Performance optimization
20. Bug fixes and final adjustments

---

## Git Workflow Recommendations

### Branch Strategy
- Create feature branch: `git checkout -b feature/v2-redesign`
- Commit frequently with clear messages
- Push regularly to backup work

### Commit Message Format
```
feat: Add Fireside brand colors to Tailwind config
fix: Update header background to white
style: Redesign episode cards with gold borders
refactor: Extract color variables to CSS
test: Add responsive layout tests
docs: Update implementation progress
```

### Before Committing
- [ ] Test changed components
- [ ] Check for console errors
- [ ] Verify no broken layouts
- [ ] Update this document with progress

---

## Progress Tracking

### Completed
- [x] Requirements documentation
- [x] Current state analysis
- [x] Implementation plan creation

### In Progress
- [ ] None yet

### Blocked
- [ ] None yet

---

## Handoff Notes

### For Next Developer/Agent

**What's Been Done:**
- Analyzed current codebase structure
- Documented all requirements from design PDF
- Created comprehensive implementation plan
- Identified all files that need modification

**What's Next:**
1. Start with Phase 1.1: Implement color system in Tailwind config
2. Then move to Phase 1.2: Update typography if needed
3. Follow the implementation order outlined above

**Important Context:**
- The site uses Tailwind CSS extensively - most changes are class name updates
- Neobrutalist design is core to the brand - keep thick borders and sharp shadows
- Mobile-first approach is important - test on mobile as you go
- Some components use different styles for mobile/desktop - be careful when updating

**Files Reference:**
- Design Guide: `/docs/v2_request/Fireside_Tribe_Website_Design_Guide_Updated.pdf`
- Requirements: `/docs/v2_request/implementation/requirements.md`
- This Plan: `/docs/v2_request/implementation/IMPLEMENTATION_PLAN.md`

**Quick Start Command:**
```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

**Tips:**
1. Use browser DevTools to test color changes before committing
2. Keep the design guide PDF open for reference
3. Test each section after making changes
4. Commit small, logical chunks
5. Update this document as you complete tasks

---

## Contact / Questions

If you have questions about:
- **Design decisions:** Refer to design guide PDF or ask stakeholder
- **Technical implementation:** Check Next.js and Tailwind docs
- **Content/copy changes:** Ask stakeholder
- **Color specifications:** All colors are in requirements.md

---

**Document Version:** 1.0
**Last Updated:** 2025-11-16
**Status:** Ready for implementation
**Next Step:** Phase 1.1 - Color System Implementation
