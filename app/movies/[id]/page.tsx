import Image from 'next/image'
import '@/components/btn-icon.css'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon, BookmarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import DefaultMovieCardList from '@/components/DefaultMovieCardList'

export default function Movie({ params }: { params: { id: string } }) {
  // TODO: this is fake movie
  const movie = {
    title: 'Tru tien',
    thumbUrl: 'https://i.pinimg.com/originals/af/a7/19/afa719a6adf39412fdfe497f3136cc92.webp',
    rate: 8.5,
    categories: ['Action', 'Adventure'],
    description:
      'Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn thấy là sự thật hay là ảo mộng.',
  }

  // TODO: this only fake data
  const relatedMovies = Array.from({ length: 10 }, (_, index) => ({
    id: `movie-${index}`,
    title: 'Thu Huyen dep gai qua di mat',
    thumbUrl: 'https://i.pinimg.com/originals/26/f1/d7/26f1d757f30938d12b1980085da08563.jpg',
    rate: 8.5,
    categories: ['Action', 'Adventure'],
    description:
      'Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn thấy là sự thật hay là ảo mộng.',
  }))

  return (
    <main className="h-full w-full">
      <div className="relative h-[26rem] w-full md:h-[32rem]">
        <Image fill src={movie.thumbUrl} className="object-cover" alt="movie thumbnail" />
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-end bg-gradient-to-t from-[#0D0C10] via-[#0D0C10]/50 via-50% px-4">
          <div className="movie-title">{movie.title}</div>
          <div className="mt-4 inline-flex justify-between">
            <div className="inline-flex gap-2 md:w-1/2">
              <button className="btn-icon !btn-primary flex-1">
                <PlayCircleIcon className="icon" />
                <div className="title">Watch Now</div>
              </button>
              <button className="btn-icon !btn-outline md:flex-1">
                <BookmarkIcon className="icon" />
                <div className="title max-md:hidden">Add Watchlist</div>
              </button>
            </div>
            <div className="inline-flex gap-2">
              <button className="btn-icon !btn-outline">
                <HandThumbUpIcon className="icon" />
              </button>
              <button className="btn-icon !btn-outline">
                <ArrowDownTrayIcon className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full px-4">
        <div className="title">Story Line</div>
        <div>{movie.description}</div>
      </div>
      <div className="mt-8 h-60 w-full px-4">
        <div className="title">Related Movies</div>
        <DefaultMovieCardList movies={relatedMovies} className="h-[22rem]" />
      </div>
    </main>
  )
}
