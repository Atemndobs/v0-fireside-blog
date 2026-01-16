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

### CSS Design Tokens (Required)
**Always use design tokens from `globals.css` instead of hardcoded values.**

| ❌ Avoid                           | ✅ Use Instead                        |
| --------------------------------- | ------------------------------------ |
| `bg-black`, `bg-[#0a0a0a]`        | `bg-background`                      |
| `bg-[#171717]`, `bg-neutral-900`  | `bg-card` or `bg-secondary`          |
| `text-white`                      | `text-foreground`                    |
| `text-gray-400`, `text-[#a3a3a3]` | `text-muted-foreground`              |
| `text-red-500`, `border-red-500`  | `text-primary`, `border-primary`     |
| `rounded-lg`, `rounded-[8px]`     | `rounded-lg` (uses `--radius` token) |

**Exception**: Utility modifiers like `hover:text-white` or `opacity-50` are acceptable.

### Convex Patterns
- Define schema in `convex/schema.ts`
- Use `query` for reads, `mutation` for writes
- Integrate Clerk auth via `ctx.auth.getUserIdentity()`
- Handle loading/error states in consuming components

### Type Safety Guidelines
- **Avoid `as any`**: Use proper type definitions. If Convex returns `Id<"table">`, type it correctly.
- **Fallback Data**: When using fallback arrays, type them with the proper interface or use `satisfies` for type checking.
- **Convex IDs**: Never coerce IDs with `as any`. Use `Id<"tableName">` from `convex/_generated/dataModel`.

### Design System Components
Use the components in `components/design-system/` for all new UI work:

| Component           | Usage                                           |
| ------------------- | ----------------------------------------------- |
| `VideoCard`         | Episode/video grids (16:9, hover play)          |
| `ChartItem`         | Ranked lists (artists, charts)                  |
| `EditorialCard`     | Blog posts (featured/standard/compact variants) |
| `FeaturedVideoHero` | Full-width hero sections                        |
| `SectionHeader`     | Section titles with "See All" links             |
| `ArtistCircle`      | Trending artist avatars (horizontal scroll)     |

**Import from:** `@/components/design-system`

### Legacy Component Deprecation
The following components are **deprecated** and should not be used for new features:
- `components/podcast-card.tsx` → Use `VideoCard`
- `components/blog-card.tsx` → Use `EditorialCard`
- `components/artist-card.tsx` → Use `ChartItem` or `ArtistCircle`

These will be removed in a future cleanup pass.

## Feature Planning (Required)

Before implementing any new feature, **always create a planning document** in `docs/features/[feature-name]/`:

```
docs/features/[feature-name]/
├── README.md           # Concept overview and goals
├── ARCHITECTURE.md     # Technical architecture and data flow
└── IMPLEMENTATION.md   # Detailed implementation steps
```

**README.md** should include:
- Feature concept and user value
- Scope and requirements
- Success criteria

**ARCHITECTURE.md** should include:
- System design and component structure
- Data models and Convex schema changes
- API/query design
- Integration points

**IMPLEMENTATION.md** should include:
- Step-by-step implementation plan
- File changes required
- Testing approach
- Rollout strategy

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

### Deployment
The project is deployed to **Vercel**:
- Production deploys trigger on push to `main`
- Preview deploys for pull requests
- Environment variables configured in Vercel dashboard

## Designer Agent Skill

Use the **designer-agent** skill when implementing UI components. It acts as a design guardian ensuring consistency with Billboard's visual language.

**Invoke when:**
- Creating new pages or components
- Reviewing UI implementations
- Troubleshooting visual inconsistencies

**Skill location:** `.gemini/skills/designer-agent/SKILL.md`

**Example prompt:**
> "Using the designer-agent skill, review this Episodes page component for alignment with the Billboard design system."

### Design Reference Sites

| Reference                                                                              | Usage                     |
| -------------------------------------------------------------------------------------- | ------------------------- |
| [Billboard Video](https://www.billboard.com/video/)                                    | Episodes page layout      |
| [Billboard Hot 100](https://www.billboard.com/charts/hot-100/)                         | Chart/ranking styling     |
| [Pitchfork](https://pitchfork.com/)                                                    | Blog editorial typography |
| [Spotify Encore](https://spotify.design/article/reimagining-design-systems-at-spotify) | Token architecture        |
