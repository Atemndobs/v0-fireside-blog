import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sections = [
  {
    title: "Page settings",
    description: "Hero copy, Power of A³ content, and CTA button text.",
    href: "/admin/aaa/settings",
  },
  {
    title: "Quotes",
    description: "Manage carousel quotes, ordering, and visibility.",
    href: "/admin/aaa/quotes",
  },
  {
    title: "Authors",
    description: "Edit A³ profiles, bios, and fun facts.",
    href: "/admin/aaa/authors",
  },
]

export default function AdminAAADashboard() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">A³ Command Center</p>
        <h1 className="text-3xl font-black">Triple-A Team</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Update quotes, author profiles, and the hero story that powers the public A³ page.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.href} className="border-slate-800 bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription className="text-slate-400">{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={section.href} className="text-sm font-semibold text-red-400 hover:text-red-300">
                Manage {section.title.toLowerCase()} →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
