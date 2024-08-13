'use client'

import { use, useEffect, useRef, useState } from 'react'
import { NextIcon } from './icons/NextIcon'
import { VerticalMovieCard } from './VerticalMovieCard'
import _ from 'lodash'
import { findFirstVisibleItem, amountOfVisibleItems } from '@/utils/ui'
import { Movie } from '@/types'
import { PrevIcon } from './icons/PrevIcon'

type DefaultMovieCardListProps = React.HTMLAttributes<HTMLDivElement> & {
  movies: Movie[]
  onFocused?: (movie: Movie) => void
  itemClassName?: string
}

export default function DefaultMovieCardList({
  movies,
  onFocused,
  itemClassName,
}: DefaultMovieCardListProps) {
  const [highlighIndex, setHighlightIndex] = useState<number | undefined>(-1)
  const listRef = useRef<HTMLUListElement>(null)

  const debounceFindAndHighlightItem = _.debounce(() => {
    if (listRef.current) {
      const visibleItems = amountOfVisibleItems(listRef.current)
      console.log('visible items', visibleItems)

      if (!visibleItems) {
        return
      }

      var index = -1
      if (visibleItems == 1) {
        index = findFirstVisibleItem(listRef.current) || 0
      }
      setHighlightIndex(index)
      index && index < movies.length && onFocused && index >= 0 && onFocused(movies[index])
    }
  }, 50)

  // initial highlight index
  useEffect(() => {
    if (listRef.current) {
      const visibleItems = amountOfVisibleItems(listRef.current)
      if (visibleItems && visibleItems == 1) {
        setHighlightIndex(0)
      }
    }
  }, [])

  // update highlight index
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

  const onClickPrevious = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= listRef.current.clientWidth
    }
  }

  const onClickNext = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += listRef.current.clientWidth
    }
  }

  return (
    <div className="relative h-full w-full">
      <button
        className="simple-btn-rounded-opacity absolute top-1/2 z-10 -translate-y-1/2"
        onClick={onClickPrevious}
      >
        <PrevIcon className="size-4" />
      </button>
      <button
        className="simple-btn-rounded-opacity absolute right-0 top-1/2 z-10 -translate-y-1/2"
        onClick={onClickNext}
      >
        <NextIcon className="size-4" />
      </button>
      <ul className="carousel h-full w-full gap-6 p-8 pl-0" ref={listRef}>
        {movies.map((movie, index) => (
          <li
            id={`movie-card-${index}`}
            key={index}
            className={`carousel-item top-0 ml-8 w-2/3 snap-center snap-always scroll-ml-8 rounded md:w-1/4 lg:w-1/6 ${index == highlighIndex ? 'zoom-in' : null} ${itemClassName}`}
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
