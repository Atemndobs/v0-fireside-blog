import { notFound } from "next/navigation"
import { SocialLinkForm } from "@/components/admin/SocialLinkForm"
import { getSocialLinkForAdmin } from "@/lib/actions/social-links"

interface EditSocialLinkPageProps {
  params: {
    id: string
  }
}

export default async function EditSocialLinkPage({ params }: EditSocialLinkPageProps) {
  const result = await getSocialLinkForAdmin(params.id)
  if (!result.success || !result.data) {
    notFound()
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Social</p>
        <h1 className="text-3xl font-black">Edit social link</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Update labels, URLs, or the surfaces that should show this platform CTA.
        </p>
      </div>

      <SocialLinkForm initialData={result.data} />
    </section>
  )
}
