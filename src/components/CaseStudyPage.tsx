import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

export default function CaseStudyPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project || !project.caseStudy) {
    return <Navigate to="/" replace />
  }

  const { caseStudy } = project

  return (
    <article className="relative z-[4] bg-base px-[4vw] pb-24 pt-28">
      <div className="mx-auto max-w-[820px]">
        <Link
          to="/"
          className="mb-8 inline-block text-xs font-bold uppercase tracking-[3px] text-accent hover:underline"
        >
          ← Back to work
        </Link>

        <div
          className="mb-8 aspect-video w-full rounded-md bg-cover bg-center"
          style={{ background: project.poster }}
        />

        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-accent">
          {caseStudy.role}
        </span>
        <h1 className="mb-8 font-display text-[clamp(36px,5vw,64px)] leading-none">
          {project.title.replace(/^Case Study\s*—\s*/, '')}
        </h1>

        <div className="mb-6 flex flex-wrap gap-2 text-xs font-medium text-[#b3b3b3]">
          {project.tags.map((tag, i) => (
            <span key={tag} className="relative pr-2">
              {tag}
              {i < project.tags.length - 1 && (
                <span className="absolute -right-0.5 top-0 text-[#6c6c6c]">•</span>
              )}
            </span>
          ))}
        </div>

        {caseStudy.demoPath && (
          <Link
            to={caseStudy.demoPath}
            className="mb-10 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/85"
          >
            View interactive demo →
          </Link>
        )}

        {caseStudy.sections.map((section) => (
          <section key={section.heading} className="mb-10 border-t border-white/10 pt-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[2px]">
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mb-4 max-w-[720px] text-[15px] leading-relaxed text-[#d2d2d2]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {caseStudy.sources.length > 0 && (
          <section className="border-t border-white/10 pt-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[2px]">Sources</h2>
            <ul className="space-y-2">
              {caseStudy.sources.map((source) => (
                <li key={source.url} className="text-[13px] leading-relaxed text-[#b3b3b3]">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#d2d2d2] underline decoration-white/30 underline-offset-2 hover:text-white"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  )
}
