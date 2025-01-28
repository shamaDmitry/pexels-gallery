import { Headline } from '@/components/Headline'
import { MediaItem } from '@/components/MediaItem'
import { MainLayout } from '@/Layouts/MainLayout'
import { pexelClient } from '@/utils/pexelClient'
import { Photo, Video } from 'pexels'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const CollectionPage = () => {
  const { id } = useParams()
  const [media, setMedia] = useState<Photo[] | Video[]>([])
  const [isLoading, setIsLoading] = useState(false)
  // const [page, setPage] = useState(1)
  // const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    pexelClient.collections.media({ id: id as string }).then((res) => {
      setIsLoading(false)

      if ('media' in res) {
        setMedia(res.media as Photo[] | Video[])
      }
    })
  }, [id])

  // const loadMedia = async (pageNum: number) => {
  //   setIsLoading(true)
  //   try {
  //     const res = await pexelClient.collections.media({
  //       id: id as string,
  //       page: pageNum
  //     })

  //     if ('media' in res) {
  //       if (pageNum === 1) {
  //         setMedia(res.media as Photo[] | Video[])
  //       } else {
  //         setMedia((prev) => [...prev, ...(res.media as Photo[] | Video[])])
  //       }
  //       setHasMore(res.media.length > 0)
  //     }
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollHeight = document.documentElement.scrollHeight
  //     const scrollTop = document.documentElement.scrollTop
  //     const clientHeight = document.documentElement.clientHeight

  //     if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && hasMore) {
  //       setPage((prev) => prev + 1)
  //       loadMedia(page + 1)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [isLoading, hasMore, page])

  return (
    <MainLayout className="py-5">
      <div className="container">
        <Headline className="mb-8">Collection {id}</Headline>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 transition-all">
          {media.map((item) => {
            return (
              <div key={item.id} className="mb-4 break-inside-avoid transition-all">
                <MediaItem
                  media={item as (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })}
                  isLoading={isLoading}
                />
              </div>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
}
