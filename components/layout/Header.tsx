"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { MegaMenu } from "./MegaMenu"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import { AdminNavIcon } from "@/components/AdminNavIcon"

interface HeaderProps {
  logoUrl: string
  showAAAPage?: boolean
}

const navLinks = [
  { label: "Episodes", href: "/episodes" },
  { label: "Artists", href: "/artists" },
  { label: "Blog", href: "/blog" },
]

export function Header({ logoUrl, showAAAPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          {/* Left: Hamburger */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 -ml-2 hover:bg-secondary transition-colors rounded"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Center: Logo (absolute centered) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all">
                <img src={logoUrl} alt="The Fireside Tribe Logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-foreground hidden sm:inline">
                THE FIRESIDE TRIBE
              </span>
            </Link>
          </div>

          {/* Right: Nav Links + Actions (Pitchfork style) */}
          <div className="ml-auto flex items-center gap-4 md:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              {showAAAPage && (
                <Link
                  href="/AAA"
                  className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-80 transition-opacity"
                >
                  A³
                </Link>
              )}
            </nav>

            <ThemeSwitcher />

            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 hover:bg-secondary transition-colors rounded"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>

            <AdminNavIcon />
          </div>
        </div>
      </header>

      {/* Mega Menu Overlay */}
      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} showAAAPage={showAAAPage} />
    </>
  )
}
