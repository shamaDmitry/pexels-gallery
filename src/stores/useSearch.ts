import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type RecentSearch = {
  type: string
  name: string
}

export interface UseSearchInterface {
  searchType: { name: string; id: number }
  recentSearch: RecentSearch[]
  setRecentSearch: React.Dispatch<React.SetStateAction<RecentSearch[]>>
  setSearchType: (searchType: { name: string; id: number }) => void
}

const initialState = {
  searchType: { name: 'photos', id: 1 },
  recentSearch: []
}

export const useSearch = create(
  persist(
    (set) => ({
      ...initialState,

      setSearchType: (searchType: { name: string; id: number }) => {
        return set({ searchType })
      },
      setRecentSearch: (recentSearch: RecentSearch[]) => {
        return set({ recentSearch })
      }
    }),
    {
      name: 'search-storage' // name of the item in the storage (must be unique)
    }
  )
)
