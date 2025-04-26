import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  author: string
  imageSrc: string
  slug: string
}

export function BlogCard({ title, excerpt, date, author, imageSrc, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="group bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
        <div className="relative h-[200px] mb-4 border-4 border-black overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{author}</span>
          </div>
        </div>

        <p className="text-gray-700 line-clamp-3">{excerpt}</p>

        <div className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 font-bold border-2 border-black">
          READ MORE
        </div>
      </div>
    </Link>
  )
}
