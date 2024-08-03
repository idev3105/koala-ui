'use client'

import { useRouter } from 'next/navigation'
import { CarouselIndicator } from './CarouselIndicator'
import TopMovieCard from './TopMovieCard'
import { useRef, useState } from 'react'
import { NextIcon } from './icons/NextIcon'
import { PrevIcon } from './icons/PrevIcon'
import { PlayCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'

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
    <div className="h-full w-full">
      <div className="h-4/5 w-full">
        <ul className="carousel h-full w-full overflow-hidden">
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
        <button className="btn btn-primary btn-sm flex-1">
          <PlayCircleIcon className="btn-icon" />
          <div>Watch Now</div>
        </button>
        <button className="btn btn-outline btn-sm flex-1">
          <BookmarkIcon className="btn-icon" />
          <div>Add Watchlist</div>
        </button>
      </div>
      <div className="relative mt-2 flex w-full justify-center py-2 sm:bottom-6 sm:left-[90%] sm:w-12">
        <CarouselIndicator activeIndex={currentIndex} total={topMovies.length} />
      </div>
      <div className="relative bottom-2/3 flex w-full justify-between">
        <button className="btn-rounded-opacity ml-2" onClick={onClickPrevious}>
          <PrevIcon className="size-4" />
        </button>
        <button className="btn-rounded-opacity mr-2" onClick={onClickNext}>
          <NextIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}