export default function About() {
  return (
    <section id="about" className="relative z-[4] bg-base px-[4vw] py-24">
      <div className="mx-auto max-w-[1200px]">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-accent">
          About
        </span>
        <h2 className="mb-6 font-display text-[clamp(44px,6vw,84px)] leading-none">
          Behind The Scenes
        </h2>
        <p className="mb-10 max-w-[720px] text-lg leading-relaxed text-[#d2d2d2]">
          I'm a software engineer who somehow also ended up leading teams, running technical
          projects, and fixing the operational stuff nobody signs up for — turns out shipping
          good software and keeping the humans around it unstuck are basically the same job.
          I've led engineering initiatives end to end, worked closely with designers and
          product, mentored other engineers, and made the technical calls that need making
          instead of endlessly discussing them. Still the kind of person who'd rather ship
          something small and real than talk about something big and theoretical.
        </p>

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
              <li>Master of Business Administration, Pepperdine University</li>
              <li>Bachelor of Arts in Business, minor in Psychology, St. John's University</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">Toolkit</h3>
            <p className="text-[15px] leading-relaxed text-[#b3b3b3]">
              React, TypeScript, JavaScript, Node.js, Ruby on Rails, Python, and REST APIs on
              the code side; AWS and Azure for infra, Sentry and Datadog for keeping an eye on
              things, SQL for data, Git/GitHub/Jira/Confluence for getting work done — plus AI
              agents, LLM integrations, and prompt engineering for the automation-heavy stuff
              lately.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
