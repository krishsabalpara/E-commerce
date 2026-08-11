import { useState } from 'react'
import './App.css'
import AdminPage from './admin pannel'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
         <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
