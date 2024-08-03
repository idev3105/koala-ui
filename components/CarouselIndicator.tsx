export function CarouselIndicator({ activeIndex, total }: { activeIndex: number; total: number }) {
  return (
    <ul className="indicator-carousel">
      {Array.from({ length: total }).map((_v, i) => (
        <li key={i} className={`indicator-carousel-item ${activeIndex === i ? 'active' : ''}`} />
      ))}
    </ul>
  )
}
