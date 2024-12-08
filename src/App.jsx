import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='min-w-full'>
      <Navbar />
      <Home />

    </main>
  )
}

export default App
