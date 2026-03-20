import { getAllBlogPosts } from "@/lib/repositories/content"
import { notFound } from "next/navigation"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import { EditorialCard, SectionHeader } from "@/components/design-system"

export default async function BlogPage() {
  if (!publicContentVisibility.blog) {
    notFound()
  }

  const posts = await getAllBlogPosts()
  const featuredPost = posts.find((post) => post.featured) || posts[0] || null
  const remainingPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : []

  const subFeatured = remainingPosts.slice(0, 2)
  const listPosts = remainingPosts.slice(2)

  return (
    <div className="min-h-screen bg-background pb-20 pt-8 md:pt-16">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="font-editorial text-5xl md:text-7xl text-foreground mb-4">News & Editorial</h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl">
            In-depth features, reviews, and cultural analysis of the Cameroonian music ecosystem.
          </p>
        </div>

        {/* Featured Section */}
        {featuredPost ? (
          <section className="mb-16">
            <EditorialCard
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              author={featuredPost.author}
              date={featuredPost.publishedAt}
              imageUrl={featuredPost.featuredImageUrl || '/placeholder.svg'}
              href={`/blog/${featuredPost.slug}`}
              category={featuredPost.featured ? "Cover Story" : "Featured"}
              variant="featured"
            />
          </section>
        ) : (
          <section className="mb-16 rounded-lg border border-border p-8 text-muted-foreground">
            No editorial posts are currently published.
          </section>
        )}

        {/* Sub-Featured Grid */}
        {subFeatured.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-b border-border pb-16">
            {subFeatured.map(post => (
              <EditorialCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.featuredImageUrl || '/placeholder.svg'}
                href={`/blog/${post.slug}`}
                category="Review"
                variant="standard"
              />
            ))}
          </section>
        )}

        {/* Latest List */}
        {listPosts.length > 0 && (
          <section>
            <SectionHeader title="The Latest" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listPosts.map(post => (
                <EditorialCard
                  key={post.id}
                  title={post.title}
                  author={post.author}
                  imageUrl={post.featuredImageUrl || '/placeholder.svg'}
                  href={`/blog/${post.slug}`}
                  category="News"
                  variant="compact"
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
