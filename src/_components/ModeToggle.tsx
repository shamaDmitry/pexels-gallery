import { useTheme } from '@/stores/themeProvider'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, Sun, Moon, Monitor } from 'lucide-react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Menu>
      <MenuButton className="capitalize inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700">
        {theme === 'light' ? <Sun /> : theme === 'dark' ? <Moon /> : <Monitor />}
        <ChevronDownIcon className="size-4 fill-white/60" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 bg-black text-white origin-top-right rounded-xl border p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => setTheme('light')}
          >
            <Sun />
            light
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => setTheme('dark')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
          >
            <Moon />
            dark
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={() => setTheme('system')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
          >
            <Monitor />
            system
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
