import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UseSearchInterface {
  searchType: { name: string; id: number };
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchType: (searchType: { name: string; id: number }) => void;
}

const initialState = {
  searchType: { name: "photos", id: 1 },
  searchHistory: [],
};

export const useSearch = create(
  persist(
    (set) => ({
      ...initialState,

      setSearchType: (searchType: { name: string; id: number }) => {
        return set({ searchType });
      },
      setSearchHistory: (searchHistory: string[]) => {
        return set({ searchHistory });
      },
    }),
    {
      name: "search-storage", // name of the item in the storage (must be unique)
    }
  )
);
