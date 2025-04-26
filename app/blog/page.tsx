import { BlogCard } from "@/components/blog-card"

export default function BlogPage() {
  // In a real app, you would fetch this data from an API or CMS
  const blogPosts = [
    {
      title: "How Tayc is Redefining French R&B with Cameroonian Influences",
      excerpt: "Explore how Tayc's Cameroonian heritage shapes his unique sound and international appeal.",
      date: "April 15, 2025",
      author: "The Fireside Tribe",
      imageSrc: "https://resources.tidal.com/images/f084332e/e75d/4448/9314/034a7950668a/750x750.jpg ",
      slug: "tayc-redefining-french-rb",
    },
    {
      title: "The Legacy of Manu Dibango Through James BKS",
      excerpt: "How James BKS is carrying forward his father's musical legacy while creating his own path.",
      date: "March 28, 2025",
      author: "The Fireside Tribe",
      imageSrc: "https://i.scdn.co/image/ab6761610000e5ebefcb83d283a993edd482360d",
      slug: "james-bks-legacy",
    },
    {
      title: "5 Cameroonian Artists Making Waves Internationally",
      excerpt: "From Kang to Ronis Goliath, these artists are putting Cameroon on the global music map.",
      date: "March 10, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/images/kang.jpg",
      slug: "cameroonian-artists-global",
    },
    {
      title: "The Evolution of Bikutsi: From Traditional to Contemporary",
      excerpt: "Tracing the journey of one of Cameroon's most distinctive musical styles through the decades.",
      date: "February 20, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/placeholder.svg?height=300&width=300",
      slug: "evolution-of-bikutsi",
    },
    {
      title: "Douala's Rising Music Scene: Studios and Producers to Watch",
      excerpt: "Behind the artists are innovative studios and producers creating the soundtrack of modern Cameroon.",
      date: "February 5, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/placeholder.svg?height=300&width=300",
      slug: "douala-music-scene",
    },
    {
      title: "From Cameroon to the World: The Diaspora Effect on Music",
      excerpt: "How Cameroonian artists abroad are influencing global sounds while staying connected to their roots.",
      date: "January 18, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/placeholder.svg?height=300&width=300",
      slug: "cameroon-diaspora-music",
    },
  ]

  return (
    <div className="min-h-screen bg-yellow-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-600 px-4 py-2 text-white font-black rotate-1 mb-4">BLOG</div>
          <h1 className="text-4xl md:text-6xl font-headline mb-4">The Fireside Tribe</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Insights, interviews, and deep dives into Cameroon's vibrant music scene and the artists shaping its future.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-black">LATEST ARTICLES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              imageSrc={post.imageSrc}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
