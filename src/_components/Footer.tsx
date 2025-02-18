import { ModeToggle } from './ModeToggle'

export const Footer = () => {
  return (
    <footer className="py-5">
      <div className="flex items-center justify-center gap-4">
        <div className="text-center text-sm font-medium">Footer {new Date().getFullYear()}</div>

        <ModeToggle />
      </div>
    </footer>
  )
}
