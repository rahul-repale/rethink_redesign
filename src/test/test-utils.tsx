import { render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '../contexts/AuthContext'
import { ImpactProvider } from '../contexts/ImpactContext'
import { UserActionProvider } from '../contexts/UserActionContext'
import type { ReactElement, ReactNode } from 'react'

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ImpactProvider>
          <UserActionProvider>
            {children}
          </UserActionProvider>
        </ImpactProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export function mockUser() {
  const user = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    joinedDate: new Date().toISOString(),
  }
  localStorage.setItem('rethink_user', JSON.stringify(user))
  return user
}
