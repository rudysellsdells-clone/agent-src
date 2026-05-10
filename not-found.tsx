export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
        <p className="text-slate-500 text-lg mb-6">Page not found</p>
        <a href="/" className="text-blue-600 hover:underline">Go to Dashboard</a>
      </div>
    </div>
  )
}
