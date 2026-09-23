import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { capabilities, skills, strongest } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

const groups = Object.entries(skills)

function Chip({ name }: { name: string }) {
  const core = strongest.has(name)
  return (
    <span className={`chip inline-flex items-center gap-1 px-2.5 py-1 text-[11px] ${core ? 'chip-strong' : ''}`}>
      {core ? (
        <span aria-hidden className="text-[10px] leading-none">
          ★
        </span>
      ) : null}
      {name}
      {core ? <span className="sr-only"> (strongest)</span> : null}
    </span>
  )
}

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
      className="panel flex h-full flex-col p-5 md:p-6"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        aria-hidden
        className="absolute top-0 left-6 h-px w-16 bg-[#3b82f6]"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: '0 50%' }}
        transition={{ duration: 0.7, delay: 0.15 + index * 0.08 }}
      />
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold tracking-[0.18em] text-[#3b82f6]">{card.n}</p>
        <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">{card.kicker}</p>
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">{card.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--mute)]">{card.body}</p>
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
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>My capabilities</Kicker>
          <Headline
            className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] md:text-6xl"
            text={'One ecosystem.\nEvery layer.'}
          />
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--mute)] md:mt-4 md:text-base md:leading-relaxed">
            Full-stack, data, AI, cloud, and IoT — the same person from the interface to the till, the agent, and the deploy.
          </p>
        </Reveal>

        <div className="mt-6 flex snap-x gap-3 overflow-x-auto no-scrollbar md:hidden">
          {groups.map(([group, items], i) => (
            <article key={group} className="panel w-[78%] shrink-0 snap-start p-4">
              <p className="text-[10px] tracking-[0.18em] text-[#3b82f6] uppercase">
                {String(i + 1).padStart(2, '0')} {group}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Chip key={item} name={item} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
          {groups.map(([group, items], i) => (
            <motion.article
              key={group}
              className={`panel p-5 ${i === groups.length - 1 ? 'md:col-span-2 xl:col-span-3' : ''}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] tracking-[0.18em] text-[#3b82f6] uppercase">
                {String(i + 1).padStart(2, '0')} {group}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Chip key={item} name={item} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 md:mt-14">
          <p className="text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">How the work is built</p>

          <div className="panel mt-3 p-4 md:hidden">
            <div className="grid grid-cols-3 gap-1 rounded-full border p-1" style={{ borderColor: 'var(--line)' }}>
              {capabilities.map((item, i) => (
                <button
                  key={item.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className="rounded-full px-2 py-2 text-[11px] font-semibold tracking-[0.14em]"
                  style={{
                    background: i === active ? 'var(--ink)' : 'transparent',
                    color: i === active ? 'var(--bg)' : 'var(--mute)',
                  }}
                >
                  {item.n}
                </button>
              ))}
            </div>
            <div className="relative mt-4 min-h-[148px]" style={{ overflowAnchor: 'none' }}>
              <motion.div
                key={card.n}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[10px] tracking-[0.18em] text-[#3b82f6] uppercase">{card.kicker}</p>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em]">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-[var(--mute)]">{card.body}</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 hidden gap-4 md:grid md:grid-cols-3">
            {capabilities.map((item, i) => (
              <Principle key={item.n} card={item} index={i} />
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--mute)] md:mt-4">
            <span className="text-[#86efac]">★</span> marks the languages and tools the shipped products are built with.
          </p>
        </div>
      </div>
    </section>
  )
}
