import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { ImpactProvider, useImpact } from '../contexts/ImpactContext'
import { UserActionProvider, useUserAction } from '../contexts/UserActionContext'
import type { ReactNode } from 'react'

function AuthWrapper({ children }: { children: ReactNode }) {
  return <BrowserRouter><AuthProvider>{children}</AuthProvider></BrowserRouter>
}

function FullWrapper({ children }: { children: ReactNode }) {
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

describe('AuthContext', () => {
  it('starts with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper })
    expect(result.current.currentUser).toBeNull()
  })

  it('signup creates a user and persists to localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper })
    
    act(() => {
      result.current.signup({ name: 'Test', email: 'test@test.com', phone: '1234567890' })
    })

    expect(result.current.currentUser).not.toBeNull()
    expect(result.current.currentUser!.name).toBe('Test')
    expect(result.current.currentUser!.email).toBe('test@test.com')
    expect(result.current.currentUser!.id).toBeTruthy()
    
    const stored = localStorage.getItem('rethink_user')
    expect(stored).not.toBeNull()
    expect(JSON.parse(stored!).name).toBe('Test')
  })

  it('login sets user data', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper })
    const user = {
      id: 'u1',
      name: 'Login User',
      email: 'login@test.com',
      phone: '9999999999',
      joinedDate: '2026-01-01',
    }

    act(() => {
      result.current.login(user)
    })

    expect(result.current.currentUser).toEqual(user)
  })

  it('logout clears user and localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper })

    act(() => {
      result.current.signup({ name: 'Test', email: 'test@test.com', phone: '1234567890' })
    })
    expect(result.current.currentUser).not.toBeNull()

    act(() => {
      result.current.logout()
    })
    expect(result.current.currentUser).toBeNull()
    expect(localStorage.getItem('rethink_user')).toBeNull()
  })

  it('throws when useAuth is used outside provider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')
  })

  it('AUDIT: silently swallows JSON parse errors in localStorage', () => {
    // Corrupt localStorage data
    localStorage.setItem('rethink_user', '{invalid json')
    const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper })
    // Should not crash, but user should be null (no error feedback)
    expect(result.current.currentUser).toBeNull()
  })
})

describe('ImpactContext', () => {
  function ImpactWrapper({ children }: { children: ReactNode }) {
    return <BrowserRouter><AuthProvider><ImpactProvider>{children}</ImpactProvider></AuthProvider></BrowserRouter>
  }

  it('starts with initial metrics', () => {
    const { result } = renderHook(() => useImpact(), { wrapper: ImpactWrapper })
    expect(result.current.metrics.locations).toBe(114)
    expect(result.current.metrics.warriors).toBe(634)
    expect(result.current.metrics.co2e).toBe(12193)
  })

  it('addImpact increments CO2e and unique warriors', () => {
    const { result } = renderHook(() => useImpact(), { wrapper: ImpactWrapper })

    act(() => {
      result.current.addImpact(5, 'user-1')
    })

    expect(result.current.metrics.co2e).toBe(12198)
    expect(result.current.metrics.warriors).toBe(635)
    expect(result.current.metrics.locations).toBe(115)
  })

  it('does NOT increment warriors/locations for same user twice', () => {
    const { result } = renderHook(() => useImpact(), { wrapper: ImpactWrapper })

    act(() => {
      result.current.addImpact(5, 'user-1')
    })
    act(() => {
      result.current.addImpact(10, 'user-1')
    })

    // Warriors and locations should only go up by 1 (not 2)
    expect(result.current.metrics.warriors).toBe(635)
    expect(result.current.metrics.locations).toBe(115)
    // CO2e should be sum
    expect(result.current.metrics.co2e).toBe(12208)
  })

  it('throws when useImpact is used outside provider', () => {
    expect(() => {
      renderHook(() => useImpact())
    }).toThrow('useImpact must be used within an ImpactProvider')
  })
})

describe('UserActionContext', () => {
  it('starts with empty history when logged in', () => {
    const user = {
      id: 'ctx-user',
      name: 'Ctx User',
      email: 'ctx@test.com',
      phone: '1234567890',
      joinedDate: '2026-01-01',
    }
    localStorage.setItem('rethink_user', JSON.stringify(user))

    const { result } = renderHook(() => useUserAction(), { wrapper: FullWrapper })
    expect(result.current.history).toEqual([])
    expect(result.current.karmaPoints).toBe(0)
    expect(result.current.totalCo2e).toBe(0)
  })

  it('logAction successfully logs an action', () => {
    const user = {
      id: 'ctx-user',
      name: 'Ctx User',
      email: 'ctx@test.com',
      phone: '1234567890',
      joinedDate: '2026-01-01',
    }
    localStorage.setItem('rethink_user', JSON.stringify(user))

    const { result } = renderHook(() => useUserAction(), { wrapper: FullWrapper })

    let res: { success: boolean; error?: string }
    act(() => {
      res = result.current.logAction('Pick a Bottle and Run', 0.05)
    })

    expect(res!.success).toBe(true)
    expect(result.current.history.length).toBe(1)
    expect(result.current.karmaPoints).toBe(0.5)
    expect(result.current.totalCo2e).toBe(0.05)
  })

  it('blocks duplicate action on same day', () => {
    const user = {
      id: 'ctx-user',
      name: 'Ctx User',
      email: 'ctx@test.com',
      phone: '1234567890',
      joinedDate: '2026-01-01',
    }
    localStorage.setItem('rethink_user', JSON.stringify(user))

    const { result } = renderHook(() => useUserAction(), { wrapper: FullWrapper })

    act(() => {
      result.current.logAction('Pick a Bottle and Run', 0.05)
    })

    let res: { success: boolean; error?: string }
    act(() => {
      res = result.current.logAction('Pick a Bottle and Run', 0.05)
    })

    expect(res!.success).toBe(false)
    expect(res!.error).toContain('only once in a day')
  })

  it('allows different actions on the same day', () => {
    const user = {
      id: 'ctx-user',
      name: 'Ctx User',
      email: 'ctx@test.com',
      phone: '1234567890',
      joinedDate: '2026-01-01',
    }
    localStorage.setItem('rethink_user', JSON.stringify(user))

    const { result } = renderHook(() => useUserAction(), { wrapper: FullWrapper })

    let res1: { success: boolean; error?: string }
    let res2: { success: boolean; error?: string }
    act(() => {
      res1 = result.current.logAction('Pick a Bottle and Run', 0.05)
    })
    act(() => {
      res2 = result.current.logAction('Dark Mode', 138)
    })

    expect(res1!.success).toBe(true)
    expect(res2!.success).toBe(true)
    expect(result.current.history.length).toBe(2)
  })

  it('returns error when not logged in', () => {
    const { result } = renderHook(() => useUserAction(), { wrapper: FullWrapper })
    let res: { success: boolean; error?: string }
    act(() => {
      res = result.current.logAction('Test', 1)
    })
    expect(res!.success).toBe(false)
    expect(res!.error).toBe('Must be logged in')
  })

  it('throws when useUserAction is used outside provider', () => {
    expect(() => {
      renderHook(() => useUserAction())
    }).toThrow('useUserAction must be used within a UserActionProvider')
  })
})
