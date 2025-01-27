import { Footer } from '@/components/Footer'
import Navigation from '@/components/Navigation'
import clsx from 'clsx'
import { FC } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <>
      <Navigation />

      <main className={clsx('flex-1 flex flex-col', className)}>{children}</main>

      <Footer />
    </>
  )
}
