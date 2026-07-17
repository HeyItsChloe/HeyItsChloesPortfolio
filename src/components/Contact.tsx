const links = [
  { label: 'Email', value: 'chloearibo92@gmail.com', href: 'mailto:chloearibo92@gmail.com' },
  { label: 'GitHub', value: 'github.com/HeyItsChloe', href: 'https://github.com/HeyItsChloe' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative z-[4] bg-panel px-[4vw] py-24">
      <div className="mx-auto max-w-[1200px]">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-accent">
          Contact
        </span>
        <h2 className="mb-6 font-display text-[clamp(44px,6vw,84px)] leading-none">
          Let's build something.
        </h2>
        <p className="mb-10 max-w-[720px] text-lg leading-relaxed text-[#d2d2d2]">
          Open to collaborations, freelance builds, and long walks with dogs.
        </p>

        <div className="grid max-w-[820px] grid-cols-1 gap-3.5 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener' : undefined}
              className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[.04] p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[.07]"
            >
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-accent">
                {link.label}
              </span>
              <span className="text-xl font-semibold">{link.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
