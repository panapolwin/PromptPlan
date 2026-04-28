import Header from '@/components/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">{children}</div>
    </>
  )
}