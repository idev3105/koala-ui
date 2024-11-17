import Image from 'next/image'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon, BookmarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import DefaultMovieCardList from '@/components/DefaultMovieCardList'
import DefaultEpisodeCardList from '@/components/DefaultEpisodeCardList'

export default function Movie({ params }: { params: { id: string } }) {
  // TODO: Fetch movie data based on params.id
  const movie = {
    title: 'The Last Of Us Season 1',
    thumbUrl: 'https://example.com/last-of-us-thumbnail.jpg',
    rate: 8.5,
    categories: ['Fantasy', 'Action'],
    description:
      'The Last Of Us is an American post-apocalyptic drama television series created by Craig Mazin and Neil Druckmann for HBO. Based on the 2013 video game developed by Naughty Dog, the series is set in 2023, twenty years into a pandemic caused by a mass fungal infection, which forces its hosts to transform into zombie-like creatures and collapses society. The series follows Joel (Pedro Pascal), a smuggler tasked with escorting the immune teenager Ellie (Bella Ramsey) across a post-apocalyptic United States...',
  }

  const cast = [
    { name: 'Pedro Pascal', role: 'Joel Miller', imageUrl: 'https://example.com/pedro-pascal.jpg' },
    { name: 'Bella Ramsey', role: 'Ellie', imageUrl: 'https://example.com/bella-ramsey.jpg' },
    // Add more cast members...
  ]

  const episodes = [
    {
      title: 'Chapter 1',
      thumbUrl: 'https://example.com/episode1.jpg',
      duration: '1:20:00',
      progress: 75,
      id: '1',
    },
    {
      title: 'Chapter 2',
      thumbUrl: 'https://example.com/episode2.jpg',
      duration: '1:15:00',
      progress: 0,
      id: '2',
    },
    // Add more episodes...
  ]

  const similarMovies = [
    { id: '1', title: 'TOP GUN: Maverick', thumbUrl: 'https://example.com/top-gun.jpg', rate: 8.3 },
    {
      id: '2',
      title: 'Spiderman: Into the spider verse',
      thumbUrl: 'https://example.com/spiderman.jpg',
      rate: 8.4,
    },
    // Add more similar movies...
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="relative h-[50vh]">
        <Image src={movie.thumbUrl} layout="fill" objectFit="cover" alt={movie.title} />
        <div className="absolute inset-0">
          <Image
            src="https://i.pinimg.com/originals/af/a7/19/afa719a6adf39412fdfe497f3136cc92.webp"
            layout="fill"
            objectFit="cover"
            alt={movie.title}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="mt-2 flex items-center space-x-4">
            <span>{movie.categories.join(' / ')}</span>
            <span>•</span>
            <span>{movie.rate} Rating</span>
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="flex items-center space-x-2 rounded bg-green-600 px-4 py-2">
              <PlayCircleIcon className="h-5 w-5" />
              <span>Continue Watching</span>
            </button>
            <button className="flex items-center space-x-2 rounded bg-gray-700 px-4 py-2">
              <BookmarkIcon className="h-5 w-5" />
              <span>Add Watchlist</span>
            </button>
            <button className="rounded bg-gray-700 p-2">
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
            <button className="rounded bg-gray-700 p-2">
              <HandThumbUpIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Story Line</h2>
          <p>{movie.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Top Cast</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {cast.map((actor, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={actor.imageUrl}
                  width={80}
                  height={80}
                  className="rounded-full"
                  alt={actor.name}
                />
                <span className="mt-2 text-sm font-semibold">{actor.name}</span>
                <span className="text-xs text-gray-400">{actor.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">1-9 Episode</h2>
            <select className="rounded bg-gray-700 p-2">
              <option>Season 1</option>
            </select>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Similar Movies for you</h2>
        </section>
      </main>
    </div>
  )
}
