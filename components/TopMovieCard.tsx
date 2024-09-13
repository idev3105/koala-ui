import { BookmarkIcon } from '@heroicons/react/24/outline'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function TopMovieCard() {
  return (
    <div className="h-full w-full">
      <div className="relative top-0 h-full w-full">
        <Image fill alt="Movie poster" src="/movie_thumb_test_1.png" className="object-cover" />
      </div>
      <div className="relative bottom-1/2 flex h-1/2 flex-col justify-end bg-gradient-to-t from-[#0D0B0E] via-[#0D0B0E]/80 to-[#0D0B0E]/10 px-8 pb-2">
        <div className="md:w-2/5">
          <div className="movie-title">Gia Thien</div>
          <div>24m</div>
          <div className="movie-description sm:line-clamp-none">
            Một chàng trai thành đạt được bạn bè yêu quý. Trong một lần họp mặt cùng nhóm bạn, một
            sự cố huyền ảo đã xảy ra và đưa cả nhóm bạn quay trở về thời cổ đại, thời kỳ tồn tại của
            những vị thần. Nơi đó, mọi mâu thuẫn chỉ có thể giải quyết bằng sức mạnh…Có tồn tại thế
            giới thần tiên này ư? Có phải đây chỉ là những truyền thuyết hay sự tích ? Những gì nhìn
            thấy là sự thật hay là ảo mộng.
          </div>
        </div>
      </div>
    </div>
  )
}
