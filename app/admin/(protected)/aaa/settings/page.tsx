import { AAAPageSettingsForm } from "@/components/admin/AAAPageSettingsForm"
import { getAAAPageSettings } from "@/lib/actions/aaa-page"

export default async function AdminAAASettingsPage() {
  const settings = await getAAAPageSettings()

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
        <h1 className="text-3xl font-black">Page Settings</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Control the hero copy, Power of A³ messaging, and CTA button label on the public page.
        </p>
      </div>

      <AAAPageSettingsForm initialData={settings.success ? settings.data : undefined} />
    </section>
  )
}
