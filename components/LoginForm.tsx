'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { loginSchema } from '@/schemas/auth'

type FieldErrors = {
  username?: string
  password?: string
  root?: string
}

export default function LoginForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const raw = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    const result = loginSchema.safeParse(raw)
    if (!result.success) {
      const fieldErrors: FieldErrors = {}
      for (const err of result.error.errors) {
        const field = err.path[0] as keyof FieldErrors
        if (field === 'username' || field === 'password') {
          fieldErrors[field] = err.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    const res = await signIn('credentials', {
      username: raw.username,
      password: raw.password,
      redirect: false,
    })
    setLoading(false)

    if (res?.error) {
      setErrors({ root: 'Invalid username or password.' })
    } else {
      router.push('/')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col gap-5"
    >
      {errors.root && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errors.root}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.username
              ? 'border-red-400 bg-red-50 focus:ring-red-400'
              : 'border-gray-300'
          }`}
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.password
              ? 'border-red-400 bg-red-50 focus:ring-red-400'
              : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
