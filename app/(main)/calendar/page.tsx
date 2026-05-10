'use client'

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { useContent } from "@/lib/content-context"
import { PlatformBadge } from "@/components/platform-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle } from "lucide-react"
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameMonth, isToday, addMonths, subMonths, isSameDay, addDays
} from "date-fns"
import { ContentDraft, Platform } from "@/types"
import { cn } from "@/lib/utils"

const platformDots: Record<Platform, string> = {
  linkedin: 'bg-blue-500',
  email: 'bg-red-500',
  instagram: 'bg-pink-500',
  facebook: 'bg-blue-700',
  youtube: 'bg-red-600',
  blog: 'bg-indigo-500',
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const { drafts } = useContent()

  // Distribute content across calendar days for display
  const approvedDrafts = drafts.filter(d => d.status === 'approved' || d.status === 'scheduled')
  const today = new Date()

  // Assign each approved draft to a day (spread across next 14 days)
  const calendarItems: { date: Date; draft: ContentDraft }[] = approvedDrafts.map((draft, i) => ({
    date: addDays(today, i * 2 + 1),
    draft,
  }))

  // Also add a few "published" past items
  const pastItems: { date: Date; draft: ContentDraft }[] = drafts
    .filter(d => d.status === 'rejected')
    .slice(0, 1)
    .map((draft, i) => ({
      date: addDays(today, -(i + 3)),
      draft: { ...draft, status: 'published' as const },
    }))

  const allItems = [...calendarItems, ...pastItems]

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad start with empty days
  const startDow = monthStart.getDay()
  const paddedDays: (Date | null)[] = [...Array(startDow).fill(null), ...days]

  const getDayItems = (day: Date) =>
    allItems.filter(item => isSameDay(item.date, day))

  const selectedItems = selectedDay ? getDayItems(selectedDay) : []

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Calendar</h1>
          <p className="text-slate-500 text-sm mt-0.5">Scheduled and approved content overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(m => subMonths(m, 1))} className="border-slate-200">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-semibold text-slate-700 min-w-28 text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(m => addMonths(m, 1))} className="border-slate-200">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {(Object.entries(platformDots) as [Platform, string][]).map(([p, dot]) => (
          <div key={p} className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Calendar grid */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200">
            <CardContent className="p-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-lg overflow-hidden">
                {paddedDays.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} className="bg-white h-14" />
                  const items = getDayItems(day)
                  const isSelected = selectedDay && isSameDay(day, selectedDay)
                  const isCurrent = isToday(day)
                  const isCurrentMonth = isSameMonth(day, currentMonth)

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDay(isSelected ? null : day)}
                      className={cn(
                        "bg-white h-14 p-1 flex flex-col items-start transition-all text-left",
                        !isCurrentMonth && "opacity-40",
                        isSelected && "bg-blue-50 ring-2 ring-inset ring-blue-500",
                        !isSelected && "hover:bg-slate-50"
                      )}
                    >
                      <span className={cn(
                        "text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full",
                        isCurrent ? "bg-blue-600 text-white" : "text-slate-700"
                      )}>
                        {format(day, 'd')}
                      </span>
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {items.slice(0, 3).map(item => (
                          <div
                            key={item.draft.id}
                            className={cn("w-1.5 h-1.5 rounded-full", platformDots[item.draft.platform])}
                          />
                        ))}
                        {items.length > 3 && (
                          <span className="text-xs text-slate-400">+{items.length - 3}</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day detail */}
        <div className="space-y-3">
          {selectedDay ? (
            <>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h2 className="font-semibold text-slate-800 text-sm">
                  {format(selectedDay, 'EEEE, MMMM d')}
                </h2>
              </div>
              {selectedItems.length === 0 ? (
                <Card className="border-dashed border-slate-200">
                  <CardContent className="py-8 text-center">
                    <p className="text-slate-400 text-sm">Nothing scheduled</p>
                    <p className="text-slate-300 text-xs mt-1">Approve content to schedule it</p>
                  </CardContent>
                </Card>
              ) : (
                selectedItems.map(item => (
                  <Card key={item.draft.id} className="border-slate-200">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <PlatformBadge platform={item.draft.platform} size="sm" />
                        <Badge className={
                          item.draft.status === 'published'
                            ? "bg-green-100 text-green-700 border-0 text-xs"
                            : "bg-purple-100 text-purple-700 border-0 text-xs"
                        }>
                          {item.draft.status === 'published' ? '✓ Published' : 'Scheduled'}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-slate-700 leading-tight">
                        {item.draft.subject || item.draft.title}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.draft.body.substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          ) : (
            <Card className="border-dashed border-slate-200">
              <CardContent className="py-10 text-center">
                <Calendar className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Select a day</p>
                <p className="text-slate-300 text-xs mt-1">to see scheduled content</p>
              </CardContent>
            </Card>
          )}

          {/* Month summary */}
          <Card className="border-slate-200 bg-slate-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate-600">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {[
                { label: 'Scheduled', value: calendarItems.length, color: 'text-purple-600' },
                { label: 'Published', value: pastItems.length, color: 'text-green-600' },
                { label: 'Pending Approval', value: drafts.filter(d => d.status === 'pending').length, color: 'text-amber-600' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-slate-500">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
