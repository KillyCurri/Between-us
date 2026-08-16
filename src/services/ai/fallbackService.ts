import questions from '../../data/questions/all.json'
import { AIResponse, GenerateOptions } from './types'

function sample<T>(arr: T[]) { return arr[Math.floor(Math.random()*arr.length)] }

export function fallbackGenerate(options?: GenerateOptions): AIResponse {
  const cat = options?.category || 'random'
  const pool = questions[cat] || questions['random']
  const q = sample(pool)
  return {
    type: 'question',
    category: cat,
    difficulty: 'medium',
    question: q,
    followUp: 'Why does this matter to you?'
  }
}

export function fallbackFollowUp(options?: { question?: string, context?: string }) {
  const prompts = [
    "That's interesting — can you tell me why that matters to you?",
    "How did that make you feel at the time?",
    "What's one small memory that comes to mind when you think of that?"
  ]
  return {
    type: 'followup',
    question: options?.question,
    followUp: sample(prompts)
  }
}
