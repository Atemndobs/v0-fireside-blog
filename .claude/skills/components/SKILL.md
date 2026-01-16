---
name: components
description: React component development patterns with Radix UI primitives, TailwindCSS styling, shadcn/ui, react-hook-form with zod validation, Framer Motion animations, loading skeletons, and responsive layouts.
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Component Development Skill

Guidance for building UI components in Fireside Tribe.

## CRITICAL Rules

### 1. Always Use Theme Tokens (NEVER hardcode colors)

```typescript
// ❌ BAD
className="bg-[#0a0a0a] text-white border-gray-700"

// ✅ GOOD
className="bg-background text-foreground border-border"
```

### 2. Use `id` not `_id` for Data Props

```typescript
// ❌ BAD - Convex internal field
interface Props {
  items: Array<{ _id: string; title: string }>
}
items.map(item => <Card key={item._id} />)

// ✅ GOOD - Normalized field name
interface Props {
  items: Array<{ id: string; title: string }>
}
items.map(item => <Card key={item.id} />)
```

### 3. Fallback Data Must Match Query Shape

```typescript
// Fallback data should use same field names as Convex queries
const fallbackItems = [
  { id: "1", title: "Example", slug: "example" },  // id, not _id
  { id: "2", title: "Another", slug: "another" },
]

const items = queryResult.length > 0 ? queryResult : fallbackItems
```

---

## Base Component Pattern

Use shadcn/ui pattern with Radix + TailwindCSS:

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-zinc-700 hover:bg-zinc-800",
        ghost: "hover:bg-zinc-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";
```

## Form Pattern with react-hook-form + zod

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtubeId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube ID"),
});

type FormValues = z.infer<typeof formSchema>;

export function EpisodeForm() {
  const createEpisode = useMutation(api.episodes.createEpisode);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", youtubeId: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createEpisode(data);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...form.register("title")} />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
        )}
      </div>
      {/* More fields... */}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
```

## Animation Patterns with Framer Motion

### Fade In on Mount
```typescript
import { motion } from "framer-motion";

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered List Animation
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function AnimatedList({ items }: { items: Item[] }) {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Hover Scale Effect
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  <Card>{/* content */}</Card>
</motion.div>
```

## Loading States

```typescript
import { Skeleton } from "@/components/ui/skeleton";

export function EpisodeCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-video rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function EpisodeListLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <EpisodeCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

## Responsive Patterns

```typescript
// Use Tailwind responsive prefixes
<div className="
  grid
  grid-cols-1      // mobile: 1 column
  sm:grid-cols-2   // 640px+: 2 columns
  lg:grid-cols-3   // 1024px+: 3 columns
  xl:grid-cols-4   // 1280px+: 4 columns
  gap-4
  sm:gap-6
">
  {items.map((item) => <Card key={item.id} />)}
</div>
```
