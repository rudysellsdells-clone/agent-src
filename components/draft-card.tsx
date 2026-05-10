'use client'

import { useState } from "react"
import { ContentDraft } from "@/types"
import { useContent } from "@/lib/content-context"
import { PlatformBadge } from "./platform-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Edit, RotateCcw, Clock, Users, FileText, ChevronDown, ChevronUp, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

const statusConfig = {
  pending:   { label: 'Pending Review', color: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-500' },
  approved:  { label: 'Approved',        color: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
  rejected:  { label: 'Rejected',        color: 'bg-red-100 text-red-700',      dot: 'bg-red-500' },
  published: { label: 'Published',       color: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500' },
  scheduled: { label: 'Scheduled',       color: 'bg-purple-100 text-purple-700',dot: 'bg-purple-500' },
}

interface DraftCardProps {
  draft: ContentDraft
  expanded?: boolean
}

export function DraftCard({ draft, expanded: defaultExpanded = false }: DraftCardProps) {
  const { updateStatus, updateBody, deleteDraft } = useContent()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(draft.body)

  const cfg = statusConfig[draft.status]

  const handleSaveEdit = () => {
    updateBody(draft.id, editText)
    setIsEditing(false)
  }

  const relativeTime = formatDistanceToNow(new Date(draft.generatedAt), { addSuffix: true })

  return (
    <Card className={cn(
      "border transition-all duration-200",
      draft.status === 'pending'   && "border-slate-200 hover:border-slate-300 hover:shadow-md",
      draft.status === 'approved'  && "border-green-200 bg-green-50/30",
      draft.status === 'rejected'  && "border-red-100 bg-red-50/20 opacity-75",
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <PlatformBadge platform={draft.platform} size="sm" />
              <span className={cn("inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium", cfg.color)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                {cfg.label}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm leading-tight">
              {draft.subject ? draft.subject : draft.title}
            </h3>
          </div>
          <button onClick={() => setIsExpanded(v => !v)} className="text-slate-400 hover:text-slate-600 shrink-0">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relativeTime}</span>
          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{draft.wordCount} words</span>
          {draft.estimatedReach && (
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{draft.estimatedReach.toLocaleString()} est. reach</span>
          )}
        </div>

        <div className="mt-3">
          {isExpanded ? (
            isEditing ? (
              <div className="space-y-2">
                <Textarea value={editText} onChange={e => setEditText(e.target.value)} className="text-sm min-h-48 font-mono" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setIsEditing(false); setEditText(draft.body) }}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto border border-slate-100">
                {draft.body}
              </div>
            )
          ) : (
            <p className="text-sm text-slate-600 line-clamp-2">
              {draft.body.replace(/\n+/g, ' ').substring(0, 160)}...
            </p>
          )}
        </div>

        {draft.status === 'pending' && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <Button size="sm" onClick={() => updateStatus(draft.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white flex-1 gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Approve
            </Button>
            <Button size="sm" onClick={() => setIsEditing(true)} variant="outline" className="gap-1.5 border-slate-200">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Button>
            <Button size="sm" onClick={() => updateStatus(draft.id, 'rejected')} variant="outline" className="gap-1.5 border-red-200 text-red-600 hover:bg-red-50">
              <XCircle className="w-3.5 h-3.5" /> Reject
            </Button>
          </div>
        )}

        {draft.status === 'approved' && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-green-100">
            <div className="flex-1 text-xs text-green-700 font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Approved - ready to publish
            </div>
            <Button size="sm" variant="ghost" onClick={() => updateStatus(draft.id, 'pending')} className="text-xs text-slate-500 gap-1">
              <RotateCcw className="w-3 h-3" /> Undo
            </Button>
          </div>
        )}

        {draft.status === 'rejected' && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-red-100">
            <Button size="sm" variant="ghost" onClick={() => updateStatus(draft.id, 'pending')} className="text-xs text-slate-500 gap-1">
              <RotateCcw className="w-3 h-3" /> Restore
            </Button>
            <Button size="sm" variant="ghost" onClick={() => deleteDraft(draft.id)} className="text-xs text-red-500 gap-1 ml-auto">
              <Trash className="w-3 h-3" /> Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
