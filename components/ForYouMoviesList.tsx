'use client'

import { Movie } from '@/types'
import { SectionProps } from './Section'
import Image from 'next/image'
import { useState } from 'react'
import DefaultMovieCardList from './DefaultMovieCardList'
import { StarIcon } from '@heroicons/react/24/solid'
import { PlayCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import './btn-icon.css'

type ForYouMoviesListProps = React.HTMLAttributes<HTMLDivElement> &
  SectionProps & {
    movies: Movie[]
  }

export default function ForYouMoviesSection({
  movies,
  className,
  childrenClassName,
  title = 'For You',
  subTitle = 'Best movies for you',
}: ForYouMoviesListProps) {
  const [focusedMovie, setFocusedMovie] = useState<Movie>(movies[0])

  const onFocused = (movie: Movie) => {
    setFocusedMovie(movie)
  }

  return (
    <div className={`${className} relative py-16`}>
      <div className="absolute top-0 z-[-1] h-full w-full">
        <div className="absolute top-[-12px] z-10 h-1/5 w-full bg-gradient-to-b from-[#0D0C10] via-[#0D0C10]/70 to-[#0D0C10]/5" />
        <div className="absolute top-[-12px] z-10 h-[calc(100%+12px)] w-1/2 bg-gradient-to-r from-[#0D0C10] via-[#0D0C10]/70 to-[#0D0C10]/5" />
        <div className="absolute bottom-[-2rem] z-10 h-1/5 w-full bg-gradient-to-t from-[#0D0C10] via-[#0D0C10]/70 to-[#0D0C10]/5" />
        <Image
          fill
          src={focusedMovie.thumbUrl}
          alt="Movie thumbnail"
          className="object-cover blur-sm"
        />
      </div>
      <div className="title ml-4">{title}</div>
      {subTitle && <div className="sub-title ml-4">{subTitle}</div>}
      <div className={`mt-2 w-full gap-10 md:flex md:flex-row-reverse ${childrenClassName}`}>
        <div className="h-full w-full md:w-3/5 md:flex-1">
          <DefaultMovieCardList
            movies={movies}
            onFocused={onFocused}
            onClicked={onFocused}
            itemClassName="lg:w-1/3"
          />
        </div>
        <div className="md:w-2/5">
          <div className="mt-8 flex flex-col gap-4 p-4">
            <div className="title line-clamp-1 font-bold">{focusedMovie.title}</div>
            <div className="inline-flex items-center gap-2">
              <StarIcon className="size-4 text-yellow-400" />
              <div className="sm:text-sm">{focusedMovie.rate}</div>
              <div> | </div>
              <div className="sm:text-sm">{focusedMovie.categories?.at(0)}</div>
            </div>
            <div className="line-clamp-6">{focusedMovie.description}</div>
          </div>
          <div className="mt-4 flex gap-4 px-4 sm:hidden sm:w-full sm:px-8">
            <button className="btn-icon !btn-primary flex-1">
              <PlayCircleIcon className="icon" />
              <div className="title">Watch Now</div>
            </button>
            <button className="btn-icon !btn-outline flex-1">
              <BookmarkIcon className="icon" />
              <div className="title">Add Watchlist</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
