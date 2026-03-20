import { AAAQuotesManager } from "@/components/admin/AAAQuotesManager"
import { getAllAAAQuotes } from "@/lib/actions/aaa-page"

export default async function AdminAAAQuotesPage() {
  const quotes = await getAllAAAQuotes()

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
        <h1 className="text-3xl font-black">Quotes</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Manage the rotating quotes that appear inside the A³ hero carousel.
        </p>
      </div>

      <AAAQuotesManager quotes={quotes.data ?? []} />
    </section>
  )
}
