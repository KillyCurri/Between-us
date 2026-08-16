import React, { useState } from 'react'
import { register } from '../../services/auth/authService'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handle(e: React.FormEvent){
    e.preventDefault()
    try{
      await register(email, password)
      navigate('/onboarding')
    }catch(err:any){ setError(err.message || 'Registration failed') }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold">Create account</h2>
      <form onSubmit={handle} className="mt-4 grid gap-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border rounded" />
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-500 text-white rounded">Create</button>
        </div>
      </form>
    </div>
  )
}
