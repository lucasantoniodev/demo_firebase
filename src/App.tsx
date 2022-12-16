import './App.css'
import { Router } from './routes'
import { AuthContextProvider } from './contexts/AuthContext'
import { Navbar } from './components/Navbar'

export const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}
