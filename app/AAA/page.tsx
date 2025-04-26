"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Headphones, Mic, Radio, ArrowRight, ChevronDown, Play, Pause } from "lucide-react"

export default function AAAPage() {
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  // Rotate through quotes automatically
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const quotes = [
    '"Music is the universal language that connects us all, but Cameroonian music speaks with a unique accent that the world needs to hear." - Atem A.',
    '"Our podcast is a campfire where stories and sounds from Cameroon can warm the hearts of listeners worldwide." - Atem N.',
    '"We don\'t just talk about music, we translate culture and build bridges between Cameroon and the global stage." - Anyang',
    '"The rhythm of Cameroon flows through our veins and into every episode we create." - Atem A.',
    '"Our mission is to amplify voices that have been whispering brilliance for too long." - Anyang',
  ]

  const authors = [
    {
      id: "atem-keng",
      name: "Atem Keng",
      fullName: "Atem Keng",
      role: "Music Enthusiast & Digital Innovator",
      color: "bg-red-500",
      accent: "text-red-500",
      borderColor: "border-red-500",
      shadowColor: "shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]",
      bio: `
        <p class=\"mb-4\">
          Atem Keng is the music technology enthusiast of The Fireside Tribe. With a passion for music discovery and curation, he's developed innovative ways to share and promote Cameroonian music through playlists and digital platforms.
        </p>
        <p class=\"mb-4\">
          Known for his insights on performance energy and the role of algorithms in music discovery, Atem K. brings a tech-savvy perspective to the podcast. He's particularly interested in how emerging artists can leverage digital platforms to gain exposure.
        </p>
        <p>
          "Music discovery is influenced by personal connections and social media. Algorithms play a significant role in curating music preferences. Performance energy is crucial for an artist's success."
        </p>
      `,
      image: "/images/atemKeng_about.png",
      funFacts: [
        "Owns a collection of over 500 vinyl records from Cameroonian artists",
        "Played drums in a makossa fusion band for 5 years",
        "Can identify the region of Cameroon a song comes from within seconds",
      ],
    },
    {
      id: "atem-eunice",
      name: "Atem Eunice",
      fullName: "Atem Eunice",
      role: "Music Curator & Cultural Storyteller",
      color: "bg-blue-600",
      accent: "text-blue-600",
      borderColor: "border-blue-600",
      shadowColor: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]",
      bio: `
        <p class=\"mb-4\">
          Atem Eunice brings a cultural depth to The Fireside Tribe, exploring the connections between identity, food, music, and heritage. She delves into how these elements shape our understanding of ourselves and our communities.
        </p>
        <p class=\"mb-4\">
          Her discussions on the meaning of names and the role of food in cultural exchange highlight her interest in the personal stories that connect us. She's passionate about how music empowers African identity and raises self-esteem.
        </p>
        <p>
          "Food serves as a powerful connection to cultural identity. Exploring one's cultural roots through names is important. Music plays a crucial role in raising self-esteem among Africans."
        </p>
      `,
      image: "/images/atem_e_about.png",
      funFacts: [
        "Conducted over 200 interviews with musicians across Africa",
        "Produces music documentaries in her spare time",
        "Once traveled 500 miles to record a disappearing traditional music style",
      ],
    },
    {
      id: "anyang",
      name: "Anyang",
      fullName: "Anyang",
      role: "Social Impact Advocate & Industry Analyst",
      color: "bg-purple-600",
      accent: "text-purple-600",
      borderColor: "border-purple-600",
      shadowColor: "shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]",
      bio: `
        <p class=\"mb-4\">
          Anyang brings a unique perspective to The Fireside Tribe, focusing on the social impact of music and its role in mental health and rehabilitation. His discussions on projects like Jail Time Records highlight music's power beyond entertainment.
        </p>
        <p class=\"mb-4\">
          With keen insights on the music industry's challenges, Anyang analyzes the investment landscape, marketing strategies, and growth opportunities for Cameroonian artists. He emphasizes the importance of environment and public engagement in nurturing talent.
        </p>
        <p>
          "You learn a lot from filling interviews. Music can be a form of therapy for prisoners. Creativity thrives even in challenging environments."
        </p>
      `,
      image: "/images/anyang_afro_zoom.png",   
      funFacts: [
        "Has organized music festivals on three continents",
        "Speaks five languages fluently",
        "Helped negotiate international distribution deals for several Cameroonian artists",
      ],
    },
  ]

  const handleAuthorClick = (id: string) => {
    setActiveAuthor(activeAuthor === id ? null : id)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white px-4 py-2 text-black font-black rotate-1 mb-6">
            THE VOICES BEHIND THE TRIBE
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-8 relative"
          >
            <span className="inline-block relative">
              A<span className="absolute -top-8 -right-4 text-4xl">3</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              className="bg-red-500 px-4 py-2 font-bold border-2 border-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300"
              onClick={() => {
                const el = document.getElementById('author-card-atem-keng');
                el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              aria-label="Scroll to Atem Keng"
              type="button"
            >
              ATEM
            </button>
            <button
              className="bg-blue-600 px-4 py-2 font-bold border-2 border-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => {
                const el = document.getElementById('author-card-atem-eunice');
                el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              aria-label="Scroll to Atem Eunice"
              type="button"
            >
              ATEM
            </button>
            <button
              className="bg-purple-600 px-4 py-2 font-bold border-2 border-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-300"
              onClick={() => {
                const el = document.getElementById('author-card-anyang');
                el && el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              aria-label="Scroll to Anyang"
              type="button"
            >
              ANYANG
            </button>
          </motion.div>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12">
            Three voices, one mission: to amplify Cameroonian music and culture through The Fireside Tribe podcast
          </p>

          <div className="flex justify-center">
            <ChevronDown size={48} className="animate-bounce text-white" />
          </div>
        </div>
      </section>

      {/* Quote Carousel */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-500 via-blue-600 to-purple-600 text-white border-y-4 border-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">In Their Words</h2>
            <button
              onClick={togglePlayPause}
              className="bg-black p-2 rounded-full"
              aria-label={isPlaying ? "Pause quote rotation" : "Play quote rotation"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>

          <div className="bg-black bg-opacity-20 p-8 border-4 border-white min-h-[150px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-bold text-center italic"
              >
                {quotes[currentQuote]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* The Three Authors */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            <span className="inline-block relative">
              MEET THE TRIPLE-A TEAM
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full -z-10"></div>
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-16">
            {authors.map((author) => (
              <motion.div
                key={author.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
                id={`author-card-${author.id}`}
              >
                <div
                  className={`bg-white border-4 border-black p-8 ${author.shadowColor} hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <div className={`relative h-[300px] border-4 ${author.borderColor} overflow-hidden`}>
                        <Image
                          src={author.image || "/placeholder.svg?height=300&width=300"}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div
                        className={`${author.color} text-white text-center py-2 font-bold text-xl -mt-2 relative z-10`}
                      >
                        {author.name}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className={`text-3xl font-black mb-1 ${author.accent}`}>{author.fullName}</h3>
                          <p className="text-xl font-bold mb-6">{author.role}</p>
                        </div>

                        <div className="flex-grow">
                          <div
                            className="prose prose-lg max-w-none mb-6"
                            dangerouslySetInnerHTML={{ __html: author.bio }}
                          />
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={() => handleAuthorClick(author.id)}
                            className={`${author.color} text-white px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2`}
                          >
                            {activeAuthor === author.id ? "SHOW LESS" : "FUN FACTS"}
                            <ArrowRight size={16} className={activeAuthor === author.id ? "rotate-90" : ""} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeAuthor === author.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 pt-8 border-t-4 border-black"
                    >
                      <h4 className="text-2xl font-bold mb-4">Fun Facts About {author.name}</h4>
                      <ul className="space-y-2">
                        {author.funFacts.map((fact, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className={`${author.color} text-white p-1 mt-1`}>
                              <Mic size={16} />
                            </div>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex justify-center">
                        <div className="inline-block relative">
                          <div className={`absolute inset-0 ${author.color} translate-x-2 translate-y-2 -z-10`}></div>
                          <Link
                            href={`/episodes?host=${author.id}`}
                            className="inline-block bg-white px-6 py-3 font-bold border-4 border-black"
                          >
                            EPISODES FEATURING {author.name}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Power of Three */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">THE POWER OF A³</h2>

          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-600 to-purple-600 blur-xl opacity-30"></div>
            <p className="text-xl relative z-10 bg-black bg-opacity-80 p-6 border-4 border-white">
              When Atem, Atem, and Anyang come together, something magical happens. Their unique perspectives, skills,
              and passions combine to create a podcast that's more than the sum of its parts. Like the perfect musical
              trio, each brings their distinct voice while harmonizing to create something greater than any could
              achieve alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-red-500 p-6 border-4 border-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Radio size={32} className="mb-4" />
              <h3 className="font-bold text-2xl mb-4">THE CURATOR</h3>
              <p>Atem A. selects the music and artists that form the backbone of each episode</p>
            </div>

            <div className="bg-blue-600 p-6 border-4 border-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Mic size={32} className="mb-4" />
              <h3 className="font-bold text-2xl mb-4">THE STORYTELLER</h3>
              <p>Atem N. crafts the narratives and conversations that bring the music to life</p>
            </div>

            <div className="bg-purple-600 p-6 border-4 border-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Headphones size={32} className="mb-4" />
              <h3 className="font-bold text-2xl mb-4">THE CONNECTOR</h3>
              <p>Anyang bridges cultures and opens doors for Cameroonian music globally</p>
            </div>
          </div>

          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-xl border-4 border-white shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
          >
            HEAR THEM IN ACTION
          </Link>
        </div>
      </section>
    </div>
  )
}
