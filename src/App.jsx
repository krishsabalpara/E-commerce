import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

/**
 * App - Root application component.
 * Wraps the entire app with BrowserRouter for client-side routing
 * and includes ToastContainer for global toast notifications.
 */
function App() {
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
