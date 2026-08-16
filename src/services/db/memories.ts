import { db } from '../auth/firebase'
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import type { Memory } from '../../types/firestoreTypes'

const memoriesCol = collection(db, 'memories')

export async function saveMemory(memory: Memory) {
  const data = { ...memory, createdAt: serverTimestamp() }
  const ref = await addDoc(memoriesCol, data as any)
  await updateDoc(ref, { id: ref.id })
  return ref.id
}
