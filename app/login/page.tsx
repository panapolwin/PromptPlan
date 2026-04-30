import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/')

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pre POSN Grader</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
