import Image from "next/image"
import Link from "next/link"
import { Headphones, Music, Mic, ArrowRight } from "lucide-react"

import { PodcastCard } from "@/components/podcast-card"
import { ArtistCard } from "@/components/artist-card"
import { BlogCard } from "@/components/blog-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 md:py-24 px-4 border-b-8 border-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-red-500 px-4 py-2 text-black font-black rotate-1">PODCAST</div>
              <h1 className="text-5xl md:text-7xl font-headline leading-tight">The Fireside Tribe</h1>
              <p className="text-xl md:text-2xl font-bold">Celebrating Cameroon's Talents in Afrobeats Scene</p>
              <Link
                href="#latest-episodes"
                className="inline-block bg-white text-black px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
              >
                LISTEN NOW
              </Link>
            </div>
            {/* Removed empty hero image container as per user request */}
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section id="latest-episodes" className="py-16 px-4 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Headphones size={32} className="text-red-500" />
            <h2 className="text-4xl md:text-5xl font-black">LATEST EPISODES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PodcastCard
              title="Exploring Cameroon's Afrobeats Scene"
              description="Dive into the rich sounds and rhythms of Cameroon's growing Afrobeats movement."
              date="April 20, 2025"
              spotifyUrl="https://open.spotify.com/episode/4qxmv4JdlfIwJM0nUFOhCJ?si=121bab7159174929"
              youtubeUrl="https://youtu.be/kD-wI-jZQBY"
              imageSrc="https://minio.goose-neon.ts.net/curator/assets/Riverside_pod.png"
            />

            <PodcastCard
              title="The Rise of Cameroonian Artists Globally"
              description="Discover how Cameroonian artists are making waves on the international music scene."
              date="March 15, 2025"
              spotifyUrl="https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5?si=a32a205a9ed64ee3"
              youtubeUrl="https://youtu.be/mw4xLb59QO0"
              imageSrc="https://minio.goose-neon.ts.net/curator/assets/anyang_afro.jpg"
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/episodes"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              ALL EPISODES <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-4 bg-blue-100 border-y-8 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Music size={32} className="text-blue-600" />
            <h2 className="text-4xl md:text-5xl font-black">FEATURED ARTISTS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArtistCard
              name="Tayc"
              description="Blending French R&B with Cameroonian roots, Tayc is a global sensation."
              imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.GT52o8jwL9nkeMfVCdrcCwHaEK%26pid%3DApi&f=1&ipt=a1bf8e12f282ed6f183eb210d9d28afbdd07cbe8003b6e6e1c4d1aeaafb44ec8&ipo=images"
              slug="tayc"
            />

            <ArtistCard
              name="James BKS"
              description="Producer and son of Manu Dibango blending African sounds with hip-hop"
              imageSrc="https://chartroommedia.com/wp-content/uploads/2023/10/1R3A1242_JAMESBKS_FIFOU.jpg"
              slug="james-bks"
            />

            <ArtistCard
              name="Yame"
              description="Rising star with a unique blend of Afrobeats and contemporary R&B"
              imageSrc="https://i1.sndcdn.com/artworks-cjRshmfASz1ThAw9-EjsXyA-t500x500.jpg"
              slug="yame"
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              ALL ARTISTS <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Mic size={32} className="text-purple-600" />
            <h2 className="text-4xl md:text-5xl font-black">LATEST ARTICLES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard
              title="How Tayc is Redefining French R&B with Cameroonian Influences"
              excerpt="Explore how Tayc's Cameroonian heritage shapes his unique sound and international appeal."
              date="April 15, 2025"
              author="The Fireside Tribe"
              imageSrc="https://resources.tidal.com/images/d49938db/8882/4b34/86ba/9811e589222b/640x640.jpg"  // https://www.frequence-sud.fr/admin/transfert/data/89304.jpg
              slug="tayc-redefining-french-rb"
            />

            <BlogCard
              title="The Legacy of Manu Dibango Through James BKS"
              excerpt="How James BKS is carrying forward his father's musical legacy while creating his own path."
              date="March 28, 2025"
              author="The Fireside Tribe"
              imageSrc="https://pan-african-music.com/wp-content/uploads/2019/11/37eed9ff-james-bks.jpg"
              slug="james-bks-legacy"
            />

            <BlogCard
              title="5 Cameroonian Artists Making Waves Internationally"
              excerpt="From Kang to Ronis Goliath, these artists are putting Cameroon on the global music map."
              date="March 10, 2025"
              author="The Fireside Tribe"
              imageSrc="https://static.wixstatic.com/media/5e0aaf_4333086aaa1f43d88a26581b7dc5e2fc~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_2.00_1.00_0.00,enc_avif,quality_auto/Image-empty-state_edited_edited.jpg"
              slug="cameroonian-artists-global"
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              READ THE BLOG <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-red-500 text-white border-y-8 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">JOIN THE TRIBE</h2>
          <p className="text-xl mb-8">
            Get the latest episodes, artist features, and Cameroonian music news delivered to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-black border-4 border-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
