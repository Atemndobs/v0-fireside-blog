"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Pause, Play, Radio } from "lucide-react"
import { getAssetUrl } from "@/lib/utils/assets"
import type { AAAAuthor, AAAQuote, AAAPageSettings } from "@/lib/types/pages"

type AAAPageClientProps = {
  settings: AAAPageSettings
  quotes: AAAQuote[]
  authors: AAAAuthor[]
}

const scrollToAuthor = (anchor: string) => {
  if (typeof document === "undefined") return
  const el = document.getElementById(anchor)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}

export function AAAPageClient({ settings, quotes, authors }: AAAPageClientProps) {
  const formattedQuotes = useMemo(
    () =>
      (quotes.length ? quotes : []).map(
        (quote) => `"${quote.quote}" - ${quote.authorName ?? "The Fireside Tribe"}`,
      ),
    [quotes],
  )
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(formattedQuotes.length > 1)
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    if (!isPlaying || formattedQuotes.length <= 1) return

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % formattedQuotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, formattedQuotes.length])

  useEffect(() => {
    setCurrentQuote(0)
    if (formattedQuotes.length <= 1) {
      setIsPlaying(false)
    }
  }, [formattedQuotes.length])

  const togglePlayPause = () => setIsPlaying((prev) => !prev)
  const handleAuthorClick = (id: string) => setActiveAuthor((prev) => (prev === id ? null : id))

  return (
    <div className="min-h-screen bg-yellow-50">
      <section className="relative bg-black text-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white px-4 py-2 text-black font-black rotate-1 mb-6">
            {settings.heroSubtitle}
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
            {authors.map((author) => {
              const anchor = `author-card-${author.slug ?? author.id}`
              return (
                <button
                  key={anchor}
                  className={`${author.colorBg} px-4 py-2 font-bold border-2 border-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/40`}
                  onClick={() => scrollToAuthor(anchor)}
                  aria-label={`Scroll to ${author.name}`}
                  type="button"
                >
                  {author.name.toUpperCase()}
                </button>
              )
            })}
          </motion.div>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12">{settings.heroDescription}</p>

          <div className="flex justify-center">
            <ChevronDown size={48} className="animate-bounce text-white" />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-r from-red-500 via-blue-600 to-purple-600 text-white border-y-4 border-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">In Their Words</h2>
            <button
              onClick={togglePlayPause}
              className="bg-black p-2 rounded-full"
              aria-label={isPlaying ? "Pause quote rotation" : "Play quote rotation"}
              type="button"
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
                {formattedQuotes[currentQuote] ?? "The Fireside Tribe is always creating new stories."}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            <span className="inline-block relative">
              MEET THE TRIPLE-A TEAM
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full -z-10" />
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-16">
            {authors.map((author) => {
              const anchor = `author-card-${author.slug ?? author.id}`
              const profileImage = author.profileImageUrl ? getAssetUrl(author.profileImageUrl) : "/placeholder.svg"
              return (
                <motion.div
                  key={author.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                  id={anchor}
                >
                  <div
                    className={`bg-white border-4 border-black p-8 ${author.colorShadow} hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-1">
                        <div className={`relative h-[300px] border-4 ${author.colorBorder} overflow-hidden`}>
                          <Image src={profileImage} alt={author.name} fill className="object-cover" />
                        </div>

                        <div className={`${author.colorBg} text-white text-center py-2 font-bold text-xl -mt-2 relative z-10`}>
                          {author.name}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex flex-col h-full">
                          <div>
                            <h3 className={`text-3xl font-black mb-1 ${author.colorText}`}>{author.fullName}</h3>
                            <p className="text-xl font-bold mb-6">{author.role}</p>
                          </div>

                          <div className="flex-grow">
                            <div className="prose prose-lg max-w-none mb-6" dangerouslySetInnerHTML={{ __html: author.bio }} />
                          </div>

                          <div className="mt-auto">
                            <button
                              onClick={() => handleAuthorClick(author.id)}
                              className={`${author.colorBg} text-white px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2`}
                              type="button"
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
                          {author.funFacts.map((fact) => (
                            <li key={fact.id} className="flex items-start gap-2">
                              <span>{fact.fact}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex justify-center">
                          <div className="inline-block relative">
                            <div className={`absolute inset-0 ${author.colorBg} translate-x-2 translate-y-2 -z-10`} />
                            <Link
                              href={`/episodes?host=${author.slug ?? author.id}`}
                              className="inline-block bg-white px-6 py-3 font-bold border-4 border-black"
                            >
                              EPISODES FEATURING {author.name.toUpperCase()}
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">{settings.powerSectionTitle}</h2>

          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-600 to-purple-600 blur-xl opacity-30" />
            <p className="text-xl relative z-10 bg-black bg-opacity-80 p-6 border-4 border-white">
              {settings.powerSectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-red-500 p-6 border-4 border-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              <Radio size={32} className="mb-4" />
              <h3 className="font-bold text-2xl mb-4">{settings.curatorTitle}</h3>
              <p>{settings.curatorDescription}</p>
            </div>

            <div className="bg-blue-600 p-6 border-4 border-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              <h3 className="font-bold text-2xl mb-4">{settings.storytellerTitle}</h3>
              <p>{settings.storytellerDescription}</p>
            </div>

            <div className="bg-purple-600 p-6 border-4 border-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              <h3 className="font-bold text-2xl mb-4">{settings.connectorTitle}</h3>
              <p>{settings.connectorDescription}</p>
            </div>
          </div>

          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-xl border-4 border-white shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
          >
            {settings.ctaButtonText}
          </Link>
        </div>
      </section>
    </div>
  )
}
