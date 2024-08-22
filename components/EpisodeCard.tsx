import { PhotoIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

type VerticalMovieCardProps = {
  title?: string
  thumbUrl?: string
  rate?: number
  categories?: string[]
  onClickPlay?: () => void
  onClickBookmark?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export function EpisodeCard({
  className,
  title,
  thumbUrl,
  rate,
  categories,
  onClick,
  onClickPlay,
  onClickBookmark,
}: VerticalMovieCardProps) {
  return (
    <div
      className={`vertical-movie-card group relative h-full w-full rounded-md ${className} cursor-pointer`}
      onClick={onClick}
    >
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
        <div className="absolute bottom-0 w-[calc(100%-0.5rem)] pb-2 pr-2">
          <div className="line-clamp-1 font-bold text-white">{title}</div>
          <div className="inline-flex w-full gap-2">
            <span>34:05</span>
            <span className="w-full">
              <progress
                className="progress progress-primary w-full"
                value={50}
                max={100}
              ></progress>
            </span>
            <span>34:05</span>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 hidden h-fit w-fit -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 group-hover:sm:inline-flex">
        <button
          className="btn size-fit rounded-full border-none bg-gray-900/80 p-4"
          onClick={() => onClickPlay && onClickPlay()}
        >
          <PlayIcon className="size-8" />
        </button>
      </div>
    </div>
  )
}
