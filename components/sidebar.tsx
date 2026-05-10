'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ListTodo, Sparkles, Calendar, Plug, Zap, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useContent } from "@/lib/content-context"

const navItems = [
  { href: "/dashboard",   label: "Dashboard",       icon: LayoutDashboard },
  { href: "/queue",       label: "Content Queue",    icon: ListTodo,  badge: true },
  { href: "/generate",    label: "Generate Content", icon: Sparkles },
  { href: "/calendar",    label: "Calendar",         icon: Calendar },
  { href: "/connections", label: "Connections",      icon: Plug },
]

export function Sidebar() {
  const pathname = usePathname()
  const { drafts } = useContent()
  const pendingCount = drafts.filter(d => d.status === 'pending').length

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Marketing Agent</p>
            <p className="text-xs text-slate-400 leading-tight">Web Search Professionals</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-xs text-slate-500 uppercase tracking-wider px-3 pt-2 pb-1 font-semibold">Agent Controls</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') ?? false)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && pendingCount > 0 && (
                <Badge className="bg-amber-500 text-white border-0 text-xs px-1.5 py-0 h-5 min-w-5 flex items-center justify-center">
                  {pendingCount}
                </Badge>
              )}
              {isActive && <ChevronRight className="w-3 h-3 text-white/60" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://cdn.galaxy.ai/user_34R2tVMraU0WscshCHXM3N1fxdF/9b4d233d5bc64ab2a20b972ce458f616.jpg"
                alt="Rudy McCormick"
                className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-green-500"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Rudy McCormick</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-green-400">AI Clone Active</p>
              </div>
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <div className="bg-slate-900/60 rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-slate-400">Voice</p>
              <p className="text-xs text-green-400 font-medium">Cloned</p>
            </div>
            <div className="bg-slate-900/60 rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs text-slate-400">Style</p>
              <p className="text-xs text-green-400 font-medium">Trained</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
