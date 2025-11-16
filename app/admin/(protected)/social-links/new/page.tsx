import { SocialLinkForm } from "@/components/admin/SocialLinkForm"

export default function NewSocialLinkPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Social</p>
        <h1 className="text-3xl font-black">Create social link</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Add a new platform CTA. You can assign it to multiple surfaces and reorder it later.
        </p>
      </div>

      <SocialLinkForm />
    </section>
  )
}
