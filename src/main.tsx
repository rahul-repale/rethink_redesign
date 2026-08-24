import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { ImpactProvider } from './contexts/ImpactContext'
import { AuthProvider } from './contexts/AuthContext'
import { UserActionProvider } from './contexts/UserActionContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ImpactProvider>
          <UserActionProvider>
            <App />
          </UserActionProvider>
        </ImpactProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
