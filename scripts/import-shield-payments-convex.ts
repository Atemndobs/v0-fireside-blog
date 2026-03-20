/**
 * Import Shield Editor payment records into Convex
 * Run: npx tsx scripts/import-shield-payments-convex.ts
 * 
 * All payments were made by Atem upfront.
 * Cost split: 1/3 each (Atem, Eunice, Anyang)
 */

import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL
if (!CONVEX_URL) {
  console.error("NEXT_PUBLIC_CONVEX_URL not set in environment")
  process.exit(1)
}

// Shield editor payments from cryptocurrency history
const shieldPayments = [
  { date: "2026-03-05", amount: 300, currency: "USDT" },
  { date: "2026-02-01", amount: 300, currency: "USDT" },
  { date: "2026-01-12", amount: 300, currency: "USDT" },
  { date: "2025-12-13", amount: 300, currency: "USDT" },
  { date: "2025-11-04", amount: 400, currency: "USDT" },
  { date: "2025-09-27", amount: 300, currency: "USDT" },
  { date: "2025-09-07", amount: 300, currency: "USDC" },
  { date: "2025-08-03", amount: 300, currency: "USDC" },
  { date: "2025-06-30", amount: 149.33, currency: "USDC" },
  { date: "2025-06-30", amount: 150, currency: "USDC" },
  { date: "2025-06-11", amount: 150, currency: "USDT" },
  { date: "2025-06-11", amount: 100, currency: "USDT" },
]

async function run() {
  const client = new ConvexHttpClient(CONVEX_URL)

  // Create expense transactions for all Shield payments
  const transactions = shieldPayments.map((payment) => ({
    type: "expense" as const,
    amount: payment.amount,
    date: payment.date,
    description: `Shield editor payment (${payment.currency})`,
    category: "shield-editor",
    person: "atem", // Atem paid all upfront
    notes: `Paid to BlissandChaos via ${payment.currency}. Cost split 3-way: Atem (1/3), Eunice (1/3), Anyang (1/3). Each person's share: $${(payment.amount / 3).toFixed(2)}`,
    isHistorical: true,
  }))

  console.log("\n📊 Shield Payment Import Summary")
  console.log("=" .repeat(50))
  
  const total = transactions.reduce((sum, t) => sum + t.amount, 0)
  const sharePerPerson = total / 3

  console.log(`\nTotal Shield payments: $${total.toFixed(2)}`)
  console.log(`Each person's share (÷3): $${sharePerPerson.toFixed(2)}`)
  
  console.log(`\n💰 Cost Split:`)
  console.log(`- Atem paid: $${total.toFixed(2)} (all upfront)`)
  console.log(`- Atem owes (own share): $${sharePerPerson.toFixed(2)}`)
  console.log(`- Should receive from others: $${(total - sharePerPerson).toFixed(2)}`)
  
  console.log(`\n📥 Importing ${transactions.length} transactions...`)

  // Import using bulk mutation
  const result = await client.mutation(api.finance.bulkImportTransactions, {
    transactions,
  })

  console.log(`\n✅ Import Complete!`)
  console.log(`Transactions created: ${result.count}`)
  console.log(`Transaction IDs: ${result.ids.slice(0, 3).join(", ")}...`)

  console.log(`\n📋 Imported Transactions:`)
  transactions.forEach((tx) => {
    const share = tx.amount / 3
    console.log(`- ${tx.date}: $${tx.amount.toFixed(2)} (each owes: $${share.toFixed(2)})`)
  })

  console.log(`\n💡 Next Steps:`)
  console.log(`1. Eunice has already contributed $991.22 toward her share of $${sharePerPerson.toFixed(2)}`)
  console.log(`2. Eunice still owes: $${(sharePerPerson - 991.22).toFixed(2)}`)
  console.log(`3. Anyang owes full share: $${sharePerPerson.toFixed(2)}`)
  console.log(`4. Total Atem should receive: $${(sharePerPerson - 991.22 + sharePerPerson).toFixed(2)}`)
}

run().catch((error) => {
  console.error("Import failed:", error)
  process.exit(1)
})
