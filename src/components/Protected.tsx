import { Navigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Protected = ({ children }: Props) => {
  const { user } = UserAuth()

  if (!user) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}
