import { useState } from 'react'
import DemoShell from './DemoShell'
import { aiSummary, files, prTitle, type DemoFile } from '../data/prReviewDemo'

type ReviewStatus = 'unreviewed' | 'viewed' | 'commented'

const statusColor: Record<ReviewStatus, string> = {
  unreviewed: 'bg-[#6c6c6c]',
  viewed: 'bg-[#38ef7d]',
  commented: 'bg-accent',
}

const riskColor: Record<DemoFile['risk'], string> = {
  high: 'bg-accent',
  low: 'bg-[#2c5364]',
}

export default function PrReviewDemoPage() {
  const [status, setStatus] = useState<Record<string, ReviewStatus>>(
    Object.fromEntries(files.map((f) => [f.path, 'unreviewed'])),
  )
  const [collapsed, setCollapsed] = useState<Set<string>>(
    new Set(files.filter((f) => f.autoCollapse).map((f) => f.path)),
  )
  const [allExpanded, setAllExpanded] = useState(false)

  const reviewedCount = Object.values(status).filter((s) => s !== 'unreviewed').length
  const autoCollapsedCount = files.filter((f) => f.autoCollapse).length

  const cycleStatus = (path: string) => {
    setStatus((prev) => {
      const order: ReviewStatus[] = ['unreviewed', 'viewed', 'commented']
      const next = order[(order.indexOf(prev[path]) + 1) % order.length]
      return { ...prev, [path]: next }
    })
  }

  const toggleCollapse = (path: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  const expandAll = () => {
    setCollapsed(new Set())
    setAllExpanded(true)
  }

  const scrollTo = (path: string) => {
    document.getElementById(`file-${path}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <DemoShell caseStudyId="case-study-platform" title="Large-diff PR review — demo">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-2xl">{prTitle}</h2>
        <span className="text-sm text-[#b3b3b3]">
          {reviewedCount}/{files.length} files reviewed
        </span>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-[#38ef7d] transition-all"
          style={{ width: `${(reviewedCount / files.length) * 100}%` }}
        />
      </div>

      <div className="mb-6 rounded-md bg-white/5 px-4 py-3 text-[13px] leading-relaxed text-[#d2d2d2]">
        <span className="mr-1 font-bold text-accent">AI summary —</span>
        {aiSummary}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_16px_1fr]">
        <aside className="space-y-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[#6c6c6c]">Files</h3>
          {files.map((f) => (
            <button
              key={f.path}
              onClick={() => scrollTo(f.path)}
              className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-[#d2d2d2] hover:bg-white/5"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${statusColor[status[f.path]]}`} />
              <span className="truncate">{f.path.split('/').pop()}</span>
            </button>
          ))}
        </aside>

        <div className="hidden flex-col gap-1 lg:flex">
          {files.map((f) => (
            <button
              key={f.path}
              onClick={() => scrollTo(f.path)}
              title={f.path}
              className={`h-6 w-4 rounded-sm ${riskColor[f.risk]} opacity-70 hover:opacity-100`}
            />
          ))}
        </div>

        <div>
          {!allExpanded && (
            <button
              onClick={expandAll}
              className="mb-4 rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-[#b3b3b3] hover:bg-white/10"
            >
              {autoCollapsedCount} hunks auto-collapsed — expand all
            </button>
          )}
          <div className="space-y-4">
            {files.map((f) => {
              const isCollapsed = collapsed.has(f.path)
              return (
                <div key={f.path} id={`file-${f.path}`} className="rounded-md border border-white/10 bg-panel">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <button
                        onClick={() => toggleCollapse(f.path)}
                        className="text-[#6c6c6c] hover:text-white"
                        title={isCollapsed ? 'Expand' : 'Collapse'}
                      >
                        {isCollapsed ? '▸' : '▾'}
                      </button>
                      <span className="truncate font-mono text-[12.5px] text-white">{f.path}</span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          f.risk === 'high' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-[#b3b3b3]'
                        }`}
                      >
                        {f.risk} risk
                      </span>
                      <span className="shrink-0 text-[11px] text-[#6c6c6c]">
                        +{f.linesAdded} −{f.linesRemoved}
                      </span>
                    </div>
                    <button
                      onClick={() => cycleStatus(f.path)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-bold text-[#d2d2d2] hover:bg-white/10"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusColor[status[f.path]]}`} />
                      {status[f.path]}
                    </button>
                  </div>

                  {!f.hasMatchingTest && f.risk === 'high' && (
                    <div className="border-b border-white/10 bg-accent/10 px-4 py-2 text-[12px] text-accent">
                      ⚠ Logic change with no corresponding test update
                    </div>
                  )}

                  {!isCollapsed && (
                    <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-[#d2d2d2]">
                      {f.diff.split('\n').map((line, i) => (
                        <div
                          key={i}
                          className={
                            line.startsWith('+')
                              ? 'text-[#38ef7d]'
                              : line.startsWith('-')
                                ? 'text-accent'
                                : undefined
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </pre>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DemoShell>
  )
}
