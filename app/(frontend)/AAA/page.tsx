import { notFound } from "next/navigation"
import { fetchAAAPageData, getAAAPagePublishingWindow } from "@/lib/repositories/pages"
import { AAAPageClient } from "@/components/aaa/AAAPageClient"
import { isContentLive } from "@/lib/config/publishing"

export default async function AAAPage() {
  const publishWindow = await getAAAPagePublishingWindow()
  if (!isContentLive(publishWindow)) {
    notFound()
  }

  const data = await fetchAAAPageData()
  return <AAAPageClient {...data} />
}
