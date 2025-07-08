import { Suspense } from 'react'
import './App.css'
import Hero from './components/organism/Hero'

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Hero />
    </Suspense>
  )
}

export default App
