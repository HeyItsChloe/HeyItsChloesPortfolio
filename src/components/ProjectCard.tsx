import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import BrandLogo from './BrandLogo'

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
        {project.logo && (
          <div className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded bg-black/60 backdrop-blur-sm">
            <BrandLogo logo={project.logo} className="h-4 w-4" />
          </div>
        )}
        <div className="absolute inset-x-3 bottom-3 font-display text-2xl tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,.7)]">
          {project.title}
        </div>
      </div>

      {/* Netflix-style hover preview */}
      <div
        className="pointer-events-none absolute top-0 left-[-19%] right-auto z-30 w-[138%] origin-top scale-[0.97] overflow-hidden rounded-md bg-[#181818] opacity-0 shadow-[0_20px_50px_rgba(0,0,0,.8)] transition-all duration-300 first:left-0 last:left-auto last:right-0 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
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

          {project.logo && (
            <div className="absolute left-2.5 top-2.5 grid h-8 w-8 place-items-center rounded bg-black/60 backdrop-blur-sm">
              <BrandLogo logo={project.logo} className="h-[18px] w-[18px]" />
            </div>
          )}

          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/90 bg-black/35 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-2.5">
          <h3 className="mb-1.5 font-display text-xl tracking-[.5px]">{project.title}</h3>

          {hasLinks && (
            <div className="mb-2.5 flex flex-wrap items-center gap-4">
              <Link
                to={`/case-study/${project.id}`}
                className="flex items-center gap-1.5 text-[13px] font-bold text-white hover:text-white/80"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Case Study
              </Link>
              {project.caseStudy?.demoPath && (
                <Link
                  to={project.caseStudy.demoPath}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-accent hover:text-accent/80"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-accent">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                  </svg>
                  Demo
                </Link>
              )}
            </div>
          )}

          <p className="mb-2.5 line-clamp-3 text-[13px] leading-relaxed text-[#d2d2d2]">{project.summary}</p>

          <div className="mb-1 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
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
              <div className="flex gap-2 overflow-x-auto pb-0.5">
                {project.videos!.map((v) => (
                  <a
                    key={v.youtubeId}
                    href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-[110px] shrink-0"
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
      </div>
    </article>
  )
}
