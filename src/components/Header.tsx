import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Search from '@/components/Search'
import { pexelClient } from '@/utils/pexelClient'
import { Headline } from '@/components/Headline'
import { useSearch, UseSearchInterface } from '@/stores/useSearch'
import { MediaViewer } from './MediaViewer'
import { Photo, Video } from 'pexels'

export interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className = '' }) => {
  console.log(pexelClient)

  const [media, setMedia] = useState<Photo | Video | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const { searchType } = useSearch() as UseSearchInterface

  useEffect(() => {
    setMedia(null)

    setIsLoading(true)

    if (searchType.name === 'photos') {
      pexelClient.photos.curated({ per_page: 1 }).then((res) => {
        setIsLoading(false)

        if ('photos' in res) {
          setMedia(res.photos[0] as Photo)
        }
      })
    }

    if (searchType.name === 'videos') {
      pexelClient.videos.popular({ per_page: 1 }).then((res) => {
        setIsLoading(false)

        if ('videos' in res) {
          setMedia(res.videos[0] as Video)
        }
      })
    }
  }, [searchType])

  return (
    <header className={clsx('relative min-h-[500px] px-4 py-20 flex items-center justify-center', className)}>
      <div className="container relative max-w-2xl z-10">
        <Headline className="text-white text-center mb-8">
          The best free stock photos, royalty free images & videos shared by creators.
        </Headline>

        <Search />
      </div>

      <div
        className={clsx(
          'z-0 absolute select-none w-full h-full left-0 top-0 before:bg-black/50 before:absolute before:inset-0 flex items-center justify-center before:pointer-events-none',
          isLoading && 'blur animate-pulse'
        )}
      >
        <MediaViewer type={searchType} media={media} />
      </div>
    </header>
  )
}
