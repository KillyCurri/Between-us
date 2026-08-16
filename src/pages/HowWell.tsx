import React, {useState} from 'react'

export default function HowWell(){
  const [question, setQuestion] = useState('What is my favorite movie?')
  const [myAnswer, setMyAnswer] = useState('')
  const [theirGuess, setTheirGuess] = useState('')
  const [revealed, setRevealed] = useState(false)

  function submitAnswer(){
    localStorage.setItem('howwell:answer', myAnswer)
    setRevealed(false)
  }

  function guess(){
    const correct = localStorage.getItem('howwell:answer') || ''
    setRevealed(true)
    setTheirGuess(theirGuess)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">How Well Do You Know Me?</h2>
      <p className="mt-2">Question: {question}</p>
      <div className="mt-4 grid gap-3">
        <label className="flex flex-col">
          <span>Your private answer</span>
          <input value={myAnswer} onChange={e=>setMyAnswer(e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <div className="flex gap-2">
          <button aria-label="Save private answer" onClick={submitAnswer} className="px-4 py-2 bg-pink-500 text-white rounded">Save answer</button>
        </div>

        <hr />

        <label className="flex flex-col">
          <span>Partner's guess</span>
          <input value={theirGuess} onChange={e=>setTheirGuess(e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <div className="flex gap-2">
          <button aria-label="Submit partner guess" onClick={guess} className="px-4 py-2 border rounded">Submit guess</button>
        </div>

        {revealed && (
          <div className="p-4 bg-white rounded shadow">
            <p>Correct answer: <strong>{localStorage.getItem('howwell:answer')}</strong></p>
            <p>Partner guessed: <strong>{theirGuess}</strong></p>
            <p className="mt-2">{localStorage.getItem('howwell:answer') === theirGuess ? 'You matched! ❤️' : 'You were WAY off 😂'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
