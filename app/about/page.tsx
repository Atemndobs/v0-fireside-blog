import Image from "next/image"
import Link from "next/link"
import { Headphones } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-yellow-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-red-500 px-4 py-2 text-black font-black rotate-1 mb-4">ABOUT US</div>
          <h1 className="text-4xl md:text-6xl font-headline mb-4">The Fireside Tribe</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist features.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div className="relative h-[300px] border-4 border-black overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="The Fireside Tribe Podcast"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="mb-4">
                The Fireside Tribe was created with a singular mission: to showcase the incredible talent and rich
                musical heritage of Cameroon to the world.
              </p>
              <p>
                Through our podcast, blog, and artist features, we aim to create a platform that celebrates Cameroonian
                artists both at home and in the diaspora, highlighting their contributions to the global music scene.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              The Fireside Tribe began as a passion project by a group of Cameroonian music enthusiasts who felt that
              the country's vibrant music scene deserved more international recognition.
            </p>
            <p className="mb-4">
              What started as casual conversations about our favorite artists evolved into a podcast, and eventually
              into this comprehensive platform dedicated to all things Cameroonian music.
            </p>
            <p>
              Today, we're proud to be a growing community of music lovers, artists, producers, and fans united by our
              appreciation for Cameroon's unique sounds and rhythms.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-4 border-black p-4 bg-red-100">
                <h3 className="font-bold mb-2">The Podcast</h3>
                <p>
                  Our flagship podcast features interviews with artists, producers, and industry insiders, deep dives
                  into Cameroonian music history, and discussions about the latest trends.
                </p>
              </div>

              <div className="border-4 border-black p-4 bg-blue-100">
                <h3 className="font-bold mb-2">The Blog</h3>
                <p>
                  Our blog offers thoughtful articles, artist profiles, and analysis of Cameroonian music's influence on
                  the global scene.
                </p>
              </div>

              <div className="border-4 border-black p-4 bg-purple-100">
                <h3 className="font-bold mb-2">Artist Spotlights</h3>
                <p>
                  We regularly feature both established and emerging Cameroonian artists, helping to amplify their
                  voices and music.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Join The Tribe</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Whether you're a longtime fan of Cameroonian music or just discovering it, we invite you to join our
              community and explore the rich sounds and stories we have to share.
            </p>

            <Link
              href="/episodes"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              LISTEN TO OUR PODCAST <Headphones className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
