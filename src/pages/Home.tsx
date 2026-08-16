import React from 'react'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Hey, Player ❤️</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow">Partner status: <strong className="text-green-500">🟢 Connected</strong></div>
        <div className="p-4 bg-white rounded-lg shadow">Current streak: <strong>3 days</strong></div>
      </div>
    </div>
  )
}
