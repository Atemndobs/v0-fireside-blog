"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { SocialLinkView } from "@/lib/types/social-links"
import { SOCIAL_ZONES } from "@/lib/social-platforms"
import { DeleteSocialLinkButton } from "@/components/admin/DeleteSocialLinkButton"

type Props = {
  links: SocialLinkView[]
}

const zoneLookup = SOCIAL_ZONES.reduce<Record<string, string>>((acc, zone) => {
  acc[zone.value] = zone.label
  return acc
}, {} as Record<string, string>)

export function SocialLinksTable({ links }: Props) {
  if (!links.length) {
    return <p className="py-6 text-center text-slate-400">No social links yet. Create one to get started.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">Label</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Zones</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id} className="border-t border-slate-800">
              <td className="px-4 py-3 font-semibold capitalize">{link.platform}</td>
              <td className="px-4 py-3 text-slate-300">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200">
                  {link.label}
                </a>
              </td>
              <td className="px-4 py-3 text-slate-400">{link.priority}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {link.zones.map((zone: string) => (
                    <Badge key={zone} variant="secondary" className="bg-slate-800 text-slate-200">
                      {zoneLookup[zone] ?? zone}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/admin/social-links/${link.id}`}>Edit</Link>
                  </Button>
                  <DeleteSocialLinkButton
                    id={link.id}
                    label={link.label}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 justify-center"
                    aria-label={`Delete ${link.label}`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
