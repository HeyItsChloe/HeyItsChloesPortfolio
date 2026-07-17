import { useRef } from 'react'
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

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative aspect-video cursor-pointer overflow-hidden rounded-md bg-[#181818] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:z-20 hover:scale-[1.55] hover:shadow-[0_20px_40px_rgba(0,0,0,.7),0_0_0_1px_rgba(255,255,255,.05)] first:hover:origin-left last:hover:origin-right"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
        style={{ background: project.poster }}
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
        src={project.video}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-x-3 bottom-3 font-display text-2xl tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,.7)] transition-opacity duration-300 group-hover:opacity-0">
        {project.title}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1.5 px-3.5 pb-3.5 pt-3 opacity-0 transition-all duration-300 delay-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(180deg,transparent,rgba(20,20,20,.98) 40%,#141414)',
        }}
      >
        <h3 className="mb-2 font-display text-[22px] tracking-[.5px]">{project.title}</h3>
        <div className="mb-2 flex flex-wrap gap-2 text-xs font-medium text-[#b3b3b3]">
          {project.tags.map((tag, i) => (
            <span key={tag} className="relative pr-2">
              {tag}
              {i < project.tags.length - 1 && (
                <span className="absolute -right-0.5 top-0 text-[#6c6c6c]">•</span>
              )}
            </span>
          ))}
        </div>
        <p className="line-clamp-3 text-[12.5px] leading-snug text-[#d2d2d2]">{project.summary}</p>
        <div className="mt-2.5 flex gap-2">
          <button
            title="Play"
            className="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-white bg-white text-black transition-colors hover:bg-white/85"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            title="Add"
            className="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-white/50 bg-[rgba(42,42,42,.6)] transition-colors hover:border-white hover:bg-white/15"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
            </svg>
          </button>
          <button
            title="Like"
            className="grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-white/50 bg-[rgba(42,42,42,.6)] transition-colors hover:border-white hover:bg-white/15"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V10z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
