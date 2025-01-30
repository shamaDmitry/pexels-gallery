import { getMediaOrientation } from '@/utils/getPhotoByOrientation'
import { Video as VideoIcon } from 'lucide-react'
import { MediaAuthor } from './Media/MediaAuthor'
import { FC, useRef } from 'react'
import { Photo, Video } from 'pexels'

interface MediaItemProps {
  media: (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })
  isLoading?: boolean
}

export const MediaItem: FC<MediaItemProps> = ({ media, isLoading }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  if (isLoading) {
    return <div className="bg-gray-200 h-60 animate-pulse"></div>
  }

  if (media.type === 'Photo') {
    const orientation = getMediaOrientation(media)

    return (
      <div className="border relative select-none aspect-auto transition-all min-h-48 flex flex-col overflow-hidden rounded-xl">
        <img src={media.src[orientation]} alt={media.alt ?? ''} className="flex-1 object-cover" />

        <MediaAuthor className="absolute left-0 bottom-0 w-full" media={media} />
      </div>
    )
  }

  if (media.type === 'Video') {
    const videoUrl = media?.video_files?.[0]?.link

    const handleMouseEnter = () => {
      const videoElem = document.getElementById(`video-${media.id}`) as HTMLVideoElement

      if (videoElem) {
        videoElem.play()
      }
    }

    const handleMouseLeave = () => {
      const videoElem = document.getElementById(`video-${media.id}`) as HTMLVideoElement

      if (videoElem) {
        videoElem.pause()
        videoElem.currentTime = 0
      }
    }

    return (
      <div
        className="border cursor-pointer relative select-none transition-all aspect-video min-h-48 overflow-hidden rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute left-2 top-2 p-2 rounded-full bg-slate-200 size-9 flex items-center justify-center z-10">
          <VideoIcon className="size-5" />
        </div>

        <video
          id={`video-${media.id}`}
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          muted
          loop
          playsInline
          poster={media.image}
        />

        <MediaAuthor className="absolute left-0 bottom-0 w-full z-10" media={media} />
      </div>
    )
  }
}
