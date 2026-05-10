export type Platform = 'linkedin' | 'email' | 'instagram' | 'facebook' | 'youtube' | 'blog'
export type DraftStatus = 'pending' | 'approved' | 'rejected' | 'published' | 'scheduled'
export type ContentType = 'post' | 'email_campaign' | 'article' | 'video_script' | 'caption'

export interface ContentDraft {
  id: string
  platform: Platform
  contentType: ContentType
  title: string
  body: string
  subject?: string
  hashtags?: string[]
  status: DraftStatus
  generatedAt: string
  scheduledFor?: string
  estimatedReach?: number
  wordCount: number
  topic: string
}

export interface AppConnection {
  id: string
  name: string
  slug: string
  status: 'connected' | 'disconnected' | 'error'
  description: string
  color: string
  lastSync?: string
  postsDelivered?: number
}
