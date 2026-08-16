import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Onboarding from './pages/Onboarding'
import Invite from './pages/Invite'
import Dashboard from './pages/Dashboard'
import Memories from './pages/Memories'
import React, { Suspense, lazy } from 'react'

const Play = lazy(() => import('./pages/Play'))
const GameModes = lazy(() => import('./pages/GameModes'))
const HowWell = lazy(() => import('./pages/HowWell'))
import Layout from './layouts/Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="invite" element={<Invite />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="modes" element={<GameModes />} />
        <Route path="howwell" element={<HowWell />} />
        <Route path="play" element={<Suspense fallback={<div>Loading...</div>}><Play /></Suspense>} />
        <Route path="modes" element={<Suspense fallback={<div>Loading...</div>}><GameModes /></Suspense>} />
        <Route path="howwell" element={<Suspense fallback={<div>Loading...</div>}><HowWell /></Suspense>} />
        <Route path="memories" element={<Memories />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
