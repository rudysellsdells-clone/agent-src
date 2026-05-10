'use client'

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { useContent } from "@/lib/content-context"
import { DraftCard } from "@/components/draft-card"
import { PlatformBadge } from "@/components/platform-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Platform, DraftStatus } from "@/types"
import { Search, Filter, CheckCheck, XCircle } from "lucide-react"
import Link from "next/link"

const platforms: { value: Platform | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '📋' },
  { value: 'linkedin', label: 'LinkedIn', emoji: '💼' },
  { value: 'email', label: 'Email', emoji: '📧' },
  { value: 'instagram', label: 'Instagram', emoji: '📸' },
  { value: 'youtube', label: 'YouTube', emoji: '▶️' },
  { value: 'blog', label: 'Blog', emoji: '📝' },
]

const statuses: { value: DraftStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'published', label: 'Published' },
]

export default function QueuePage() {
  const { drafts, updateStatus } = useContent()
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<DraftStatus | 'all'>('pending')
  const [search, setSearch] = useState('')

  const filtered = drafts.filter(d => {
    const matchPlatform = platformFilter === 'all' || d.platform === platformFilter
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.body.toLowerCase().includes(search.toLowerCase()) || d.topic.toLowerCase().includes(search.toLowerCase())
    return matchPlatform && matchStatus && matchSearch
  })

  const pendingCount = drafts.filter(d => d.status === 'pending').length

  const approveAll = () => {
    filtered.filter(d => d.status === 'pending').forEach(d => updateStatus(d.id, 'approved'))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Queue</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {pendingCount} draft{pendingCount !== 1 ? 's' : ''} waiting for your review
          </p>
        </div>
        <div className="flex gap-2">
          {filtered.filter(d => d.status === 'pending').length > 0 && (
            <Button
              onClick={approveAll}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Approve All Visible
            </Button>
          )}
          <Link href="/generate">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
              + Generate New
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search drafts by topic, title, or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-white border-slate-200"
          />
        </div>

        {/* Platform filter */}
        <div className="flex flex-wrap gap-2">
          {platforms.map(p => (
            <button
              key={p.value}
              onClick={() => setPlatformFilter(p.value as Platform | 'all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                platformFilter === p.value
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{p.emoji}</span>
              {p.label}
              {p.value !== 'all' && (
                <span className={`ml-0.5 ${platformFilter === p.value ? 'text-slate-300' : 'text-slate-400'}`}>
                  {drafts.filter(d => d.platform === p.value).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value as DraftStatus | 'all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {s.label}
              {s.value !== 'all' && (
                <span className="ml-1.5 opacity-70">
                  {drafts.filter(d => d.status === s.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 font-medium">No drafts match your filters</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-medium">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
          {filtered.map(draft => (
            <DraftCard key={draft.id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  )
}
