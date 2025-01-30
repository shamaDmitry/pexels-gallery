import { FC, useEffect, useRef, useState } from 'react'
import { Search as SearchIcon, ChevronDownIcon, CheckIcon } from 'lucide-react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useSearch, UseSearchInterface } from '@/stores/useSearch'
import { pexelClient } from '@/utils/pexelClient'
import { Collection } from 'pexels'
import { Headline } from './Headline'
import { NavLink } from 'react-router'
// import useClickOutside from '@/hooks/useClickOutside'

const data = [
  { id: 1, name: 'photos' },
  { id: 2, name: 'videos' }
]

interface SearchProps {
  className?: string
}

const Search: FC<SearchProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropDown, setShowDropDown] = useState(false) // Add new state variable
  const [collections, setCollections] = useState<Collection[]>([])

  const inputRef = useRef(null)
  const { recentSearch, setRecentSearch, searchType, setSearchType } = useSearch() as UseSearchInterface

  const handleSearch = () => {
    if (searchTerm.length > 0) {
      setRecentSearch([...recentSearch, searchTerm])

      setSearchTerm('')
    }
  }

  // useClickOutside(inputRef, () => {
  //   setShowDropDown(false)
  // })

  useEffect(() => {
    pexelClient.collections.featured({ per_page: 4 }).then((res) => {
      if ('collections' in res) {
        setCollections(res.collections)
      }
    })
  }, [])

  return (
    <div className={clsx('relative', className)}>
      <div className="flex items-center gap-2 p-2 rounded-lg shadow bg-white">
        <div className="relative">
          <Listbox value={searchType} onChange={setSearchType}>
            <ListboxButton
              className={clsx(
                'relative block w-full capitalize rounded-lg py-1.5 pr-8 pl-3 text-left text-sm/6',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            >
              {searchType?.name || 'Select type'}

              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                aria-hidden="true"
              />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom start"
              transition
              className={clsx(
                'w-[var(--button-width)] rounded-xl border p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-white min-w-72 z-50'
              )}
            >
              {data.map((item) => (
                <ListboxOption
                  key={item.name}
                  value={item}
                  className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[active]:bg-gray-100"
                >
                  <CheckIcon className="invisible size-4 group-data-[selected]:visible flex-shrink-0" />

                  <div className="text-sm/6 capitalize">{item.name}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setShowDropDown(true)}
        />
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSearch}>
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      {showDropDown && (
        <div className="absolute top-full left-0 w-full bg-white p-4 border shadow z-10 mt-4 rounded-lg">
          {recentSearch && recentSearch.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>

                <button className="text-sm font-medium hover:opacity-70" onClick={() => setRecentSearch([])}>
                  Clear
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearch.map((search, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm flex items-center gap-1"
                  >
                    <SearchIcon className="size-4" />
                    {search}
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              {collections.length > 0 && (
                <>
                  <Headline className="mb-2" tag="h3">
                    Collections
                  </Headline>

                  <div className="grid grid-cols-2 gap-4">
                    {collections.map((collection: Collection) => {
                      return (
                        <NavLink to={`collection/${collection.id}`} key={collection.id} className="">
                          <Headline tag="h4">{collection.title}</Headline>

                          <div className="text-sm">
                            {collection.photos_count} photos / {collection.videos_count} videos
                          </div>
                        </NavLink>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default Search
