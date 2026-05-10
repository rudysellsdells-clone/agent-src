import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"

const ClientProviders = dynamic(
  () => import("@/components/client-providers").then((m) => m.ClientProviders),
  { ssr: false }
)

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Marketing Agent - Web Search Professionals",
  description: "Rudy McCormick AI-powered marketing agent dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
