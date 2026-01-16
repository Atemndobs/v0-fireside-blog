"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"

interface FooterProps {
  logoUrl: string
}

export function Footer({ logoUrl }: FooterProps) {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Logo/Cover Image */}
          <div className="lg:col-span-3">
            <Link href="/" className="block">
              <img
                src={logoUrl}
                alt="The Fireside Tribe"
                className="w-48 h-auto object-cover"
              />
            </Link>
          </div>

          {/* Middle: Social + Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            {/* Follow Us */}
            <div>
              <h3 className="font-heading font-bold text-foreground uppercase tracking-[0.2em] text-sm mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                <SocialIcon href="https://facebook.com" icon={<Facebook className="w-5 h-5" />} />
                <SocialIcon href="https://instagram.com" icon={<Instagram className="w-5 h-5" />} />
                <SocialIcon href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
                <SocialIcon href="https://youtube.com" icon={<Youtube className="w-5 h-5" />} />
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-heading font-bold text-foreground uppercase tracking-[0.2em] text-sm mb-1">
                The Daily
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                A daily briefing on Cameroonian music and culture
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 bg-foreground text-background px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-success hover:bg-success/90 text-success-foreground font-bold px-6 py-3 text-sm uppercase tracking-wide transition-colors"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-muted-foreground/70 text-xs mt-3 leading-relaxed">
                By subscribing, you agree to our Terms of Use and Privacy Policy.
              </p>
            </div>
          </div>

          {/* Right: Have a Tip */}
          <div className="lg:col-span-4 lg:text-right">
            <h3 className="font-heading font-bold text-foreground uppercase tracking-[0.2em] text-sm mb-2">
              Have a Tip?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Share your music discoveries with us.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-border hover:border-foreground text-foreground px-6 py-3 text-sm uppercase tracking-wide transition-colors"
            >
              Send us a tip
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Fireside */}
            <div>
              <h4 className="font-heading font-bold text-foreground uppercase tracking-[0.15em] text-xs mb-5">
                Fireside
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/advertise">Advertise</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
              </nav>
            </div>

            {/* Content */}
            <div>
              <h4 className="font-heading font-bold text-foreground uppercase tracking-[0.15em] text-xs mb-5">
                Content
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/episodes">Episodes</FooterLink>
                <FooterLink href="/artists">Artists</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/charts">Charts</FooterLink>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading font-bold text-foreground uppercase tracking-[0.15em] text-xs mb-5">
                Legal
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Use</FooterLink>
                <FooterLink href="/cookies">Cookie Policy</FooterLink>
              </nav>
            </div>

            {/* Listen */}
            <div>
              <h4 className="font-heading font-bold text-foreground uppercase tracking-[0.15em] text-xs mb-5">
                Listen
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="https://open.spotify.com" external>Spotify</FooterLink>
                <FooterLink href="https://music.apple.com" external>Apple Podcasts</FooterLink>
                <FooterLink href="https://youtube.com" external>YouTube</FooterLink>
              </nav>
            </div>

            {/* Subscribe */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h4 className="font-heading font-bold text-foreground uppercase tracking-[0.15em] text-xs mb-5">
                Subscribe
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Never miss an episode
              </p>
              <Link
                href="/subscribe"
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5 py-2 text-sm uppercase tracking-wide transition-colors"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={logoUrl}
                alt="Fireside"
                className="h-8 w-8 rounded-full grayscale"
              />
              <p className="text-muted-foreground text-xs">
                &copy; {new Date().getFullYear()} The Fireside Tribe. All Rights Reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground text-xs">
                A celebration of Cameroonian music and culture
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-success hover:bg-success/90 flex items-center justify-center text-success-foreground transition-colors"
    >
      {icon}
    </a>
  )
}

function FooterLink({
  href,
  children,
  external = false
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
      {children}
    </Link>
  )
}
