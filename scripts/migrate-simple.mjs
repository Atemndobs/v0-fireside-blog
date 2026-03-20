/**
 * Simple Convex → Payload Migration (Node ES Module)
 */

import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load environment
config({ path: resolve(__dirname, '../.env.local') })

console.log('🚀 Starting Convex → Payload Migration\n')
console.log('Configuration:')
console.log(`  - Convex URL: ${process.env.NEXT_PUBLIC_CONVEX_URL}`)
console.log(`  - Payload URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
console.log(`  - Database: ${process.env.POSTGRES_URL ? '✅ Connected' : '❌ Not configured'}\n`)

if (!process.env.POSTGRES_URL) {
  console.error('❌ POSTGRES_URL is not set')
  process.exit(1)
}

// Dynamic imports for ESM
const { getPayload } = await import('payload')
const payloadConfig = await import('../payload.config.ts')

console.log('Initializing Payload...')

try {
  const payload = await getPayload({ config: await payloadConfig.default })
  console.log('✅ Payload initialized\n')
  
  // For now, let's just verify the connection works
  const users = await payload.find({
    collection: 'users',
    limit: 1,
  })
  
  console.log(`✅ Database connection working! Found ${users.totalDocs} user(s)`)
  
  console.log('\n✨ Connection test complete!')
  console.log('\nNext: Import Convex data (to be implemented)')
  
  process.exit(0)
} catch (err) {
  console.error('❌ Failed:', err.message)
  process.exit(1)
}
