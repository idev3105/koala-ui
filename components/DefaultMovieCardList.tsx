'use client'

import { useEffect, useRef, useState } from 'react'
import { NextIcon } from './icons/NextIcon'
import { VerticalMovieCard } from './VerticalMovieCard'
import _ from 'lodash'
import { findFirstVisibleItem, amountOfVisibleItems } from '@/utils/ui'
import { Movie } from '@/types'
import { PrevIcon } from './icons/PrevIcon'
import PlusIcon from './icons/PlusIcon'
import { useRouter } from 'next/navigation'

type DefaultMovieCardListProps = React.HTMLAttributes<HTMLDivElement> & {
  movies: Movie[]
  itemClassName?: string
  onFocused?: (movie: Movie) => void
  onClicked?: (movie: Movie) => void
  onClickPlay?: (movie: Movie) => void
  onClickBookmark?: (movie: Movie) => void
}

export default function DefaultMovieCardList({
  movies,
  className,
  itemClassName,
  onFocused,
  onClicked,
  onClickPlay,
  onClickBookmark,
}: DefaultMovieCardListProps) {
  const router = useRouter()

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
      listRef.current.scrollLeft -=
        listRef.current.clientWidth - (listRef.current.children[0].clientWidth * 2) / 3
    }
  }

  const onClickNext = () => {
    if (listRef.current) {
      listRef.current.scrollLeft +=
        listRef.current.clientWidth - (listRef.current.children[0].clientWidth * 2) / 3
    }
  }

  const onClickMovie = (movie: Movie) => {
    router.push(`/movies/${movie.id}`)
  }

  return (
    <div className={`relative inline-flex h-full w-full items-center ${className}`}>
      <button
        className="btn relative right-[-2px] h-16 rounded-l-lg rounded-r-none border-transparent bg-gray-800 px-2"
        onClick={onClickPrevious}
      >
        <PrevIcon className="size-4" />
      </button>
      <ul className="carousel h-full w-full gap-4 py-8 sm:gap-8" ref={listRef}>
        {movies.map((movie, index) => (
          <li
            key={index}
            className={`carousel-item top-0 w-2/3 snap-center snap-always border-2 border-transparent hover:border-primary max-sm:first:ml-[50%] sm:snap-start md:w-1/4 [&.focused]:max-sm:scale-110 [&.focused]:max-sm:duration-200 ${index == highlighIndex ? 'focused' : ''} ${itemClassName}`}
            onClick={() => onClicked && onClicked(movie)}
            onMouseOver={() => onFocused && onFocused(movie)}
          >
            <VerticalMovieCard
              title={movie.title}
              thumbUrl={movie.thumbUrl}
              rate={movie.rate}
              categories={movie.categories}
              onClick={() => onClickMovie(movie)}
              onClickPlay={() => onClickPlay && onClickPlay(movie)}
              onClickBookmark={() => onClickBookmark && onClickBookmark(movie)}
            />
          </li>
        ))}
        <li
          key="end"
          className={`carousel-item top-0 w-2/3 snap-center snap-always first:ml-[50%] sm:ml-0 sm:snap-start md:w-1/4 ${itemClassName}`}
        >
          <div className="inline-flex h-full w-full items-center justify-center rounded border-2 border-transparent bg-gray-800/90">
            <button className="btn btn-circle btn-ghost size-16 bg-gray-600 px-4">
              <PlusIcon className="h-full w-full" />
            </button>
          </div>
        </li>
      </ul>
      <button
        className="btn relative left-[-2px] h-16 rounded-l-none rounded-r-lg border-transparent bg-gray-800 px-2"
        onClick={onClickNext}
      >
        <NextIcon className="size-4" />
      </button>
    </div>
  )
}
