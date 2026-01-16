"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ThemeSwitcherProps {
  className?: string
  variant?: "icon" | "switch"
}

export default function ThemeSwitcher({ className, variant = "icon" }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch - show placeholder
  if (!mounted) {
    return (
      <button
        className={cn(
          "p-2 rounded-md text-muted-foreground",
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "p-2 rounded-md transition-colors",
        "text-muted-foreground hover:text-foreground hover:bg-secondary",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
