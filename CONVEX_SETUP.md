# Convex Finance Tracker Setup

The finance tracker code is deployed to Vercel, but we need to add the `transactions` table to your existing Convex database.

## Quick Setup

### Option 1: Manual Deployment (Recommended)

1. **Run Convex Dev** (one-time setup):
   ```bash
   cd /Users/atem/sites/fireside/v0-fireside-blog
   npx convex dev
   ```
   
   This will:
   - Connect to your existing Convex deployment
   - Push the schema changes (adds `transactions` table)
   - Deploy the finance API functions

2. **Import Data**:
   ```bash
   # Import Eunice's payments
   npx tsx scripts/import-eunice-payments-convex.ts
   
   # Import Shield editor payments
   npx tsx scripts/import-shield-payments-convex.ts
   ```

### Option 2: Using Environment Variables

If you have your Convex deployment URL:

1. **Add to `.env.local`**:
   ```bash
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
   CONVEX_DEPLOYMENT=your-project:prod
   ```

2. **Deploy Schema**:
   ```bash
   npx convex deploy
   ```

3. **Import Data** (same as Option 1 step 2)

## What Gets Added

### New Convex Schema

The `transactions` table will be added with:
- `type`: "contribution" | "expense"
- `amount`: number (USD)
- `date`: string (YYYY-MM-DD)
- `description`: string
- `category`: string
- `person`: string
- `notes`: string
- `isHistorical`: boolean
- Timestamps: `createdAt`, `updatedAt`

### New Convex Functions

**Queries:**
- `api.finance.getAllTransactions` - Get all transactions with filtering
- `api.finance.getTransactions` - Paginated transactions
- `api.finance.getTransaction` - Get single transaction
- `api.finance.getFinancialSummary` - Totals + monthly breakdown

**Mutations:**
- `api.finance.createTransaction` - Add new transaction
- `api.finance.updateTransaction` - Update existing
- `api.finance.deleteTransaction` - Remove transaction
- `api.finance.bulkImportTransactions` - Import historical data

## After Setup

The finance tracker will be live at:
- **Production:** https://thefiresidetribe.com/finance
- **Local:** http://localhost:3000/finance

All financial data will be stored in your existing Convex database alongside your episodes, artists, and blog data.

## Troubleshooting

**"NEXT_PUBLIC_CONVEX_URL is not set"**
- Add the environment variable to `.env.local`
- Or run `npx convex dev` to auto-configure

**"Cannot prompt for input in non-interactive terminals"**
- You need to run `npx convex dev` manually in your terminal
- This is a one-time authentication step

**Deployment already exists**
- Good! Just run `npx convex dev` to push the schema changes
- Your existing data won't be affected
