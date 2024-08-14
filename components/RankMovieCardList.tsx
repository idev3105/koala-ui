'use client'

import { useRef } from 'react'
import { HorizontalMovieCard } from './HorizontalMovieCard'
import { NextIcon } from './icons/NextIcon'
import { PrevIcon } from './icons/PrevIcon'

export default function RankMovieCardList() {
  const movies = Array.from({ length: 10 }, (_, index) => ({
    title: 'Dau pha thuong khung',
    thumbUrl: 'https://i.pinimg.com/originals/26/f1/d7/26f1d757f30938d12b1980085da08563.jpg',
    rate: 8.5,
    categories: ['Action', 'Adventure'],
  }))

  const listRef = useRef<HTMLUListElement>(null)
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
      <ul className="carousel h-full w-full gap-6 pl-8" ref={listRef}>
        {movies.map((movie, index) => (
          <li
            id={`rank-movie-${index}`}
            key={index}
            className="carousel-item inline-flex w-2/3 snap-center snap-always first:ml-16 sm:first:ml-8 md:w-1/5"
          >
            <div className="flex w-1/5 items-center justify-items-center">
              <div className="text-center text-3xl font-bold text-white">{index + 1}</div>
            </div>
            <HorizontalMovieCard
              title={movie.title}
              thumbUrl={movie.thumbUrl}
              rate={movie.rate}
              categories={movie.categories}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
