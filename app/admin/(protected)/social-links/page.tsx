import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SocialLinksTable } from "@/components/admin/SocialLinksTable"
import { getAllSocialLinksForAdmin } from "@/lib/actions/social-links"

export default async function AdminSocialLinksPage() {
  const result = await getAllSocialLinksForAdmin()
  const links = result.data ?? []

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Social</p>
          <h1 className="text-3xl font-black">Social links</h1>
          <p className="mt-2 max-w-2xl text-slate-300">
            Centralize every platform CTA that appears on the site. Update labels, URLs, and surface zones from here.
          </p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/admin/social-links/new">Create link</Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-4 py-4">
          <h2 className="text-lg font-semibold text-white">Configured links</h2>
          <p className="text-sm text-slate-400">
            {links.length} link{links.length === 1 ? "" : "s"} total
          </p>
        </div>
        <div className="px-4 py-6">
          {!result.success && result.error ? (
            <p className="text-red-300">{result.error}</p>
          ) : (
            <SocialLinksTable links={links} />
          )}
        </div>
      </div>
    </section>
  )
}
