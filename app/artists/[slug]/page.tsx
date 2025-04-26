import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Youtube, Instagram, Twitter } from "lucide-react"

interface ArtistPageProps {
  params: {
    slug: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  // In a real app, you would fetch the artist data based on the slug
  // For this example, we'll use hardcoded data

  const artists = {
    tayc: {
      name: "Tayc",
      fullName: "Julien Bouadjie",
      bio: `
        <p class="mb-4">
          Tayc, born Julien Bouadjie to Cameroonian parents in Marseille, France, has emerged as one of the most exciting voices in French R&B. His music beautifully fuses African rhythms, particularly those from Cameroon, with contemporary R&B and Afrobeats.
        </p>
        
        <p class="mb-4">
          With his smooth vocals, often switching between French and occasional phrases in Cameroonian dialects, Tayc has created a signature style that's captivating audiences across Europe and beyond. His breakthrough came with the album "NYXIA," which showcased his unique sound and cemented his place in the French music scene.
        </p>
        
        <p class="mb-4">
          What sets Tayc apart is his deliberate incorporation of his Cameroonian roots. While many artists with African heritage might dilute these influences to appeal to mainstream European audiences, Tayc embraces them, creating a sound that feels authentic and fresh.
        </p>
        
        <p class="mb-4">
          His hit singles like "N'y pense plus" feature subtle Bikutsi rhythms, a traditional music style from Cameroon, while "Le temps" incorporates elements of Makossa, another Cameroonian genre made famous by artists like Manu Dibango.
        </p>
      `,
      imageSrc: "/images/tayc.jpg",
      spotifyUrl: "https://open.spotify.com/artist/0BlSV1sY8ePR5nj1tDmvXY",
      youtubeUrl: "https://www.youtube.com/channel/UCrPLMg2zy1xFOdLUsDg8aTw",
      instagramUrl: "https://www.instagram.com/taycofficial",
      twitterUrl: "https://twitter.com/taycofficial",
      popularSongs: ["N'y pense plus", "Le temps", "Pas besoin", "Moi je prouve", "Comme toi"],
    },
    "james-bks": {
      name: "James BKS",
      fullName: "James Edjouma",
      bio: `
        <p class="mb-4">
          James BKS, born James Edjouma, is a producer, composer, and musician who has forged his own path in music while honoring the legacy of his father, legendary Cameroonian saxophonist and composer Manu Dibango.
        </p>
        
        <p class="mb-4">
          What makes James BKS's story particularly interesting is that he didn't grow up with Dibango. Raised in France by his mother and adoptive father, James only connected with Manu Dibango as an adult, after already establishing himself in the music industry.
        </p>
        
        <p class="mb-4">
          As a producer, James has worked with the likes of Diddy, Talib Kweli, and French rapper Booba. This reunion with his biological father sparked a musical rebirth for James. While he had been successful producing hip-hop in the United States, reconnecting with Dibango inspired him to explore his Cameroonian roots and incorporate African sounds into his production.
        </p>
        
        <p class="mb-4">
          James BKS's music serves as a bridge between generations and genres. His track "Kwele," featuring Dibango himself alongside Allan Kingdom and Manu's longtime collaborator Marthe, perfectly exemplifies this fusion of traditional Cameroonian elements with contemporary production techniques.
        </p>
        
        <p class="mb-4">
          Through his label Grown Kid Records, James continues to develop artists and projects that blend African musical traditions with global sounds, much as his father did with his groundbreaking hit "Soul Makossa" in the 1970s.
        </p>
      `,
      imageSrc: "/images/james-bks.jpg",
      spotifyUrl: "https://open.spotify.com/artist/0BlSV1sY8ePR5nj1tDmvXY",
      youtubeUrl: "https://www.youtube.com/channel/UCrPLMg2zy1xFOdLUsDg8aTw",
      instagramUrl: "https://www.instagram.com/jamesbks",
      twitterUrl: "https://twitter.com/jamesbks",
      popularSongs: ["Kwele", "New Breed", "Kusema", "Jungle Go", "Pouvoir"],
    },
    yame: {
      name: "Yame",
      fullName: "Yame Njock",
      bio: `
        <p class="mb-4">
          Yame has been steadily building a reputation for soulful vocals and thoughtful songwriting. Based between Paris and Douala, her music explores themes of identity and belonging, resonating with the Cameroonian diaspora worldwide.
        </p>
        
        <p class="mb-4">
          Growing up in a musical family in Douala, Yame was exposed to a rich variety of sounds from an early age. Traditional Cameroonian music played alongside American R&B and French pop in her household, creating the foundation for her eclectic musical style.
        </p>
        
        <p class="mb-4">
          After moving to Paris to pursue her education, Yame began performing in local venues and quickly caught the attention of music producers impressed by her powerful voice and authentic songwriting. Her EP "Roots & Wings" received critical acclaim for its authentic blend of contemporary R&B with subtle nods to Bikutsi rhythms.
        </p>
        
        <p class="mb-4">
          What sets Yame apart is her ability to weave stories of the diaspora experience into her music, creating songs that speak to the complexities of identity and belonging. Her lyrics, often switching between French, English, and her native dialect, reflect the multilingual reality of many young Cameroonians today.
        </p>
        
        <p class="mb-4">
          As her international profile continues to grow, Yame remains committed to highlighting Cameroonian culture and creating pathways for other artists from her homeland to reach global audiences.
        </p>
      `,
      imageSrc: "/images/yame.jpg",
      spotifyUrl: "https://open.spotify.com/artist/0BlSV1sY8ePR5nj1tDmvXY",
      youtubeUrl: "https://www.youtube.com/channel/UCrPLMg2zy1xFOdLUsDg8aTw",
      instagramUrl: "https://www.instagram.com/yameofficial",
      twitterUrl: "https://twitter.com/yameofficial",
      popularSongs: ["Roots & Wings", "Douala to Paris", "Remember Me", "Homeland", "Identity"],
    },
  }

  const artist = artists[params.slug]

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
          <Link href="/artists" className="text-blue-600 hover:underline">
            Back to Artists
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/artists"
          className="inline-flex items-center gap-2 mb-8 font-bold hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Artists
        </Link>

        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="relative h-[300px] border-4 border-black overflow-hidden">
                <Image src={artist.imageSrc || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
              </div>

              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">Connect</h2>

                <div className="flex flex-col gap-3">
                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-green-600 transition-colors"
                  >
                    <span>Spotify</span>
                  </a>

                  <a
                    href={artist.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-red-600 transition-colors"
                  >
                    <Youtube size={20} />
                    <span>YouTube</span>
                  </a>

                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={artist.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                  >
                    <Twitter size={20} />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">Popular Songs</h2>

                <ul className="space-y-2">
                  {artist.popularSongs.map((song, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span>{song}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-black mb-2">{artist.name}</h1>
              <p className="text-gray-600 mb-6">{artist.fullName}</p>

              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: artist.bio }} />

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Featured Music</h2>

                <iframe
                  src={`https://open.spotify.com/embed/artist/${artist.spotifyUrl.split("/").pop()}`}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                  className="border-4 border-black"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
