"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { MenuSection, type MenuLink } from "./MenuSection"
import { SearchInput } from "./SearchInput"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  showAAAPage?: boolean
}

const episodeLinks: MenuLink[] = [
  { label: "All Episodes", href: "/episodes" },
  { label: "Latest", href: "/episodes?sort=latest" },
  { label: "Popular", href: "/episodes?sort=popular" },
]

const artistLinks: MenuLink[] = [
  { label: "All Artists", href: "/artists" },
  { label: "Featured", href: "/artists?filter=featured" },
]

const blogLinks: MenuLink[] = [
  { label: "News & Editorial", href: "/blog" },
  { label: "Interviews", href: "/blog?category=interviews" },
  { label: "Reviews", href: "/blog?category=reviews" },
]

const aboutLinks: MenuLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function MegaMenu({ isOpen, onClose, showAAAPage }: MegaMenuProps) {
  const handleLinkClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-50 bg-secondary dark:bg-card overflow-auto max-h-[calc(100vh-4rem)]"
          >
            <div className="container mx-auto px-4 py-8">
              {/* Top Row: Logo + Search + Close */}
              <div className="flex items-center justify-between gap-4 mb-12">
                <Link href="/" onClick={handleLinkClick} className="font-heading font-bold text-xl text-foreground">
                  THE FIRESIDE TRIBE
                </Link>

                <div className="flex-1 max-w-xl mx-4 hidden md:block">
                  <SearchInput placeholder="Search episodes, artists, blog..." />
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-primary/10 transition-colors rounded"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="md:hidden mb-8">
                <SearchInput placeholder="Search..." />
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <MenuSection title="EPISODES" links={episodeLinks} onLinkClick={handleLinkClick} />
                <MenuSection title="ARTISTS" links={artistLinks} onLinkClick={handleLinkClick} />
                <MenuSection title="BLOG" links={blogLinks} onLinkClick={handleLinkClick} />
                <MenuSection
                  title="ABOUT"
                  links={showAAAPage ? [...aboutLinks, { label: "A³ Initiative", href: "/AAA" }] : aboutLinks}
                  onLinkClick={handleLinkClick}
                />
              </div>

              {/* Bottom: Social Links or Newsletter */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <p className="text-muted-foreground text-sm">
                    The pulse of Cameroonian Afrobeats. Celebrating culture, music, and stories.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      YouTube
                    </Link>
                    <Link
                      href="https://spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Spotify
                    </Link>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
