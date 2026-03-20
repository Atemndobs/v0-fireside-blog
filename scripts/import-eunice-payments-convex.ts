/**
 * Import Eunice Amin payment records into Convex
 * Run: npx tsx scripts/import-eunice-payments-convex.ts
 */

import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import fs from "node:fs"
import path from "node:path"
import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL
if (!CONVEX_URL) {
  console.error("NEXT_PUBLIC_CONVEX_URL not set in environment")
  process.exit(1)
}

const SOURCE_FILE = path.join(__dirname, "../docs/payments/eunice-amin-payments.md")
const EUR_TO_USD = 1.08

interface ParsedPayment {
  date: string
  amountEUR: number
  notes: string
}

function toISODate(dateStr: string): string {
  // "4 Mar 2026" → "2026-03-04"
  const parts = dateStr.trim().split(/\s+/)
  const day = parts[0].padStart(2, "0")
  const monthMap: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  }
  const month = monthMap[parts[1]]
  const year = parts[2]
  return `${year}-${month}-${day}`
}

function parseEURAmount(amountText: string): number {
  const clean = amountText.replace("€", "").replace(/,/g, "").trim()
  const value = Number.parseFloat(clean)
  if (!Number.isFinite(value)) throw new Error(`Invalid EUR amount: ${amountText}`)
  return value
}

function toUSD(eur: number): number {
  return Math.round(eur * EUR_TO_USD * 100) / 100
}

function parsePayments(markdown: string): ParsedPayment[] {
  const lines = markdown.split(/\r?\n/)
  const rows = lines.filter((line) => /\|\s*\d{1,2}\s+[A-Za-z]{3}\s+\d{4}\s*\|\s*€/.test(line))

  return rows.map((row) => {
    const cells = row.split("|").map((part) => part.trim())
    return {
      date: toISODate(cells[1]),
      amountEUR: parseEURAmount(cells[2]),
      notes: cells[3],
    }
  })
}

async function run() {
  const markdown = fs.readFileSync(SOURCE_FILE, "utf8")
  const payments = parsePayments(markdown)

  if (payments.length !== 4) {
    throw new Error(`Expected 4 payments, found ${payments.length}`)
  }

  const totalEUR = Math.round(payments.reduce((sum, payment) => sum + payment.amountEUR, 0) * 100) / 100
  if (totalEUR !== 917.79) {
    throw new Error(`Expected EUR total 917.79, got ${totalEUR.toFixed(2)}`)
  }

  const client = new ConvexHttpClient(CONVEX_URL)

  const transactions = payments.map((payment) => {
    const amountUSD = toUSD(payment.amountEUR)
    return {
      type: "contribution" as const,
      amount: amountUSD,
      date: payment.date,
      description: "Eunice Amin contribution",
      category: "contribution",
      person: "eunice",
      notes: `Imported from eunice-amin-payments.md | EUR €${payment.amountEUR.toFixed(2)} @ 1 EUR≈1.08 USD | Source note: ${payment.notes}`,
      isHistorical: true,
    }
  })

  // Import using bulk mutation
  const result = await client.mutation(api.finance.bulkImportTransactions, {
    transactions,
  })

  console.log(`\nImport Complete!`)
  console.log(`Transactions created: ${result.count}`)
  console.log(`Transaction IDs:`, result.ids)

  const totalUSD = transactions.reduce((sum, t) => sum + t.amount, 0)
  console.log(`\nTotal EUR: €${totalEUR.toFixed(2)}`)
  console.log(`Total USD (approx): $${totalUSD.toFixed(2)}`)

  console.log(`\nTransactions imported:`)
  transactions.forEach((tx) => {
    const eur = tx.amount / EUR_TO_USD
    console.log(`- ${tx.date}: $${tx.amount.toFixed(2)} (EUR €${eur.toFixed(2)})`)
  })
}

run().catch((error) => {
  console.error("Import failed:", error)
  process.exit(1)
})
