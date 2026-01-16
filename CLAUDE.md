# Fireside Tribe - Project Rules

## Project Overview
**Fireside Tribe** is a podcast and blog platform PWA featuring episodes, artists, blog posts, and an "About" section for the A³ initiative.

## Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19
- **Backend**: Convex (serverless database & functions)
- **Auth**: Clerk (SSO, user management)
- **Styling**: TailwindCSS with Radix UI primitives
- **Forms**: react-hook-form + zod validation
- **Animation**: Framer Motion
- **Analytics**: PostHog

## Design System Guidelines

### Primary Reference: Billboard
Model the visual design after [Billboard](https://www.billboard.com/), focusing on:

**Episodes Page** (like [Billboard Video](https://www.billboard.com/video/)):
- Featured video hero with large thumbnail
- Grid layout with video cards (16:9 aspect ratio)
- Category-based sections (Billboard News, Takes Us Out, etc.)
- Clean typography with bold headlines
- Black/dark backgrounds with strong contrast

**Chart-Style Rankings**:
- Numbered list layouts with position indicators
- Debut position, peak position badges
- Artist/episode metadata cards

### Secondary References

**Pitchfork** (Blog/Editorial):
- Editorial typography with generous whitespace
- Strong headline hierarchy
- Review-style content layouts

**Spotify Encore** (Design Tokens):
- Token-based design system approach
- Foundation tokens: color, typography, spacing, motion
- Component-level consistency
- Scalable across platforms

### Color Palette
```
Primary:    #1a1a1a (near-black backgrounds)
Accent:     #ff0000 (Billboard red)
Text:       #ffffff (headings), #a3a3a3 (secondary)
Surface:    #262626 (cards), #171717 (elevated)
```

### Typography
- **Headlines**: Bold, condensed, uppercase for impact
- **Body**: Clean sans-serif (Inter/system)
- **Editorial**: Serif for blog content emphasis

## Code Conventions

### Styling Rules (MANDATORY)

**NEVER hardcode colors.** Always use Tailwind theme tokens defined in `globals.css` and `tailwind.config.ts`.

```typescript
// ❌ BAD - Hardcoded colors
<div className="bg-[#0a0a0a] text-[#ffffff] border-[#262626]">
<button className="bg-[#22c55e] text-black">

// ✅ GOOD - Theme tokens
<div className="bg-background text-foreground border-border">
<button className="bg-success text-success-foreground">
```

**Available theme tokens:**
| Token | Usage |
|-------|-------|
| `bg-background` | Page backgrounds |
| `bg-card` | Card/elevated surfaces |
| `bg-secondary` | Secondary surfaces |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary/body text |
| `border-border` | All borders |
| `bg-primary` / `text-primary-foreground` | Primary CTA (red) |
| `bg-success` / `text-success-foreground` | Positive CTA (green) |
| `bg-destructive` | Danger/delete actions |

**Why this matters:**
- Enables light/dark mode switching
- Single source of truth for design changes
- Consistent visual language across components

### Data Field Conventions

**Use `id` not `_id` in component props and fallback data.** Convex queries should transform `_id` to `id` for consistency.

```typescript
// ❌ BAD - Using Convex internal field name
episodes.map(ep => <Card key={ep._id} />)
episodes.filter(e => e._id !== featured._id)

// ✅ GOOD - Normalized field name
episodes.map(ep => <Card key={ep.id} />)
episodes.filter(e => e.id !== featured.id)
```

**Convex queries must return normalized data:**
```typescript
// In convex/queries.ts
return results.map((item) => ({
  id: item._id,  // Transform _id to id
  title: item.title,
  // ... other fields
}));
```

### File Organization
```
app/                    # Next.js App Router pages
├── admin/              # Protected admin routes
├── (public)/           # Public-facing pages
components/             # Reusable UI components
├── ui/                 # Base components (shadcn/ui)
├── [feature]/          # Feature-specific components
convex/                 # Convex backend
├── schema.ts           # Database schema
├── [resource].ts       # Queries/mutations per resource
lib/                    # Utilities and helpers
hooks/                  # Custom React hooks
```

### Component Patterns
- Use Radix UI primitives with TailwindCSS styling
- Prefer composition over prop drilling
- Keep components focused and single-purpose
- Use `cn()` for conditional class merging

### Convex Patterns
- Define schema in `convex/schema.ts`
- Use `query` for reads, `mutation` for writes
- Integrate Clerk auth via `ctx.auth.getUserIdentity()`
- Handle loading/error states in consuming components

## Development Workflows

### Local Development
```bash
npm run dev          # Start Next.js dev server
npx convex dev       # Start Convex dev server (separate terminal)
```

### Scripts
```bash
npm run sync:episodes    # Sync YouTube → Convex
npm run fix:images       # Fix image URLs
npm run build            # Production build
```

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## Skills (Auto-Triggered)

Skills are automatically invoked by Claude based on context. Located in `.claude/skills/`:

### `design-system`
Billboard-inspired design patterns for implementing UI components with video grids, chart layouts, and editorial typography.

**Triggered when:**
- Building video grid layouts
- Implementing chart-style rankings
- Styling section headers
- Working with color tokens and spacing

### `convex-patterns`
Backend patterns for Convex queries, mutations, and Clerk authentication integration.

**Triggered when:**
- Creating new database tables
- Writing queries or mutations
- Implementing authentication checks
- Integrating Convex with React components

### `components`
Patterns for building React components with Radix UI, TailwindCSS, react-hook-form, and Framer Motion.

**Triggered when:**
- Building form components
- Adding animations
- Creating loading states
- Implementing responsive layouts

### `designer-agent`
Design guardian and reviewer that ensures UI implementations align with Billboard's visual language.

**Triggered when:**
- Creating new pages or components
- Reviewing UI implementations
- Troubleshooting visual inconsistencies
- Need design approval/feedback

### Design Reference Sites

| Reference                                                                              | Usage                     |
| -------------------------------------------------------------------------------------- | ------------------------- |
| [Billboard Video](https://www.billboard.com/video/)                                    | Episodes page layout      |
| [Billboard Hot 100](https://www.billboard.com/charts/hot-100/)                         | Chart/ranking styling     |
| [Pitchfork](https://pitchfork.com/)                                                    | Blog editorial typography |
| [Spotify Encore](https://spotify.design/article/reimagining-design-systems-at-spotify) | Token architecture        |

## Best Practices

### Code Quality
- Always read existing code before making changes
- Prefer editing existing files over creating new ones
- Keep changes focused and minimal - avoid over-engineering
- Use TypeScript strictly with proper type definitions

### UI Implementation
- Test on mobile, tablet, and desktop breakpoints
- Ensure proper contrast ratios (WCAG AA minimum)
- Use skeleton loaders that match component structure
- Keep animations subtle (150-300ms, ease-out curves)

### Feature Planning & Documentation
Before implementing any new feature, Claude must create a planning document stored in `docs/features/[feature-name]/`:

**Required Structure:**
```
docs/features/[feature-name]/
├── README.md           # Main planning document
└── assets/             # Diagrams, mockups (if needed)
```

**README.md must include:**
1. **Concept** - What the feature does and why it's needed
2. **Architecture** - Technical design, data flow, component structure
3. **Implementation Plan** - Step-by-step tasks with file changes
4. **Dependencies** - External packages, APIs, or existing code affected

This documentation should be created and reviewed before any code changes begin.

### Git Workflow
- Write concise, descriptive commit messages
- Keep commits focused on single logical changes
- Test build before pushing
