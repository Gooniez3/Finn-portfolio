import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

function PathStep({ item }: { item: (typeof experience)[number] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.5, margin: '-28% 0px -28% 0px' })

  return (
    <Reveal y={32}>
      <article ref={ref} className="flex gap-4 md:gap-6">
        <span
          className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-[border-color,background-color,box-shadow] duration-500"
          style={{
            borderColor: inView ? '#3b82f6' : 'var(--ink)',
            background: inView ? '#3b82f6' : 'var(--bg)',
            boxShadow: inView ? '0 0 0 4px rgb(59 130 246 / 0.22)' : 'none',
          }}
        />
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.14em] text-[#3b82f6] uppercase">
            {item.n} {item.when}
          </p>
          <h3 className={`mt-1 font-display text-2xl font-bold tracking-[-0.03em] ${item.n === '06' ? 'text-[#3b82f6]' : ''}`}>
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--mute)]">{item.place}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-[var(--mute)]">{item.body}</p>
        </div>
      </article>
    </Reveal>
  )
}

export function Experience() {
  return (
    <section id="path" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>Path</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text={'From computing fundamentals\nto AI-native products.'}
          />
          <p className="mt-4 max-w-xl text-[var(--mute)]">
            Diploma, then Massey at 8.39 / 9.00 — Top Student in the class of 2025–2026. Then a shop till, SG BusFlow, NetScope, a live AI app, a booking system, and this site.
          </p>
        </Reveal>
        <div className="relative mt-12">
          <motion.div
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top"
            style={{ background: 'linear-gradient(180deg, #3b82f6, var(--line))' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="space-y-10">
            {experience.map((item) => (
              <PathStep key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
