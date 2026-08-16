import React, {useState} from 'react'
import { generateQuestion, generateFollowUp } from '../services/ai/aiService'
import QuestionCard from '../components/QuestionCard'
import Loading from '../components/Loading'

export default function Play(){
  const [q, setQ] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleGet(){
    setLoading(true)
    const res = await generateQuestion({category: 'random'})
    if(res?.question) setQ(res.question)
    setLoading(false)
  }

  async function handleFollowUp(){
    if(!q) return
    setLoading(true)
    const fu = await generateFollowUp({ question: q })
    if(fu?.followUp) setQ(prev => prev + '\n\nFollow-up: ' + fu.followUp)
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold">Play</h2>
      <div className="mt-6">
        <div className="p-6">
          {loading ? (
            <div className="p-6 bg-white rounded-xl shadow min-h-[120px] flex items-center justify-center"><Loading label="Thinking of something good..." /></div>
          ) : q ? (
            <QuestionCard question={q} />
          ) : (
            <div className="p-6 bg-white rounded-xl shadow min-h-[120px] flex items-center justify-center">Click to get a question</div>
          )}
        </div>
        <div className="mt-4 flex gap-3">
          <button aria-label="Ask AI for a question" onClick={handleGet} className="px-4 py-2 bg-pink-500 text-white rounded">Ask AI</button>
          <button aria-label="Ask AI for a follow-up" onClick={handleFollowUp} disabled={!q} className="px-4 py-2 border rounded">Ask AI for a follow-up</button>
          <button aria-label="Clear question" onClick={() => setQ(null)} className="px-4 py-2 border rounded">Clear</button>
        </div>
      </div>
    </div>
  )
}
