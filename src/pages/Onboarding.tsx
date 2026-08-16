import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Onboarding(){
  const [name, setName] = useState('')
  const [partner, setPartner] = useState('')
  const [stage, setStage] = useState('Dating')
  const [togetherYears, setTogetherYears] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    const profile = { name, partner, stage, togetherYears }
    localStorage.setItem('betweenus:profile', JSON.stringify(profile))
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Tell us about you</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <label className="flex flex-col">
          <span className="text-sm">Your name</span>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Partner's name</span>
          <input value={partner} onChange={e=>setPartner(e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Relationship stage</span>
          <select value={stage} onChange={e=>setStage(e.target.value)} className="mt-1 p-2 border rounded">
            <option>Dating</option>
            <option>Serious relationship</option>
            <option>Engaged</option>
            <option>Married</option>
            <option>Other</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm">How long together (optional)</span>
          <input value={togetherYears} onChange={e=>setTogetherYears(e.target.value)} placeholder="e.g. 2 years" className="mt-1 p-2 border rounded" />
        </label>
        <div className="flex gap-2">
          <button aria-label="Save and continue onboarding" className="px-4 py-2 bg-pink-500 text-white rounded">Save & Continue</button>
          <button aria-label="Cancel onboarding" type="button" onClick={()=>navigate('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
