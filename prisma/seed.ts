import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const users = [
    { username: 'alice', password: 'password123', role: 'USER' },
    { username: 'bob', password: 'secret456', role: 'USER' },
    { username: 'pj', password: '123456', role: 'ADMIN' },
  ]

  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, 10)
    await prisma.user.upsert({
      where: { username: u.username },
      update: { passwordHash, role: u.role },
      create: { username: u.username, passwordHash, role: u.role },
    })
  }

  console.log('Seeded: alice (user), bob (user), pj (admin)')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())