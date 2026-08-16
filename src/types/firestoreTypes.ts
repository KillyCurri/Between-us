export type UserProfile = {
  uid?: string
  name?: string
  partnerName?: string
  stage?: string
  togetherYears?: string
  interests?: string[]
}

export type Couple = {
  id?: string
  inviteCode: string
  members: string[]
  createdAt?: any
}

export type Memory = {
  id?: string
  coupleId?: string
  title: string
  note?: string
  imageUrl?: string
  createdAt?: any
}
