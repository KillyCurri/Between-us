import { db } from '../auth/firebase'
import { collection, doc, setDoc, getDoc, query, where, getDocs, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import type { Couple } from '../../types/firestoreTypes'

const couplesCol = collection(db, 'couples')

export async function createCouple(inviteCode: string, memberUid: string): Promise<string> {
  const data: Couple = { inviteCode, members: [memberUid], createdAt: serverTimestamp() }
  const ref = await addDoc(couplesCol, data as any)
  await updateDoc(ref, { id: ref.id })
  return ref.id
}

export async function getCoupleByInvite(code: string) {
  const q = query(couplesCol, where('inviteCode', '==', code))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const docSnap = snap.docs[0]
  return { id: docSnap.id, ...(docSnap.data() as any) }
}

export async function addMemberToCouple(coupleId: string, uid: string) {
  const ref = doc(db, 'couples', coupleId)
  const d = await getDoc(ref)
  if (!d.exists()) throw new Error('couple not found')
  const data = d.data()
  const members: string[] = data.members || []
  if (!members.includes(uid)) members.push(uid)
  await updateDoc(ref, { members })
}
