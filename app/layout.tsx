import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'PromptPlan',
  description: 'PromptPlan application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
