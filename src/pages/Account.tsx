import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { Protected } from '../components/Protected'
import { UserProps, UserServiceInstance } from '../services/userService'

export const Account = () => {
  const navigate = useNavigate()
  const { user, logOut } = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  return (
    <Protected>
      <div>
        <h1>Account</h1>
        <div>
          <p>Welcome, {user?.displayName}</p>
        </div>

        <button onClick={handleSignOut}>Logout</button>
      </div>
    </Protected>
  )
}
