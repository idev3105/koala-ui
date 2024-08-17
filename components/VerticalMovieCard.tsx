import { PhotoIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import './vertical-movie-card.css'

type VerticalMovieCardProps = {
  title?: string
  thumbUrl?: string
  rate?: number
  categories?: string[]
  onClickPlay?: () => void
  onClickBookmark?: () => void
}

export function VerticalMovieCard({
  title,
  thumbUrl,
  rate,
  categories,
  onClickPlay,
  onClickBookmark,
}: VerticalMovieCardProps) {
  return (
    <div className="vertical-movie-card relative h-full w-full rounded-md">
      <div className="relative top-0 h-full">
        {thumbUrl && (
          <Image
            fill
            src={thumbUrl}
            alt={title || 'thumbnail'}
            className="rounded-md object-cover"
          />
        )}
        {!thumbUrl && (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-400">
            <PhotoIcon className="size-8" />
          </div>
        )}
      </div>
      <div className="relative bottom-1/4 h-1/4 rounded-md bg-gradient-to-t from-black via-black/70 to-gray-400/5 p-2">
        <div className="absolute bottom-0 pb-4">
          <div className="line-clamp-1 font-bold text-white">{title}</div>
          <div className="inline-flex items-center gap-2">
            <StarIcon className="size-4 text-yellow-400" />
            <div className="sm:text-sm">{rate}</div>
            <div> | </div>
            <div className="sm:text-sm">{categories?.at(0)}</div>
          </div>
        </div>
      </div>
      <div className="options absolute left-1/2 top-1/2 inline-flex h-fit w-fit -translate-x-1/3 -translate-y-1/2 items-center justify-center gap-2">
        <button
          className="simple-btn-rounded-opacity !size-fit p-2"
          onClick={() => onClickPlay && onClickPlay()}
        >
          <PlayIcon className="size-8" />
        </button>
        <button
          className="simple-btn-rounded-opacity !size-fit p-2"
          onClick={() => onClickBookmark && onClickBookmark()}
        >
          <BookmarkIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
