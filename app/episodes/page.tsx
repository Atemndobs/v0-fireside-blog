import { PodcastCard } from "@/components/podcast-card"

export default function EpisodesPage() {
  // In a real app, you would fetch this data from an API or CMS
  const episodes = [
    {
      title: "The Rise of Cameroonian Artists Globally",
      description: "Discover how Cameroonian artists are making waves on the international music scene.",
      date: "March 15, 2025",
      spotifyUrl: "https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5?si=a32a205a9ed64ee3",
      youtubeUrl: "https://youtu.be/mw4xLb59QO0",
      imageSrc: "/images/sepo.jpg",
    },
    {
      title: "Exploring Cameroon's Afrobeats Scene",
      description: "Dive into the rich sounds and rhythms of Cameroon's growing Afrobeats movement.",
      date: "April 20, 2025",
      spotifyUrl: "https://open.spotify.com/episode/4qxmv4JdlfIwJM0nUFOhCJ?si=121bab7159174929",
      youtubeUrl: "https://youtu.be/kD-wI-jZQBY",
      imageSrc: "/images/jail_time_records_cover.png",
    },
    {
      title: "Spotlight on Douala's Music Scene",
      description: "Exploring the vibrant underground music culture in Cameroon's largest city.",
      date: "May 5, 2025",
      spotifyUrl: "https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5?si=a32a205a9ed64ee3",
      youtubeUrl: "https://youtu.be/mw4xLb59QO0",
      imageSrc: "/images/ber_boys.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-yellow-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-red-500 px-4 py-2 text-black font-black rotate-1 mb-4">PODCAST</div>
          <h1 className="text-4xl md:text-6xl font-headline mb-4">The Fireside Tribe</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join us as we explore Cameroon's vibrant music scene, interview artists, and celebrate the sounds that make
            Cameroonian Afrobeats unique.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-black">ALL EPISODES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode, index) => (
            <PodcastCard
              key={index}
              title={episode.title}
              description={episode.description}
              date={episode.date}
              spotifyUrl={episode.spotifyUrl}
              youtubeUrl={episode.youtubeUrl}
              imageSrc={episode.imageSrc}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-black text-white px-6 py-3 font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
            <a
              href="https://open.spotify.com/show/4Pmd0zCt4r1UCEI2mTJdtl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="Follow The Fireside Tribe on Spotify"
            >
              FOLLOW ON SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
