"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  DEMO_CREDENTIALS,
  demoUser as defaultUser,
  type DemoUser,
} from "@/lib/demo-data"

type AuthContextValue = {
  user: DemoUser | null
  isLoading: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  updateUser: (updates: Partial<DemoUser>) => void
}

const STORAGE_KEY = "datil-ia-session"

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignorar errores de parseo
    }
    setIsLoading(false)
  }, [])

  const persist = useCallback((next: DemoUser | null) => {
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback(
    (email: string, password: string) => {
      if (
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        setUser(defaultUser)
        persist(defaultUser)
        return { ok: true }
      }
      return {
        ok: false,
        error: "Credenciales incorrectas. Usa la cuenta demo proporcionada.",
      }
    },
    [persist],
  )

  const logout = useCallback(() => {
    setUser(null)
    persist(null)
  }, [persist])

  const updateUser = useCallback(
    (updates: Partial<DemoUser>) => {
      setUser((prev) => {
        if (!prev) return prev
        const next = { ...prev, ...updates }
        persist(next)
        return next
      })
    },
    [persist],
  )

  const value = useMemo(
    () => ({ user, isLoading, login, logout, updateUser }),
    [user, isLoading, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return ctx
}
