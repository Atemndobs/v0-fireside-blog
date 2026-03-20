import { cn } from "@/lib/utils"

interface QuickStatsProps {
  totalIn: number
  totalOut: number
}

export function QuickStats({ totalIn, totalOut }: QuickStatsProps) {
  const balance = totalIn - totalOut

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="border border-dashed border-border p-3">
        <p className="text-xs text-muted-foreground">Total In</p>
        <p className="font-mono text-lg text-green-600 font-semibold">
          ${totalIn.toLocaleString()}
        </p>
      </div>
      <div className="border border-dashed border-border p-3">
        <p className="text-xs text-muted-foreground">Total Out</p>
        <p className="font-mono text-lg text-red-500 font-semibold">
          ${totalOut.toLocaleString()}
        </p>
      </div>
      <div className="border border-dashed border-border p-3">
        <p className="text-xs text-muted-foreground">Balance</p>
        <p
          className={cn(
            "font-mono text-lg font-semibold",
            balance >= 0 ? "text-green-600" : "text-red-500"
          )}
        >
          {balance < 0 ? "-" : ""}${Math.abs(balance).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
