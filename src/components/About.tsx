import { useState } from 'react'
import { createPortal } from 'react-dom'

const toolkitCategories = [
  {
    heading: 'Programming Languages, Frameworks & Application Development',
    body: 'JavaScript, TypeScript, C#, Python, Ruby on Rails, Node.js, .NET Framework, React, HTML, CSS, REST APIs, RESTful endpoints, JSON, GeoJSON, HTTP servers, microservices architecture, MUI (Material UI), Storybook, UI/UX design, responsive web development',
  },
  {
    heading: 'Cloud, DevOps, Automation & Infrastructure',
    body: 'AWS, AWS Lambda, Azure, cloud deployments, self-hosted deployments, CI/CD pipeline design, release automation, mobile/iOS release automation, build automation, GitLab CI/CD workflows, workflow automation, AI agents, autonomous coding agents, LLM integrations, prompt engineering, bug triage automation, PR review automation, dependency upgrade automation',
  },
  {
    heading: 'Testing, Quality, Data & Systems',
    body: 'Jest, React Testing Library, unit testing, integration testing, QA process design, automated testing, pre-deployment validation, SQL, MySQL, database design, data modeling, production data management, payment processing systems, credit bureau reporting data, secure data handling, KPI tracking, data-driven reporting, JSON/GeoJSON data handling',
  },
  {
    heading: 'Engineering Tools, Monitoring & Operations',
    body: 'Git, GitHub, GitLab, Jira, Linear, Slack, Confluence, Sentry, Datadog, runtime troubleshooting, issue diagnosis, production stability improvements, onboarding systems, release management, workflow optimization, vendor/inventory systems, digital operations tooling, website management, SEO optimization, web analytics, Amazon Alexa Skills',
  },
]

export default function About() {
  const [showMoreToolkit, setShowMoreToolkit] = useState(false)

  return (
    <section id="about" className="relative z-[4] bg-base px-[4vw] py-24">
      <div className="mx-auto max-w-[1200px]">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-accent">
          About
        </span>
        <h2 className="mb-6 font-display text-[clamp(44px,6vw,84px)] leading-none">
          Behind The Scenes
        </h2>
        <div className="mb-10 flex flex-col-reverse items-center gap-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[720px] text-lg leading-relaxed text-[#d2d2d2]">
            I'm a technology leader with experience across software engineering, operations
            management, team leadership, and AI-powered automation. I specialize in connecting
            technical solutions with business outcomes — building systems, improving processes,
            and enabling teams to work more effectively.
            <br />
            <br />
            As a software engineer, I've designed and delivered applications, APIs, automation
            systems, and scalable infrastructure. As an operations manager and team leader, I've
            managed people, improved workflows, coordinated cross-functional initiatives, and
            solved the operational challenges that impact execution.
            <br />
            <br />
            Today, I focus on applying AI and automation to transform how teams work —
            implementing AI agents, LLM-powered workflows, and intelligent systems that
            streamline processes and create measurable efficiency gains.
          </p>
          <img
            src={`${import.meta.env.BASE_URL}images/profile.png`}
            alt="Chloe Aribo"
            className="h-48 w-48 shrink-0 rounded-full object-cover md:h-56 md:w-56"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-6 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">Practice</h3>
            <p className="text-[15px] leading-relaxed text-[#b3b3b3]">
              Led Stripe and digital-wallet payment integrations, built CI/CD and DevOps
              automation that took real toil off engineers' plates, shipped GitHub and Slack
              integrations and internal tooling teams actually use, and drove UI redesigns and
              new features from idea to production — usually with one foot in the technical
              weeds and one in the cross-functional room where priorities get decided.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">Education</h3>
            <ul className="list-disc space-y-2 pl-4 text-[15px] leading-relaxed text-[#b3b3b3]">
              <li>Masters of Global Business, Pepperdine University</li>
              <li>Bachelor of Arts in Public Relations, minor in Psychology, St. John's University</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">Toolkit</h3>
            <p className="mb-3 text-[15px] font-bold text-white">Technologies I have used:</p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#b3b3b3]">
              <li>
                <span className="font-bold text-white">
                  Programming Languages, Frameworks &amp; Application Development:
                </span>{' '}
                JavaScript, TypeScript, C#, Python, Ruby on Rails, Node.js, .NET Framework,
                React, HTML, CSS, REST APIs, RESTful endpoints, JSON, GeoJSON, HTTP servers,
                microservices architecture, MUI (Material UI), Storybook, UI/UX design,
                responsive web development
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setShowMoreToolkit(true)}
              className="mt-3 text-[13px] font-bold text-accent hover:text-accent/80"
            >
              Read more
            </button>
          </div>
        </div>
      </div>

      {showMoreToolkit &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-[4vw]"
            onClick={() => setShowMoreToolkit(false)}
          >
            <div
              className="relative max-h-[80vh] w-full max-w-[640px] overflow-y-auto rounded-md bg-[#181818] p-6 shadow-[0_20px_50px_rgba(0,0,0,.8)] sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowMoreToolkit(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-2xl leading-none text-[#8e8e93] hover:text-white"
              >
                ×
              </button>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-[2px] text-white">Toolkit</h3>
              <p className="mb-5 text-[15px] font-bold text-white">Technologies I have used:</p>
              <ul className="space-y-5 text-[15px] leading-relaxed text-[#b3b3b3]">
                {toolkitCategories.map((category) => (
                  <li key={category.heading}>
                    <span className="font-bold text-white">{category.heading}:</span> {category.body}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
