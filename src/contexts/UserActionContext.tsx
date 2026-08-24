import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { useImpact } from './ImpactContext'

export interface LoggedAction {
  id: string
  actionId: string // e.g., the name or id of the action
  impactValue: number
  dateStr: string // YYYY-MM-DD
  timestamp: number
}

interface UserActionContextType {
  history: LoggedAction[]
  karmaPoints: number
  totalCo2e: number
  logAction: (actionId: string, impactValue: number) => { success: boolean; error?: string }
}

const UserActionContext = createContext<UserActionContextType | undefined>(undefined)

export function UserActionProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth()
  const { addImpact } = useImpact()
  
  const [history, setHistory] = useState<LoggedAction[]>([])

  // Load user specific history
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`rethink_history_${currentUser.id}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setHistory(parsed)
        } catch (e) {
          setHistory([])
        }
      } else {
        setHistory([])
      }
    } else {
      setHistory([])
    }
  }, [currentUser])

  // Save on change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`rethink_history_${currentUser.id}`, JSON.stringify(history))
    }
  }, [history, currentUser])

  const karmaPoints = history.length * 0.5 // e.g. 0.5 per action
  const totalCo2e = history.reduce((sum, item) => sum + item.impactValue, 0)

  function logAction(actionId: string, impactValue: number) {
    if (!currentUser) return { success: false, error: 'Must be logged in' }

    const todayStr = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    // Check 1-per-day limit for this specific action
    const alreadyLoggedToday = history.find(
      (a) => a.actionId === actionId && a.dateStr === todayStr
    )

    if (alreadyLoggedToday) {
      return {
        success: false,
        error: 'You can upload your responses only once in a day, please upload the response later.'
      }
    }

    const newAction: LoggedAction = {
      id: crypto.randomUUID(),
      actionId,
      impactValue,
      dateStr: todayStr,
      timestamp: Date.now(),
    }

    setHistory((prev) => [newAction, ...prev])

    // Update global impact
    addImpact(impactValue, currentUser.id)

    return { success: true }
  }

  return (
    <UserActionContext.Provider value={{ history, karmaPoints, totalCo2e, logAction }}>
      {children}
    </UserActionContext.Provider>
  )
}

export function useUserAction() {
  const context = useContext(UserActionContext)
  if (context === undefined) {
    throw new Error('useUserAction must be used within a UserActionProvider')
  }
  return context
}
