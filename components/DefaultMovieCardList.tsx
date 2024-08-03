'use client'

import { useEffect, useRef, useState } from 'react'
import { NextIcon } from './icons/NextIcon'
import { VerticalMovieCard } from './VerticalMovieCard'
import _ from 'lodash'
import { findFirstVisibleItem } from '@/utils/ui'
import { Movie } from '@/types'

type DefaultMovieCardListProps = React.HTMLAttributes<HTMLDivElement> & {
  movies: Movie[]
  onFocused?: (movie: Movie) => void
}

export default function DefaultMovieCardList({ movies, onFocused }: DefaultMovieCardListProps) {
  const [highlighIndex, setHighlightIndex] = useState<number | undefined>(0)
  const listRef = useRef<HTMLUListElement>(null)

  const debounceFindAndHighlightItem = _.debounce(() => {
    if (listRef.current) {
      const index = findFirstVisibleItem(listRef.current)
      setHighlightIndex(index)
      index && index < movies.length && onFocused && onFocused(movies[index])
    }
  }, 50)

  useEffect(() => {
    console.log('highlight index', highlighIndex)

    if (!listRef.current) {
      return
    }

    const listElement = listRef.current
    listElement.addEventListener('scroll', debounceFindAndHighlightItem)

    return () => {
      listElement.removeEventListener('scroll', debounceFindAndHighlightItem)
    }
  })

  return (
    <div className="h-full w-full">
      <ul className="carousel h-full w-full gap-6 p-8" ref={listRef}>
        {movies.map((movie, index) => (
          <li
            id={`movie-card-${index}`}
            key={index}
            className={`carousel-item top-0 ml-8 w-2/3 snap-center snap-always scroll-ml-8 rounded md:w-1/4 lg:w-1/6 ${index == highlighIndex ? 'scale-110 transform transition-transform duration-200 ease-in-out' : null}`}
          >
            <VerticalMovieCard
              title={movie.title}
              thumbUrl={movie.thumbUrl}
              rate={movie.rate}
              categories={movie.categories}
            />
          </li>
        ))}
        <li key="end" className="carousel-item flex w-1/3 items-center justify-center px-4">
          <button className="btn btn-circle btn-ghost bg-gray-600">
            <NextIcon className="size-8" />
          </button>
        </li>
      </ul>
    </div>
  )
}
