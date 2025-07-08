import { Suspense, useEffect } from 'react'
import './App.css'
import Hero from './components/organism/Hero'
import { useAuthStore } from './stores/authStore'

function App() {
const setLoggedIn = useAuthStore((state) => state.setLoggedIn)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setLoggedIn(!!token)
  }, [setLoggedIn])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Hero />
    </Suspense>
  )
}

export default App
