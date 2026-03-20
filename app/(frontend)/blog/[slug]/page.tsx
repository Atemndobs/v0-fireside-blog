import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import { getBlogPostBySlug } from "@/lib/repositories/content"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

const normalizeContent = (value: unknown): string[] => {
  if (!value) return []

  if (typeof value === "string") {
    return value
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeContent(item))
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap((item) => normalizeContent(item))
  }

  return []
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!publicContentVisibility.blog) {
    notFound()
  }

  const post = await getBlogPostBySlug(params.slug)
  if (!post || !post.published) {
    notFound()
  }

  const paragraphs = normalizeContent(post.content)
  const articleBody = paragraphs.length > 0 ? paragraphs : [post.excerpt].filter(Boolean)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Editorial
        </Link>

        <article className="bg-card border border-border p-8 md:p-12 rounded-lg">
          <h1 className="text-3xl md:text-5xl font-black mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.publishedAt}</span>
              </div>
            )}
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
            )}
          </div>

          {post.featuredImageUrl && (
            <div className="relative h-[280px] md:h-[420px] mb-10 overflow-hidden rounded-md border border-border">
              <Image
                src={post.featuredImageUrl}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
            {articleBody.map((paragraph, index) => (
              <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
