import { Link } from 'react-router-dom'
import { recentlyAdded } from '../data/projects'

const cardClassName = 'flex cursor-pointer flex-col gap-2 transition-transform hover:-translate-y-1'

export default function RecentlyAdded() {
  return (
    <section className="relative z-[3] bg-base px-[4vw] py-14 hover:z-10">
      <h2 className="mb-3.5 text-xl font-bold text-[#e5e5e5]">Recently Added</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {recentlyAdded.map((item) => {
          const content = (
            <>
              <div
                className="aspect-video rounded-md shadow-[inset_0_0_0_1px_rgba(255,255,255,.05)]"
                style={{ background: item.gradient }}
              />
              <span className="text-[13px] font-medium text-[#e5e5e5]">{item.label}</span>
            </>
          )

          if (item.to) {
            return (
              <Link key={item.label} to={item.to} className={cardClassName}>
                {content}
              </Link>
            )
          }

          if (item.href) {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={cardClassName}>
                {content}
              </a>
            )
          }

          return (
            <div key={item.label} className={cardClassName}>
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
