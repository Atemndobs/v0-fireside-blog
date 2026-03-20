export const dynamic = "force-dynamic"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import "../fonts.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/posthog-provider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { isContentLive } from "@/lib/config/publishing"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import { getAAAPagePublishingWindow } from "@/lib/repositories/pages"
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "The Fireside Tribe - Cameroonian Afrobeats Music Blog",
    description: "Celebrating and promoting Cameroonian music and the Fireside Tribe podcast",
    generator: "v0.dev",
    manifest: "/icons/manifest.json",
    themeColor: "#000000",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black",
        title: "The Fireside Tribe",
    },
    icons: {
        icon: [
            { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
            { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
            { url: "/icons/favicon-circle-512.png", type: "image/png", sizes: "512x512" },
        ],
        apple: [{ url: "/icons/apple-icon-180x180.png", sizes: "180x180" }],
        shortcut: ["/icons/favicon-circle-512.png"],
    },
}

export default async function FrontendLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const logoUrl = "/images/Logo design.jpg"

    let showAAAPage = false;
    try {
        const publishWindow = await getAAAPagePublishingWindow()
        showAAAPage = isContentLive(publishWindow)
    } catch (error) {
        console.log("AAA page publishing check failed (expected during migration)")
    }
    const { artists: showArtistsPage, blog: showBlogPage } = publicContentVisibility

    return (
        <ClerkProvider>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
        `,
                }}
            />
            <div className={inter.className + " font-paragraph"}>
                <ConvexClientProvider>
                    <AnalyticsProvider>
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                            <Header
                                logoUrl={logoUrl}
                                showAAAPage={showAAAPage}
                                showArtistsPage={showArtistsPage}
                                showBlogPage={showBlogPage}
                            />
                            <main className="pt-16 min-h-screen">
                                {children}
                            </main>
                            <Footer logoUrl={logoUrl} showArtistsPage={showArtistsPage} showBlogPage={showBlogPage} />
                        </ThemeProvider>
                    </AnalyticsProvider>
                </ConvexClientProvider>
            </div>
        </ClerkProvider>
    )
}
