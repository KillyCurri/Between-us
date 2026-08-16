import React from 'react'

type Props = {
  question: string
}

export default function QuestionCard({question}: Props){
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <p className="text-lg">{question}</p>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 rounded bg-pink-50">❤️ Loved it</button>
        <button className="px-3 py-1 rounded border">➡️ Next</button>
      </div>
    </div>
  )
}
