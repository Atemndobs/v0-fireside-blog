# Billboard Header & Mega Menu Design Guide

Reference screenshots from billboard.com analyzed for Fireside Tribe implementation.

---

## Header Anatomy

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [☰]  LOGO    Charts  Music  Video  Awards  Business   [SUBSCRIBE] [LOGIN] [🔍] │
│  ↑     ↑       └─────────── Nav Links ───────────┘        ↑         ↑      ↑   │
│ Menu  Logo                                              CTA     Secondary  Search│
└──────────────────────────────────────────────────────────────────────────────┘
```

### Key Elements
- **Hamburger menu**: Triggers mega menu (both mobile + desktop)
- **Logo**: Bold wordmark, links to home
- **Primary nav**: Hidden on mobile, visible md+
- **CTA buttons**: Subscribe (filled), Login (outlined)
- **Search icon**: Opens search overlay or mega menu

---

## Mega Menu Anatomy

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  LOGO               [  🔍  Search                              ]        [✕]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  █ CHARTS           █ MUSIC            █ VIDEOS           █ CULTURE         │
│    All Charts         Music News         Events             Events          │
│    Hot 100™           Pop                Lifestyle          Lifestyle       │
│    Billboard 200™     R&B/Hip-Hop        Politics           Politics        │
│    Global 200         Latin              TV/Film            TV/Film         │
│                                                                              │
│  █ MEDIA            █ BUSINESS         █ PRO TOOLS        █ ESPAÑOL        │
│    Lists              Business News      Songwriters         Noticias       │
│    Photos             Legal              Song Index          Música         │
│    Podcasts           Touring            Artist Index        Negocios       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Key Patterns
- **Light background**: `#f5f5f5` contrasts with dark header
- **Prominent search**: Centered, full-width input
- **Section headers**: Bold condensed uppercase with left accent bar
- **Links**: Regular weight, muted color, hover to foreground
- **Close button**: X icon with accent hover state

---

## CSS Tokens

```css
:root {
  /* Header heights */
  --header-height-mobile: 56px;
  --header-height-desktop: 64px;

  /* Menu backgrounds */
  --menu-bg-light: #f5f5f5;  /* Mega menu backdrop */
  --menu-bg-dark: #0a0a0a;   /* Header bar */

  /* Typography for menu */
  --menu-heading-size: 14px;
  --menu-heading-weight: 800;
  --menu-heading-tracking: 0.05em;
  --menu-link-size: 14px;
  --menu-link-weight: 400;

  /* Accent bar (Billboard uses green, Fireside uses red) */
  --menu-accent: hsl(var(--primary));
}
```

---

## Component Implementations

### Section Header with Accent Bar

```tsx
// components/layout/MenuSectionHeader.tsx
interface MenuSectionHeaderProps {
  title: string
}

export function MenuSectionHeader({ title }: MenuSectionHeaderProps) {
  return (
    <h3 className="flex items-center gap-2 mb-4">
      <span className="w-1 h-4 bg-primary" /> {/* Accent bar */}
      <span className="font-heading text-sm font-extrabold uppercase tracking-wider text-foreground">
        {title}
      </span>
    </h3>
  )
}
```

### Mega Menu Layout

```tsx
// components/layout/MegaMenu.tsx
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 top-[var(--header-height-desktop)] z-50 bg-[#f5f5f5] dark:bg-secondary overflow-auto"
        >
          <div className="container mx-auto px-4 py-8">
            {/* Search Bar */}
            <div className="flex items-center justify-between mb-12">
              <Logo />
              <div className="flex-1 max-w-xl mx-8">
                <SearchInput placeholder="Search" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/10 transition-colors rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <MenuSection title="EPISODES" links={episodeLinks} />
              <MenuSection title="ARTISTS" links={artistLinks} />
              <MenuSection title="BLOG" links={blogLinks} />
              <MenuSection title="ABOUT" links={aboutLinks} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Menu Section with Links

```tsx
// components/layout/MenuSection.tsx
interface MenuLink {
  label: string
  href: string
}

interface MenuSectionProps {
  title: string
  links: MenuLink[]
}

export function MenuSection({ title, links }: MenuSectionProps) {
  return (
    <div>
      <MenuSectionHeader title={title} />
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Header Nav Links

```tsx
// Billboard-style nav links
<nav className="hidden md:flex items-center gap-6">
  {navLinks.map(link => (
    <Link
      key={link.href}
      href={link.href}
      className="text-foreground font-medium text-sm hover:text-primary transition-colors"
    >
      {link.label}
    </Link>
  ))}
</nav>
```

### CTA Button Styles

```tsx
// Subscribe button (filled)
<Button className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold uppercase text-xs px-4 py-2">
  Subscribe
</Button>

// Login button (outlined)
<Button
  variant="outline"
  className="border-foreground text-foreground hover:bg-foreground hover:text-background font-bold uppercase text-xs px-4 py-2"
>
  Login
</Button>
```

---

## Design Mapping: Billboard → Fireside

| Element | Billboard | Fireside |
|---------|-----------|----------|
| **Accent Color** | Green (#4ade80) | Red (`hsl(var(--primary))`) |
| **Menu BG** | Light gray (#f5f5f5) | `bg-secondary` or `#f5f5f5` |
| **Section Headers** | Bold condensed uppercase | `font-heading font-extrabold uppercase` |
| **Accent Bar** | Left border on sections | `w-1 h-4 bg-primary` |
| **Links** | Regular, muted, hover dark | `text-muted-foreground hover:text-foreground` |
| **Search** | Centered, prominent | Full-width input with icon |
| **Close Button** | X with accent hover | `hover:bg-primary/10` |

---

## File Structure

```
components/
├── layout/
│   ├── Header.tsx           # Main header component
│   ├── MegaMenu.tsx         # Expanded navigation overlay
│   ├── MenuSection.tsx      # Category section with links
│   ├── MenuSectionHeader.tsx # Accented section title
│   ├── MobileNav.tsx        # Mobile drawer navigation
│   └── SearchInput.tsx      # Search bar component
```

---

## Fireside Menu Categories

Suggested structure for Fireside Tribe mega menu:

### EPISODES
- All Episodes
- Latest
- Popular
- By Series

### ARTISTS
- All Artists
- Featured
- New Artists
- By Genre

### BLOG
- News & Editorial
- Interviews
- Reviews
- Culture

### ABOUT
- A³ Initiative
- Our Mission
- Contact
- Social Links

---

## Animation Specs

```tsx
// Mega menu entrance
const menuAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2, ease: "easeOut" }
}

// Link hover
const linkHover = {
  transition: "colors",
  duration: "150ms"
}
```

---

## Responsive Behavior

| Breakpoint | Header | Menu |
|------------|--------|------|
| **Mobile** (<768px) | Hamburger + Logo + Search | Full-screen overlay, 2 columns |
| **Tablet** (768-1024px) | Hamburger + Logo + Some nav + Search | Full-screen, 3 columns |
| **Desktop** (>1024px) | Full nav visible, hamburger for mega menu | Fixed overlay, 4 columns |
