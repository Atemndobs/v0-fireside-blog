import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  const quickLinks = [
    {
      title: "Episodes",
      description: "Manage Spotify sync, transcripts, and featured episodes on the homepage.",
      href: "/admin/episodes",
    },
    {
      title: "Artists",
      description: "Curate artist spotlights, bios, and imagery for the site.",
      href: "/admin/artists",
    },
    {
      title: "Blog posts",
      description: "Publish editorial content and sync it with the public blog.",
      href: "/admin/blog",
    },
    {
      title: "About page",
      description: "Update the mission, story, and CTA copy on /about.",
      href: "/admin/about",
    },
    {
      title: "A³ page",
      description: "Edit quotes, hero copy, and Triple-A team profiles.",
      href: "/admin/aaa",
    },
  ]

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Control Room</p>
        <h1 className="text-3xl font-black">Welcome back to the Fireside CMS</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Kick off a Spotify sync, upload transcripts from Riverside, or curate new homepage features. All changes you
          make here flow directly into the public site via Supabase.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Card key={link.href} className="border-slate-800 bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>{link.title}</CardTitle>
              <CardDescription className="text-slate-300">{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={link.href} className="text-sm font-semibold text-red-400 hover:text-red-300">
                Go to {link.title} →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
