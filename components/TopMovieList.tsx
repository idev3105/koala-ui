'use client'

import { CarouselIndicator } from './CarouselIndicator'
import TopMovieCard from './TopMovieCard'
import { useRef, useState } from 'react'
import { NextIcon } from './icons/NextIcon'
import { PrevIcon } from './icons/PrevIcon'
import { PlayCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import './btn-icon.css'

export function TopMovieList() {
  const topMovies = [0, 1, 2, 3, 4] // TODO: fake top movies list

  const [currentIndex, setCurrentIndex] = useState(0)

  const movieCardRefs = useRef<(HTMLLIElement | null)[]>([])

  const onClickPrevious = () => {
    const prevIndex = (currentIndex - 1 + topMovies.length) % topMovies.length
    movieCardRefs.current[prevIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setCurrentIndex(prevIndex)
  }

  const onClickNext = () => {
    const nextIndex = (currentIndex + 1) % topMovies.length
    movieCardRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setCurrentIndex(nextIndex)
  }

  return (
    <div className="relative h-full w-full">
      <div className="h-4/5 w-full">
        <ul className="carousel h-full w-full">
          {topMovies.map((movie, index) => (
            <li
              ref={(e) => {
                movieCardRefs.current[index] = e
              }}
              className="carousel-item w-full"
              key={index}
            >
              <TopMovieCard />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex gap-4 px-4 sm:w-2/5 sm:px-8">
        <button className="btn-icon !btn-primary flex-1">
          <PlayCircleIcon className="icon" />
          <div className="title">Watch Now</div>
        </button>
        <button className="btn-icon !btn-outline flex-1">
          <BookmarkIcon className="icon" />
          <div className="title">Add Watchlist</div>
        </button>
      </div>
      <div className="relative mt-2 flex w-full justify-center py-2 sm:bottom-6 sm:left-[90%] sm:w-12">
        <CarouselIndicator activeIndex={currentIndex} total={topMovies.length} />
      </div>
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
    </div>
  )
}
