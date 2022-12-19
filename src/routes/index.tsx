import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Account } from '../pages/Account'
import { Navbar } from '../components/Navbar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'account',
        element: <Account />
      }
    ]
  }
])

export const Router = () => {
  return <RouterProvider router={router} />
}
