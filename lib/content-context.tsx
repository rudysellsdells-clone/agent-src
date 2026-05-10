'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { ContentDraft, DraftStatus, Platform, ContentType } from '@/types'
import { initialDrafts } from '@/lib/mock-data'

interface ContentContextType {
  drafts: ContentDraft[]
  updateStatus: (id: string, status: DraftStatus) => void
  updateBody: (id: string, body: string) => void
  addDraft: (draft: ContentDraft) => void
  deleteDraft: (id: string) => void
}

const ContentContext = createContext<ContentContextType | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<ContentDraft[]>(initialDrafts)

  const updateStatus = useCallback((id: string, status: DraftStatus) => {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, status } : d))
  }, [])

  const updateBody = useCallback((id: string, body: string) => {
    setDrafts(prev => prev.map(d => d.id === id ? {
      ...d, body, wordCount: body.split(/\s+/).filter(Boolean).length
    } : d))
  }, [])

  const addDraft = useCallback((draft: ContentDraft) => {
    setDrafts(prev => [draft, ...prev])
  }, [])

  const deleteDraft = useCallback((id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id))
  }, [])

  return (
    <ContentContext.Provider value={{ drafts, updateStatus, updateBody, addDraft, deleteDraft }}>
      {children}
    </ContentContext.Provider>
  )
}

// Safe default for SSR — actual data hydrates on client
const defaultContext: ContentContextType = {
  drafts: [],
  updateStatus: () => {},
  updateBody: () => {},
  addDraft: () => {},
  deleteDraft: () => {},
}

export function useContent(): ContentContextType {
  try {
    const ctx = useContext(ContentContext)
    if (!ctx) return defaultContext
    return ctx
  } catch {
    return defaultContext
  }
}

// ── Content generator ──────────────────────────────────────────
function goalLine(goal: string, fallback: string): string {
  return goal ? goal + '.' : fallback
}

