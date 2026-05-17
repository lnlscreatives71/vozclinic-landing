import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { LangProvider } from '../context/LangContext'
import EnrollPage from './EnrollPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <EnrollPage />
    </LangProvider>
  </StrictMode>,
)
