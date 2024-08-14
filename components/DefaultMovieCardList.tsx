'use client'

import { useEffect, useRef, useState } from 'react'
import { NextIcon } from './icons/NextIcon'
import { VerticalMovieCard } from './VerticalMovieCard'
import _ from 'lodash'
import { findFirstVisibleItem, amountOfVisibleItems } from '@/utils/ui'
import { Movie } from '@/types'
import { PrevIcon } from './icons/PrevIcon'
import './default-movie-list.css'
import PlusIcon from './icons/PlusIcon'

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
        className="simple-btn-rounded-opacity absolute left-2 top-1/2 z-10 -translate-y-1/2"
        onClick={onClickPrevious}
      >
        <PrevIcon className="size-4" />
      </button>
      <button
        className="simple-btn-rounded-opacity absolute right-2 top-1/2 z-10 -translate-y-1/2"
        onClick={onClickNext}
      >
        <NextIcon className="size-4" />
      </button>
      <ul className="carousel h-full w-full gap-6 py-8 pr-8" ref={listRef}>
        {movies.map((movie, index) => (
          <li
            id={`movie-card-${index}`}
            key={index}
            className={`movie-card carousel-item top-0 w-2/3 snap-center snap-always rounded sm:snap-start ${index == highlighIndex ? 'zoom-in' : ''} ${itemClassName}`}
          >
            <VerticalMovieCard
              title={movie.title}
              thumbUrl={movie.thumbUrl}
              rate={movie.rate}
              categories={movie.categories}
            />
          </li>
        ))}
        <li
          key="end"
          className={`carousel-item mr-12 inline-flex w-fit items-center justify-center`}
        >
          <button className="btn btn-circle btn-ghost size-16 bg-gray-600 px-4">
            <PlusIcon className="h-full w-full" />
          </button>
        </li>
      </ul>
    </div>
  )
}
