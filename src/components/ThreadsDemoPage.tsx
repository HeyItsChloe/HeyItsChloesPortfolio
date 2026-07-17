import { useRef, useState } from 'react'
import DemoShell from './DemoShell'
import { initialThreads, type DemoThread } from '../data/threadsDemo'

function Badge({ type }: { type: DemoThread['type'] }) {
  return type === 'mention' ? (
    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
      You were mentioned
    </span>
  ) : (
    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#b3b3b3]">
      New reply
    </span>
  )
}

export default function ThreadsDemoPage() {
  const [threads, setThreads] = useState<DemoThread[]>(initialThreads)
  const [muted, setMuted] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<string | null>(null)
  const [undoThread, setUndoThread] = useState<DemoThread | null>(null)
  const undoTimer = useRef<ReturnType<typeof setTimeout>>()

  const active = threads.filter((t) => !t.resolved)
  const archived = threads.filter((t) => t.resolved)
  const unreadMentions = active.filter((t) => t.type === 'mention').length

  const toggleMute = (id: string) => {
    setMuted((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const resolveThread = (thread: DemoThread) => {
    setThreads((prev) => prev.map((t) => (t.id === thread.id ? { ...t, resolved: true } : t)))
    setUndoThread(thread)
    clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => setUndoThread(null), 5000)
  }

  const undoResolve = () => {
    if (!undoThread) return
    setThreads((prev) => prev.map((t) => (t.id === undoThread.id ? { ...t, resolved: false } : t)))
    setUndoThread(null)
    clearTimeout(undoTimer.current)
  }

  return (
    <DemoShell caseStudyId="case-study-launch" title="Threads activity feed — demo">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-panel text-sm font-bold">
          🔔
        </div>
        <span className="text-sm text-[#b3b3b3]">
          {unreadMentions} unresolved mention{unreadMentions === 1 ? '' : 's'}
        </span>
      </div>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-[2px] text-[#b3b3b3]">Active</h2>
      <div className="mb-10 space-y-2">
        {active.length === 0 && (
          <p className="text-sm text-[#6c6c6c]">All caught up — nothing active.</p>
        )}
        {active.map((thread) => {
          const isOpen = expanded === thread.id
          const isMuted = muted.has(thread.id)
          return (
            <div key={thread.id} className="rounded-md border border-white/10 bg-panel">
              <button
                onClick={() => setExpanded(isOpen ? null : thread.id)}
                className="flex w-full items-start justify-between gap-4 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white">{thread.channel}</span>
                    <Badge type={thread.type} />
                    {isMuted && (
                      <span className="text-[11px] uppercase tracking-wide text-[#6c6c6c]">Muted</span>
                    )}
                  </div>
                  <p className="truncate text-[13px] text-[#d2d2d2]">
                    {thread.messages[thread.messages.length - 1].text}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-[#6c6c6c]">{thread.lastActivity}</span>
              </button>

              {isOpen && (
                <div className="border-t border-white/10 px-4 py-3">
                  <div className="mb-3 rounded-md bg-white/5 px-3 py-2 text-[13px] leading-relaxed text-[#d2d2d2]">
                    <span className="mr-1 font-bold text-accent">AI summary —</span>
                    {thread.summary}
                  </div>
                  <div className="mb-3 space-y-2">
                    {thread.messages.map((m, i) => (
                      <p key={i} className="text-[13px] leading-relaxed text-[#b3b3b3]">
                        <span className="font-bold text-white">{m.author}</span>{' '}
                        <span className="text-[11px] text-[#6c6c6c]">{m.time}</span> — {m.text}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => resolveThread(thread)}
                      className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10"
                    >
                      Mark resolved
                    </button>
                    <button
                      onClick={() => toggleMute(thread.id)}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-[#b3b3b3] hover:bg-white/10"
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-[2px] text-[#b3b3b3]">Archived</h2>
      <div className="space-y-2">
        {archived.length === 0 && (
          <p className="text-sm text-[#6c6c6c]">Nothing archived yet.</p>
        )}
        {archived.map((thread) => (
          <div
            key={thread.id}
            className="flex items-center justify-between rounded-md border border-white/5 bg-panel/50 px-4 py-2.5 opacity-60"
          >
            <span className="text-sm text-[#b3b3b3]">
              {thread.channel} — {thread.messages[thread.messages.length - 1].text}
            </span>
            <span className="text-[11px] text-[#6c6c6c]">Resolved</span>
          </div>
        ))}
      </div>

      {undoThread && (
        <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-[#1f1f1f] px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,.6)]">
          <span className="text-sm text-white">Thread archived</span>
          <button onClick={undoResolve} className="text-sm font-bold text-accent hover:underline">
            Undo
          </button>
        </div>
      )}
    </DemoShell>
  )
}
