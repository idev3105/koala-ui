'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export default function Episode() {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>()

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    console.log('focus')
    if (videoRef.current) {
      videoRef.current.focus()
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })

  // TODO fetch episode
  const episode = {
    url: `http://localhost:8090/storage/movies/${id}/${episodeId}/playlist.m3u8`,
  }

  return (
    <div className="flex flex-col items-center p-4 pt-16">
      <video ref={videoRef} className="h-auto w-4/5" controls>
        <source src={episode.url} type="application/x-mpegURL" />
      </video>
    </div>
  )
}
