import { AAAAuthorForm } from "@/components/admin/AAAAuthorForm"

export default function AdminAAAAuthorCreatePage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
        <h1 className="text-3xl font-black">New Author</h1>
        <p className="mt-2 max-w-2xl text-slate-300">Create a new Triple-A profile.</p>
      </div>

      <AAAAuthorForm />
    </section>
  )
}
