'use client'

export const dynamic = 'force-dynamic'

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useContent, generateDraft } from "@/lib/content-context"
import { Platform, ContentType, ContentDraft } from "@/types"
import { DraftCard } from "@/components/draft-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Brain, Mic, Pen, ArrowRight, CheckCircle, Loader2, Lightbulb } from "lucide-react"
import Link from "next/link"

const platformOptions: { value: Platform; label: string; emoji: string; types: { value: ContentType; label: string }[] }[] = [
  {
    value: 'linkedin', label: 'LinkedIn', emoji: '💼',
    types: [{ value: 'post', label: 'Thought Leadership Post' }]
  },
  {
    value: 'email', label: 'Email Campaign', emoji: '📧',
    types: [{ value: 'email_campaign', label: 'Email Campaign' }]
  },
  {
    value: 'blog', label: 'Blog Article', emoji: '📝',
    types: [{ value: 'article', label: 'Long-Form Article' }]
  },
  {
    value: 'instagram', label: 'Instagram', emoji: '📸',
    types: [{ value: 'caption', label: 'Caption & Hashtags' }]
  },
  {
    value: 'youtube', label: 'YouTube', emoji: '▶️',
    types: [{ value: 'video_script', label: 'Video Script' }]
  },
]

const topicIdeas = [
  'Why most SMBs waste their Google Ads budget',
  'Local SEO checklist for new businesses',
  'How to get your first 50 Google reviews',
  '3 email sequences every service business needs',
  'Why Quality Score matters more than budget',
  'Link building without paid tools',
  'Google Business Profile optimization tips',
  'Marketing automation for HVAC / dental / legal',
]

function GenerateForm() {
  const searchParams = useSearchParams()
  const { addDraft } = useContent()

  const [platform, setPlatform] = useState<Platform>((searchParams?.get('platform') as Platform) || 'linkedin')
  const [contentType, setContentType] = useState<ContentType>((searchParams?.get('type') as ContentType) || 'post')
  const [topic, setTopic] = useState('')
  const [goal, setGoal] = useState('')
  const [audience, setAudience] = useState('small and medium businesses')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState<ContentDraft | null>(null)
  const [added, setAdded] = useState(false)

  const selectedPlatform = platformOptions.find(p => p.value === platform)

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setIsGenerating(true)
    setGenerated(null)
    setAdded(false)
    await new Promise(r => setTimeout(r, 1800))
    const draft = generateDraft(platform, contentType, topic, goal, audience)
    setGenerated(draft)
    setIsGenerating(false)
  }

  const handleAddToQueue = () => {
    if (!generated) return
    addDraft(generated)
    setAdded(true)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Generate Content</h1>
        <p className="text-slate-500 text-sm mt-0.5">Your AI clone will write this in your voice — tactical, direct, and data-backed.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-5">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                Content Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Platform */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Platform</Label>
                <div className="grid grid-cols-3 gap-2">
                  {platformOptions.map(p => (
                    <button
                      key={p.value}
                      onClick={() => {
                        setPlatform(p.value)
                        setContentType(p.types[0].value)
                      }}
                      className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                        platform === p.value
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <span className="text-base">{p.emoji}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Topic / Theme *</Label>
                <Input
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. Why local SEO beats paid ads for most SMBs"
                  className="border-slate-200 text-sm"
                />
              </div>

              {/* Goal */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Goal (optional)</Label>
                <Input
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  placeholder="e.g. Book a free audit call, build authority..."
                  className="border-slate-200 text-sm"
                />
              </div>

              {/* Audience */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-600">Target Audience</Label>
                <Input
                  value={audience}
                  onChange={e => setAudience(e.target.value)}
                  placeholder="e.g. dental practices, HVAC companies..."
                  className="border-slate-200 text-sm"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Your clone is writing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Draft
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Topic ideas */}
          <Card className="border-slate-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Topic Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0">
              {topicIdeas.map(idea => (
                <button
                  key={idea}
                  onClick={() => setTopic(idea)}
                  className="w-full text-left text-xs text-amber-800 hover:text-amber-900 hover:bg-amber-100 rounded-lg px-2 py-1.5 transition-colors"
                >
                  → {idea}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-4">
          {/* Clone Status */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-800 to-slate-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn.galaxy.ai/user_34R2tVMraU0WscshCHXM3N1fxdF/9b4d233d5bc64ab2a20b972ce458f616.jpg"
                  alt="Rudy"
                  className="w-12 h-12 rounded-full object-cover object-top ring-2 ring-green-400"
                />
                <div>
                  <p className="text-white text-sm font-semibold">Rudy's AI Writing Clone</p>
                  <p className="text-slate-400 text-xs">Trained on 15+ years of marketing expertise</p>
                  <div className="flex items-center gap-3 mt-2">
                    {[
                      { icon: Mic, label: 'Voice' },
                      { icon: Brain, label: 'Style' },
                      { icon: Pen, label: 'Persona' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-1">
                        <item.icon className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">{item.label} ✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated draft */}
          {isGenerating && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="py-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-blue-700 font-medium">Writing in Rudy's voice...</span>
                </div>
                <p className="text-blue-500 text-xs">Applying tactical, data-backed, practitioner tone</p>
              </CardContent>
            </Card>
          )}

          {generated && !isGenerating && (
            <div className="space-y-3">
              <DraftCard draft={generated} expanded />

              {!added ? (
                <Button
                  onClick={handleAddToQueue}
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Add to Queue
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-green-50 border border-green-200 rounded-lg py-2.5 px-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Added to queue</span>
                  </div>
                  <Link href="/queue">
                    <Button variant="outline" size="sm" className="gap-1.5 border-slate-200">
                      View Queue <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {!generated && !isGenerating && (
            <Card className="border-dashed border-slate-200">
              <CardContent className="py-16 text-center">
                <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Your draft will appear here</p>
                <p className="text-slate-400 text-sm mt-1">Fill in the brief and click Generate</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-500">Loading...</div>}>
      <GenerateForm />
    </Suspense>
  )
}
