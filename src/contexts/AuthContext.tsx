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
  signOut,
  User,
  onIdTokenChanged
} from 'firebase/auth'

import { auth } from '../firebase/firebase'
import {
  createUser,
  getUserByUid,
  validateUserExists
} from '../services/apiService'

interface UserApp {
  _id?: string
  uid: string | null
  photoURL: string | null
  displayName: string | null
  email: string | null
  token: string
  admin?: boolean
}

type ContextProps = {
  user: UserApp | null
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
  const [user, setUser] = useState<UserApp | null>(null)
  // const [userMongo, setUserMongo] = useState<UserApp | null>(null)

  // Função para fazer login com o Popup do google;
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    const { user } = await signInWithPopup(auth, provider) //  Entidade de user: https://prnt.sc/xeURVkOfSu11

    const token = await user.getIdToken()
    // console.log(token)
    // Valida se o usuário já existe (Retorna: true ou false)
    const result = await validateUserExists(token)

    if (!result) {
      await createUser(token)
    }
  }

  useEffect(() => {
    const getUser = async (currentUser: User | null) => {
      if (currentUser) {
        console.log('chamou')
        const token = await currentUser.getIdToken()

        const response = await getUserByUid(token)

        const userObj: UserApp = {
          _id: response.data._id,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          email: currentUser.email,
          token: token,
          admin: response.data.admin
        }

        setUser(userObj)
      }
    }

    const unSubscribe = () =>
      onIdTokenChanged(auth, async currentUser => {
        if (currentUser) {
          await getUser(currentUser)
          return
        }

        setUser(null)
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
