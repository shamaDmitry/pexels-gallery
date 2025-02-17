import { Headline } from '@/_components/Headline'
import { MediaItem } from '@/_components/MediaItem'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/Layouts/MainLayout'
import { pexelClient } from '@/utils/pexelClient'
import { ArrowLeft } from 'lucide-react'
import { Photo, Video } from 'pexels'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

interface SearchPageProps {
  className?: string
}

export const SearchPage: FC<SearchPageProps> = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const typeName = searchParams.get('type')
  const searchTerm = searchParams.get('searchTerm') || ''

  const [data, setData] = useState<Video[] | Photo[]>([])

  useEffect(() => {
    if (!typeName || !searchTerm) {
      navigate('/')
    }

    if (typeName === 'videos') {
      pexelClient.videos.search({ query: searchTerm }).then((videos) => {
        if ('videos' in videos) {
          setData(videos.videos)
        }
      })
    }

    if (typeName === 'photos') {
      pexelClient.photos.search({ query: searchTerm }).then((photos) => {
        if ('photos' in photos) {
          setData(photos.photos)
        }
      })
    }
  }, [navigate, typeName, searchTerm])

  return (
    <MainLayout className="py-5">
      <div className="container">
        <Headline className="mb-5 flex items-center gap-2">
          <Button variant="outline" className="capitalize" onClick={() => navigate(-1)}>
            <ArrowLeft />
            go back
          </Button>

          <span>
            Search results: {searchTerm} {typeName}
          </span>
        </Headline>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item) => {
            return <MediaItem key={item.id} media={{ ...item, type: typeName === 'photos' ? 'Photo' : 'Video' }} />
          })}
        </div>
      </div>
    </MainLayout>
  )
}
