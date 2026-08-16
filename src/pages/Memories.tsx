import React, {useState} from 'react'
import { uploadMemoryImage } from '../services/storage/storageService'
import { saveMemory } from '../services/db/memories'
import type { Memory } from '../types/firestoreTypes'

type Memory = { id: string, title: string, note?: string }

function id() { return Math.random().toString(36).slice(2,9) }

export default function Memories(){
  const [items, setItems] = useState<Memory[]>(()=>{
    try{ return JSON.parse(localStorage.getItem('betweenus:memories')||'[]') }catch{ return [] }
  })
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  function add(){
    ;(async ()=>{
      const m: Memory = { id: id(), title }
      try{
        setUploading(true)
        if(file){
          // try upload to storage; if fails, continue with local only
          const coupleId = localStorage.getItem('betweenus:coupleId') || 'local'
          const url = await uploadMemoryImage(coupleId, file, pct=> setProgress(pct))
          m.imageUrl = url
        }
        // attempt to save to Firestore; will fail silently if not configured
        try{ await saveMemory(m) }catch(e){ /* ignore */ }
      }catch(e){
        console.warn('upload failed', e)
      } finally {
        setUploading(false)
        const next = [m, ...items]
        setItems(next)
        localStorage.setItem('betweenus:memories', JSON.stringify(next))
        setTitle('')
        setFile(null)
        setProgress(0)
      }
    })()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Our Memories</h2>
      <div className="mt-4">
        <div className="flex gap-2">
          <input aria-label="Memory title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a memory title" className="flex-1 p-2 border rounded" />
          <input aria-label="Attach image" type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="px-2 py-1 border rounded" />
          <button aria-label="Add memory" onClick={add} disabled={uploading} className="px-4 py-2 bg-pink-500 text-white rounded">{uploading ? `Uploading ${progress}%` : 'Add'}</button>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map(it=> (
            <li key={it.id} className="p-3 bg-white rounded shadow">{it.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
