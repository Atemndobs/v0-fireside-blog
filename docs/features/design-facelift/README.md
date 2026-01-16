# Design Facelift: Premium Dark Mode

## Concept Overview
Transform Fireside Tribe from its current "Neobrutalist" aesthetic to a premium, entertainment-industry standard design language. The new design merges the visual impact of [Billboard](https://www.billboard.com/), the editorial elegance of [Pitchfork](https://pitchfork.com/), and the systematic consistency of [Spotify Encore](https://spotify.design/).

## Goals
1. **Visual Overhaul**: Replace thick borders and neo-brutal shadows with sleek, flat, dark-mode surfaces.
2. **Premium Feel**: Use deep blacks (`#0a0a0a`), vibrant accents (`#ef4444`), and high-end typography.
3. **Content First**: shift focus to large imagery (16:9 video thumbnails) and clean typography.
4. **Mobile Excellence**: Ensure a native-app-like experience on mobile (PWA).

## Requirements

### Visual Identity
- **Theme**: Dark Mode default (Deep Black backgrounds).
- **Typography**:
  - Headings: Bold, condensed (Billboard style) - `Inter` (tight tracking) or `Oswald`.
  - Body: Clean sans-serif (`Inter`).
  - Editorial: Serif for blog articles.
- **Color Palette**:
  - Background: `#0a0a0a` (Base), `#171717` (Surface).
  - Accent: `#FF0025` (Billboard Red - Vivid).
  - Text: `#ffffff` (Primary), `#a3a3a3` (Secondary).
- **Shapes & Forms**:
  - **Cards**: Sharp corners (0px radius) or minimal (2px). No large rounded corners (previous mockups were too rounded).
  - **Charts**: List-based layouts, not grid cards. Numbered positions are prominent.
  - **Borders**: Subtle 1px borders for structure, matching Billboard's grid feel.

### Key Pages
1. **Episodes (Video Hub)**: Billboard Video style. Featured hero + category grids.
2. **Blog (Editorial)**: Pitchfork style. Elegant typography, whitespace, author focus.
3. **Charts/Rankings**: Billboard Hot 100 style. Numbered lists with status badges.
4. **Home**: Dynamic mix of the above.

## Success Criteria
- [ ] Global CSS variables updated to new color tokens.
- [ ] "Neobrutalist" artifacts (thick borders, brutal shadows) removed.
- [ ] Episodes page matches Billboard Video layout structure.
- [ ] Blog page matches Pitchfork typography hierarchy.
- [ ] Mobile navigation and layout feels like a native app.

## Mockups
Visual references for the target design direction:

### Episodes Page (Desktop)
![Episodes Mockup](./mockup_episodes.png)

### Blog Page (Desktop)
![Blog Mockup](./mockup_blog.png)

### Home Page (Mobile PWA)
![Mobile Home Mockup](./mockup_home_mobile.png)
