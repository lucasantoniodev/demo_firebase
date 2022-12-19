import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { Protected } from '../components/Protected'
import { UserProps, UserServiceInstance } from '../services/userService'

export const Account = () => {
  const navigate = useNavigate()
  const { user } = UserAuth()

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
          <img src={`${user?.photoURL}`} alt='' />
        </div>
      </div>
    </Protected>
  )
}
