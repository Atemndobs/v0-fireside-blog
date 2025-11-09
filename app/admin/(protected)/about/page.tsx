import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AboutPageForm } from "@/components/admin/AboutPageForm"
import { fetchAboutPageContent } from "@/lib/repositories/pages"

export default async function AdminAboutPage() {
  const content = await fetchAboutPageContent()

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Brand</p>
          <h1 className="text-3xl font-black">About Page</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Manage the hero, story, and CTA content that powers the public About page.</p>
        </div>
        <Button variant="outline" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700" asChild>
          <Link href="/about" target="_blank" rel="noreferrer">
            Preview page
          </Link>
        </Button>
      </div>

      <AboutPageForm initialData={content} />
    </section>
  )
}
