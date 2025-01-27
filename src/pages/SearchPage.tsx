import { Headline } from '@/components/Headline'
import { MainLayout } from '@/Layouts/MainLayout'
import { FC } from 'react'

interface SearchPageProps {
  className?: string
}

export const SearchPage: FC<SearchPageProps> = () => {
  return (
    <MainLayout>
      <Headline>SearchPage</Headline>
    </MainLayout>
  )
}
