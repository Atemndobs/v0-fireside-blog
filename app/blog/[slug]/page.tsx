import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In a real app, you would fetch the blog post data based on the slug
  // For this example, we'll use hardcoded data

  const blogPosts = {
    "tayc-redefining-french-rb": {
      title: "How Tayc is Redefining French R&B with Cameroonian Influences",
      date: "April 15, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/images/tayc.jpg",
      content: `
        <p class="text-lg mb-4">
          Tayc, born Julien Bouadjie, has emerged as one of the most exciting voices in French R&B, bringing his Cameroonian heritage to the forefront of his music and creating a unique sound that's captivating audiences across Europe and beyond.
        </p>
        
        <p class="mb-4">
          Born to Cameroonian parents in Marseille, France, Tayc's music is a beautiful fusion of African rhythms, particularly those from Cameroon, with contemporary R&B and Afrobeats. His smooth vocals, often switching between French and occasional phrases in Cameroonian dialects, have become his signature style.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">The Cameroonian Influence</h2>
        
        <p class="mb-4">
          What sets Tayc apart in the French music scene is his deliberate incorporation of his Cameroonian roots. While many artists with African heritage might dilute these influences to appeal to mainstream European audiences, Tayc embraces them, creating a sound that feels authentic and fresh.
        </p>
        
        <p class="mb-4">
          His hit single "N'y pense plus" features subtle Bikutsi rhythms, a traditional music style from Cameroon, while "Le temps" incorporates elements of Makossa, another Cameroonian genre made famous by artists like Manu Dibango.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Breaking Boundaries</h2>
        
        <p class="mb-4">
          Tayc's success represents something significant in the music industry: the growing appreciation for African musical influences in European pop culture. His ability to top French charts while staying true to his Cameroonian roots has opened doors for other artists from the African diaspora.
        </p>
        
        <p class="mb-4">
          With millions of streams across platforms and sold-out shows throughout France, Tayc is proving that audiences are hungry for authentic cultural expressions in music. His success story is an inspiration for young Cameroonian artists looking to make their mark without compromising their identity.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What's Next for Tayc</h2>
        
        <p class="mb-4">
          As Tayc's star continues to rise, he's expressed interest in collaborating with more artists from Cameroon and bringing greater attention to the country's rich musical heritage. His platform is increasingly becoming a bridge between European and African music scenes.
        </p>
        
        <p class="mb-4">
          For fans of Cameroonian music, Tayc represents an exciting ambassador who's introducing the sounds of Cameroon to new audiences while creating something fresh and innovative in the process.
        </p>
      `,
    },
    "james-bks-legacy": {
      title: "The Legacy of Manu Dibango Through James BKS",
      date: "March 28, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/images/james-bks.jpg",
      content: `
        <p class="text-lg mb-4">
          When legendary Cameroonian saxophonist and composer Manu Dibango passed away in 2020, many wondered who would carry forward his musical legacy. The answer was already making waves in the music industry: his son, James BKS.
        </p>
        
        <p class="mb-4">
          Born James Edjouma, James BKS has forged his own path in music while honoring his father's groundbreaking contributions. As a producer who has worked with the likes of Diddy, Talib Kweli, and French rapper Booba, James brings a contemporary sensibility to the Afro-jazz foundations laid by his father.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">A Unique Musical Journey</h2>
        
        <p class="mb-4">
          What makes James BKS's story particularly interesting is that he didn't grow up with Dibango. Raised in France by his mother and adoptive father, James only connected with Manu Dibango as an adult, after already establishing himself in the music industry.
        </p>
        
        <p class="mb-4">
          This reunion with his biological father sparked a musical rebirth for James. While he had been successful producing hip-hop in the United States, reconnecting with Dibango inspired him to explore his Cameroonian roots and incorporate African sounds into his production.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Bridging Worlds</h2>
        
        <p class="mb-4">
          James BKS's music serves as a bridge between generations and genres. His track "Kwele," featuring Dibango himself alongside Allan Kingdom and Manu's longtime collaborator Marthe, perfectly exemplifies this fusion of traditional Cameroonian elements with contemporary production techniques.
        </p>
        
        <p class="mb-4">
          Through his label Grown Kid Records, he's also helping to promote other Cameroonian electronic artists to global audiences.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Preserving and Innovating</h2>
        
        <p class="mb-4">
          Since Dibango's passing, James has taken on the dual responsibility of preserving his father's musical legacy while continuing to innovate. His approach isn't to simply mimic Dibango's style but to build upon it, bringing those sounds to new audiences through contemporary contexts.
        </p>
        
        <p class="mb-4">
          For Cameroonian music fans, James BKS represents an exciting continuation of Manu Dibango's work in breaking down musical boundaries and showcasing Cameroonian sounds on the global stage. His story is a powerful reminder of how musical legacies can evolve and find new expressions across generations.
        </p>
      `,
    },
    "cameroonian-artists-global": {
      title: "5 Cameroonian Artists Making Waves Internationally",
      date: "March 10, 2025",
      author: "The Fireside Tribe",
      imageSrc: "/images/kang.jpg",
      content: `
        <p class="text-lg mb-4">
          Cameroon has long been a hotbed of musical talent, but in recent years, a new generation of artists has been breaking through on the international scene. From innovative producers to soulful vocalists, these artists are putting Cameroon on the global music map while staying true to their roots.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">1. Kang</h2>
        
        <p class="mb-4">
          With his distinctive voice and genre-blending approach, Kang has emerged as one of Cameroon's most exciting musical exports. Blending Afrobeats with elements of R&B and traditional Cameroonian sounds, Kang has cultivated a growing international fanbase. His breakthrough single "Mbelek" showcased his ability to create infectious rhythms while incorporating lyrics in both French and his native dialect.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">2. Yame</h2>
        
        <p class="mb-4">
          Yame has been steadily building a reputation for soulful vocals and thoughtful songwriting. Based between Paris and Douala, her music explores themes of identity and belonging, resonating with the Cameroonian diaspora worldwide. Her EP "Roots & Wings" received critical acclaim for its authentic blend of contemporary R&B with subtle nods to Bikutsi rhythms.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">3. Ronis Goliath</h2>
        
        <p class="mb-4">
          As a producer and DJ, Ronis Goliath has become an influential figure in electronic music circles. His innovative approach to incorporating Cameroonian samples and rhythms into house and electronic productions has earned him slots at major festivals across Europe. Through his label Tribal Connection, he's also helping to promote other Cameroonian electronic artists to global audiences.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">4. James BKS</h2>
        
        <p class="mb-4">
          The son of legendary Manu Dibango, James BKS has forged his own path while honoring his father's legacy. After successful stints producing for American hip-hop artists, James returned to his roots, creating a unique sound that bridges African rhythms with contemporary production techniques. His collaboration with Idris Elba and Little Simz on "Kwele" showcased his ability to bring Cameroonian sounds to new audiences.
        </p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">5. Tayc</h2>
        
        <p class="mb-4">
          Though based in France, Tayc's Cameroonian heritage shines through in his music. His smooth R&B vocals and incorporation of Afrobeats elements have made him a star in the Francophone music world and beyond. With millions of streams and a growing international presence, Tayc represents the new wave of Cameroonian-influenced artists making their mark globally.
        </p>
        
        <p class="mb-4">
          These artists represent just a small sample of the incredible talent emerging from Cameroon and its diaspora. As global interest in African music continues to grow, these innovative musicians are ensuring that Cameroon's rich musical heritage evolves and reaches new audiences worldwide.
        </p>
      `,
    },
  }

  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 font-bold hover:text-red-500 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <article className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-3xl md:text-4xl font-black mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] mb-8 border-4 border-black">
            <Image src={post.imageSrc || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  )
}
