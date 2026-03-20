"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { QuickStats } from "@/components/finance/QuickStats"
import { TransactionList } from "@/components/finance/TransactionList"
import { MonthlySummaryChart } from "@/components/finance/MonthlySummaryChart"

export default function FinanceDashboard() {
  const summary = useQuery(api.finance.getFinancialSummary)
  const allTransactions = useQuery(api.finance.getAllTransactions, { limit: 10 })

  if (!summary || !allTransactions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading finance data...</p>
      </div>
    )
  }

  const mapped = allTransactions.map((tx) => ({
    id: tx._id,
    type: tx.type,
    amount: tx.amount,
    date: tx.date,
    description: tx.description,
    category: tx.category,
    person: tx.person,
    notes: tx.notes,
    isHistorical: tx.isHistorical,
  }))

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <Link
          href="/finance/add"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Transaction
        </Link>
      </div>

      <QuickStats totalIn={summary.totalIn} totalOut={summary.totalOut} />

      {summary.monthlySummary.length > 0 && (
        <section>
          <h2 className="text-sm font-medium text-foreground mb-3">
            Monthly Overview
          </h2>
          <MonthlySummaryChart data={summary.monthlySummary} />
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-foreground">
            Recent Transactions
          </h2>
          <Link
            href="/finance/history"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <TransactionList transactions={mapped} />
      </section>
    </div>
  )
}
