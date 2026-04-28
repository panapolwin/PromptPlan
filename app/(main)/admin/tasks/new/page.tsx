import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import NewTaskForm from '@/components/NewTaskForm'

export default async function NewTaskPage() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/')

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Task</h1>
      <NewTaskForm />
    </main>
  )
}