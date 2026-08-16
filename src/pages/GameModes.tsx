import React from 'react'
import { Link } from 'react-router-dom'

export default function GameModes(){
  const modes = [
    { key: 'get-to-know', title: 'Get To Know Me', desc: 'Thoughtful questions to learn more.' },
    { key: 'chaos', title: 'Chaos Mode 😂', desc: 'Ridiculous and funny prompts.' },
    { key: 'deep', title: 'Deep Talk ❤️', desc: 'Gradually deeper conversation topics.' },
    { key: 'would', title: 'Would You Rather', desc: 'Relationship-specific choices.' },
    { key: 'howwell', title: 'How Well Do You Know Me?', desc: 'Answer privately, partner guesses.' },
    { key: 'date', title: 'Date Night', desc: 'Mini virtual date generator.' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Game Modes</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {modes.map(m=> (
          <Link key={m.key} to="/play" className="p-4 bg-white rounded-lg shadow hover:scale-[1.01] transition-transform">
            <h3 className="font-semibold">{m.title}</h3>
            <p className="text-sm text-gray-600">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
