"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <Sun className="w-5 h-5 text-yellow-400" />
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </div>
  )
}
