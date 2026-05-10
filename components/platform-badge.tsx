import { cn } from "@/lib/utils"
import { Platform } from "@/types"

const platformConfig: Record<Platform, { label: string; color: string; bg: string; abbr: string }> = {
  linkedin: { label: 'LinkedIn', color: 'text-blue-700', bg: 'bg-blue-100', abbr: 'LI' },
  email:    { label: 'Email',    color: 'text-red-700',  bg: 'bg-red-100',  abbr: 'EM' },
  instagram:{ label: 'Instagram',color: 'text-pink-700', bg: 'bg-pink-100', abbr: 'IG' },
  facebook: { label: 'Facebook', color: 'text-blue-800', bg: 'bg-blue-100', abbr: 'FB' },
  youtube:  { label: 'YouTube',  color: 'text-red-700',  bg: 'bg-red-100',  abbr: 'YT' },
  blog:     { label: 'Blog',     color: 'text-indigo-700',bg:'bg-indigo-100',abbr: 'BL' },
}

interface PlatformBadgeProps {
  platform: Platform
  size?: 'sm' | 'md'
}

export function PlatformBadge({ platform, size = 'md' }: PlatformBadgeProps) {
  const cfg = platformConfig[platform]
  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-medium rounded-full",
      cfg.bg, cfg.color,
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
    )}>
      <span className="font-bold text-xs">{cfg.abbr}</span>
      {cfg.label}
    </span>
  )
}

export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    linkedin: '#0077B5',
    email: '#EA4335',
    instagram: '#E4405F',
    facebook: '#1877F2',
    youtube: '#FF0000',
    blog: '#6366F1',
  }
  return colors[platform]
}
