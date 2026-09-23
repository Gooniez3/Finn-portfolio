import { motion } from 'framer-motion'
import { capabilities, skills, strongest } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

function SkillChip({ name, delay }: { name: string; delay: number }) {
  const core = strongest.has(name)
  return (
    <motion.span
      className={`chip inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-[11px] ${core ? 'chip-strong' : ''}`}
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 280, damping: 20 }}
    >
      {core ? (
        <span aria-hidden className="text-[9px] leading-none">
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
    <section id="what-i-can-do" className="relative scroll-mt-24 px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>My capabilities</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text={'One ecosystem.\nEvery layer.'}
          />
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--mute)] md:text-base">
            Full-stack, data, AI, cloud, and IoT — the same person from the interface to the till, the agent, and the deploy.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[var(--mute)]">
            <span className="chip chip-strong inline-flex items-center gap-1 px-2 py-0.5 text-[11px]">
              <span aria-hidden>★</span> Strongest
            </span>
            <span>What I actually ship with.</span>
          </p>
        </Reveal>

        <div className="mt-6 md:grid md:grid-cols-2 md:gap-x-10">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal
              key={group}
              delay={Math.min(i * 0.04, 0.2)}
              y={12}
              blur={false}
              className="flex items-center gap-3 border-b py-2 md:block md:py-2.5"
              style={{ borderColor: 'var(--line)' }}
            >
              <p className="shrink-0 text-[10px] tracking-[0.12em] whitespace-nowrap text-[#3b82f6] uppercase md:mb-1.5">
                {String(i + 1).padStart(2, '0')} {group}
              </p>
              <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] md:flex-wrap md:overflow-visible md:[mask-image:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item, chip) => (
                  <SkillChip key={item} name={item} delay={0.02 * chip} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid border-t md:mt-8 md:grid-cols-3" style={{ borderColor: 'var(--line)' }}>
          {capabilities.map((card, i) => (
            <Reveal key={card.n} delay={i * 0.06} y={16} blur={false}>
              <article
                className="border-b py-4 md:border-b-0 md:border-r md:px-6 md:py-5 last:md:border-r-0"
                style={{ borderColor: 'var(--line)' }}
              >
                <p className="font-display text-sm font-semibold tracking-[0.14em] text-[#3b82f6]">{card.n}</p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-[-0.03em]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-5 text-[var(--mute)]">{card.body}</p>
                <p className="mt-2 text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">{card.kicker}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
