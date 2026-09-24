import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { certs, education } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

const numeralColors = ['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#22d3ee']

const storyOrder = ['Diploma', 'Bachelor', 'Award']

function AwardRow({
  entry,
  index,
}: {
  entry: { kicker: string; name: string; detail?: string; href?: string }
  index: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { amount: 0.65, margin: '-30% 0px -30% 0px' })
  const color = numeralColors[index] ?? '#3b82f6'

  return (
    <li ref={ref} className="border-t py-7 first:border-t-0 first:pt-0" style={{ borderColor: 'var(--line)' }}>
      <Reveal delay={index * 0.06} y={20}>
        <div className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 md:grid-cols-[7rem_1fr] md:gap-x-8">
          <span
            className="font-display text-5xl leading-none font-bold tracking-[-0.06em] transition-colors duration-500 md:text-7xl"
            style={{ color: inView ? color : `color-mix(in srgb, ${color} 28%, transparent)` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color }}>
              {entry.kicker}
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-bold">{entry.name}</h3>
            {entry.detail ? <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--mute)]">{entry.detail}</p> : null}
            {entry.href ? (
              <a href={entry.href} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm" style={{ color }}>
                Open PDF →
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    </li>
  )
}

export function Awards() {
  const story = storyOrder
    .map((kicker) => education.find((item) => item.kicker === kicker))
    .filter((item) => item != null)

  const entries = [
    ...story.map((item) => ({
      kicker: item.kicker,
      name: item.name,
      detail: item.detail,
      href: undefined as string | undefined,
    })),
    ...certs.map((cert) => ({
      kicker: 'Certificate',
      name: cert.name,
      detail: undefined as string | undefined,
      href: cert.href,
    })),
  ]

  return (
    <section id="awards" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <Kicker className="text-[var(--mute)]">Recognition</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text="Education and certificates"
          />
          <p className="mt-4 max-w-xl text-[var(--mute)]">
            Diploma first. Then Massey at 8.39 / 9.00, and Top Student at graduation. IBM papers on RAG and DevOps on top.
          </p>
        </Reveal>

        <ol className="mt-12 max-w-3xl">
          {entries.map((entry, i) => (
            <AwardRow key={entry.name} entry={entry} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
