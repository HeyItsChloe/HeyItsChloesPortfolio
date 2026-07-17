export type ThreadMessage = {
  author: string
  text: string
  time: string
}

export type ThreadType = 'mention' | 'reply'

export type DemoThread = {
  id: string
  channel: string
  type: ThreadType
  messages: ThreadMessage[]
  summary: string
  lastActivity: string
  resolved: boolean
}

export const initialThreads: DemoThread[] = [
  {
    id: 't1',
    channel: '#launch-week',
    type: 'mention',
    lastActivity: '9:42 AM',
    resolved: false,
    summary:
      'Priya, Sam, and Jordan discussed the deploy window and landed on Thursday 10am PT — you were asked to confirm the on-call rotation.',
    messages: [
      { author: 'Priya', text: 'Can we push the deploy to Thursday instead of Wednesday?', time: '9:12 AM' },
      { author: 'Sam', text: 'Works for me, gives QA an extra day.', time: '9:14 AM' },
      { author: 'Jordan', text: 'Thursday 10am PT then. @you can you confirm who is on-call?', time: '9:41 AM' },
    ],
  },
  {
    id: 't2',
    channel: '#design-crit',
    type: 'reply',
    lastActivity: '8:55 AM',
    resolved: false,
    summary:
      'Feedback thread on the new empty-state illustration — consensus is the current version ships as-is, no action needed from you.',
    messages: [
      { author: 'Alex', text: 'Loving the new empty state, one nit on spacing below the CTA.', time: '8:30 AM' },
      { author: 'Priya', text: 'Fixed, pushed a new version.', time: '8:48 AM' },
      { author: 'Alex', text: 'Ship it 🚢', time: '8:55 AM' },
    ],
  },
  {
    id: 't3',
    channel: '#eng-oncall',
    type: 'mention',
    lastActivity: 'Yesterday',
    resolved: false,
    summary:
      'Jordan flagged a memory leak in the worker process and asked you specifically to take a look before end of day.',
    messages: [
      { author: 'Jordan', text: 'Seeing steady memory growth on worker-3, anyone free to look?', time: 'Yesterday' },
      { author: 'Jordan', text: '@you this looks like it might be in the queue consumer you wrote last sprint.', time: 'Yesterday' },
    ],
  },
  {
    id: 't4',
    channel: '#marketing-sync',
    type: 'reply',
    lastActivity: '2 days ago',
    resolved: false,
    summary:
      'Thread about launch-day social copy — team converged on the final version, purely FYI, nothing needed from you.',
    messages: [
      { author: 'Morgan', text: 'Draft copy for the launch tweet is in the doc, thoughts?', time: '2 days ago' },
      { author: 'Sam', text: 'Tightened it up a bit, see v2.', time: '2 days ago' },
      { author: 'Morgan', text: 'v2 is the one, thanks!', time: '2 days ago' },
    ],
  },
  {
    id: 't5',
    channel: '#launch-week',
    type: 'mention',
    lastActivity: '3 days ago',
    resolved: false,
    summary:
      'Sam asked whether the rollback plan doc is finished — still open, needs your response.',
    messages: [
      { author: 'Sam', text: '@you is the rollback plan doc done? Want to link it in the launch checklist.', time: '3 days ago' },
    ],
  },
]
