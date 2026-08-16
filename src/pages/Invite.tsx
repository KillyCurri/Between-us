import React, {useState, useEffect} from 'react'
import { generateInviteCode, makeInviteLink } from '../utils/invite'

export default function Invite(){
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(()=>{
    const params = new URLSearchParams(window.location.hash.replace('#',''))
    const c = params.get('code')
    if(c) setCode(c)
  },[])

  function create(){
    const c = generateInviteCode()
    setCode(c)
  }

  async function copyLink(){
    const link = makeInviteLink(code)
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Invite your partner</h2>
      <div className="mt-4 grid gap-3">
        <div className="p-4 bg-white rounded shadow">{code || 'No invite yet'}</div>
        <div className="flex gap-2">
          <button aria-label="Generate invite code" onClick={create} className="px-4 py-2 bg-pink-500 text-white rounded">Generate Code</button>
          <button aria-label="Copy invite link" onClick={copyLink} disabled={!code} className="px-4 py-2 border rounded">Copy Invite Link</button>
        </div>
        {copied && <div className="text-sm text-green-600">Copied to clipboard</div>}
      </div>
    </div>
  )
}
