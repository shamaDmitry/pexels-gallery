import { Photo, Video } from 'pexels'
import { create } from 'zustand'

interface CollectionStore {
  media: (Photo | Video)[] | []
  sortField: keyof Photo | ''
  sortDirection: 'asc' | 'desc'
  loading: boolean
  error: string | null

  // Actions
  setMedia: (media: Photo[] | Video[]) => void
  addPhoto?: (photo: Photo) => void
  removePhoto?: (id: number) => void
  updatePhoto?: (id: number, updates: Partial<Photo>) => void
  setSortField?: (field: keyof Photo | '') => void
  setSortDirection?: (direction: 'asc' | 'desc') => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Fetch from Pexels
  fetchCollection?: (collectionId: string) => Promise<void>
}

// const useCollection = create<CollectionStore>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         photos: [],
//         sortField: '',
//         sortDirection: 'asc',
//         loading: false,
//         error: null,

//         setPhotos: (photos) => set({ photos }),

//         addPhoto: (photo) =>
//           set((state) => ({
//             photos: [...state.photos, photo]
//           })),

//         removePhoto: (id) =>
//           set((state) => ({
//             photos: state.photos.filter((photo) => photo.id !== id)
//           })),

//         updatePhoto: (id, updates) =>
//           set((state) => ({
//             photos: state.photos.map((photo) => (photo.id === id ? { ...photo, ...updates } : photo))
//           })),

//         setSortField: (field) => set({ sortField: field }),

//         setSortDirection: (direction) => set({ sortDirection: direction }),

//         setLoading: (loading) => set({ loading }),

//         setError: (error) => set({ error }),

//         fetchCollection: async (collectionId) => {
//           const { setLoading, setError, setPhotos } = get()

//           try {
//             setLoading(true)
//             setError(null)

//             const response = await fetch(`https://api.pexels.com/v1/collections/${collectionId}`, {
//               headers: {
//                 Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || ''
//               }
//             })

//             if (!response.ok) {
//               throw new Error('Failed to fetch collection')
//             }

//             const data = await response.json()
//             setPhotos(data.media)
//           } catch (error) {
//             setError(error instanceof Error ? error.message : 'An error occurred')
//           } finally {
//             setLoading(false)
//           }
//         }
//       }),
//       {
//         name: 'collection-storage'
//       }
//     )
//   )
// )

const useCollection = create<CollectionStore>()((set) => ({
  media: [],
  sortField: '',
  sortDirection: 'asc',
  loading: false,
  error: null,

  setMedia: (media) => set({ media }),

  // addPhoto: (photo) =>
  //   set((state) => ({
  //     media: [...state.media, photo]
  //   })),

  // removePhoto: (id) =>
  //   set((state) => ({
  //     media: state.media.filter((photo) => photo.id !== id)
  //   })),

  // updatePhoto: (id, updates) =>
  //   set((state) => ({
  //     photos: state.photos.map((photo) => (photo.id === id ? { ...photo, ...updates } : photo))
  //   })),

  setSortField: (field) => set({ sortField: field }),

  setSortDirection: (direction) => set({ sortDirection: direction }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error })

  // fetchCollection: async (collectionId) => {
  //   const { setLoading, setError, setPhotos } = get()

  //   try {
  //     setLoading(true)
  //     setError(null)

  //     const response = await fetch(`https://api.pexels.com/v1/collections/${collectionId}`, {
  //       headers: {
  //         Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || ''
  //       }
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch collection')
  //     }

  //     const data = await response.json()
  //     setPhotos(data.media)
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : 'An error occurred')
  //   } finally {
  //     setLoading(false)
  //   }
  // }
}))

export default useCollection
