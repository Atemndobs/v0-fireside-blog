/**
 * Seed script for historical financial data
 *
 * Run from v0-fireside-blog/:
 *   npx tsx scripts/seed-finance.ts
 *
 * Sources: meeting notes, WhatsApp conversations, shield-pricing-history.md
 */

import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { getPayload } from "payload"
import config from "../payload.config"

interface SeedTransaction {
  type: "contribution" | "expense"
  amount: number
  date: string
  description: string
  category: string
  person: string
  notes?: string
}

const historicalExpenses: SeedTransaction[] = [
  // === Shield Editor Payments (all disbursed by Atem) ===
  {
    type: "expense",
    amount: 250,
    date: "2025-06-11",
    description: "Shield initial payment (trial + advance)",
    category: "shield-editor",
    person: "atem",
    notes: "$100 trial edit + $150 advance. Written agreement: $150/episode",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-06-30",
    description: "Shield June editing",
    category: "shield-editor",
    person: "atem",
    notes: "$150 + $150 for 2 episodes. Paid under travel urgency",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-07-31",
    description: "Shield July editing",
    category: "shield-editor",
    person: "atem",
    notes: "$300/month became de facto norm without formal renegotiation",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-08-31",
    description: "Shield August editing",
    category: "shield-editor",
    person: "atem",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-09-30",
    description: "Shield September editing",
    category: "shield-editor",
    person: "atem",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-10-31",
    description: "Shield October editing",
    category: "shield-editor",
    person: "atem",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-11-30",
    description: "Shield November editing",
    category: "shield-editor",
    person: "atem",
  },
  {
    type: "expense",
    amount: 300,
    date: "2025-12-31",
    description: "Shield December editing",
    category: "shield-editor",
    person: "atem",
  },
  {
    type: "expense",
    amount: 300,
    date: "2026-01-31",
    description: "Shield January editing",
    category: "shield-editor",
    person: "atem",
  },
  {
    type: "expense",
    amount: 300,
    date: "2026-02-28",
    description: "Shield February editing",
    category: "shield-editor",
    person: "atem",
  },

  // === Promotion ===
  {
    type: "expense",
    amount: 100,
    date: "2026-02-19",
    description: "YouTube ads / distribution promotion",
    category: "promotion",
    person: "atem",
    notes: "Last promotion managed by Shield before restructure",
  },

  // === March 2026 — Disputed Invoice & Restructure ===
  {
    type: "expense",
    amount: 600,
    date: "2026-03-05",
    description: "Shield March invoice (disputed)",
    category: "shield-editor",
    person: "atem",
    notes: "Shield invoiced $600 (4 eps × $150). Atem paid despite team objections. Triggered renegotiation on March 7",
  },

  // === New Structure (post March 7 renegotiation) ===
  {
    type: "expense",
    amount: 50,
    date: "2026-03-08",
    description: "March promotion fund",
    category: "promotion",
    person: "atem",
    notes: "From Shield's voluntary $50 contribution toward promotions",
  },

  // === Lumiere (New Shorts Editor) ===
  {
    type: "expense",
    amount: 100,
    date: "2026-03-08",
    description: "Lumiere March shorts editing",
    category: "lumiere-editor",
    person: "atem",
    notes: "Trial month at $100. Contract rate: $255/month after trial",
  },
]

// Contribution data — Atem to fill in exact amounts and dates
// No documented contributions found in meeting notes or WhatsApp
// All expenses above were disbursed by Atem from personal funds
const historicalContributions: SeedTransaction[] = [
  // Uncomment and fill when Atem provides the numbers:
  // { type: "contribution", amount: 200, date: "2025-07-15", description: "Monthly contribution", category: "contribution", person: "atem" },
  // { type: "contribution", amount: 200, date: "2025-07-15", description: "Monthly contribution", category: "contribution", person: "anyang" },
  // { type: "contribution", amount: 200, date: "2025-07-15", description: "Monthly contribution", category: "contribution", person: "eunice" },
]

async function seed() {
  console.log("Seeding Fireside finance data...")

  const payload = await getPayload({ config })

  // Check if data already exists
  const existing = await payload.find({
    collection: "transactions",
    where: { isHistorical: { equals: true } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log("Historical data already exists. Skipping to avoid duplicates.")
    console.log("To re-seed, first delete existing historical transactions from /admin.")
    process.exit(0)
  }

  const allTransactions = [...historicalExpenses, ...historicalContributions]

  for (const tx of allTransactions) {
    await payload.create({
      collection: "transactions",
      data: {
        ...tx,
        isHistorical: true,
      },
    })
    console.log(`  ${tx.type === "contribution" ? "+" : "-"} ${tx.date} | ${tx.description} | $${tx.amount}`)
  }

  const totalExpenses = historicalExpenses.reduce((s, t) => s + t.amount, 0)
  const totalContributions = historicalContributions.reduce((s, t) => s + t.amount, 0)

  console.log(`\nSeeded ${allTransactions.length} transactions.`)
  console.log(`  Expenses: $${totalExpenses.toLocaleString()}`)
  console.log(`  Contributions: $${totalContributions.toLocaleString()}`)
  console.log(`  Balance: $${(totalContributions - totalExpenses).toLocaleString()}`)

  if (historicalContributions.length === 0) {
    console.log("\nNote: No contribution data yet. Atem needs to provide amounts.")
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
