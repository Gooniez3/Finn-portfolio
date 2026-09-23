import { motion } from 'framer-motion'
import { capabilities, skills, strongest } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

function SkillChip({ name, delay }: { name: string; delay: number }) {
  const core = strongest.has(name)
  return (
    <motion.span
      className={`chip inline-flex items-center gap-1 px-3 py-1.5 text-xs ${core ? 'chip-strong' : ''}`}
      initial={{ opacity: 0, scale: 0.82, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
    >
      {core ? (
        <span aria-hidden className="text-[10px] leading-none">
          ★
        </span>
      ) : null}
      {name}
      {core ? <span className="sr-only"> (strongest)</span> : null}
    </motion.span>
  )
}

export function Capabilities() {
  return (
    <section id="what-i-can-do" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>My capabilities</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text={'One ecosystem.\nEvery layer.'}
          />
          <p className="mt-4 max-w-2xl leading-relaxed text-[var(--mute)]">
            Full-stack, data, AI, cloud, and IoT — the same person from the interface to the till, the agent, and the deploy.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[var(--mute)]">
            <span className="chip chip-strong inline-flex items-center gap-1 px-3 py-1 text-xs">
              <span aria-hidden>★</span> Strongest
            </span>
            Green starred chips are the languages and tools I actually ship with.
          </p>
        </Reveal>

        <div className="mt-12 space-y-6 border-t pt-2" style={{ borderColor: 'var(--line)' }}>
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal
              key={group}
              delay={Math.min(i * 0.04, 0.2)}
              y={28}
              blur={false}
              className="grid gap-3 border-b py-5 md:grid-cols-[10rem_1fr] md:items-start"
              style={{ borderColor: 'var(--line)' }}
            >
              <p className="text-[11px] tracking-[0.18em] text-[#3b82f6] uppercase">
                {String(i + 1).padStart(2, '0')} {group}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item, chip) => (
                  <SkillChip key={item} name={item} delay={0.03 * chip} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:mt-12 md:gap-4 lg:grid-cols-3">
          {capabilities.map((card, i) => (
            <Reveal key={card.n} delay={i * 0.1} y={36}>
              <article className="card p-4 md:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-lg font-bold text-[var(--mute)] md:text-3xl">{card.n}</p>
                  <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">{card.kicker}</p>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold md:mt-4 md:text-xl">{card.title}</h3>
                <p className="mt-1.5 line-clamp-3 text-[13px] leading-5 text-[var(--mute)] md:mt-2 md:line-clamp-none md:text-sm md:leading-relaxed">{card.body}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`chip inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase ${strongest.has(tag) ? 'chip-strong' : ''}`}
                    >
                      {strongest.has(tag) ? <span aria-hidden>★</span> : null}
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
