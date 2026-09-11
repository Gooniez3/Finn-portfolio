import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const ThemeCtx = createContext({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  return <ThemeCtx.Provider value={{ dark, toggle: () => setDark((v) => !v) }}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
