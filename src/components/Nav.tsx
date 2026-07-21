import { useEffect, useState } from 'react'

const sections = ['home', 'about', 'contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)

      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        if (window.scrollY + 120 >= el.offsetTop) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-[4vw] py-[18px] transition-colors duration-300"
      style={{
        background: scrolled
          ? '#0b0b0b'
          : 'linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,0))',
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-9">
        <a
          href="#home"
          onClick={scrollToId('home')}
          className="whitespace-nowrap font-display text-[28px] font-bold tracking-[2px] text-accent"
        >
          CHLOE ARIBO
        </a>
        <nav className="flex gap-[22px] text-sm font-medium">
          {['about', 'contact'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollToId(id)}
              className={`capitalize transition-colors ${
                active === id ? 'font-bold text-white' : 'text-[#e5e5e5] hover:text-[#b3b3b3]'
              }`}
            >
              {id}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div
            className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#e50914,#4a2b6b)' }}
            aria-label="Chloe Aribo"
            role="img"
          >
            CA
          </div>
        </div>
      </div>
    </header>
  )
}
