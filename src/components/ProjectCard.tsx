import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
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
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative block aspect-video cursor-default overflow-hidden rounded-md bg-[#181818] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:z-20 hover:scale-[1.55] hover:shadow-[0_20px_40px_rgba(0,0,0,.7),0_0_0_1px_rgba(255,255,255,.05)] first:hover:origin-left last:hover:origin-right"
    >
      {/* Video preview */}
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
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-x-3 bottom-3 font-display text-2xl tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,.7)] transition-opacity duration-300 group-hover:opacity-0">
        {project.title}
      </div>

      {/* Hover detail panel */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 max-h-full translate-y-1.5 overflow-y-auto px-3.5 pb-2.5 pt-2 opacity-0 transition-all duration-300 delay-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(180deg,transparent,rgba(20,20,20,.98) 14%,#141414)',
        }}
      >
        <h3 className="mb-1 font-display text-lg tracking-[.5px]">{project.title}</h3>

        <div className="mb-1.5 flex flex-wrap gap-2 text-[11px] font-medium text-[#b3b3b3]">
          {project.tags.map((tag, i) => (
            <span key={tag} className="relative pr-2">
              {tag}
              {i < project.tags.length - 1 && (
                <span className="absolute -right-0.5 top-0 text-[#6c6c6c]">•</span>
              )}
            </span>
          ))}
        </div>

        <p className="mb-1.5 line-clamp-2 text-[12px] leading-snug text-[#d2d2d2]">{project.summary}</p>

        {hasLinks && (
          <div className="mb-1.5 flex flex-wrap gap-3 text-[11.5px] font-bold">
            <Link to={`/case-study/${project.id}`} className="text-white underline-offset-2 hover:underline">
              Read Case Study →
            </Link>
            {project.caseStudy?.demoPath && (
              <Link to={project.caseStudy.demoPath} className="text-accent underline-offset-2 hover:underline">
                Watch Demo →
              </Link>
            )}
          </div>
        )}

        {hasVideos && (
          <div className="mt-1">
            <div className="mb-1.5 border-b border-white/15 text-[10px] font-bold uppercase tracking-[1.5px]">
              <span className="inline-block border-b-2 border-accent pb-1 text-white">Videos</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-0.5">
              {project.videos!.map((v) => (
                <a
                  key={v.youtubeId}
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[104px] shrink-0"
                >
                  <div className="relative aspect-video overflow-hidden rounded bg-[#0b0b0b]">
                    <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover" />
                    <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 text-[9px] font-medium text-white">
                      {v.duration}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[10.5px] leading-tight text-[#d2d2d2]">{v.title}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
