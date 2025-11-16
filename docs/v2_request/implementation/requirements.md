# Fireside Tribe Website V2 - Requirements Documentation

## Overview
This document outlines all requirements for the Fireside Tribe website redesign (V2), compiled from the design guide and stakeholder feedback.

---

## 1. Brand Identity & Color System

### Color Palette
The following colors must be used consistently across all web and graphic elements:

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Fireside Red | `#A41E22` | Primary brand color, backgrounds, text accents |
| Tribe Gold | `#FFD700` | Secondary accent, buttons, borders |
| Accent Green | `#26C000` | Accent color (usage TBD) |
| Charcoal Text | `#1A1A1A` | Primary text color |
| White | `#FFFFFF` | Backgrounds, text on dark backgrounds |

### Typography Requirements

**Headings:**
- Primary: Montserrat ExtraBold
- Alternative: Oswald Bold
- Usage: All section titles and headings

**Body Text:**
- Primary: Poppins Regular
- Alternative: Open Sans Light
- Usage: Paragraph text, descriptions

**Buttons:**
- Font: Montserrat Bold
- Style: ALL CAPS
- Usage: All CTA buttons and interactive elements

**Requirements:**
- Ensure consistency in size, weight, and color across all sections
- Implement responsive typography scaling

---

## 2. Header / Navigation Bar

### Design Specifications
- **Background Color:** `#FFFFFF` (White)
- **Text Color:** `#A41E22` (Fireside Red)
- **Font:** Montserrat Bold (or equivalent)

### Logo Requirements
- Increase desktop logo size by approximately 25% for better visibility
- Keep mobile header as-is (currently readable and clear)
- Logo should link to homepage

### Navigation Items
- Style: Bold, Fireside Red
- Hover state: TBD (suggest: underline or color change)
- Mobile: Keep current implementation

---

## 3. Hero Section (Podcast Intro)

### Design Specifications
- **Background:** `#A41E22` (Fireside Red)
- **Title Text:** `#FFFFFF` (White)
- **Subtitle Text:** `#FFFFFF` (White)
- **Accent Label:** `#FFD700` (Tribe Gold) background with `#A41E22` (Red) text for 'PODCAST' tag

### Visual Elements
- Add microphone icon (black or dark gray) to the right side of title
- Remove complex background patterns for a clean, bold visual
- Maintain strong visual hierarchy

### Content Requirements
- Clear podcast branding
- Compelling tagline/subtitle
- Call-to-action (if applicable)

---

## 4. Latest Episodes Section

### Design Specifications
- **Section Background:** `#FFFFFF` (White)
- **Section Title:** `#A41E22` (Fireside Red)

### Episode Cards
- **Card Background:** `#A41E22` (Fireside Red)
- **Card Outline:** `#FFD700` (Tribe Gold) border
- **Card Shadow:** Light yellow tint
- **Text Color:** `#FFFFFF` (White)

### Card Content Requirements
- Episode title
- Episode number/date
- Brief description
- Duration
- Thumbnail image
- Play/Listen button

### "All Episodes" Button
- **Background:** `#FFD700` (Tribe Gold)
- **Text:** `#A41E22` (Red)
- **Style:** Montserrat Bold, ALL CAPS

---

## 5. Featured Artists Section

### Design Specifications
- **Section Background:** `#A41E22` (Fireside Red)
- **Section Title:** White text (inferred)

### Artist Cards
- **Card Background:** `#FFFFFF` (White)
- **Card Outline:** `#FFD700` (Tribe Gold) border
- **Text Color:** `#1A1A1A` (Charcoal)

### Card Content Requirements
- Artist photo/avatar
- Artist name
- Genre/category
- Brief bio or tagline
- Social media links (optional)

### Buttons
**"View Profile" Button:**
- Background: `#FFD700` (Tribe Gold)
- Text: `#A41E22` (Red)

**"All Artists" Button:**
- Background: `#FFD700` (Tribe Gold)
- Text: `#FFFFFF` (White)

---

## 6. Latest Articles Section

### Design Specifications
- **Section Background:** `#FFFFFF` (White)
- **Section Title:** `#A41E22` (Fireside Red) (inferred)

### Article Cards
- **Card Background:** `#A41E22` (Fireside Red)
- **Card Outline:** `#FFD700` (Tribe Gold) border
- **Text Color:** `#FFFFFF` (White)

### Card Content Requirements
- Featured image
- Article title
- Publication date
- Excerpt/preview
- Author (optional)
- Category/tags

### "Read More" Button
- **Background:** `#FFD700` (Tribe Gold)
- **Text:** `#A41E22` (Red)
- **Style:** Montserrat Bold, ALL CAPS

---

## 7. Join the Tribe (Newsletter) Section

### Design Specifications
- **Section Background:** `#FFD700` (Tribe Gold)
- **Section Title:** `#A41E22` (Red)

### Email Input Field
- **Background:** `#FFFFFF` (White)
- **Text Color:** `#000000` (Black)
- **Placeholder:** Gray text
- **Border:** TBD (suggest: subtle gray or red)

