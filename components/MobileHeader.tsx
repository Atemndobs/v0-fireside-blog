"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function MobileHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          aria-label="Open navigation menu"
          onClick={() => setMobileNavOpen(true)}
          type="button"
        >
          <Menu size={24} />
        </button>
      </div>
      {mobileNavOpen && (
        <nav
          className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center gap-8 text-2xl font-bold transition-all"
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close navigation menu"
            onClick={() => setMobileNavOpen(false)}
            type="button"
          >
            ×
          </button>
          <Link href="/" className="hover:text-red-500" onClick={() => setMobileNavOpen(false)}>HOME</Link>
          <Link href="/episodes" className="hover:text-red-500" onClick={() => setMobileNavOpen(false)}>EPISODES</Link>
          <Link href="/artists" className="hover:text-red-500" onClick={() => setMobileNavOpen(false)}>ARTISTS</Link>
          <Link href="/blog" className="hover:text-red-500" onClick={() => setMobileNavOpen(false)}>BLOG</Link>
          <Link href="/about" className="hover:text-red-500" onClick={() => setMobileNavOpen(false)}>ABOUT</Link>
          <Link href="/AAA" className="hover:text-purple-500" onClick={() => setMobileNavOpen(false)}>A³</Link>
        </nav>
      )}
    </>
  );
}
