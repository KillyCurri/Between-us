import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''

export default defineConfig(({ mode }) => {
  const base = process.env.VITE_PUBLIC_PATH || (repoName ? `/${repoName}/` : './')
  return {
    base,
    plugins: [react()],
  }
})
