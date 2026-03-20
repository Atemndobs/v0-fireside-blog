import Link from "next/link"
import { cn, formatDate } from "@/lib/utils"

interface Transaction {
  id: string
  type: "contribution" | "expense"
  amount: number
  date: string
  description: string
  category: string
  person: string
  notes?: string | null
  isHistorical?: boolean
}

interface TransactionListProps {
  transactions: Transaction[]
  showPerson?: boolean
}

const categoryLabels: Record<string, string> = {
  "shield-editor": "Shield",
  "lumiere-editor": "Lumiere",
  promotion: "Promo",
  "guest-data": "Guest",
  contribution: "Contrib",
  other: "Other",
}

export function TransactionList({
  transactions,
  showPerson = true,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No transactions yet.
      </p>
    )
  }

  return (
    <div className="space-y-0">
      {transactions.map((tx) => (
        <Link
          key={tx.id}
          href={`/finance/edit/${tx.id}`}
          className="flex items-center justify-between py-2 border-b border-dashed border-border hover:bg-muted/50 transition-colors -mx-2 px-2 rounded-sm"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">
                {formatDate(tx.date)}
              </span>
              {showPerson && (
                <span className="text-xs text-muted-foreground capitalize">
                  {tx.person}
                </span>
              )}
            </div>
            <p className="text-sm text-foreground truncate">
              {tx.description}
            </p>
            {tx.notes && (
              <p className="text-xs text-muted-foreground truncate">
                {tx.notes}
              </p>
            )}
          </div>
          <div className="text-right ml-3 shrink-0">
            <span
              className={cn(
                "font-mono text-sm font-medium",
                tx.type === "contribution"
                  ? "text-green-600"
                  : "text-red-500"
              )}
            >
              {tx.type === "contribution" ? "+" : "-"}$
              {tx.amount.toLocaleString()}
            </span>
            <p className="text-xs text-muted-foreground">
              {categoryLabels[tx.category] || tx.category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
