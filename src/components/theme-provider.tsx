import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { setThemeServerFn } from "~/lib/actions/theme"
import { CONSTANTS } from "~/lib/constants"

export type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = CONSTANTS.THEME,
  ...props
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<Theme>(
    () => {
      if (typeof window === "undefined") return defaultTheme
      const storedTheme = localStorage.getItem(storageKey)
      if (!storedTheme) return defaultTheme
      return storedTheme as Theme
    }
  )

  const setTheme = useCallback((theme: Theme) => {
    setThemeMode(theme);
    localStorage.setItem(storageKey, theme);
    setThemeServerFn({ data: theme })
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (themeMode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      setTheme(systemTheme)
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(themeMode)
  }, [themeMode])

  const value = {
    theme: themeMode,
    setTheme
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}