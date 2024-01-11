import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './pages/LoadingScreen/LoadingScreen'
import Register from './pages/Register/Register'

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showLoadingScreen ? <LoadingScreen /> : <Register />}
    </>
  )
}

export default App
