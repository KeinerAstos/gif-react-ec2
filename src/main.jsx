import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { GifExpertApp } from './GifExpertApp.jsx'

createRoot(document.getElementById('root')).render(
  < StrictMode>
    <GifExpertApp/>
  
  </StrictMode>,
)
