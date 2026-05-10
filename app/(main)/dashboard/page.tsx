'use client'

export const dynamic = 'force-dynamic'

import { useContent } from "@/lib/content-context"
import { DraftCard } from "@/components/draft-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ListTodo, Sparkles, CheckCircle, TrendingUp, Mic, Brain, Pen,
  Users, ArrowRight, Zap
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function DashboardPage() {
  const { drafts } = useContent()
  const pending = drafts.filter(d => d.status === 'pending')
  const approved = drafts.filter(d => d.status === 'approved')
  const published = drafts.filter(d => d.status === 'published')
  const totalReach = drafts.filter(d => d.status === 'pending').reduce((s, d) => s + (d.estimatedReach || 0), 0)

  const today = format(new Date(), "EEEE, MMMM d")

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* Welcome header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm">{today}</p>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Good morning, Rudy 👋</h1>
          <p className="text-slate-600 mt-1">Your AI marketing agent has been busy. Here's what needs your attention.</p>
        </div>
        <Link href="/generate">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Generate Content
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Review', value: pending.length, icon: ListTodo, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', note: 'needs your approval' },
          { label: 'Approved', value: approved.length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', note: 'ready to publish' },
          { label: 'Est. Pending Reach', value: totalReach.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', note: 'people in queue' },
          { label: 'Total Drafted', value: drafts.length, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', note: 'all time' },
        ].map(stat => (
          <Card key={stat.label} className={`border ${stat.border} ${stat.bg}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending drafts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-slate-800">Pending Review</h2>
              {pending.length > 0 && (
                <Badge className="bg-amber-500 text-white border-0">{pending.length}</Badge>
              )}
            </div>
            <Link href="/queue">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-1 text-xs">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {pending.length === 0 ? (
            <Card className="border-dashed border-slate-200">
              <CardContent className="py-10 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-slate-600 font-medium">All caught up!</p>
                <p className="text-slate-400 text-sm mt-1">No content waiting for review.</p>
                <Link href="/generate">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    Generate New Content
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            pending.slice(0, 3).map(draft => (
              <DraftCard key={draft.id} draft={draft} />
            ))
          )}

          {pending.length > 3 && (
            <Link href="/queue">
              <Button variant="outline" className="w-full text-slate-600 border-slate-200 gap-2">
                <ListTodo className="w-4 h-4" />
                View {pending.length - 3} more pending drafts
              </Button>
            </Link>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* AI Clone Card */}
          <Card className="border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://cdn.galaxy.ai/user_34R2tVMraU0WscshCHXM3N1fxdF/9b4d233d5bc64ab2a20b972ce458f616.jpg"
                    alt="Rudy McCormick"
                    className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-green-400"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <Zap className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold">Rudy McCormick</p>
                  <p className="text-slate-400 text-xs">Web Search Professionals</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">AI Clone Online</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              {[
                { icon: Mic, label: 'Voice Clone', status: 'Active', id: 'Voice...c1749', ok: true },
                { icon: Brain, label: 'Writing Style', status: 'Trained', id: 'SMB Marketing Expert', ok: true },
                { icon: Pen, label: 'Persona', status: 'Active', id: 'Practitioner Voice', ok: true },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400 truncate">{item.id}</p>
                  </div>
                  <Badge className={item.ok ? "bg-green-100 text-green-700 border-0 text-xs" : "bg-red-100 text-red-700 border-0 text-xs"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Style DNA */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Style DNA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {[
                { label: 'Tone', value: 'Confident & Tactical' },
                { label: 'Voice', value: 'Practitioner (15+ yr exp)' },
                { label: 'Proof Style', value: 'Data & Client Stories' },
                { label: 'CTA Pattern', value: 'Low-friction offer' },
                { label: 'Niche', value: 'SMB / Local SEO / Ads' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-slate-700 font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {[
                { label: '✍️ LinkedIn Post', href: '/generate?platform=linkedin&type=post' },
                { label: '📧 Email Campaign', href: '/generate?platform=email&type=email_campaign' },
                { label: '📝 Blog Article', href: '/generate?platform=blog&type=article' },
                { label: '▶️ YouTube Script', href: '/generate?platform=youtube&type=video_script' },
              ].map(action => (
                <Link key={action.href} href={action.href}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-8">
                    {action.label}
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
