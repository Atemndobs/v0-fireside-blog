import type { ReactNode } from "react"
import type { Metadata } from "next"
import { AdminServiceWorkerRegister } from "@/components/AdminServiceWorkerRegister"

export const metadata: Metadata = {
  title: "Fireside Admin Dashboard",
  description: "Manage Fireside Tribe content, posts, artists, and episodes anywhere.",
  manifest: "/admin/manifest.json",
  themeColor: "#0b0b0f",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "Fireside Admin Dashboard",
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

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminServiceWorkerRegister />
      {children}
    </>
  )
}
