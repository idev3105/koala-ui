import DefaultMovieCardList from '@/components/DefaultMovieCardList'
import ForYouMoviesSection from '@/components/ForYouMoviesList'
import Section from '@/components/Section'
import { TopMovieList } from '@/components/TopMovieList'

export default function Home() {
  // TODO: this only fake data
  const releaseMovies = Array.from({ length: 10 }, (_, index) => ({
    id: `movie-${index}`,
    title: 'Thu Huyen dep gai qua di mat',
    thumbUrl: `/movie_thumb_test_${(index % 2) + 1}.png`,
    rate: 8.5,
    trailerUrl: '/test.mp4',
    categories: ['Action', 'Adventure'],
    description:
      'Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn thấy là sự thật hay là ảo mộng.',
  }))

  releaseMovies.push({
    id: 'movie-11',
    title: 'Tru tien',
    thumbUrl: `/movie_thumb_test_1.png`,
    rate: 8.5,
    trailerUrl: '/test.mp4',
    categories: ['Action', 'Adventure'],
    description:
      'Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn thấy là sự thật hay là ảo mộng.',
  })

  // TODO: this only fake date
  const forYouMovies = releaseMovies

  return (
    <main className="w-full">
      <div className="top-movie-list h-[28rem] sm:h-[38rem]">
        <TopMovieList />
      </div>
      <Section className="mt-4" childrenClassName="h-[22rem]" title="Just Release">
        <DefaultMovieCardList movies={releaseMovies} className="sm:mx-8 sm:w-[calc(100%-4rem)]" />
      </Section>
      <ForYouMoviesSection
        className="mt-12 h-fit"
        movies={forYouMovies}
        childrenClassName="h-[37rem] md:h-[22rem]"
      />
      <Section className="relative mt-4" childrenClassName="h-60" title="List 1">
        <DefaultMovieCardList
          movies={releaseMovies}
          className="sm:mx-8 sm:w-[calc(100%-4rem)]"
          itemClassName="!w-1/4 sm:!w-[12%] !ml-0"
        />
      </Section>
    </main>
  )
}
