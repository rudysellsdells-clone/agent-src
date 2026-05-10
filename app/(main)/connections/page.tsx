'use client'

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { appConnections } from "@/lib/mock-data"
import { AppConnection } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plug, CheckCircle, AlertCircle, Zap, ArrowRight, ExternalLink,
  Globe, Mail, Users, Play, BarChart3, Share
} from "lucide-react"

const platformIcons: Record<string, React.ReactNode> = {
  linkedin: <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: '#0077B5' }}>in</div>,
  gmail: <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EA4335' }}><Mail className="w-4 h-4 text-white" /></div>,
  instagram: <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>IG</div>,
  youtube: <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FF0000' }}><Play className="w-4 h-4 text-white fill-white" /></div>,
  hubspot: <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FF7A59' }}><BarChart3 className="w-4 h-4 text-white" /></div>,
  facebook: <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1877F2' }}><span className="text-white font-bold text-sm">f</span></div>,
}

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<AppConnection[]>(appConnections)
  const [connecting, setConnecting] = useState<string | null>(null)

  const connectedCount = connections.filter(c => c.status === 'connected').length

  const handleConnect = async (id: string) => {
    setConnecting(id)
    // In production: this would call COMPOSIO_MANAGE_CONNECTIONS
    // For demo, we simulate a connection flow
    await new Promise(r => setTimeout(r, 1500))
    setConnections(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'connected' as const, lastSync: new Date().toISOString(), postsDelivered: 0 } : c
    ))
    setConnecting(null)
  }

  const handleDisconnect = (id: string) => {
    setConnections(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'disconnected' as const, lastSync: undefined } : c
    ))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">App Connections</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Connect your platforms so your agent can publish approved content automatically.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-800">{connectedCount}/{connections.length}</div>
          <div className="text-xs text-slate-500">platforms connected</div>
        </div>
      </div>

      {/* Connection status bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-slate-600">Connection Progress</p>
          <p className="text-xs text-slate-400">{connectedCount} of {connections.length}</p>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(connectedCount / connections.length) * 100}%` }}
          />
        </div>
        {connectedCount === 0 && (
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Connect at least one platform to start publishing approved content.
          </p>
        )}
        {connectedCount > 0 && connectedCount < connections.length && (
          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {connectedCount} platform{connectedCount > 1 ? 's' : ''} ready for publishing.
          </p>
        )}
        {connectedCount === connections.length && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            All platforms connected — your agent is fully operational!
          </p>
        )}
      </div>

      {/* Platform cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {connections.map(conn => {
          const isConnecting = connecting === conn.id
          const isConnected = conn.status === 'connected'

          return (
            <Card
              key={conn.id}
              className={`border transition-all ${
                isConnected
                  ? 'border-green-200 bg-green-50/30'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    {platformIcons[conn.slug] || (
                      <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 text-sm">{conn.name}</h3>
                      <Badge
                        className={
                          isConnected
                            ? "bg-green-100 text-green-700 border-0 text-xs"
                            : "bg-slate-100 text-slate-500 border-0 text-xs"
                        }
                      >
                        {isConnected ? '✓ Connected' : 'Not connected'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">{conn.description}</p>

                    {isConnected && conn.postsDelivered !== undefined && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-green-600">{conn.postsDelivered} posts delivered</span>
                        {conn.lastSync && (
                          <span className="text-xs text-slate-400">· Connected just now</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  {!isConnected ? (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(conn.id)}
                      disabled={isConnecting}
                      className="flex-1 text-white text-xs gap-1.5"
                      style={{ background: conn.color }}
                    >
                      {isConnecting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Plug className="w-3 h-3" />
                          Connect {conn.name}
                        </>
                      )}
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs border-green-200 text-green-700 hover:bg-green-50 gap-1.5"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDisconnect(conn.id)}
                        className="text-xs text-slate-400 hover:text-red-500"
                      >
                        Disconnect
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* How it works */}
      <Card className="border-slate-200 bg-slate-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            How Publishing Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {[
            { step: '1', title: 'Agent Drafts Content', desc: 'Your AI clone writes in your voice across all platforms' },
            { step: '2', title: 'You Review & Approve', desc: 'Every draft hits your queue — nothing publishes without your OK' },
            { step: '3', title: 'Agent Publishes', desc: 'Approved content posts to connected platforms automatically' },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
