import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import '@/index.css'

// GitHub Pages serves this from a sub-path; the 404.html redirect stashes the
// requested route in ?p= so a deep link survives the round trip.
const redirect = new URLSearchParams(window.location.search).get('p')
if (redirect) {
  window.history.replaceState(null, '', import.meta.env.BASE_URL.replace(/\/$/, '') + redirect)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
