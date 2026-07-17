export type Project = {
  id: string
  title: string
  video: string
  poster: string
  tags: string[]
  summary: string
}

const base = import.meta.env.BASE_URL

export const projects: Project[] = [
  {
    id: 'busybuddy',
    title: 'BusyBuddy',
    video: `${base}videos/travel.mp4`,
    poster: 'linear-gradient(135deg,#f7971e 0%,#e94057 55%,#4a2b6b 100%)',
    tags: ['2025', 'Productivity', 'SaaS'],
    summary:
      'A remote-work companion built for digital nomads. Balances deep-focus sprints with beach-worthy breaks so you can actually work from anywhere.',
  },
  {
    id: 'case-study-launch',
    title: 'Case Study — Product Launch',
    video: `${base}videos/adventure.mp4`,
    poster: 'linear-gradient(135deg,#11998e 0%,#38ef7d 45%,#1e3c72 100%)',
    tags: ['2025', 'Case Study', 'Product'],
    summary:
      'A deep-dive on shipping a new product from zero to launch — research, prototypes, and the leap of faith of putting it in front of real users.',
  },
  {
    id: 'case-study-platform',
    title: 'Case Study — Platform Redesign',
    video: `${base}videos/tech.mp4`,
    poster: 'linear-gradient(135deg,#0f2027 0%,#2c5364 55%,#8e2de2 100%)',
    tags: ['2025', 'Case Study', 'Tech'],
    summary:
      'Notes from redesigning a technical platform: systems thinking, developer UX, and the small details that make software feel alive.',
  },
  {
    id: 'ordermate',
    title: 'OrderMate',
    video: `${base}videos/architecture.mp4`,
    poster: 'linear-gradient(135deg,#3a2c1f 0%,#7a5c3e 45%,#1e3c72 100%)',
    tags: ['2024', 'Hospitality', 'POS'],
    summary:
      'A point-of-sale companion for boutique cafes. Designed for a Balinese indoor-outdoor coffee shop, built to keep small teams running smoothly.',
  },
]

export const recentlyAdded = [
  { label: 'Blogs', gradient: 'linear-gradient(135deg,#4a2b6b,#c33764)' },
  { label: 'Templates', gradient: 'linear-gradient(135deg,#0f2027,#2c5364)' },
  { label: 'Automation Pipelines', gradient: 'linear-gradient(135deg,#8e2de2,#4a00e0)' },
  { label: 'E-commerce App Wiki', gradient: 'linear-gradient(135deg,#f7971e,#ffd200)' },
  { label: 'PoS System Wiki', gradient: 'linear-gradient(135deg,#1e3c72,#2a5298)' },
  { label: 'Agent Automations Wiki', gradient: 'linear-gradient(135deg,#232526,#414345)' },
]
