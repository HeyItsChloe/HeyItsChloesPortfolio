import { Link } from 'react-router-dom'

export default function ComingSoonPage() {
  return (
    <div className="relative z-[4] flex min-h-screen flex-col items-center justify-center bg-base px-[4vw] text-center">
      <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-accent">Templates</span>
      <h1 className="mb-4 font-display text-[clamp(36px,6vw,64px)] leading-none">Coming Soon</h1>
      <p className="mb-8 max-w-[480px] text-[15px] leading-relaxed text-[#b3b3b3]">
        Check back later for Modern, Animated website templates available for purchase and use
      </p>
      <Link to="/" className="text-xs font-bold uppercase tracking-[3px] text-accent hover:underline">
        ← Back to portfolio
      </Link>
    </div>
  )
}
