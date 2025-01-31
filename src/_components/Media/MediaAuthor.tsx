import clsx from 'clsx'
import { CheckIcon, ChevronDown, User } from 'lucide-react'
import { Photo, Video } from 'pexels'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import Spinner from '../Spinner'
import { getSize } from '@/utils/getSize'

export interface IDropDownPhotoData {
  value: string
  key: string
}
export interface IDropDownVideoData {
  id: number
  quality: 'hd' | 'sd' | 'hls'
  file_type: 'string'
  width: number | null
  height: number | null
  link: string
  fps: number | null
  size: number
}

interface MediaAuthorProps {
  className?: string
  media: (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })
  dropDownData: IDropDownPhotoData[] | IDropDownVideoData[]
}

const sortData = (data: IDropDownVideoData[]) => {
  return [...data].sort((a: IDropDownVideoData, b: IDropDownVideoData) => {
    if ('width' in a && 'width' in b) {
      return (b.width || 0) - (a.width || 0)
    }
    return 0
  })
}

export const MediaAuthor: FC<MediaAuthorProps> = ({ className, media, dropDownData }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const authorName = media.type === 'Video' ? media?.user?.name : media?.photographer

  const [selectedPhotoValue, setSelectedPhotoValue] = useState<IDropDownPhotoData | null>(null)
  const [selectedVideoValue, setSelectedVideoValue] = useState<IDropDownVideoData | null>(null)

  useEffect(() => {
    if ((dropDownData as IDropDownPhotoData[]) && dropDownData?.length > 0) {
      setSelectedPhotoValue(dropDownData[0] as IDropDownPhotoData)
    }

    if ((dropDownData as IDropDownVideoData[]) && dropDownData?.length > 0) {
      const sortedVideoData = sortData(dropDownData as IDropDownVideoData[])

      setSelectedVideoValue(sortedVideoData[0] as IDropDownVideoData)
    }
  }, [dropDownData])

  const handleDownload = async () => {
    setIsProcessing(true)

    const url = media.type === 'Photo' ? selectedPhotoValue?.value : selectedVideoValue?.link
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
              {isProcessing && <Spinner size="xs" />}
              download
            </Button>

            <Listbox
              value={selectedPhotoValue}
              onChange={(item) => {
                setSelectedPhotoValue(item)
              }}
            >
              <ListboxButton
                className={buttonVariants({ variant: 'default', size: 'sm', className: 'rounded-l-none' })}
              >
                <ChevronDown className="transition-transform size-4" />
              </ListboxButton>

              <ListboxOptions
                anchor="bottom end"
                className={'w-48 bg-primary text-accent rounded-md text-sm font-medium px-2 py-2 z-50'}
              >
                {(dropDownData as IDropDownPhotoData[]).map((item) => {
                  return (
                    <ListboxOption
                      key={item.key}
                      value={item}
                      className="group flex cursor-pointer justify-between items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <div className="text-sm/6 text-white capitalize">{item.key}</div>

                      <CheckIcon className="invisible size-4 text-white group-data-[selected]:visible" />
                    </ListboxOption>
                  )
                })}
              </ListboxOptions>
            </Listbox>
          </div>
        )}

        {media.type === 'Video' && (
          <div className="flex">
            <Button
              disabled={isProcessing}
              size="sm"
              onClick={() => {
                handleDownload()
              }}
              className="rounded-r-none capitalize"
            >
              {isProcessing && <Spinner size="xs" />}
              download
            </Button>

            <Listbox
              value={selectedVideoValue}
              onChange={(item) => {
                setSelectedVideoValue(item)
              }}
            >
              <ListboxButton
                className={buttonVariants({ variant: 'default', size: 'sm', className: 'rounded-l-none' })}
              >
                <ChevronDown className="transition-transform size-4" />
              </ListboxButton>

              <ListboxOptions
                anchor="bottom end"
                className={'min-w-48 bg-primary text-accent rounded-md text-sm font-medium px-2 py-2 z-50'}
              >
                {sortData(dropDownData as IDropDownVideoData[]).map((item) => {
                  return (
                    <ListboxOption
                      key={item.id}
                      value={item}
                      className="group cursor-pointer flex justify-between items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <div className="text-sm text-white capitalize flex items-center gap-2">
                        <span>
                          {item.quality} {`(${item.width}x${item.height})`}
                        </span>

                        <span className="text-xs whitespace-nowrap text-muted-foreground">{getSize(item.size)}</span>
                      </div>

                      <CheckIcon className="invisible size-4 text-white group-data-[selected]:visible flex-shrink-0" />
                    </ListboxOption>
                  )
                })}
              </ListboxOptions>
            </Listbox>
          </div>
        )}
      </div>
    </div>
  )
}
