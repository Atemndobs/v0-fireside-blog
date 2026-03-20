/**
 * Migration Runner - Loads environment and runs Convex → Payload migration
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Now run the migration
import('./migrate-convex-to-payload').catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
