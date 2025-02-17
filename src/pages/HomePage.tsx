import { Header } from '@/_components/Header'
import { MainLayout } from '@/Layouts/MainLayout'
import { FC } from 'react'

interface HomePageProps {
  className?: string
}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <MainLayout>
      <Header className="h-screen" />
    </MainLayout>
  )
}
