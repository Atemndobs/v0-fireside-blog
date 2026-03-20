import { notFound } from "next/navigation"
import { getEpisodeById } from "@/lib/actions/episodes"
import { EpisodeForm } from "@/components/admin/EpisodeForm"

interface EditEpisodePageProps {
  params: {
    id: string
  }
}

export default async function EditEpisodePage({ params }: EditEpisodePageProps) {
  const result = await getEpisodeById(params.id)

  if (!result.success || !result.data) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Edit Episode</h1>
        <p className="mt-2 text-slate-300">Update the episode details below.</p>
      </div>

      <EpisodeForm initialData={result.data} />
    </div>
  )
}
