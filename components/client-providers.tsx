'use client'

import { ContentProvider } from '@/lib/content-context'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ContentProvider>{children}</ContentProvider>
}
