import { Link, NavLink } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'

export const Navbar = () => {
  const { user, logOut } = UserAuth()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h1>Firebase Google Auth & Context</h1>
      </div>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to='/signin'>Continuar com o grugou</Link>
      )}
    </>
  )
}
