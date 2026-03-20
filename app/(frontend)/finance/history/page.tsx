import { getPayload } from "payload"
import config from "@payload-config"
import { TransactionList } from "@/components/finance/TransactionList"
import { MonthFilter } from "@/components/finance/MonthFilter"
import { HostBreakdown } from "@/components/finance/HostBreakdown"

interface HistoryPageProps {
  searchParams: Promise<{ month?: string }>
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const { month } = await searchParams
  const payload = await getPayload({ config })

  const allTransactions = await payload.find({
    collection: "transactions",
    sort: "-date",
    limit: 1000,
  })

  // Get unique months for the filter
  const months = Array.from(
    new Set(
      allTransactions.docs.map((tx) => {
        const d = new Date(tx.date)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      })
    )
  ).sort().reverse()

  // Filter by month if specified
  const filtered = month
    ? allTransactions.docs.filter((tx) => {
        const d = new Date(tx.date)
        const txMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        return txMonth === month
      })
    : allTransactions.docs

  // Host breakdown (contributions only)
  const hostTotals = new Map<string, number>()
  for (const tx of allTransactions.docs) {
    if (tx.type === "contribution") {
      const current = hostTotals.get(tx.person) || 0
      hostTotals.set(tx.person, current + (tx.amount || 0))
    }
  }

  const hostBreakdown = Array.from(hostTotals.entries()).map(
    ([person, total]) => ({ person, total })
  )

  const mapped = filtered.map((tx) => ({
    id: String(tx.id),
    type: tx.type as "contribution" | "expense",
    amount: tx.amount || 0,
    date: tx.date,
    description: tx.description,
    category: tx.category || "other",
    person: tx.person,
    notes: tx.notes,
    isHistorical: tx.isHistorical || false,
  }))

  return (
    <div className="space-y-6">
      {hostBreakdown.length > 0 && (
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">
            Contributions by Host
          </h2>
          <HostBreakdown data={hostBreakdown} />
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-foreground">
            All Transactions
            {month && (
              <span className="text-muted-foreground font-normal">
                {" "}
                &mdash;{" "}
                {new Date(month + "-01").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </h2>
        </div>
        <MonthFilter months={months} currentMonth={month} />
        <div className="mt-3">
          <TransactionList transactions={mapped} />
        </div>
      </section>
    </div>
  )
}
