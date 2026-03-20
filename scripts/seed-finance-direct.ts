/**
 * Seed historical finance data directly via PostgreSQL
 *
 * Run: npx tsx scripts/seed-finance-direct.ts
 */

import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import pg from "pg"
const { Client } = pg

const databaseUrl = process.env.POSTGRES_URL
if (!databaseUrl) {
  console.error("POSTGRES_URL not set in .env.local")
  process.exit(1)
}

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
  {
    type: "expense", amount: 250, date: "2025-06-11",
    description: "Shield initial payment (trial + advance)", category: "shield-editor", person: "atem",
    notes: "$100 trial edit + $150 advance. Written agreement: $150/episode",
  },
  {
    type: "expense", amount: 300, date: "2025-06-30",
    description: "Shield June editing", category: "shield-editor", person: "atem",
    notes: "$150 + $150 for 2 episodes",
  },
  {
    type: "expense", amount: 300, date: "2025-07-31",
    description: "Shield July editing", category: "shield-editor", person: "atem",
    notes: "$300/month became de facto norm",
  },
  { type: "expense", amount: 300, date: "2025-08-31", description: "Shield August editing", category: "shield-editor", person: "atem" },
  { type: "expense", amount: 300, date: "2025-09-30", description: "Shield September editing", category: "shield-editor", person: "atem" },
  { type: "expense", amount: 300, date: "2025-10-31", description: "Shield October editing", category: "shield-editor", person: "atem" },
  { type: "expense", amount: 300, date: "2025-11-30", description: "Shield November editing", category: "shield-editor", person: "atem" },
  { type: "expense", amount: 300, date: "2025-12-31", description: "Shield December editing", category: "shield-editor", person: "atem" },
  { type: "expense", amount: 300, date: "2026-01-31", description: "Shield January editing", category: "shield-editor", person: "atem" },
  { type: "expense", amount: 300, date: "2026-02-28", description: "Shield February editing", category: "shield-editor", person: "atem" },
  {
    type: "expense", amount: 100, date: "2026-02-19",
    description: "YouTube ads / distribution promotion", category: "promotion", person: "atem",
    notes: "Last promotion managed by Shield before restructure",
  },
  {
    type: "expense", amount: 600, date: "2026-03-05",
    description: "Shield March invoice (disputed)", category: "shield-editor", person: "atem",
    notes: "Shield invoiced $600 (4 eps x $150). Atem paid despite team objections",
  },
  {
    type: "expense", amount: 50, date: "2026-03-08",
    description: "March promotion fund", category: "promotion", person: "atem",
    notes: "From Shield's voluntary $50 contribution",
  },
  {
    type: "expense", amount: 100, date: "2026-03-08",
    description: "Lumiere March shorts editing", category: "lumiere-editor", person: "atem",
    notes: "Trial month at $100. Contract rate: $255/month after trial",
  },
]

async function seed() {
  console.log("Seeding Fireside finance data...")

  const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } })
  await client.connect()

  // Check if table exists
  const tableCheck = await client.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'transactions'`
  )
  if (tableCheck.rows.length === 0) {
    console.error("'transactions' table doesn't exist. Start dev server first to let Payload create it.")
    await client.end()
    process.exit(1)
  }

  // Check for existing historical data
  const existing = await client.query(
    `SELECT id FROM transactions WHERE is_historical = true LIMIT 1`
  )
  if (existing.rows.length > 0) {
    console.log("Historical data already exists. Skipping.")
    await client.end()
    process.exit(0)
  }

  for (const tx of historicalExpenses) {
    await client.query(
      `INSERT INTO transactions (type, amount, date, description, category, person, notes, is_historical, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())`,
      [tx.type, tx.amount, tx.date + "T00:00:00.000Z", tx.description, tx.category, tx.person, tx.notes || null]
    )
    console.log(`  - ${tx.date} | ${tx.description} | $${tx.amount}`)
  }

  const total = historicalExpenses.reduce((s, t) => s + t.amount, 0)
  console.log(`\nSeeded ${historicalExpenses.length} transactions. Total expenses: $${total.toLocaleString()}`)

  await client.end()
}

seed().catch(async (err) => {
  console.error("Seed failed:", err.message || err)
  process.exit(1)
})
