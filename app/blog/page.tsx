import { getAllBlogPosts } from "@/lib/repositories/content"
import type { BlogPost } from "@/lib/types/content"
import { getAssetUrl } from "@/lib/utils/assets"
import { EditorialCard, SectionHeader } from "@/components/design-system"

const fallbackPosts = [
  {
    _id: "1",
    title: "How Tayc is Redefining French R&B with Cameroonian Influences",
    excerpt: "Explore how Tayc's Cameroonian heritage shapes his unique sound and international appeal.",
    publishedAt: "April 15, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: "https://resources.tidal.com/images/f084332e/e75d/4448/9314/034a7950668a/750x750.jpg",
    slug: "tayc-redefining-french-rb",
    featured: true
  },
  {
    _id: "2",
    title: "The Legacy of Manu Dibango Through James BKS",
    excerpt: "How James BKS is carrying forward his father's musical legacy while creating his own path.",
    publishedAt: "March 28, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: "https://i.scdn.co/image/ab6761610000e5ebefcb83d283a993edd482360d",
    slug: "james-bks-legacy",
    featured: false
  },
  {
    _id: "3",
    title: "5 Cameroonian Artists Making Waves Internationally",
    excerpt: "From Kang to Ronis Goliath, these artists are putting Cameroon on the global music map.",
    publishedAt: "March 10, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: getAssetUrl("images/kang_Gang.png"),
    slug: "cameroonian-artists-global",
    featured: false
  },
  {
    _id: "4",
    title: "The Evolution of Bikutsi: From Traditional to Contemporary",
    excerpt: "Tracing the journey of one of Cameroon's most distinctive musical styles through the decades.",
    publishedAt: "February 20, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: getAssetUrl("images/reniss-afrocharts.jpg"),
    slug: "evolution-of-bikutsi",
    featured: false
  },
  {
    _id: "5",
    title: "Douala's Rising Music Scene: Studios and Producers to Watch",
    excerpt: "Behind the artists are innovative studios and producers creating the soundtrack of modern Cameroon.",
    publishedAt: "February 5, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: getAssetUrl("images/ber_boys.jpg"),
    slug: "douala-music-scene",
    featured: false
  },
  {
    _id: "6",
    title: "From Cameroon to the World: The Diaspora Effect on Music",
    excerpt: "How Cameroonian artists abroad are influencing global sounds while staying connected to their roots.",
    publishedAt: "January 18, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: getAssetUrl("images/ko-c.webp"),
    slug: "cameroon-diaspora-music",
    featured: false
  },
] as any[]

export default async function BlogPage() {
  const rawPosts = await getAllBlogPosts()
  const posts = rawPosts.length > 0 ? rawPosts : fallbackPosts

  // Strategy: 
  // 1. Featured Article (First featured or first item)
  // 2. Sub-Featured Grid (Next 2 items)
  // 3. The Rest (List view)

  const featuredPost = posts.find(p => p.featured) || posts[0]
  const remainingPosts = posts.filter(p => p._id !== featuredPost._id)

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
        {featuredPost && (
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
        )}

        {/* Sub-Featured Grid */}
        {subFeatured.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-b border-border pb-16">
            {subFeatured.map(post => (
              <EditorialCard
                key={post._id}
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
                  key={post._id}
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
