import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Signin } from '../pages/Signin'
import { Account } from '../pages/Account'
import { Navbar } from '../components/Navbar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: 'signin',
    element: <Signin />
  },
  {
    path: 'account',
    element: <Account />
  }
])

export const Router = () => {
  return <RouterProvider router={router} />
}
