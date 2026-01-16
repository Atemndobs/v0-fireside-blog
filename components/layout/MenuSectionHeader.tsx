"use client"

interface MenuSectionHeaderProps {
  title: string
}

export function MenuSectionHeader({ title }: MenuSectionHeaderProps) {
  return (
    <h3 className="flex items-center gap-2 mb-4">
      <span className="w-1 h-4 bg-primary" />
      <span className="font-heading text-sm font-extrabold uppercase tracking-wider text-foreground">
        {title}
      </span>
    </h3>
  )
}
