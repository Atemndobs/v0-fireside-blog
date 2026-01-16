---
name: design-system
description: Billboard-inspired design patterns for implementing UI components with video grids, chart layouts, section headers, color tokens, spacing, and Framer Motion animations. Use for episodes page, artist cards, rankings.
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Design System Skill

Guidance for implementing Billboard-inspired UI patterns in the Fireside Tribe project.

## Episodes/Video Grid Layout

Model after [Billboard Video Page](https://www.billboard.com/video/):

### Featured Video Hero
```tsx
<section className="relative w-full aspect-video max-h-[70vh]">
  <Image src={episode.thumbnail} fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
  <div className="absolute bottom-0 p-8 space-y-4">
    <Badge>Featured</Badge>
    <h1 className="text-4xl font-bold">{episode.title}</h1>
    <p className="text-gray-300 max-w-2xl">{episode.description}</p>
  </div>
</section>
```

### Video Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {episodes.map((ep) => (
    <VideoCard key={ep._id} episode={ep} />
  ))}
</div>
```

### Video Card Component
```tsx
<article className="group cursor-pointer">
  <div className="relative aspect-video rounded-lg overflow-hidden">
    <Image src={ep.thumbnail} fill className="object-cover transition-transform group-hover:scale-105" />
    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-sm rounded">
      {ep.duration}
    </div>
  </div>
  <div className="mt-3 space-y-1">
    <h3 className="font-semibold line-clamp-2 group-hover:text-red-500 transition-colors">
      {ep.title}
    </h3>
    <p className="text-sm text-gray-400">{ep.publishedAt}</p>
  </div>
</article>
```

## Chart-Style Rankings

For featuring top episodes or artists:

```tsx
<ol className="space-y-4">
  {items.map((item, index) => (
    <li key={item._id} className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg">
      <span className="text-3xl font-bold text-gray-500 w-12 text-center">
        {index + 1}
      </span>
      <Image src={item.image} width={64} height={64} className="rounded" />
      <div className="flex-1">
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-sm text-gray-400">{item.subtitle}</p>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">Peak: #{item.peak}</Badge>
        <Badge variant="outline">Weeks: {item.weeks}</Badge>
      </div>
    </li>
  ))}
</ol>
```

## Section Headers

Billboard-style section headers with "See All" links:

```tsx
<div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold uppercase tracking-wide">{title}</h2>
  <Link href={seeAllHref} className="text-red-500 hover:underline text-sm font-medium">
    See All →
  </Link>
</div>
```

## Color Tokens

```css
:root {
  --background: #0a0a0a;
  --surface: #171717;
  --surface-elevated: #262626;
  --accent: #ef4444;
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-muted: #525252;
}
```

## Responsive Breakpoints

Follow TailwindCSS defaults:
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (wide desktop)

## Motion Guidelines

Use Framer Motion with subtle, performant animations:

```tsx
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

<motion.div variants={cardVariants} initial="hidden" animate="visible">
  {/* content */}
</motion.div>
```
