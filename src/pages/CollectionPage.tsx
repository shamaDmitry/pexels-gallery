import { Dropdown } from '@/components/Dropdown'
import { Headline } from '@/components/Headline'
import LoadMoreSpinner from '@/components/LoadMoreSpinner'
import { MediaItem } from '@/components/MediaItem'
import useInView from '@/hooks/useInView'
import { MainLayout } from '@/Layouts/MainLayout'
import { pexelClient } from '@/utils/pexelClient'
import { Photo, Video } from 'pexels'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

const sortData = [
  { id: '1', name: 'asc', label: 'Ascending' },
  { id: '2', name: 'desc', label: 'Descending' }
]

export const CollectionPage = () => {
  const { id } = useParams()
  const [media, setMedia] = useState<Photo[] | Video[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [sort, setSort] = useState(sortData[0])

  const { inView, ref } = useInView()

  const loadMedia = useCallback(async ({ id, page, sort }: { id: string; page: number; sort?: string }) => {
    setIsLoading(true)

    try {
      const res = await pexelClient.collections.media({
        id: id,
        page,
        sort
      })

      if (res.next_page) {
        setIsEnd(false)
      } else {
        setIsEnd(true)
      }

      if ('media' in res) {
        setMedia((prevState) => {
          return [...prevState, ...(res.media as Photo[] | Video[])]
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (inView && !isEnd) setCurrentPage((prev) => prev + 1)
  }, [inView, isEnd])

  useEffect(() => {
    loadMedia({ id: id || '', page: currentPage, sort: sort.name })
  }, [id, currentPage, loadMedia, sort])

  return (
    <MainLayout className="py-5">
      <div className="container">
        <Headline className="mb-8">Collection {id}</Headline>

        <div className="flex justify-end">
          <Dropdown className="mb-5" data={sortData} selected={sort} setSelected={setSort} />
        </div>

        {/* <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 min-h-screen"> */}
        <div className="grid grid-cols-4 gap-4 min-h-screen">
          {media.map((item) => {
            return (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <MediaItem media={item as (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })} />
              </div>
            )
          })}
        </div>

        {isLoading && <LoadMoreSpinner className="my-5" />}

        <div ref={ref} />
      </div>
    </MainLayout>
  )
}
