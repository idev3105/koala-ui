import DefaultMovieCardList from '@/components/DefaultMovieCardList'
import ForYouMoviesSection from '@/components/ForYouMoviesList'
import RankMovieCardList from '@/components/RankMovieCardList'
import Section from '@/components/Section'
import { TopMovieList } from '@/components/TopMovieList'

export default function Home() {
  // TODO: this only fake data
  const releaseMovies = Array.from({ length: 10 }, (_, index) => ({
    title: 'Thu Huyen dep gai qua di mat',
    thumbUrl: 'https://i.pinimg.com/originals/26/f1/d7/26f1d757f30938d12b1980085da08563.jpg',
    rate: 8.5,
    categories: ['Action', 'Adventure'],
  }))

  releaseMovies.push({
    title: 'Tru tien',
    thumbUrl: 'https://i.pinimg.com/originals/af/a7/19/afa719a6adf39412fdfe497f3136cc92.webp',
    rate: 8.5,
    categories: ['Action', 'Adventure'],
  })

  // TODO: this only fake date
  const forYouMovies = releaseMovies

  return (
    <main className="w-full">
      <div className="top-movie-list h-[28rem] sm:h-[38rem]">
        <TopMovieList />
      </div>
      <Section className="mt-4" childrenClassName="h-[22rem]" title="Just Release">
        <DefaultMovieCardList movies={releaseMovies} />
      </Section>
      <Section className="mt-12" childrenClassName="h-36" title="Popular Of The Week">
        <RankMovieCardList />
      </Section>
      <ForYouMoviesSection className="mt-12" movies={forYouMovies} childrenClassName="h-[30rem]" />
    </main>
  )
}
