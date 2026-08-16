import React from 'react'

export default function Dashboard(){
  const profile = JSON.parse(localStorage.getItem('betweenus:profile') || 'null')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Hey, {profile?.name ?? 'Player'} ❤️</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow">Partner: <strong>{profile?.partner ?? '—'}</strong></div>
        <div className="p-4 bg-white rounded-lg shadow">Streak: <strong>0 days</strong></div>
        <div className="p-4 bg-white rounded-lg shadow">Games played: <strong>0</strong></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <a href="#/play" className="p-4 bg-white rounded-lg shadow text-center">Start a Game</a>
        <a href="#/memories" className="p-4 bg-white rounded-lg shadow text-center">Our Memories</a>
        <a href="#/invite" className="p-4 bg-white rounded-lg shadow text-center">Invite Partner</a>
      </div>
    </div>
  )
}
