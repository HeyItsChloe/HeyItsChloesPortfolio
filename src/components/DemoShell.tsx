import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function DemoShell({
  caseStudyId,
  title,
  children,
}: {
  caseStudyId: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="relative z-[4] min-h-screen bg-base pb-24 pt-24">
      <div className="mx-auto max-w-[1100px] px-[4vw]">
        <Link
          to={`/case-study/${caseStudyId}`}
          className="mb-4 inline-block text-xs font-bold uppercase tracking-[3px] text-accent hover:underline"
        >
          ← Back to case study
        </Link>
        <h1 className="mb-3 font-display text-[clamp(28px,4vw,44px)] leading-none">{title}</h1>
        <div className="mb-8 rounded-md border border-white/10 bg-panel px-4 py-3 text-[13px] leading-relaxed text-[#b3b3b3]">
          Interactive prototype with mock data — everything here is local UI state, no backend
          or real AI calls. It's meant to demonstrate the interaction model described in the case
          study, not a production integration.
        </div>
        {children}
      </div>
    </div>
  )
}
