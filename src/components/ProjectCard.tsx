import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import BrandLogo from './BrandLogo'

type Edge = 'first' | 'middle' | 'last'

const popoutPosition: Record<Edge, string> = {
  first: 'left-0 right-auto',
  middle: 'left-[-19%] right-auto',
  last: 'left-auto right-0',
}

export default function ProjectCard({ project, edge = 'middle' }: { project: Project; edge?: Edge }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const handleEnter = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const v = videoRef.current
      if (!v) return
      v.currentTime = 0
      v.play().catch(() => {})
    }, 250)
  }

  const handleLeave = () => {
    clearTimeout(timerRef.current)
    videoRef.current?.pause()
  }

  const hasLinks = Boolean(project.caseStudy)
  const hasVideos = Boolean(project.videos && project.videos.length > 0)

  return (
    <article onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="group relative aspect-video">
      {/* Resting tile */}
      <div className="absolute inset-0 overflow-hidden rounded-md bg-[#181818]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ background: project.poster }} />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 font-display text-2xl tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,.7)]">
          {project.logo && <BrandLogo logo={project.logo} className="h-5 w-5 shrink-0" />}
          {project.title}
        </div>
      </div>

      {/* Netflix-style hover preview */}
      <div
        className={`pointer-events-none absolute top-0 z-30 w-[138%] origin-top scale-[0.97] overflow-hidden rounded-md bg-[#181818] opacity-0 shadow-[0_20px_50px_rgba(0,0,0,.8)] transition-all duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 ${popoutPosition[edge]}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ background: project.poster }} />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={project.video}
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
        </div>

        <div className="px-4 pb-4 pt-2.5">
          <div className="mb-1 text-[11px] font-medium text-[#8e8e93]">{project.tags[0]}</div>

          <h3 className="mb-1.5 flex items-center gap-2 font-display text-[28px] leading-none tracking-[.5px]">
            {project.logo && <BrandLogo logo={project.logo} className="h-6 w-6 shrink-0" />}
            {project.title}
          </h3>

          {hasLinks && (
            <div className="mb-2.5 flex flex-wrap items-center gap-4">
              <Link
                to={`/case-study/${project.id}`}
                className="flex items-center gap-1.5 text-[13px] font-bold text-white hover:text-white/80"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-white" strokeWidth="2">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Case Study
              </Link>
              {project.caseStudy?.demoPath && (
                <Link
                  to={project.caseStudy.demoPath}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-accent hover:text-accent/80"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-accent">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Demo
                </Link>
              )}
            </div>
          )}

          <p className="mb-2.5 line-clamp-3 text-[13px] leading-relaxed text-[#d2d2d2]">{project.summary}</p>

          <div className="mb-1 flex flex-wrap gap-1.5">
            {project.tags.slice(1).map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/25 px-1.5 py-0.5 text-[10.5px] font-medium text-[#b3b3b3]"
              >
                {tag}
              </span>
            ))}
          </div>

          {hasVideos && (
            <div className="mt-3">
              <div className="mb-2 flex gap-4 border-b border-white/15 text-[11px] font-bold uppercase tracking-[1.5px]">
                <span className="inline-block border-b-2 border-accent pb-2 text-white">Videos</span>
              </div>
              <div className="flex flex-col">
                {project.videos!.map((v, i) => (
                  <a
                    key={v.youtubeId}
                    href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 border-b border-white/10 py-2 last:border-b-0"
                  >
                    <div className="aspect-video w-24 shrink-0 overflow-hidden rounded bg-[#0b0b0b]">
                      <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[12px] text-[#8e8e93]">
                        <span>Video {i + 1}</span>
                        {v.duration && <span>{v.duration}</span>}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-[13px] font-bold leading-tight text-white">{v.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
