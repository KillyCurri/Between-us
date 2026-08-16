import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/auth/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

type AuthContextValue = { user: User | null }
const AuthContext = createContext<AuthContextValue>({ user: null })

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return unsub
  },[])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext) }
