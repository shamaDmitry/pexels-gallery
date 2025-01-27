import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { routes } from './routes.ts'

import './index.css'

createRoot(document.getElementById('root')!).render(<RouterProvider router={routes} />)
