"use client"

import Link from "next/link"
import { MenuSectionHeader } from "./MenuSectionHeader"

export interface MenuLink {
  label: string
  href: string
}

interface MenuSectionProps {
  title: string
  links: MenuLink[]
  onLinkClick?: () => void
}

export function MenuSection({ title, links, onLinkClick }: MenuSectionProps) {
  return (
    <div>
      <MenuSectionHeader title={title} />
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
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
