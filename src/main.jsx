import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store.js'
import { Provider } from 'react-redux'

/**
 * Application entry point.
 * Renders the App component wrapped with:
 * - StrictMode: enables additional development warnings
 * - Provider: makes the Redux store available to all components
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
