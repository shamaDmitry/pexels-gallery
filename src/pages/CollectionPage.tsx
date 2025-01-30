import { Dropdown } from '@/_components/Dropdown'
import { Headline } from '@/_components/Headline'
import LoadMoreSpinner from '@/_components/LoadMoreSpinner'
import { MediaItem } from '@/_components/MediaItem'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/Layouts/MainLayout'
import useCollection from '@/stores/useCollection'
import { pexelClient } from '@/utils/pexelClient'
import { Photo, Video } from 'pexels'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

interface SortItem {
  id: string
  name: 'asc' | 'desc'
  label: string
}

const sortData: SortItem[] = [
  { id: '1', name: 'asc', label: 'Ascending' },
  { id: '2', name: 'desc', label: 'Descending' }
]

export const CollectionPage = () => {
  const { id } = useParams<{ id: string }>()
  const { media, setMedia } = useCollection((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [sort, setSort] = useState(sortData[0])

  const loadMedia = useCallback(
    async ({ id, page, sort }: { id: string; page: number; sort?: 'asc' | 'desc' }) => {
      setIsLoading(true)

      try {
        const res = await pexelClient.collections.media({
          id,
          page,
          sort
        })

        if ('next_page' in res && res.next_page) {
          setIsEnd(false)
        } else {
          setIsEnd(true)
        }

        if ('media' in res) {
          console.log('media', media)
          console.log('res.media', res.media)

          // @ts-expect-error TODO: fix this
          setMedia([...media, ...res.media])
        }
      } finally {
        setIsLoading(false)
      }
    },
    [media, setMedia]
  )

  const handleLoadMore = () => {
    if (!isEnd) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    loadMedia({ id: id || '', page: currentPage, sort: sort.name })
  }, [currentPage, sort.name, id])

  return (
    <MainLayout className="py-5">
      <div className="container">
        <Headline className="mb-8">Collection {id}</Headline>

        <div className="flex justify-end">
          {/* @ts-expect-error TODO: fix this*/}
          <Dropdown className="mb-5" data={sortData} selected={sort} setSelected={setSort} />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {media.map((item) => {
            return (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <MediaItem media={item as (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })} />
              </div>
            )
          })}
        </div>

        {isLoading && <LoadMoreSpinner className="my-5" size={32} />}

        {!isEnd && !isLoading && (
          <div className="text-center my-5">
            <Button size="sm" className="capitalize" onClick={handleLoadMore}>
              load more
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
