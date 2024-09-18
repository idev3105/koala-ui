'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { VerticalMovieCard } from '@/components/VerticalMovieCard'
import { Movie } from '@/types'

const ITEMS_PER_PAGE = 20

export default function AllMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  const fetchMovies = async (pageNum: number) => {
    // TODO: Replace this with actual API call
    const newMovies = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `movie-${(pageNum - 1) * ITEMS_PER_PAGE + index}`,
      title: `Movie ${(pageNum - 1) * ITEMS_PER_PAGE + index + 1}`,
      thumbUrl: `/movie_thumb_test_${(index % 2) + 1}.png`,
      rate: Math.random() * 10,
      categories: ['Action', 'Adventure'],
      description: `Description for Movie ${(pageNum - 1) * ITEMS_PER_PAGE + index + 1}`,
      trailerUrl: '/test.mp4', // Replace with actual trailer URL
    }))
    return newMovies
  }

  useEffect(() => {
    const loadMoreMovies = async () => {
      const newMovies = await fetchMovies(page)
      setMovies((prevMovies) => [...prevMovies, ...newMovies])
    }

    loadMoreMovies()
  }, [page])

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">All Movies</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative h-[400px] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <VerticalMovieCard
              title={movie.title}
              thumbUrl={movie.thumbUrl}
              rate={movie.rate}
              trailerUrl={movie.trailerUrl}
              description={movie.description}
              categories={movie.categories}
              onClick={() => {}} // TODO: Implement onClick handler
              onClickPlay={() => {}} // TODO: Implement onClickPlay handler
              onClickBookmark={() => {}} // TODO: Implement onClickBookmark handler
            />
          </div>
        ))}
      </div>
      <div ref={ref} className="mt-8 flex justify-center">
        <div className="loading loading-dots loading-lg"></div>
      </div>
    </div>
  )
}
