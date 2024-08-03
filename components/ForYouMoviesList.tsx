'use client'

import { Movie } from '@/types'
import Section, { SectionProps } from './Section'
import Image from 'next/image'
import { useState } from 'react'
import DefaultMovieCardList from './DefaultMovieCardList'

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
    <div className={`${className} relative pt-4`}>
      <div className="title ml-2 mt-8">{title}</div>
      {subTitle && <div className="sub-title ml-2">{subTitle}</div>}
      <div className={`mt-2 w-full ${childrenClassName}`}>
        <div className="w-full, h-[22rem]">
          <DefaultMovieCardList movies={movies} onFocused={onFocused} />
        </div>
        <div>
          <div className="title">{focusedMovie.title}</div>
        </div>
      </div>
      <div className="absolute top-0 z-[-1] h-full w-full">
        <div className="relative top-[-12px] z-10 h-1/5 w-full bg-gradient-to-b from-[#0D0C10] via-[#0D0C10]/70 to-[#0D0C10]/5" />
        <Image fill src={focusedMovie.thumbUrl} alt="Movie thumbnail" className="blur-sm" />
      </div>
    </div>
  )
}
