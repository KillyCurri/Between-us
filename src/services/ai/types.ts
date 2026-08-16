export type AIResponse = {
  type: 'question' | 'challenge' | 'date' | 'followup' | string
  category?: string
  difficulty?: 'easy'|'medium'|'hard'|string
  question?: string
  followUp?: string
}

export type GenerateOptions = {
  category?: string
  mood?: string
}

export type FollowUpOptions = {
  question?: string
  context?: string
}

