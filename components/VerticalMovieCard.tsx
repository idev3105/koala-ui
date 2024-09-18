'use client'

import { PhotoIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useState } from 'react'

type VerticalMovieCardProps = {
  title?: string
  thumbUrl?: string
  rate?: number
  trailerUrl?: string
  categories?: string[]
  onClickPlay?: () => void
  onClickBookmark?: () => void
  description?: string
} & React.HTMLAttributes<HTMLDivElement>

function TrailerOverlay({ trailerUrl, isVisible }: { trailerUrl: string; isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
      <video src={trailerUrl} autoPlay loop muted className="h-full w-full object-cover" />
    </div>
  )
}

function DescriptionOverlay({
  description,
  isVisible,
}: {
  description: string
  isVisible: boolean
}) {
  if (!isVisible) return null

  return (
    <div className="absolute left-0 right-0 top-full z-30 flex transform flex-col justify-end bg-black bg-opacity-75 p-4">
      <p className="text-sm text-white">{description}</p>
    </div>
  )
}

export function VerticalMovieCard({
  className,
  title,
  thumbUrl,
  rate,
  trailerUrl,
  categories,
  onClick,
  onClickPlay,
  onClickBookmark,
  description,
}: VerticalMovieCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className={`vertical-movie-card group relative h-full w-full rounded-md ${className} cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {trailerUrl && <TrailerOverlay trailerUrl={trailerUrl} isVisible={isHovering} />}
      <DescriptionOverlay description={description || ''} isVisible={isHovering} />
      <div className="relative top-0 h-full">
        {!imageError && (
          <Image
            fill
            src={thumbUrl || ''}
            alt={title || 'thumbnail'}
            className="rounded-md object-cover"
            onError={(e) => {
              setImageError(true)
            }}
          />
        )}
        {imageError && (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-400">
            <PhotoIcon className="size-8" />
          </div>
        )}
      </div>
      <div className="absolute top-0 h-full w-full bg-gradient-to-t from-[#0D0C10] via-[#0D0C10]/50 via-30%"></div>
      <div className="relative bottom-1/4 z-10 h-1/4 rounded-md p-2">
        <div className="absolute bottom-0 pb-4">
          <div className="line-clamp-1 font-bold text-white">{title}</div>
          <div className="inline-flex items-center gap-1 sm:gap-2">
            <StarIcon className="size-4 overflow-x-clip text-yellow-400" />
            <div className="text-sm">{rate}</div>
            <div> | </div>
            <div className="text-sm">{categories?.at(0)}</div>
          </div>
        </div>
      </div>
      {/* <div className="absolute left-1/2 top-1/2 hidden h-fit w-fit -translate-x-1/3 -translate-y-1/2 items-center justify-center gap-2 group-hover:sm:inline-flex">
        <button
          className="btn size-fit rounded-full border-none bg-gray-900/80 p-4"
          onClick={() => onClickPlay && onClickPlay()}
        >
          <PlayIcon className="size-8" />
        </button>
        <button
          className="btn size-fit rounded-full border-none bg-gray-900/80"
          onClick={() => onClickBookmark && onClickBookmark()}
        >
          <BookmarkIcon className="size-4" />
        </button>
      </div> */}
    </div>
  )
}
