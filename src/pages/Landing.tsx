import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-extrabold">Distance doesn't have to mean disconnected.</h1>
          <p className="mt-4 text-lg text-gray-600">Play, laugh, flirt and discover more about each other — wherever you are.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/play" className="px-5 py-3 bg-pink-500 text-white rounded-lg">START PLAYING</Link>
            <Link to="/home" className="px-5 py-3 border rounded-lg">JOIN MY PARTNER</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-white p-6 shadow-lg">
          <h3 className="font-semibold">How It Works</h3>
          <ol className="mt-3 list-decimal list-inside text-gray-600">
            <li>Create a private invite for your couple</li>
            <li>Start games and challenges together</li>
            <li>Save memories and build streaks</li>
          </ol>
        </div>
      </section>
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="p-4 bg-white rounded-xl shadow">Game Modes</div>
        <div className="p-4 bg-white rounded-xl shadow">AI Personalization</div>
        <div className="p-4 bg-white rounded-xl shadow">Shared Memories</div>
      </section>
    </div>
  )
}
