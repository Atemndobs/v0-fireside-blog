import { EpisodeForm } from "@/components/admin/EpisodeForm"

export default function NewEpisodePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Create New Episode</h1>
        <p className="mt-2 text-slate-300">Add a new podcast episode to your collection.</p>
      </div>

      <EpisodeForm />
    </div>
  )
}
