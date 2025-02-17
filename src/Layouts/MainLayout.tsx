import { Footer } from '@/_components/Footer'
import { ThemeProvider } from '@/stores/themeProvider'
import clsx from 'clsx'
import { FC } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className={clsx('flex-1 flex flex-col', className)}>{children}</main>

        <Footer />
      </ThemeProvider>
    </>
  )
}
