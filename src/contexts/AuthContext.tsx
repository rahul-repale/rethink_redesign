import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  joinedDate: string
}

interface AuthContextType {
  currentUser: User | null
  login: (user: User) => void
  logout: () => void
  signup: (user: Omit<User, 'id' | 'joinedDate'>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('rethink_user')
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser))
      } catch (e) {
        // ignore
      }
    }
    setIsLoaded(true)
  }, [])

  function login(user: User) {
    setCurrentUser(user)
    localStorage.setItem('rethink_user', JSON.stringify(user))
  }

  function signup(userData: Omit<User, 'id' | 'joinedDate'>) {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      joinedDate: new Date().toISOString(),
    }
    login(newUser)
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem('rethink_user')
  }

  if (!isLoaded) return null // prevent hydration mismatch

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
