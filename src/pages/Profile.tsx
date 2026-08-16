import React from 'react'

export default function Profile(){
  const [spicy, setSpicy] = React.useState(()=>{
    return localStorage.getItem('betweenus:spicy') === 'true'
  })

  function toggle(){
    const next = !spicy
    setSpicy(next)
    localStorage.setItem('betweenus:spicy', String(next))
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold">Profile</h2>
      <p className="mt-2 text-gray-600">Profile and couple settings</p>
      <div className="mt-4 p-4 bg-white rounded shadow">
        <label className="flex items-center gap-3">
          <input aria-label="Enable spicy mode" type="checkbox" checked={spicy} onChange={toggle} />
          <span>Enable Spicy Mode (adult/flirty content)</span>
        </label>
      </div>
    </div>
  )
}
