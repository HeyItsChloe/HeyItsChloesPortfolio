export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[640px] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}videos/hero.mp4`}
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background:
            'linear-gradient(180deg,transparent 0%,rgba(11,11,11,.6) 60%,#0b0b0b 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.5) 30%,transparent 60%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-[18vh] z-[2] max-w-[680px] px-[4vw]">
        <div className="mb-4 inline-flex items-center gap-2.5 text-sm font-semibold tracking-[6px] text-[#e5e5e5]">
          <span className="font-display text-[28px] font-bold leading-none text-accent">C</span>
          <span>PORTFOLIO</span>
        </div>

        <h1 className="mb-3.5 font-display text-[clamp(48px,6.4vw,96px)] leading-none tracking-[1px] [text-shadow:0_2px_20px_rgba(0,0,0,.6)]">
          Hey, It's Chloe :)
        </h1>

        <div className="mb-[18px] flex items-center gap-3.5">
          <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
            <span className="rounded-[3px] bg-accent px-[5px] py-0.5 text-[11px] font-extrabold tracking-[.5px]">
              TOP 10
            </span>
            <span className="font-medium text-[#e5e5e5]">in Portfolios Today</span>
          </span>
        </div>

        <p className="mb-6 max-w-[520px] text-[17px] leading-[1.5] text-[#e5e5e5] [text-shadow:0_1px_6px_rgba(0,0,0,.6)]">
          Senior software engineer, engineering leader, and product-minded builder — equally
          at home writing full-stack code, running technical projects, or untangling the
          operational stuff that makes engineering teams actually work. I love the hard
          problems most people avoid, and building things that make someone's day genuinely
          easier. Remote-first, always shipping, one very supervisory toy poodle included.
        </p>

        <div className="mb-5 flex gap-3">
          <a
            href="https://www.linkedin.com/in/chloe-aribo/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-2.5 text-base font-bold text-black transition-transform hover:-translate-y-px hover:bg-white/85"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/HeyItsChloe"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-md bg-[rgba(109,109,110,.7)] px-6 py-2.5 text-base font-bold text-white transition-transform hover:-translate-y-px hover:bg-[rgba(109,109,110,.5)]"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.12 7.64 10.6.56.1.77-.24.77-.54v-1.9c-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.08 1.14a10.7 10.7 0 015.6 0c2.14-1.44 3.08-1.14 3.08-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.99 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54 4.43-1.48 7.63-5.66 7.63-10.6C23.25 5.48 18.27.5 12 .5z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className="absolute bottom-[20vh] right-[4vw] z-[2] border-l-[3px] border-white/40 bg-black/30 py-1 pl-10 pr-2.5 text-sm font-medium tracking-[.5px]">
        DEV
      </div>
    </section>
  )
}
