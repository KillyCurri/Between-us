import React, { useState } from 'react'
import { resetPassword } from '../../services/auth/authService'

export default function Reset(){
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  async function handle(e: React.FormEvent){
    e.preventDefault()
    try{ await resetPassword(email); setMsg('Check your email for reset instructions') }catch(e:any){ setMsg(e.message) }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold">Reset password</h2>
      <form onSubmit={handle} className="mt-4 grid gap-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded" />
        {msg && <div className="text-sm text-gray-600">{msg}</div>}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-500 text-white rounded">Send reset</button>
        </div>
      </form>
    </div>
  )
}
