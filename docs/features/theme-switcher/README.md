# Theme Switcher

## Concept
Add a light/dark theme toggle to Fireside Tribe, allowing users to switch between the premium dark mode (Billboard-inspired) and a clean light mode. The dark theme remains the default.

## Architecture

### Theme System
- **Provider**: `next-themes` (already installed)
- **Strategy**: CSS class-based (`.light` / `.dark` on `<html>`)
- **Storage**: localStorage (persists user preference)
- **Default**: Dark theme

### CSS Structure
```
globals.css
├── :root (dark theme variables - default)
└── .light (light theme variables - override)
```

### Component
```
components/ThemeSwitcher.tsx
├── Uses useTheme() from next-themes
├── Sun/Moon icons from lucide-react
└── Handles hydration mismatch with mounted state
```

## Implementation Plan

### Phase 1: CSS Variables
**File:** `app/globals.css`

| Task | Status |
|------|--------|
| Keep `:root` as dark theme (default) | ✅ Done |
| Add `.light` class with light theme variables | ✅ Done |
| Update heading/body styles to use semantic colors | ✅ Done |

### Phase 2: ThemeSwitcher Component
**File:** `components/ThemeSwitcher.tsx`

| Task | Status |
|------|--------|
| Create client component with useTheme hook | ✅ Done |
| Add Sun/Moon icon toggle | ✅ Done |
| Handle SSR hydration (mounted state) | ✅ Done |

### Phase 3: Integration
**File:** `app/layout.tsx`

| Task | Status |
|------|--------|
| Update ThemeProvider to allow system preference | ✅ Done |
| Add ThemeSwitcher to header navigation | ✅ Done |
| Update header/footer to use semantic colors | ✅ Done |

## Dependencies
- `next-themes` - Already installed
- `lucide-react` - Already installed (Sun, Moon icons)

## Files to Modify
1. `app/globals.css` - Add light theme variables
2. `components/ThemeSwitcher.tsx` - New component
3. `app/layout.tsx` - Add switcher to header

## Testing
- [ ] Toggle switches between light/dark
- [ ] Preference persists on refresh
- [ ] No hydration mismatch flash
- [ ] All components adapt to theme
