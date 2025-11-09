import { AAAQuoteForm } from "@/components/admin/AAAQuoteForm"
import { getAllAAAQuotes } from "@/lib/actions/aaa-page"

export default async function AdminAAAQuoteCreatePage() {
  const existing = await getAllAAAQuotes()
  const defaultOrder = (existing.data?.length ?? 0) + 1

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
        <h1 className="text-3xl font-black">New Quote</h1>
        <p className="mt-2 max-w-2xl text-slate-300">Add a quote to the carousel rotation.</p>
      </div>

      <AAAQuoteForm defaultOrder={defaultOrder} />
    </section>
  )
}
