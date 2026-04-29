import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import NewUserForm from '@/components/NewUserForm'

export default async function NewUserPage() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New User</h1>
      <NewUserForm />
    </main>
  )
}