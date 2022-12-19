import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import GoogleButton from 'react-google-button'
import { useEffect } from 'react'

export const Navbar = () => {
  const navigate = useNavigate()
  const { googleSignIn, user, logOut } = UserAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/account')
    }
  }, [user])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <h1>Firebase Google Auth & Context</h1>
        {user?.displayName ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <GoogleButton onClick={handleGoogleSignIn} />
        )}
      </div>

      <Outlet />
    </>
  )
}
