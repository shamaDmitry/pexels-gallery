import { createBrowserRouter } from 'react-router'
import { SearchPage } from './pages/SearchPage'
import { HomePage } from './pages/HomePage'
import { CollectionPage } from './pages/CollectionPage'

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/search',
    Component: SearchPage
  },
  {
    path: '/collection/:id',
    Component: CollectionPage
  }
])
