export type CaseStudySection = {
  heading: string
  body: string[]
}

export type CaseStudySource = {
  label: string
  url: string
}

export type CaseStudy = {
  role: string
  sections: CaseStudySection[]
  sources: CaseStudySource[]
  demoPath?: string
}

export type Project = {
  id: string
  title: string
  video: string
  poster: string
  tags: string[]
  summary: string
  caseStudy?: CaseStudy
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
    title: 'Case Study — Fixing Slack Thread Notifications',
    video: `${base}videos/adventure.mp4`,
    poster: 'linear-gradient(135deg,#11998e 0%,#38ef7d 45%,#1e3c72 100%)',
    tags: ['2025', 'Case Study', 'Product'],
    summary:
      'A speculative redesign of how Slack surfaces thread activity — plus where AI-assisted triage could cut the noise instead of adding to it.',
    caseStudy: {
      role: 'Speculative case study — concept redesign, not affiliated with Slack',
      demoPath: '/case-study/case-study-launch/demo',
      sections: [
        {
          heading: 'The problem',
          body: [
            "Threads were meant to reduce channel noise, but they created a new failure mode: replies happen somewhere you're not looking. Slack's own design team has written publicly about this — early testing showed people found Threads confusing, and heavy use of Threads made channels harder to follow rather than easier.",
            "Because thread replies don't show up in the main channel, Slack couldn't rely on its existing unread-message system to surface them, so it had to build a separate Activity panel just to catch people up. That's a strong signal the underlying notification model was fighting the feature, not supporting it.",
          ],
        },
        {
          heading: 'Scope & constraints',
          body: [
            "This case study is scoped to the notification and activity-surfacing model for threads only — not a redesign of channels, DMs, or Slack Connect. The goal was to answer one question: how does someone know, at a glance, which threads actually need their attention versus which ones already resolved themselves?",
          ],
        },
        {
          heading: 'Research',
          body: [
            "Slack's own design writeup on the evolution of Threads was the anchor source — it documents the real, multi-year struggle to get thread notifications right, including the pivot to an 'All Threads' view after realizing users couldn't reliably find replies.",
            'That history points at three recurring failure modes worth designing against: (1) mentions buried under low-priority replies, (2) no clear signal that a thread has reached a decision, and (3) notification settings that are all-or-nothing instead of relevance-aware.',
          ],
        },
        {
          heading: 'The redesign',
          body: [
            "A dedicated Threads activity feed, separate from the channel-mention bell, with two distinct badge types: 'you were asked something' versus 'a thread you're in got a reply.' That distinction alone would resolve the most common complaint — mentions getting lost in general thread chatter.",
            'Each thread entry shows an inline preview of the most recent message, so you can triage without opening it — closer to how email preview panes work.',
          ],
        },
        {
          heading: 'Where AI/automation fits',
          body: [
            "A summarization pass on threads you're mentioned in late: 'Three people discussed the deploy window and landed on Thursday — you were asked to confirm.' That turns a 40-message scroll into a five-second read.",
            "Lightweight resolution detection: an automation that watches for signals like a ✅ reaction, an explicit 'sounds good,' or a linked decision, and quietly moves that thread out of your active list — with a visible, one-click undo so nothing important disappears silently.",
          ],
        },
        {
          heading: 'Tradeoffs I would flag to a team',
          body: [
            "Auto-summarization can flatten nuance or misattribute who said what, especially in fast-moving threads with disagreement. Any shipped version needs the summary to always link back to the source messages, and probably needs a confidence indicator for threads where the discussion didn't clearly resolve.",
            "Auto-archiving is the riskier move of the two — even with an undo, if it's wrong often enough people will stop trusting it and go back to scrolling everything manually, which defeats the point.",
          ],
        },
        {
          heading: 'What I would test next',
          body: [
            'An A/B test comparing time-to-respond and self-reported "did I miss anything important" confidence between the current Activity panel and the dedicated Threads feed, run with a group of heavy-thread-usage teams first since they feel this pain the most acutely.',
          ],
        },
      ],
      sources: [
        {
          label: 'Threads in Slack, a long design journey (part 2 of 2) — Slack Design',
          url: 'https://slack.design/articles/threads-in-slack-a-long-design-journey-part-2-of-2/',
        },
      ],
    },
  },
  {
    id: 'case-study-platform',
    title: 'Case Study — Rethinking Large-Diff PR Review on GitHub',
    video: `${base}videos/tech.mp4`,
    poster: 'linear-gradient(135deg,#0f2027 0%,#2c5364 55%,#8e2de2 100%)',
    tags: ['2025', 'Case Study', 'Tech'],
    summary:
      'A concept redesign for reviewing large pull requests — risk-based collapsing, a diff outline view, and where AI summarization actually earns its keep.',
    caseStudy: {
      role: 'Speculative case study — concept redesign, not affiliated with GitHub',
      demoPath: '/case-study/case-study-platform/demo',
      sections: [
        {
          heading: 'The problem',
          body: [
            "Reviewing a large pull request on GitHub today means losing spatial context constantly — jump into a file, lose track of where you were in the overall diff, scroll back up, repeat. This isn't a fringe complaint: GitHub's own community discussions have threads dedicated to exactly this, describing large PRs as 'very difficult to review' and unresolved conversations as hard to track.",
            "The 'Conversations' tab compounds it — it's structurally a timeline of every commit and event in the PR, which buries the two things a reviewer actually needs: open threads and CI status.",
          ],
        },
        {
          heading: 'Scope & constraints',
          body: [
            'Scoped strictly to the review experience for a single large PR — not touching merge queues, CI configuration, or the PR description/metadata UX. The target user is a reviewer working through a 1,000+ line diff spanning many files, some of which matter a lot more than others.',
          ],
        },
        {
          heading: 'Research',
          body: [
            'I reviewed a handful of large real-world PRs on active open-source repos and logged the friction directly rather than relying only on secondhand complaints. The pattern matched what GitHub\'s own community discussions describe: reviewers re-open the same files repeatedly because there\'s no persistent way to see review progress, and low-value diffs (lockfiles, generated code, pure renames) take up as much visual weight as the changes that actually carry risk.',
            "There's also a hard technical ceiling worth knowing about: GitHub's PR diff API returns an error on diffs larger than 3,000 lines, which is a good proxy for how far outside its comfort zone the current UI already is for genuinely large changes.",
          ],
        },
        {
          heading: 'The redesign',
          body: [
            'A persistent file-tree sidebar with a per-file review-status dot (unreviewed / viewed / commented), so a reviewer always knows where they are and what is left — replacing the current flat "Files changed" list that offers no sense of progress.',
            'A diff outline / mini-map, similar to a code editor minimap, so reviewers keep a spatial sense of the whole change instead of only seeing whatever file is currently on screen.',
            'Risk-based default collapsing: hunks in lockfiles, generated code, and pure renames collapse by default, with a visible counter ("14 hunks auto-collapsed — view all") so nothing is silently hidden.',
          ],
        },
        {
          heading: 'Where AI/automation fits',
          body: [
            'An AI-generated PR summary grouped by intent rather than by file — e.g., "renamed the auth API and updated 12 call sites" as one entity instead of 12 separate file diffs, so reviewers understand the shape of the change before diving into line-by-line detail.',
            "A test-coverage-gap flag: cross-referencing which source files changed against which test files did or didn't change, and surfacing an inline note when a logic change has no corresponding test update — a specific, checkable claim rather than a vague 'AI insights' badge.",
            'Risk-based reviewer routing: instead of static CODEOWNERS assigning the whole PR to one person, route only the flagged high-risk hunks to the relevant specialist, so reviewer attention scales with actual risk instead of PR size.',
          ],
        },
        {
          heading: 'Tradeoffs I would flag to a team',
          body: [
            "Auto-collapsing is a false-negative risk by design — something genuinely risky could get miscategorized as low-risk and collapsed. The visible counter and one-click 'expand all' are non-negotiable safeguards, not nice-to-haves.",
            'AI-generated intent grouping needs to be treated as a hint, not ground truth — it should link back to the literal file diffs underneath so a reviewer never has to trust the summary blind.',
          ],
        },
        {
          heading: 'What I would test next',
          body: [
            'Time-to-first-comment and reviewer-reported confidence, comparing the current flat file list against the sidebar + outline view, on a matched sample of large PRs from the same repos.',
          ],
        },
      ],
      sources: [
        {
          label: 'Very difficult to review large PRs with GitHub — GitHub Community Discussion #10830',
          url: 'https://github.com/orgs/community/discussions/10830',
        },
        {
          label: 'GitHub is useless for Diff reviews with large numbers of comments and Suggestions — GitHub Community Discussion #72295',
          url: 'https://github.com/orgs/community/discussions/72295',
        },
        {
          label: 'GitHub Pull Request diff API responds with 406 — diff too large — reviewdog/reviewdog#1696',
          url: 'https://github.com/reviewdog/reviewdog/issues/1696',
        },
      ],
    },
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
