"use client"

import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MonthFilterProps {
  months: string[]
  currentMonth?: string
}

export function MonthFilter({ months, currentMonth }: MonthFilterProps) {
  const router = useRouter()

  function handleChange(value: string) {
    if (value === "all") {
      router.push("/finance/history")
    } else {
      router.push(`/finance/history?month=${value}`)
    }
  }

  return (
    <Select value={currentMonth || "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] text-xs">
        <SelectValue placeholder="Filter by month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All months</SelectItem>
        {months.map((m) => (
          <SelectItem key={m} value={m}>
            {new Date(m + "-01").toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
