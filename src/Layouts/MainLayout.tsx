import { Footer } from '@/_components/Footer'
import clsx from 'clsx'
import { FC } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <>
      <main className={clsx('flex-1 flex flex-col', className)}>{children}</main>

      <Footer />
    </>
  )
}
