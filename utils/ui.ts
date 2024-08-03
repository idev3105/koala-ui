export const findFirstVisibleItem = (e: HTMLElement) => {
  console.log('find and highlight item')

  // highlight first visible item is list movie card
  const movieCardItems = e.getElementsByClassName('carousel-item')
  if (movieCardItems.length === 0) return

  const sampleMovieCard = movieCardItems[0]

  const scrollLeft = e.scrollLeft

  const sampleMovieCardStyle = window.getComputedStyle(sampleMovieCard)
  const marginLeft = parseInt(sampleMovieCardStyle.getPropertyValue('margin-left'), 10)
  const parentStype = window.getComputedStyle(e)
  const gap = parseInt(parentStype.getPropertyValue('gap'), 10)
  const itemWidth = sampleMovieCard.clientWidth + marginLeft + gap
  var highlightIndex = Math.floor(
    (scrollLeft + (sampleMovieCard.clientWidth * 3) / 4 + gap) / itemWidth,
  )

  return highlightIndex
}
