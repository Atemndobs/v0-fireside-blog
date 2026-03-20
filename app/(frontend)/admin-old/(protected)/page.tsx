import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music4, Users2, Newspaper, Info, Sparkles, UserPlus, Share2 } from "lucide-react"

export default function AdminDashboardPage() {
  const quickLinks = [
    {
      title: "Episodes",
      description: "Manage Spotify sync, transcripts, and featured episodes on the homepage.",
      href: "/admin/episodes",
      icon: Music4,
    },
    {
      title: "Artists",
      description: "Curate artist spotlights, bios, and imagery for the site.",
      href: "/admin/artists",
      icon: Users2,
    },
    {
      title: "Blog posts",
      description: "Publish editorial content and sync it with the public blog.",
      href: "/admin/blog",
      icon: Newspaper,
    },
    {
      title: "About page",
      description: "Update the mission, story, and CTA copy on /about.",
      href: "/admin/about",
      icon: Info,
    },
    {
      title: "A³ page",
      description: "Edit quotes, hero copy, and Triple-A team profiles.",
      href: "/admin/aaa",
      icon: Sparkles,
    },
    {
      title: "Social links",
      description: "Manage every follow CTA that appears across the site.",
      href: "/admin/social-links",
      icon: Share2,
    },
    {
      title: "Team invites",
      description: "Send Supabase Auth invite links to new collaborators.",
      href: "/admin/team",
      icon: UserPlus,
    },
  ]

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-slate-400">Control Room</p>
        <h1 className="text-2xl font-black">Welcome back to the Fireside CMS</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Kick off a Spotify sync, upload transcripts from Riverside, or curate new homepage features. All changes you
          make here flow directly into the public site via Supabase.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {quickLinks.map(({ icon: Icon, ...link }) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Card className="h-full border-slate-800 bg-slate-900 text-white transition hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="relative space-y-2 p-4">
                {Icon && (
                  <div className="absolute right-4 top-4 text-slate-500 transition group-hover:text-white">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                )}
                <CardTitle className="text-lg">{link.title}</CardTitle>
                <CardDescription className="text-xs text-slate-300">{link.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