### Subscribe Button
- **Background:** `#A41E22` (Fireside Red)
- **Text:** `#FFFFFF` (White)
- **Style:** Montserrat Bold, ALL CAPS

### Content Requirements
- Compelling headline
- Value proposition (why join)
- Privacy statement/GDPR compliance
- Success/error messages

---

## 8. Social Media Integration

### Required Platforms
- Spotify
- YouTube
- Instagram

### Implementation Requirements
- All social icons must be active and functional
- Icons should be visible in footer or header (determine placement)
- Use flat monochrome versions
- Equal spacing between icons
- Minimal, consistent sizing
- Icons should open links in new tab

### Icon Style
- Monochrome (single color)
- Consistent size (suggest: 24px or 32px)
- Hover state: TBD (suggest: color change or scale)

---

## 9. Footer (Requirements TBD)

### Suggested Content
- Copyright information
- Quick links navigation
- Social media icons
- Contact information
- Privacy policy / Terms of service links

### Design
- Color scheme: TBD (suggest: Charcoal background with white/gold text)

---

## 10. Additional Requirements from Audio (Shield's Feedback)

**Note:** Audio transcription needed. Please add Shield's requirements from the MP3 file here.

### Placeholder for Audio Requirements
- [ ] Requirement 1 from audio
- [ ] Requirement 2 from audio
- [ ] Requirement 3 from audio
- [ ] Additional feedback points

---

## 11. Technical Requirements

### Performance
- Fast page load times (target: < 3 seconds)
- Optimized images (WebP format where possible)
- Lazy loading for below-fold content
- Minimal JavaScript bundle size

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Touch-friendly interactive elements (minimum 44x44px tap targets)
- Mobile header: Keep current implementation (already optimized)

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast ratios meeting accessibility standards
- Alt text for all images

### SEO
- Meta tags optimization
- Open Graph tags for social sharing
- Schema.org markup for podcasts, articles, and people
- Sitemap.xml
- Robots.txt
- Canonical URLs

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- Graceful degradation for older browsers

---

## 12. Content Management

### Admin Requirements
- CMS for managing episodes, artists, and blog posts
- Image upload and optimization
- Draft/publish workflow
- Preview functionality

### Content Types
1. **Podcast Episodes**
   - Title, description, audio file
   - Publication date, duration
   - Show notes
   - Guest information

2. **Artists**
   - Name, bio, photo
   - Genre/category
   - Social media links
   - Featured work

3. **Blog Articles**
   - Title, content, featured image
   - Author, publication date
   - Categories/tags
   - SEO metadata

---

## 13. Integration Requirements

### Podcast Hosting
- Integration with podcast hosting platform
- RSS feed for podcast directories
- Embedded audio player
- Download functionality

### Analytics
- Google Analytics or alternative
- Podcast-specific analytics
- User engagement tracking
- Conversion tracking (newsletter signups)

### Email Marketing
- Newsletter integration (e.g., Mailchimp, ConvertKit)
- Welcome email automation
- GDPR compliance

---

## Priority Matrix

### Phase 1 (Must Have)
- [ ] Color system implementation
- [ ] Header/Navigation redesign
- [ ] Hero section redesign
- [ ] Latest Episodes section
- [ ] Responsive layout
- [ ] Basic accessibility

### Phase 2 (Should Have)
- [ ] Featured Artists section
- [ ] Latest Articles section
- [ ] Newsletter signup
- [ ] Social media integration
- [ ] Performance optimization

### Phase 3 (Nice to Have)
- [ ] Advanced animations
- [ ] Enhanced interactive elements
- [ ] Advanced analytics
- [ ] Additional content types

---

## Design System Notes

### Consistency Requirements
- All buttons should follow the same padding, border-radius, and hover states
- Card components should have consistent spacing and shadow styles
- Section padding should be uniform across all sections
- Transition animations should use consistent timing (suggest: 300ms ease-in-out)

### Border Styles
- Gold borders: Suggest 2-3px solid `#FFD700`
- Rounded corners: TBD (suggest: 8px or 12px border-radius)

### Shadows
- Card shadows: Light yellow tint as specified
- Suggest: `box-shadow: 0 4px 12px rgba(255, 215, 0, 0.15)`

---

## Questions & Clarifications Needed

1. **Accent Green (#26C000)** - Where should this color be used?
2. **Navigation hover states** - What visual feedback for hover/active states?
3. **Footer design** - Complete specifications needed
4. **Animation preferences** - Fade in, slide, or other effects?
5. **Mobile navigation** - Hamburger menu style and behavior?
6. **Audio player design** - Custom design or embedded player?
7. **Search functionality** - Is search required? Where to place it?
8. **404 and error pages** - Design specifications needed

---

## References

- Design Guide PDF: `/docs/v2_request/Fireside_Tribe_Website_Design_Guide_Updated.pdf`
- Audio Feedback: `/docs/v2_request/shield_website_improvements.mp3`
- Current Site: [URL needed]

---

**Document Version:** 1.0
**Last Updated:** 2025-11-15
**Status:** Draft - Awaiting audio transcription and stakeholder review
