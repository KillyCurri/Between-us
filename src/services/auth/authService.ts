import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'

export async function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export async function logout() {
  return signOut(auth)
}
