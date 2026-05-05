import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './Dashboard/Dashboard.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
