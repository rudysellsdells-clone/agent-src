'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Something went wrong</h1>
        <button 
          onClick={reset} 
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
