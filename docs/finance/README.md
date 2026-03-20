# Fireside Finance Tracker

Standalone finance tracking system using Convex database. Completely independent from Payload CMS migration.

## Features

- **Transaction Management:** Track income (contributions) and expenses
- **Financial Dashboard:** Quick stats, monthly overview charts, recent transactions
- **Historical Data Import:** Bulk import historical transactions
- **Categories:** Shield editor, Lumiere editor, promotion, contributions, etc.
- **People Tracking:** Track transactions by person (Atem, Anyang, Eunice)

## Database Schema

The finance tracker uses a dedicated `transactions` table in Convex:

```typescript
{
  type: "contribution" | "expense",
  amount: number,              // USD amount
  date: string,               // ISO date (YYYY-MM-DD)
  description: string,
  category: string,
  person: string,
  notes: string,
  isHistorical: boolean,      // true for imported data
  createdAt: number,
  updatedAt: number
}
```

## Setup

### 1. Deploy Convex Schema

The schema is already defined in `convex/schema.ts`. When you deploy to Convex, the transactions table will be created automatically.

```bash
npx convex deploy
```

### 2. Import Historical Data

To import the Eunice Amin payment records:

```bash
npx tsx scripts/import-eunice-payments-convex.ts
```

This will import 4 transactions totaling €917.79 (≈$991.22 USD):
- 2026-03-04: €327.96 → $354.20
- 2025-11-07: €250.12 → $270.13
- 2025-06-10: €251.75 → $271.89
- 2025-03-15: €87.96 → $95.00

## Usage

### Accessing the Finance Dashboard

Navigate to `/finance` on your site to view:
- Total income and expenses
- Current balance
- Monthly breakdown chart
- Recent transactions
- Quick add/edit functionality

### API Endpoints (Convex)

**Queries:**
- `api.finance.getAllTransactions` - Get all transactions with filtering
- `api.finance.getFinancialSummary` - Get totals and monthly breakdown
- `api.finance.getTransaction` - Get single transaction by ID

**Mutations:**
- `api.finance.createTransaction` - Add new transaction
- `api.finance.updateTransaction` - Update existing transaction
- `api.finance.deleteTransaction` - Remove transaction
- `api.finance.bulkImportTransactions` - Import multiple transactions

### Example: Adding a Transaction

```typescript
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const createTransaction = useMutation(api.finance.createTransaction)

await createTransaction({
  type: "expense",
  amount: 300,
  date: "2026-03-20",
  description: "Video editing",
  category: "shield-editor",
  person: "atem",
  notes: "Payment for March episode",
  isHistorical: false
})
```

## Categories

Available categories:
- `shield-editor` - Editor payments
- `lumiere-editor` - Short-form editor payments
- `promotion` - Marketing and promotion expenses
- `guest-data` - Guest appearance fees
- `contribution` - Incoming funds
- `other` - Miscellaneous

## People

Current team members tracked:
- `atem` - Atem
- `anyang` - Anyang
- `eunice` - Eunice

## Migration Notes

This finance tracker:
- ✅ Runs on Convex (no Payload CMS dependency)
- ✅ Standalone feature (can merge to main independently)
- ✅ No database migration required (Convex auto-creates schema)
- ✅ Includes historical data import script
- ✅ Compatible with existing Fireside tech stack

## Files

**Convex Backend:**
- `convex/schema.ts` - Database schema (transactions table)
- `convex/finance.ts` - Queries and mutations

**Frontend:**
- `app/finance/page.tsx` - Main dashboard
- `components/finance/*` - Reusable UI components

**Scripts:**
- `scripts/import-eunice-payments-convex.ts` - Import Eunice's payments

**Documentation:**
- `docs/finance/README.md` - This file
- `docs/payments/*` - Payment records and screenshots
