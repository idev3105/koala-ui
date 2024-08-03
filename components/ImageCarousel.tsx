export default function ImageCarousel({ images }: { images: string[] }) {
  return (
    <div className="carousel max-h-[500px] w-full gap-1 rounded-box">
      {images.map((_v, i) => (
        <div key={i} className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            alt="Tailwind CSS Carousel component"
            className="w-auto"
          />
        </div>
      ))}
    </div>
  )
}
