import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { Protected } from '../components/Protected'
import { UserProps, UserServiceInstance } from '../services/userService'

export const Account = () => {
  const { user } = UserAuth()
  const navigate = useNavigate()

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
          <p>ID do usuário {user?._id}</p>
          <p>Admin: {String(user?.admin)}</p>
          <img src={`${user?.photoURL}`} alt='' />
          <p>email: {user?.email}</p>
          <p>{user?.token}</p>
        </div>
      </div>
    </Protected>
  )
}
