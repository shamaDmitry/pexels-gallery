import { Photo, Video } from 'pexels'
import { create } from 'zustand'

interface CollectionStore {
  media: Photo[] | Video[] | []
  sortField: keyof Photo | ''
  sortDirection: 'asc' | 'desc'
  loading: boolean
  error: string | null

  // Actions
  setMedia: (media: Photo[] | Video[]) => void
  filterMedia: (media: Photo[] | Video[], filterBy: string) => Photo[] | Video[]
  getMediaCount: (media: Photo[] | Video[], type: string) => number
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const useCollection = create<CollectionStore>()((set) => ({
  media: [],
  sortField: '',
  sortDirection: 'asc',
  loading: false,
  error: null,

  setMedia: (media) => set({ media }),
  // @ts-expect-error TODO: fix this
  filterMedia: (media, filterBy) => {
    if (filterBy === 'All') {
      return media
    }

    // @ts-expect-error TODO: fix this
    return media.filter((item) => item.type === filterBy)
  },
  getMediaCount: (media, type) => {
    // @ts-expect-error TODO: fix this
    return media.filter((item) => item.type === type).length
  },

  setSortField: (field) => set({ sortField: field }),

  setSortDirection: (direction) => set({ sortDirection: direction }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error })
}))

export default useCollection
