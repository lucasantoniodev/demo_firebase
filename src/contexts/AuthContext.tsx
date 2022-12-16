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
  fetchSignInMethodsForEmail
} from 'firebase/auth'

import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore'

import { appAdmin, auth, firestoreDatabase } from '../firebase/firebase'
import { UserServiceInstance } from '../services/userService'

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

    const { user } = await signInWithPopup(auth, provider)

    // Buscando se o usuário já existe no banco de dados
    const userResult = await UserServiceInstance.getUserByID(user.uid)

    try {
      // const json = appAdmin.auth().verifyIdToken(await user.getIdToken())
      // console.log(json)
    } catch (error) {
      console.log('CRASHOU TUDO')
    }

    if (!userResult) {
      try {
        const newUser = {
          id: user.uid,
          email: user.email
        }
        await UserServiceInstance.addUser(newUser)

        /**
         * Mongoose
         *
         * POST (https://dbinclui-stating.onrender.com/users, newUser)
         *
         */
        alert('Usuário cadastrado com sucesso!')
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser) // https://prnt.sc/xeURVkOfSu11
      console.log('User', currentUser)
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
