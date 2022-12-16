import GoogleButton from 'react-google-button'
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Signin = () => {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
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
    <div>
      <h1>Continuar</h1>
      <br />
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  )
}
