import clsx from 'clsx'
import { CheckIcon, ChevronDown, User } from 'lucide-react'
import { Photo, Video } from 'pexels'
import { FC, useState } from 'react'
import { Link } from 'react-router'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

interface MediaAuthorProps {
  className?: string
  media: (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })
}

export const MediaAuthor: FC<MediaAuthorProps> = ({ className, media }) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const authorName = media.type === 'Video' ? media?.user?.name : media?.photographer
  const mediaUrl =
    media.type === 'Video'
      ? media.video_files
      : Object.entries(media.src).map(([key, value]) => ({
          key,
          value
        }))

  console.log('mediaUrl', mediaUrl)

  const [selected, setSelected] = useState(null)

  // const handleDownload = () => {
  //   if (media.type === 'Photo') {
  //     // For photos, download the original size
  //     window.open(media.src.original, '_blank')
  //   }

  //   if (media.type === 'Video') {
  //     // For videos, download the first video file
  //     const videoUrl = media.video_files[0]?.link
  //     if (videoUrl) {
  //       window.open(videoUrl, '_blank')
  //     }
  //   }
  // }

  const handleDownload = async () => {
    setIsProcessing(true)
    const url = media.type === 'Photo' ? media.src.original : media.video_files[0]?.link
    const extension = media.type === 'Photo' ? '.jpg' : '.mp4'

    if (url) {
      const response = await fetch(url)
      const blob = await response.blob()
      const fileUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = `${media.id}-${media.type.toLowerCase()}${extension}`
      document.body.appendChild(link)
      link.click()
      setIsProcessing(false)
      link.remove()

      window.URL.revokeObjectURL(fileUrl)
    }
  }
  console.log('selected', selected)

  return (
    <div
      className={clsx(
        'px-3 p-4 flex justify-between gap-2 before:absolute before:bg-gradient-to-t before:from-black/50 before:left-0 before:w-full before:h-20 before:bottom-0 before:pointer-events-none',
        className
      )}
    >
      <Link to={media.url} target="_blank" className="flex items-center gap-2 relative">
        <div className="size-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center flex-shrink-0">
          <User className="size-5" />
        </div>

        <p className="text-sm font-bold text-white">{authorName}</p>
      </Link>

      <div className="relative">
        {media.type === 'Photo' && (
          <div className="flex">
            <Button
              disabled={isProcessing}
              size="sm"
              onClick={() => {
                handleDownload()
              }}
              className="rounded-r-none capitalize"
            >
              download
            </Button>

            <Listbox
              value={selected}
              onChange={(item) => {
                setSelected(item)
              }}
            >
              <ListboxButton
                className={buttonVariants({ variant: 'default', size: 'sm', className: 'rounded-l-none' })}
              >
                {/* {selected ? selected : ''} */}
                <ChevronDown className="transition-transform size-4" />
              </ListboxButton>

              <ListboxOptions
                anchor="bottom end"
                className={'w-48 bg-primary text-accent rounded-md text-sm font-medium px-4 py-2 z-50'}
              >
                {mediaUrl.map((item) => {
                  return (
                    <ListboxOption
                      key={item.key}
                      value={item}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <CheckIcon className="invisible size-4 text-white group-data-[selected]:visible" />
                      <div className="text-sm/6 text-white">{item.key}</div>
                    </ListboxOption>
                  )
                })}
              </ListboxOptions>
            </Listbox>
          </div>
        )}

        {media.type === 'Video' && (
          <Button
            disabled={isProcessing}
            size="sm"
            onClick={() => {
              handleDownload()
            }}
          >
            download Video
          </Button>
        )}
      </div>
    </div>
  )
}
