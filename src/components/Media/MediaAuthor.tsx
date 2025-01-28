import clsx from 'clsx'
import { User } from 'lucide-react'
import { Photo, Video } from 'pexels'
import { FC } from 'react'
import { Link } from 'react-router'

interface MediaAuthorProps {
  className?: string
  media: (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })
}

export const MediaAuthor: FC<MediaAuthorProps> = ({ className, media }) => {
  const authorName = media.type === 'Video' ? media?.user?.name : media?.photographer
  const mediaUrl = media.type === 'Video' ? media?.user?.url : media?.photographer_url

  return (
    <div
      className={clsx(
        'px-3 p-4 flex justify-between gap-2 before:absolute before:bg-gradient-to-t before:from-black/50 before:left-0 before:w-full before:h-20 before:bottom-0 before:pointer-events-none',
        className
      )}
    >
      <Link to={media.url} target="_blank" className="flex items-center gap-2 relative">
        <div className="size-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
          <User className="size-5" />
        </div>

        <p className="text-sm font-bold text-white">{authorName}</p>
      </Link>

      <div>
        <Link
          to={mediaUrl}
          download
          target="_blank"
          className="relative text-white bg-green-600 py-1.5 px-3 rounded capitalize font-medium text-sm"
        >
          download
        </Link>
      </div>
    </div>
  )
}
