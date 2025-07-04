import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext.jsx'
import CaptionContext from './context/captionContext.jsx' // ✅ Use default export

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <CaptionContext> {/* ✅ Correct wrapper */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CaptionContext>
    </UserContext>
  </StrictMode>
)
