'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { NextIcon } from './icons/NextIcon'
import { VerticalMovieCard } from './VerticalMovieCard'
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
  const listRef = useRef<HTMLUListElement>(null)
  const [scrollState, setScrollState] = useState({ position: 0, canScrollPrev: false, canScrollNext: true })
  const animationRef = useRef<number>()

  const updateScrollState = useCallback(() => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current
      setScrollState({
        position: scrollLeft,
        canScrollPrev: scrollLeft > 0,
        canScrollNext: scrollLeft < scrollWidth - clientWidth - 1
      })
    }
  }, [])

  useEffect(() => {
    const listElement = listRef.current
    if (listElement) {
      listElement.addEventListener('scroll', updateScrollState)
      updateScrollState() // Initial check
      return () => listElement.removeEventListener('scroll', updateScrollState)
    }
  }, [updateScrollState])

  const scrollList = useCallback((direction: 'prev' | 'next') => {
    if (!listRef.current) return

    const { clientWidth, scrollLeft, scrollWidth } = listRef.current
    const targetPosition = direction === 'next'
      ? Math.min(scrollLeft + clientWidth, scrollWidth - clientWidth)
      : Math.max(scrollLeft - clientWidth, 0)

    const startTime = performance.now()
    const duration = 300 // Animation duration in ms

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeProgress = easeInOutCubic(progress)
      const newPosition = scrollLeft + (targetPosition - scrollLeft) * easeProgress

      listRef.current!.scrollLeft = newPosition

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        updateScrollState()
      }
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = requestAnimationFrame(animate)
  }, [updateScrollState])

  const onClickMovie = useCallback((movie: Movie) => {
    router.push(`/movies/${movie.id}`)
  }, [router])

  const movieItems = useMemo(() => movies.map((movie, index) => (
    <li
      key={movie.id}
      className={`carousel-item top-0 w-2/3 snap-center snap-always border-2 border-transparent hover:border-primary max-sm:first:ml-[50%] sm:snap-start md:w-1/4 ${itemClassName}`}
      onClick={() => onClicked?.(movie)}
      onMouseOver={() => onFocused?.(movie)}
    >
      <VerticalMovieCard
        title={movie.title}
        thumbUrl={movie.thumbUrl}
        rate={movie.rate}
        categories={movie.categories}
        onClick={() => onClickMovie(movie)}
        onClickPlay={() => onClickPlay?.(movie)}
        onClickBookmark={() => onClickBookmark?.(movie)}
      />
    </li>
  )), [movies, itemClassName, onClicked, onFocused, onClickMovie, onClickPlay, onClickBookmark])

  return (
    <div className={`relative inline-flex h-full w-full items-center ${className}`}>
      <button
        className="btn relative right-[-2px] h-16 rounded-l-lg rounded-r-none border-transparent bg-gray-800 px-2"
        onClick={() => scrollList('prev')}
        disabled={!scrollState.canScrollPrev}
      >
        <PrevIcon className="size-4" />
      </button>
      <ul className="carousel scroll-smooth h-full w-full gap-4 py-8 sm:gap-8" ref={listRef}>
        {movieItems}
        <li className={`carousel-item top-0 w-2/3 snap-center snap-always first:ml-[50%] sm:ml-0 sm:snap-start md:w-1/4 ${itemClassName}`}>
          <div className="inline-flex h-full w-full items-center justify-center rounded border-2 border-transparent bg-gray-800/90">
            <button className="btn btn-circle btn-ghost size-16 bg-gray-600 px-4">
              <PlusIcon className="h-full w-full" />
            </button>
          </div>
        </li>
      </ul>
      <button
        className="btn relative left-[-2px] h-16 rounded-l-none rounded-r-lg border-transparent bg-gray-800 px-2"
        onClick={() => scrollList('next')}
        disabled={!scrollState.canScrollNext}
      >
        <NextIcon className="size-4" />
      </button>
    </div>
  )
}

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
