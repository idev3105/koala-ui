import DefaultMovieCardList from '@/components/DefaultMovieCardList'
import ForYouMoviesSection from '@/components/ForYouMoviesList'
import Section from '@/components/Section'
import { TopMovieList } from '@/components/TopMovieList'
import Link from 'next/link'

export default function Home() {
  // TODO: this only fake data
  const releaseMovies = Array.from({ length: 10 }, (_, index) => ({
    title: 'Thu Huyen dep gai qua di mat',
    thumbUrl: 'https://i.pinimg.com/originals/26/f1/d7/26f1d757f30938d12b1980085da08563.jpg',
    rate: 8.5,
    categories: ['Action', 'Adventure'],
    description:
      'Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn thấy là sự thật hay là ảo mộng.',
  }))

  releaseMovies.push({
    title: 'Tru tien',
    thumbUrl: 'https://i.pinimg.com/originals/af/a7/19/afa719a6adf39412fdfe497f3136cc92.webp',
    rate: 8.5,
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
          className="w-1/ sm:mx-8 sm:w-[calc(100%-4rem)]"
          itemClassName="!w-1/4 sm:!w-[12%] !ml-0"
        />
      </Section>
      <div className="mt-4 flex h-60 flex-col items-center justify-center gap-2 px-4">
        {/* TODO: use i18n here */}
        <div className="inline-flex w-full gap-2 sm:justify-end">
          <Link className="underline" href="/">
            Home
          </Link>
          <div>/</div>
          <Link className="underline" href="/about">
            About
          </Link>
        </div>
        <div className="w-full sm:justify-between md:inline-flex">
          <div className="inline-flex w-full justify-between gap-6 sm:w-fit sm:justify-start">
            <Link className="underline" href="/">
              Privacy Policy
            </Link>
            <Link className="underline" href="/about">
              Terms of Service
            </Link>
            <Link className="underline" href="/about">
              Language
            </Link>
          </div>
          <div className="h-fit">Copyright © idev</div>
        </div>
      </div>
    </main>
  )
}
