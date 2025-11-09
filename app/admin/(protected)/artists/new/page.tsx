import { ArtistForm } from "@/components/admin/ArtistForm"

export default function NewArtistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Create New Artist</h1>
        <p className="mt-2 text-slate-300">Add a new artist profile to showcase on your site.</p>
      </div>

      <ArtistForm />
    </div>
  )
}
