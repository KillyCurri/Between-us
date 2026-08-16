import { AIResponse, GenerateOptions } from './types'
import { fallbackGenerate } from './fallbackService'
import { FollowUpOptions } from './types'
import { fallbackFollowUp } from './fallbackService'

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT

export async function generateQuestion(opts?: GenerateOptions): Promise<AIResponse> {
  if(!AI_ENDPOINT) {
    return fallbackGenerate(opts)
  }

  try {
    const res = await fetch(AI_ENDPOINT + '/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...opts, type: 'question', model: import.meta.env.VITE_GEMINI_MODEL })
    })
    if(!res.ok) throw new Error('AI endpoint error')
    const json = await res.json()
    // validate
    if(json && json.question) return json as AIResponse
    return fallbackGenerate(opts)
  } catch (e) {
    console.warn('AI generation failed, using fallback', e)
    return fallbackGenerate(opts)
  }
}

export async function generateFollowUp(opts?: FollowUpOptions): Promise<AIResponse> {
  const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT
  if(!AI_ENDPOINT) return fallbackFollowUp(opts)
  try{
    const res = await fetch(AI_ENDPOINT + '/followup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...opts, type: 'followup', model: import.meta.env.VITE_GEMINI_MODEL })
    })
    if(!res.ok) throw new Error('AI followup error')
    const json = await res.json()
    if(json && (json.followUp || json.question)) return json as AIResponse
    return fallbackFollowUp(opts)
  }catch(e){
    console.warn('Follow-up failed, fallback', e)
    return fallbackFollowUp(opts)
  }
}
