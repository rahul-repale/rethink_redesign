import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface ImpactMetrics {
  locations: number
  warriors: number
  co2e: number
}

interface ImpactContextType {
  metrics: ImpactMetrics
  addImpact: (co2eSaved: number, userId: string) => void
}

const ImpactContext = createContext<ImpactContextType | undefined>(undefined)

const INITIAL_METRICS: ImpactMetrics = {
  locations: 114,
  warriors: 634,
  co2e: 12193,
}

export function ImpactProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<ImpactMetrics>(() => {
    const stored = localStorage.getItem('rethink_global_impact')
    if (stored) {
      try { return JSON.parse(stored) } catch(e) {}
    }
    return INITIAL_METRICS
  })

  const [uniqueWarriors, setUniqueWarriors] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('rethink_unique_warriors')
    if (stored) {
      try { return new Set(JSON.parse(stored)) } catch(e) {}
    }
    return new Set()
  })

  useEffect(() => {
    localStorage.setItem('rethink_global_impact', JSON.stringify(metrics))
  }, [metrics])

  useEffect(() => {
    localStorage.setItem('rethink_unique_warriors', JSON.stringify([...uniqueWarriors]))
  }, [uniqueWarriors])

  function addImpact(co2eSaved: number, userId: string) {
    const isNew = !uniqueWarriors.has(userId)
    
    if (isNew) {
      setUniqueWarriors(prev => {
        const next = new Set(prev)
        next.add(userId)
        return next
      })
    }

    setMetrics((prev) => ({
      ...prev,
      warriors: isNew ? prev.warriors + 1 : prev.warriors,
      locations: isNew ? prev.locations + 1 : prev.locations,
      co2e: prev.co2e + co2eSaved,
    }))
  }

  return (
    <ImpactContext.Provider value={{ metrics, addImpact }}>
      {children}
    </ImpactContext.Provider>
  )
}

export function useImpact() {
  const context = useContext(ImpactContext)
  if (context === undefined) {
    throw new Error('useImpact must be used within an ImpactProvider')
  }
  return context
}
