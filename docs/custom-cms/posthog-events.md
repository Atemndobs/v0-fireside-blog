# PostHog Event Reference

The application now emits normalized page-level events so we can answer “how many visitors hit the landing page?” and similar questions without additional manual wiring.

## Emitted Automatically

| Event | Purpose | Key Properties |
|-------|---------|----------------|
| `$pageview` | Native PostHog event for every route change. | `$current_url`, `$pathname`, `$search` |
| `fireside_page_view` | Custom event for all routes (landing, episodes, artists, blog, etc.). | `page_name`, `page_group`, `path`, `url`, `referrer`, `title`, `viewport_width`, `viewport_height`, `device_category` |
| `landing_page_view` | Fired in addition to `fireside_page_view` when `path === "/"` to power landing-only dashboards. | Same as above + `is_landing: true` |

### Page Groups
- `home` → `/`
- `episodes` → `/episodes` routes
- `artists` → `/artists` routes
- `blog` → `/blog` routes
- `about`, `AAA`, etc. derived from the first path segment.

## Adding More Events

1. Mark the component as a client module with `"use client"` if it is not already.
2. Import PostHog and call `capture` on user interactions:

```tsx
"use client"
import { usePostHog } from "posthog-js/react"

export const SubscribeButton = () => {
  const posthog = usePostHog()

  const handleClick = () => {
    posthog?.capture("newsletter_cta_click", { location: "Home Hero" })
  }

  return <button onClick={handleClick}>Subscribe</button>
}
```

3. Mirror the new event name + properties in your PostHog dashboard definitions.

These helpers build on the shared PostHog provider, so no additional configuration is required—just call `posthog.capture` anywhere inside the React tree. Let the analytics squad know when new events are added so dashboards can be updated.
