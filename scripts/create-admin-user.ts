import { getPayload } from 'payload'
import config from '../payload.config'

async function createAdminUser() {
  try {
    const payload = await getPayload({ config })

    // Generate a strong password
    const password = Array.from({ length: 24 }, () => 
      'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*'
        [Math.floor(Math.random() * 66)]
    ).join('')

    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'atem@thefiresidetribe.com',
        password: password,
        name: 'Atem',
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('\n📧 Email:', 'atem@thefiresidetribe.com')
    console.log('🔑 Password:', password)
    console.log('\n🌐 Login at: http://localhost:3000/admin')
    console.log('\n⚠️  SAVE THESE CREDENTIALS - They will not be shown again!')

    process.exit(0)
  } catch (error: any) {
    if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
      console.log('ℹ️  Admin user already exists. Skipping creation.')
      process.exit(0)
    }
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