export function generateDraft(
  platform: Platform,
  contentType: ContentType,
  topic: string,
  goal: string,
  audience: string
): ContentDraft {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const t = topic.toLowerCase()
  const aud = audience || 'small businesses'

  const isSEO  = t.includes('seo') || t.includes('rank') || t.includes('google') || t.includes('search')
  const isAds  = t.includes('ad') || t.includes('ppc') || t.includes('paid')
  const isAuto = t.includes('automat') || t.includes('workflow') || t.includes('funnel')
  const isLocal = t.includes('local') || t.includes('near me') || t.includes('map')

  const title = topic.charAt(0).toUpperCase() + topic.slice(1)
  let body = ''
  let subject: string | undefined

  if (platform === 'linkedin' || platform === 'instagram') {
    if (isAds) {
      body = [
        "Here's something most agencies won't tell you about " + topic + ":",
        "",
        "A high Quality Score beats a high budget every single time.",
        "",
        "After 15+ years helping " + aud + ", the pattern is always the same:",
        "- Fix ad relevance first (your headline has to match the intent)",
        "- Make sure your landing page delivers on the ad's promise",
        "- Then -- and only then -- scale your budget",
        "",
        "One client dropped CPL by 37% in 6 weeks without touching their spend.",
        "",
        goalLine(goal, 'My goal is always ROI, not vanity metrics.'),
        "",
        'DM me "AUDIT" and I\'ll send the framework over.',
        "",
        "-- Rudy",
        "#GoogleAds #PaidSearch #SMBMarketing #WebSearchProfessionals"
      ].join('\n')
    } else if (isLocal || isSEO) {
      body = [
        "Stop overthinking " + topic + ".",
        "",
        "I've been doing digital marketing for " + aud + " for 15+ years, and I keep seeing the same mistake:",
        "chasing tactics instead of nailing fundamentals.",
        "",
        "The 3-thing framework that actually works right now:",
        "",
        "1. Google Business Profile -- optimized completely, photos weekly, posts every week",
        "2. 10-20 locally relevant backlinks -- Chamber of Commerce, local news, community orgs",
        "3. Intent-matched content -- answer the exact questions your customers Google before calling you",
        "",
        "A Wisconsin client went from page 3 to position #1 in 90 days using exactly this.",
        "",
        goalLine(goal, 'Just fundamentals, done right.'),
        "",
        "Drop a comment or DM me if you want the full checklist.",
        "",
        "-- Rudy",
        "#LocalSEO #SMBMarketing #WebSearchProfessionals"
      ].join('\n')
    } else if (isAuto) {
      body = [
        "Most " + aud + " think marketing automation is for big companies.",
        "",
        "It isn't.",
        "",
        "I just helped a 4-person service business set up a 3-step email sequence that:",
        "- Follows up with every lead within 5 minutes",
        "- Sends a value-add tip 7 days later",
        "- Asks for a review 30 days after service",
        "",
        "Results in 90 days:",
        "- Close rate up 31%",
        "- Reviews went from 8 to 44",
        "- Zero additional ad spend",
        "",
        "They set it up once. It runs while they're working.",
        "",
        goalLine(goal, "Stop doing manually what a $49/month tool can do better."),
        "",
        'Comment "AUTOMATE" if you want the tool stack.',
        "",
        "-- Rudy",
        "#MarketingAutomation #SMBMarketing #EmailMarketing #WebSearchProfessionals"
      ].join('\n')
    } else {
      body = [
        "Here's what 15 years of digital marketing for " + aud + " has taught me about " + topic + ":",
        "",
        "Most advice is written for big brands with big budgets. It doesn't translate.",
        "",
        "What actually works:",
        "1. Own your local market before trying to go regional",
        "2. One channel done really well beats five channels done mediocrely",
        "3. The best-performing content answers the question your customer Googles at 11pm",
        "",
        goalLine(goal, 'The goal is always ROI -- not impressions, not followers.'),
        "",
        "What's the biggest digital marketing challenge you're running into right now?",
        "",
        "-- Rudy",
        "#DigitalMarketing #SMBMarketing #WebSearchProfessionals"
      ].join('\n')
    }
  } else if (platform === 'email') {
    subject = isAds
      ? "Your Google Ads are probably wasting money -- here's a free check"
      : isSEO
      ? "Is your website invisible on Google? Let's find out."
      : "One thing " + aud + " get wrong about " + topic
    body = [
      "Hi [First Name],",
      "",
      "I'll keep this short.",
      "",
      topic + " -- I see " + aud + " struggle with this constantly, and it's almost always the same root cause: skipping the fundamentals.",
      "",
      goalLine(goal, "I have a clear path for you -- no fluff, no long-term contracts."),
      "",
      "This month I'm opening 5 spots for a complimentary 30-minute strategy session:",
      "- We review your current setup (no prep needed)",
      "- I tell you exactly where you're leaking leads",
      "- You leave with 3 actions you can take this week",
      "",
      "[Book Your Free Strategy Session]",
      "",
      "Talk soon,",
      "Rudy McCormick",
      "Web Search Professionals"
    ].join('\n')
  } else if (platform === 'blog') {
    body = [
      "If you've been struggling with " + topic + ", you're not alone -- and it's probably not your fault.",
      "",
      "Most advice out there is written for enterprise companies with dedicated marketing teams.",
      "It doesn't translate to the reality of running " + aud + ".",
      "",
      "I've spent 15 years helping Wisconsin businesses grow online, and I want to share what actually works.",
      "",
      "## Why " + topic + " matters more than ever in 2025",
      "",
      "The landscape has shifted. " + aud + " that ignore this are increasingly invisible to customers looking for them right now.",
      "",
      "## The 3 things that actually move the needle",
      "",
      "1. Start with what's already working -- audit what you have before adding new tactics",
      "2. Focus on intent, not just traffic -- getting the RIGHT people matters more than volume",
      "3. Measure what matters -- leads, calls, appointments, revenue. Not vanity metrics.",
      "",
      "## Where to go from here",
      "",
      goalLine(goal, "If you want to go deeper, I offer a complimentary 30-minute strategy session. No pitch -- just clarity."),
      "",
      "[Schedule your free session]",
      "",
      "-- Rudy McCormick, Web Search Professionals"
    ].join('\n')
  } else if (platform === 'youtube') {
    body = [
      "[HOOK -- 0:00-0:15]",
      '"[Open with the single most surprising truth about ' + topic + ']"',
      "",
      "[INTRO -- 0:15-0:45]",
      '"Hey, I\'m Rudy McCormick from Web Search Professionals. I\'ve helped ' + aud + ' with ' + topic + ' for over 15 years."',
      "",
      "[SECTION 1: The core problem -- 0:45-3:00]",
      "- Why most people get " + topic + " wrong",
      "- What it actually costs when done poorly",
      "- Real example from a recent client",
      "",
      "[SECTION 2: The 3-part framework -- 3:00-6:00]",
      "- Step 1: Foundation -- get the basics locked in",
      "- Step 2: Acceleration -- the move most people skip",
      "- Step 3: Automation -- make it run without you",
      "",
      "[SECTION 3: Quick win -- 6:00-7:30]",
      "- One thing you can do this week",
      "- What result to expect and when",
      "",
      "[CTA -- 7:30-8:00]",
      '"' + goalLine(goal, "Grab the free resource in the description.") + ' Leave a comment with your biggest question."'
    ].join('\n')
  }

  return {
    id, platform, contentType, title, body, subject,
    status: 'pending', generatedAt: now,
    wordCount: body.split(/\s+/).filter(Boolean).length,
    topic,
    estimatedReach: platform === 'linkedin' ? Math.floor(Math.random() * 3000) + 1500
      : platform === 'email'    ? Math.floor(Math.random() * 600) + 300
      : platform === 'youtube'  ? Math.floor(Math.random() * 4000) + 2000
      : Math.floor(Math.random() * 2000) + 800,
  }
}
