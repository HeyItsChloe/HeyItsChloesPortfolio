export default function About() {
  return (
    <section id="about" className="relative z-[4] bg-base px-[4vw] py-24">
      <div className="mx-auto max-w-[1200px]">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-accent">
          About
        </span>
        <h2 className="mb-6 font-display text-[clamp(44px,6vw,84px)] leading-none">
          Hi, I'm Chloe.
        </h2>
        <p className="mb-10 max-w-[720px] text-lg leading-relaxed text-[#d2d2d2]">
          I'm a developer and builder who likes turning rough ideas into working products
          fast — the kind of person who'd rather ship something small and useful than talk
          about something big and theoretical.
        </p>

        <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-6 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">Practice</h3>
            <p className="text-[15px] leading-relaxed text-[#b3b3b3]">
              Full-stack development and product design — planning, building, and shipping
              software end to end, from the first sketch to the deployed app.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">What I've Built</h3>
            <p className="text-[15px] leading-relaxed text-[#b3b3b3]">
              BusyBuddy · OrderMate · automation pipelines · the odd app wiki nobody asked
              for but everybody ends up using.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[2px]">Toolkit</h3>
            <p className="text-[15px] leading-relaxed text-[#b3b3b3]">
              React · TypeScript · Node · Tailwind · Python — plus whatever gets the job
              done fastest.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
