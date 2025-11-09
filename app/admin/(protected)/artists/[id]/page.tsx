import { notFound } from "next/navigation"
import { getArtistById } from "@/lib/actions/artists"
import { ArtistForm } from "@/components/admin/ArtistForm"

interface EditArtistPageProps {
  params: {
    id: string
  }
}

export default async function EditArtistPage({ params }: EditArtistPageProps) {
  const result = await getArtistById(params.id)

  if (!result.success || !result.data) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Edit Artist</h1>
        <p className="mt-2 text-slate-300">Update the artist profile details below.</p>
      </div>

      <ArtistForm initialData={result.data} />
    </div>
  )
}
