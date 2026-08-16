import React from 'react'

export default function Loading({label = 'Loading...'}:{label?:string}){
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-2">
      <svg width="18" height="18" viewBox="0 0 24 24" className="loading-dot" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.08)" strokeWidth="4" fill="none" />
        <circle cx="12" cy="6" r="2" fill="#FF6B81" />
      </svg>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  )
}
