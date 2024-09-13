'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { NextIcon } from './icons/NextIcon'
import { PrevIcon } from './icons/PrevIcon'
import PlusIcon from './icons/PlusIcon'
import _ from 'lodash'
import { findFirstVisibleItem, amountOfVisibleItems } from '@/utils/ui'
import { Movie } from '@/types'
import { useRouter } from 'next/navigation'
import { EpisodeCard } from './EpisodeCard'

type DefaultEpisodeCardListProps = React.HTMLAttributes<HTMLDivElement> & {
  movies: Movie[]
  itemClassName?: string
  onFocused?: (movie: Movie) => void
  onClicked?: (movie: Movie) => void
  onClickPlay?: (movie: Movie) => void
  onClickBookmark?: (movie: Movie) => void
}

export default function DefaultEpisodeCardList({
  movies,
  className,
  itemClassName,
  onFocused,
  onClicked,
  onClickPlay,
  onClickBookmark,
}: DefaultEpisodeCardListProps) {
  const router = useRouter()
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const listRef = useRef<HTMLUListElement>(null)
  const scrollAmountRef = useRef<number>(0)

  const debounceFindAndHighlightItem = useCallback(
    _.debounce(() => {
      if (listRef.current) {
        const visibleItems = amountOfVisibleItems(listRef.current)
        if (!visibleItems) return

        const index = visibleItems === 1 ? findFirstVisibleItem(listRef.current) || 0 : -1
        setHighlightIndex(index)
        if (index >= 0 && index < movies.length && onFocused) {
          onFocused(movies[index])
        }
      }
    }, 50),
    [movies, onFocused],
  )

  const calculateScrollAmount = useCallback(() => {
    if (listRef.current) {
      const listWidth = listRef.current.clientWidth
      const itemWidth = listRef.current.children[0].clientWidth
      return listWidth - (itemWidth * 2) / 3
    }
    return 0
  }, [])

  const scrollList = useCallback(
    (direction: 'prev' | 'next') => {
      if (!listRef.current) return

      if (scrollAmountRef.current === 0) {
        scrollAmountRef.current = calculateScrollAmount()
      }

      const startPosition = listRef.current.scrollLeft
      const distance = direction === 'next' ? scrollAmountRef.current : -scrollAmountRef.current
      const duration = 300 // ms
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const percentage = Math.min(progress / duration, 1)
        const easeInOutCubic =
          percentage < 0.5
            ? 4 * percentage * percentage * percentage
            : 1 - Math.pow(-2 * percentage + 2, 3) / 2

        listRef.current!.scrollLeft = startPosition + distance * easeInOutCubic

        if (progress < duration) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    },
    [calculateScrollAmount],
  )

  useEffect(() => {
    if (listRef.current && amountOfVisibleItems(listRef.current) === 1) {
      setHighlightIndex(0)
    }
  }, [])

  useEffect(() => {
    const listElement = listRef.current
    if (!listElement) return

    listElement.addEventListener('scroll', debounceFindAndHighlightItem)
    return () => listElement.removeEventListener('scroll', debounceFindAndHighlightItem)
  }, [debounceFindAndHighlightItem])

  const onClickPrevious = () => {
    scrollList('prev')
  }

  const onClickNext = () => {
    scrollList('next')
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
            key={movie.id}
            className={`carousel-item top-0 w-2/3 snap-center snap-always border-2 border-transparent hover:border-primary max-sm:first:ml-[50%] sm:snap-start md:w-1/4 ${
              index === highlightIndex ? 'focused max-sm:scale-110 max-sm:duration-200' : ''
            } ${itemClassName}`}
            onClick={() => onClicked?.(movie)}
            onMouseOver={() => onFocused?.(movie)}
          >
            <EpisodeCard
              {...movie}
              onClick={() => router.push(`/movies/${movie.id}`)}
              onClickPlay={() => onClickPlay?.(movie)}
              onClickBookmark={() => onClickBookmark?.(movie)}
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
