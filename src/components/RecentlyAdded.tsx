import { recentlyAdded } from '../data/projects'

export default function RecentlyAdded() {
  return (
    <section className="relative z-[3] bg-base px-[4vw] py-14 hover:z-10">
      <h2 className="mb-3.5 text-xl font-bold text-[#e5e5e5]">Recently Added</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {recentlyAdded.map((item) => (
          <div
            key={item.label}
            className="flex cursor-pointer flex-col gap-2 transition-transform hover:-translate-y-1"
          >
            <div
              className="aspect-video rounded-md shadow-[inset_0_0_0_1px_rgba(255,255,255,.05)]"
              style={{ background: item.gradient }}
            />
            <span className="text-[13px] font-medium text-[#e5e5e5]">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
