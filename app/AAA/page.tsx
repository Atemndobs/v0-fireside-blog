import { fetchAAAPageData } from "@/lib/repositories/pages"
import { AAAPageClient } from "@/components/aaa/AAAPageClient"

export default async function AAAPage() {
  const data = await fetchAAAPageData()
  return <AAAPageClient {...data} />
}
