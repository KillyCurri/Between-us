import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { logout } from '../services/auth/authService'

export default function Layout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout(){
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/60 backdrop-blur sticky top-0 z-10 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <Heart className="text-pink-500" /> Between Us
          </Link>
          <nav className="flex items-center gap-3" aria-label="Main navigation">
            <Link to="/home" className="text-sm" aria-label="Home">Home</Link>
            <Link to="/play" className="text-sm" aria-label="Games">Games</Link>
            <Link to="/memories" className="text-sm" aria-label="Memories">Memories</Link>
            <Link to="/profile" className="text-sm" aria-label="Profile">Profile</Link>
          </nav>
          <div className="ml-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">Hi, {user.displayName || user.email}</span>
                <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth/login" className="text-sm">Log in</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center text-sm py-4">Made with ❤️ for long distance couples</footer>
    </div>
  )
}
