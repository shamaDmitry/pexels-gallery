import { Dropdown } from '@/_components/Dropdown'
import { Headline } from '@/_components/Headline'
import { MediaItem } from '@/_components/MediaItem'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/Layouts/MainLayout'
import useCollection from '@/stores/useCollection'
import { pexelClient } from '@/utils/pexelClient'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Photo, Video } from 'pexels'
import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router'

const filterData = [
  {
    id: 0,
    name: 'All',
    label: 'All'
  },
  {
    id: 1,
    name: 'Photo',
    label: 'Photos'
  },
  {
    id: 2,
    name: 'Video',
    label: 'Videos'
  }
]

export const CollectionPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getMediaCount, filterMedia } = useCollection((state) => state)

  const [media, setMedia] = useState<Photo[] | Video[] | []>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [filterField, setFilterField] = useState(filterData[0])

  const handleLoadMore = () => {
    if (!isEnd) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    const loadMedia = async ({ id, page }) => {
      setIsLoading(true)
      try {
        const res = await pexelClient.collections.media({
          id,
          page
        })

        if ('next_page' in res && res.next_page) {
          setIsEnd(false)
        } else {
          setIsEnd(true)
        }

        if ('media' in res) {
          // @ts-expect-error TODO: fix this
          setMedia((prevState) => [...prevState, ...res.media])
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMedia({ id, page: currentPage })
  }, [id, currentPage])

  return (
    <MainLayout className="py-5">
      <div className="container">
        <Headline className="mb-8 flex items-center gap-2">
          <Button variant="outline" className="capitalize" onClick={() => navigate(-1)}>
            <ArrowLeft />
            go back
          </Button>

          <span>Collection {id}</span>
        </Headline>

        <div className="flex items-center gap-3 mb-8">
          <span>Photos {getMediaCount(media as Photo[], 'Photo')}</span>/
          <span>Videos {getMediaCount(media as Video[], 'Video')}</span>
        </div>

        <div className="flex justify-end">
          <Dropdown className="mb-5" data={filterData} selected={filterField} setSelected={setFilterField} />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filterMedia(media, filterField.name).map((item) => {
            return (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <MediaItem media={item as (Photo & { type: 'Photo' }) | (Video & { type: 'Video' })} />
              </div>
            )
          })}
        </div>

        {isLoading && (
          <div className="my-5 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

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
