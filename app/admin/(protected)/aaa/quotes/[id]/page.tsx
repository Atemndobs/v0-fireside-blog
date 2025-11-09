import { notFound } from "next/navigation"
import { AAAQuoteForm } from "@/components/admin/AAAQuoteForm"
import { DeleteAAAQuoteButton } from "@/components/admin/DeleteAAAQuoteButton"
import { getAAAQuoteById } from "@/lib/actions/aaa-page"

type Params = {
  params: {
    id: string
  }
}

export default async function AdminAAAQuoteDetailPage({ params }: Params) {
  const quote = await getAAAQuoteById(params.id)

  if (!quote.success || !quote.data) {
    notFound()
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
          <h1 className="text-3xl font-black">Edit Quote</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Update the copy, attribution, or ordering.</p>
        </div>
        <DeleteAAAQuoteButton id={quote.data.id} preview={quote.data.quote.slice(0, 40)} />
      </div>

      <AAAQuoteForm initialData={quote.data} />
    </section>
  )
}
