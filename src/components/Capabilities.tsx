import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { capabilities, strongest } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'
import { TechGrid } from './TechIcons'

function Chip({ name }: { name: string }) {
  const core = strongest.has(name)
  return (
    <span className={`chip inline-flex items-center gap-1 px-2.5 py-1 text-[11px] ${core ? 'chip-strong' : ''}`}>
      {core ? <span aria-hidden>★</span> : null}
      {name}
    </span>
  )
}

const cardIcons = [
  <svg key="code" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m8 10-2 2 2 2M16 10l2 2-2 2M13 9l-2 6" />
  </svg>,
  <svg key="agent" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <circle cx="12" cy="8" r="3" />
    <path d="M6 19c1.2-2.4 3.2-3.6 6-3.6s4.8 1.2 6 3.6" />
    <path d="M18 4.5 19 6l1.5.4L19 7l-1 1.5L17 7l-1.5-.6L17 6l1-1.5Z" />
  </svg>,
  <svg key="live" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M4 10.5 12 4l8 6.5V20H4V10.5Z" />
    <path d="M9 20v-6h6v6" />
  </svg>,
]

function Principle({
  card,
  index,
}: {
  card: (typeof capabilities)[number]
  index: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      className="panel flex h-full flex-col p-5"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between">
        <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--mute)]">{card.n}</p>
        <p className="max-w-[8rem] text-right text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">{card.kicker}</p>
      </div>
      <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl border text-[#93c5fd]" style={{ borderColor: 'var(--line)' }}>
        {cardIcons[index]}
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.03em]">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[var(--mute)]">{card.body}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <Chip key={tag} name={tag} />
        ))}
      </div>
    </motion.article>
  )
}

export function Capabilities() {
  const [active, setActive] = useState(0)
  const card = capabilities[active]
  const reduce = useReducedMotion()

  return (
    <section id="what-i-can-do" className="relative scroll-mt-24 px-5 py-12 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Kicker>My capabilities</Kicker>
          <Headline className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl" text={'One ecosystem.\nEvery layer.'} />
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--mute)] md:text-base">
            Full-stack, data, AI, cloud, and IoT — the same person from the interface to the till, the agent, and the deploy.
          </p>
          <div className="mt-8 max-w-md">
            <TechGrid />
          </div>
          <p className="mt-3 text-xs text-[var(--mute)]">
            <span className="text-[#22c55e]">●</span> marks the languages and tools the shipped products are built with.
          </p>
        </Reveal>

        <div className="lg:hidden">
          <div className="panel p-4">
            <div className="grid grid-cols-3 gap-1 rounded-full border p-1" style={{ borderColor: 'var(--line)' }}>
              {capabilities.map((item, i) => (
                <button
                  key={item.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className="rounded-full px-2 py-2 text-[11px] font-semibold tracking-[0.14em]"
                  style={{ background: i === active ? 'var(--ink)' : 'transparent', color: i === active ? 'var(--bg)' : 'var(--mute)' }}
                >
                  {item.n}
                </button>
              ))}
            </div>
            <motion.div key={card.n} className="mt-4" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <p className="text-[10px] tracking-[0.18em] text-[#3b82f6] uppercase">{card.kicker}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-[var(--mute)]">{card.body}</p>
            </motion.div>
          </div>
        </div>

        <div className="hidden gap-3 lg:grid">
          {capabilities.map((item, i) => (
            <Principle key={item.n} card={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
