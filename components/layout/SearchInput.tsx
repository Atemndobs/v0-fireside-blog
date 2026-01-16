"use client"

import { Search } from "lucide-react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface SearchInputProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchInput({ placeholder = "Search", onSearch, className }: SearchInputProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim())
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }, [query, onSearch, router])

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-background border border-border rounded-none py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>
    </form>
  )
}
