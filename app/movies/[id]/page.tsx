import Image from 'next/image'
import '@/components/btn-icon.css'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon, BookmarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import DefaultMovieCardList from '@/components/DefaultMovieCardList'
import DefaultEpisodeCardList from '@/components/DefaultEpisodeCardList'
import TrailerPlayer from '@/components/TrailerPlayer'

export default function Movie({ params }: { params: { id: string } }) {
  // TODO: this is fake movie
  const movie = {
    title: 'Tru tien',
    thumbUrl: 'https://i.pinimg.com/originals/af/a7/19/afa719a6adf39412fdfe497f3136cc92.webp',
    rate: 8.5,
    trailerUrl: '/test.mp4',
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
    trailerUrl: '/test.mp4',
    categories: ['Action', 'Adventure'],
    description:
      'Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn thấy là sự thật hay là ảo mộng.',
  }))

  return (
    <div className="h-full w-full">
      <div className="title">Story Line</div>
      <div className="flex items-start gap-4">
        <div className="h-auto flex-1">
          <TrailerPlayer trailerUrl={movie.trailerUrl} />
        </div>
        <div className="flex-1">{movie.description}</div>
      </div>
    </div>
  )
}
