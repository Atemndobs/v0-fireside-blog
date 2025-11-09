import { notFound } from "next/navigation"
import { AAAAuthorForm } from "@/components/admin/AAAAuthorForm"
import { DeleteAAAAuthorButton } from "@/components/admin/DeleteAAAAuthorButton"
import { getAAAAuthorById } from "@/lib/actions/aaa-page"

type Params = {
  params: {
    id: string
  }
}

export default async function AdminAAAAuthorEditPage({ params }: Params) {
  const author = await getAAAAuthorById(params.id)

  if (!author.success || !author.data) {
    notFound()
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
          <h1 className="text-3xl font-black">Edit Author</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Update the profile, theme, and fun facts.</p>
        </div>
        <DeleteAAAAuthorButton id={author.data.id} name={author.data.name} />
      </div>

      <AAAAuthorForm initialData={author.data} initialFunFacts={author.funFacts} />
    </section>
  )
}
