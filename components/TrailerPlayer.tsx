import React from 'react'

interface TrailerPlayerProps {
  trailerUrl: string
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({ trailerUrl }) => {
  return (
    <div className="h-full w-full">
      <video controls className="h-full w-full">
        <source src={trailerUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default TrailerPlayer
