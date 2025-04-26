import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Headphones, Menu } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Fireside Tribe - Cameroonian Afrobeats Music Blog",
  description: "Celebrating and promoting Cameroonian music and the Fireside Tribe podcast",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/icons/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="The Fireside Tribe" />
        <meta name="description" content="Celebrating and promoting Cameroonian music and the Fireside Tribe podcast" />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
        ` }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="bg-black text-white py-4 px-4 border-b-4 border-red-500 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <Headphones size={24} className="text-red-500" />
                <span className="font-black text-xl">THE FIRESIDE TRIBE</span>
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="font-bold hover:text-red-500 transition-colors">
                  HOME
                </Link>
                <Link href="/episodes" className="font-bold hover:text-red-500 transition-colors">
                  EPISODES
                </Link>
                <Link href="/artists" className="font-bold hover:text-red-500 transition-colors">
                  ARTISTS
                </Link>
                <Link href="/blog" className="font-bold hover:text-red-500 transition-colors">
                  BLOG
                </Link>
                <Link href="/about" className="font-bold hover:text-red-500 transition-colors">
                  ABOUT
                </Link>
                <Link href="/AAA" className="font-bold hover:text-purple-500 transition-colors">
                  A³
                </Link>
              </nav>

              <div className="md:hidden">
                <button className="text-white">
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </header>

          {children}

          <footer className="bg-black text-white py-12 px-4 border-t-8 border-red-500">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Headphones size={24} className="text-red-500" />
                  <span className="font-black text-xl">THE FIRESIDE TRIBE</span>
                </Link>
                <p className="text-gray-400">
                  Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist
                  features.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 border-b-2 border-red-500 pb-2">QUICK LINKS</h3>
                <nav className="flex flex-col gap-2">
                  <Link href="/" className="hover:text-red-500 transition-colors">
                    Home
                  </Link>
                  <Link href="/episodes" className="hover:text-red-500 transition-colors">
                    Episodes
                  </Link>
                  <Link href="/artists" className="hover:text-red-500 transition-colors">
                    Artists
                  </Link>
                  <Link href="/blog" className="hover:text-red-500 transition-colors">
                    Blog
                  </Link>
                  <Link href="/about" className="hover:text-red-500 transition-colors">
                    About
                  </Link>
                  <Link href="/AAA" className="hover:text-purple-500 transition-colors">
                    A³
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 border-b-2 border-red-500 pb-2">CONNECT</h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://open.spotify.com/show/yourpodcast"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                  >
                    Spotify
                  </a>
                  <a
                    href="https://youtube.com/channel/yourchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://instagram.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
              <p> {new Date().getFullYear()} The Fireside Tribe. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
