export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = 'LOVE-'
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export function makeInviteLink(code: string) {
  const base = window.location.origin + (import.meta.env.BASE_URL || '/')
  return `${base}#/invite?code=${encodeURIComponent(code)}`
}
