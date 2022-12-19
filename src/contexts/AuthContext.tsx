import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState
} from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User,
  fetchSignInMethodsForEmail,
  getIdToken
} from 'firebase/auth'

import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore'

import { auth, firestoreDatabase } from '../firebase/firebase'
import { UserServiceInstance } from '../services/userService'
import { createUser, validateUserExists } from '../services/apiService'

type ContextProps = {
  user: User | null
  googleSignIn: () => Promise<void>
  logOut: () => Promise<void>
}

const initialValue = {
  user: null,
  googleSignIn: async () => {},
  logOut: async () => {}
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<ContextProps>(initialValue)

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  // Função para fazer login com o Popup do google;
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    const { user } = await signInWithPopup(auth, provider) //  Entidade de user: https://prnt.sc/xeURVkOfSu11
    const token = await user.getIdToken()

    const result = await validateUserExists(token)
    console.log(token)
    if (!result) {
      const response = await createUser(token)
      console.log(response)
    }
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => {
      unSubscribe()
    }
  }, [])

  const logOut = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Exportando já o contexto para uso (gostei =D)
export const UserAuth = () => {
  return useContext(AuthContext)
}
