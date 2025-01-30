import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { forwardRef } from 'react'

export const Dropdown = forwardRef<
  HTMLDivElement,
  {
    data: Array<{ name: string; [key: string]: any }>
    selected: { name: string; [key: string]: any }
    setSelected: (item: { name: string; [key: string]: any }) => void
    className?: string
  }
>(({ data = [], className, selected, setSelected }, ref) => {
  return (
    <Listbox ref={ref} value={selected} onChange={setSelected} as="div" className={className}>
      <ListboxButton
        className={clsx(
          'min-w-40 border hover:bg-gray-50 relative block w-full rounded-lg py-1.5 pr-8 pl-3 text-left text-sm/6',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
        )}
      >
        <span className="font-bold">{selected.label}</span>

        <ChevronDownIcon
          className="flex-shrink-0 group pointer-events-none absolute top-2.5 right-2.5 size-4"
          aria-hidden="true"
        />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'w-[var(--button-width)] rounded-xl border p-1 [--anchor-gap:5px] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-white'
        )}
      >
        {data.map((item) => (
          <ListboxOption
            key={item.name}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
          >
            <CheckIcon className="invisible size-4 flex-shrink-0 group-data-[selected]:visible" />

            <div className="text-sm/6 text-black">{item.label}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
})

Dropdown.displayName = 'Dropdown'
