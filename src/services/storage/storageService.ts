import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth } from '../auth/firebase'

const storage = getStorage()

export function uploadMemoryImage(coupleId: string, file: File, onProgress?: (percent:number)=>void): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!auth.currentUser) return reject(new Error('Not authenticated'))
    const uid = auth.currentUser.uid
    const path = `couples/${coupleId}/${Date.now()}_${file.name}`
    const r = storageRef(storage, path)
    const task = uploadBytesResumable(r, file)
    task.on('state_changed', snapshot => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      onProgress?.(pct)
    }, reject, async () => {
      const url = await getDownloadURL(r)
      resolve(url)
    })
  })
}
