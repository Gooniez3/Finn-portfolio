import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

function ringOffset(index: number, active: number, count: number) {
  let offset = index - active
  if (offset > count / 2) offset -= count
  if (offset < -count / 2) offset += count
  return offset
}

export function Work() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [wide, setWide] = useState(false)
  const dragX = useRef<number | null>(null)
  const project = projects[active]

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % projects.length), 5600)
    return () => window.clearInterval(id)
  }, [paused])

  const go = (index: number) => {
    setActive((index + projects.length) % projects.length)
    setPaused(true)
  }

  const step = (dir: number) => go(active + dir)

  return (
    <section id="work" className="relative overflow-x-clip scroll-mt-24 px-5 py-12 md:px-8 md:py-20" style={{ overflowAnchor: 'none' }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>Selected work</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text="Shipped products"
          />
          <p className="mt-3 max-w-xl text-[var(--mute)]">{projects.length} shipped builds. Not a gallery of demos.</p>
        </Reveal>

        <div
          className="mt-6 grid items-start gap-5 md:mt-10 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-12"
          onMouseEnter={() => wide && setPaused(true)}
          onMouseLeave={() => wide && setPaused(false)}
        >
          <div className="order-2 md:order-1" style={{ overflowAnchor: 'none' }}>
            <div className="grid">
              {projects.map((item) => {
                const on = item.id === project.id
                return (
                  <article
                    key={item.id}
                    className="col-start-1 row-start-1"
                    style={{ visibility: on ? 'visible' : 'hidden', opacity: on ? 1 : 0, transition: 'opacity 0.28s ease' }}
                    aria-hidden={!on}
                    {...(!on ? { inert: true } : {})}
                  >
                    <ProjectCopy item={item} />
                  </article>
                )
              })}
            </div>
          </div>

          <div
            className="order-1 md:order-2"
            onPointerDown={(event) => {
              if (event.pointerType === 'mouse') return
              dragX.current = event.clientX
            }}
            onPointerUp={(event) => {
              if (dragX.current == null) return
              const delta = event.clientX - dragX.current
              dragX.current = null
              if (delta > 36) step(-1)
              else if (delta < -36) step(1)
            }}
          >
            <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto h-[220px] max-w-6xl [transform-style:preserve-3d] sm:h-[260px] md:h-[360px]"
              style={{ perspective: wide ? '1100px' : '900px' }}
            >
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]/20 blur-3xl md:h-52 md:w-52" />
              {projects.map((item, i) => {
                const offset = ringOffset(i, active, projects.length)
                const abs = Math.abs(offset)
                const selected = abs === 0
                const spread = wide ? 168 : 86
                const depth = wide ? 110 : 64
                const hidden = abs > 1
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.name}
                    aria-current={selected ? 'true' : undefined}
                    onClick={() => go(i)}
                    className="absolute top-1/2 left-1/2 cursor-pointer overflow-hidden rounded-2xl border shadow-2xl"
                    style={{
                      width: selected ? (wide ? '62%' : '68%') : wide ? '48%' : '52%',
                      height: selected ? '100%' : '78%',
                      borderColor: 'var(--line)',
                      background: 'var(--bg)',
                      transform: `translate(-50%, -50%) translateX(${offset * spread}px) rotateY(${offset * (wide ? -16 : -24)}deg) translateZ(${selected ? 40 : -depth}px) scale(${1 - abs * 0.06})`,
                      zIndex: 20 - abs,
                      opacity: hidden ? 0 : selected ? 1 : 0.78,
                      pointerEvents: 'none',
                      transition:
                        'transform 0.55s cubic-bezier(0.16,1,0.3,1), width 0.55s cubic-bezier(0.16,1,0.3,1), height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                    }}
                  >
                    <img src={item.image} alt="" className="pointer-events-none h-full w-full object-contain" />
                  </button>
                )
              })}
            </motion.div>
              <button
                type="button"
                aria-label={projects[(active - 1 + projects.length) % projects.length].name}
                onClick={() => step(-1)}
                className="absolute inset-y-0 left-0 z-30 w-[28%]"
              />
              <button
                type="button"
                aria-label={projects[(active + 1) % projects.length].name}
                onClick={() => step(1)}
                className="absolute inset-y-0 right-0 z-30 w-[28%]"
              />
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => step(-1)}
                className="absolute top-1/2 left-0 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border bg-[var(--bg)]/85 text-lg backdrop-blur-sm"
                style={{ borderColor: 'var(--line)' }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => step(1)}
                className="absolute top-1/2 right-0 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border bg-[var(--bg)]/85 text-lg backdrop-blur-sm"
                style={{ borderColor: 'var(--line)' }}
              >
                ›
              </button>
            </div>

            <div className="mt-3 flex justify-center gap-2">
              {projects.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  onClick={() => go(i)}
                  className="h-2 w-2 rounded-full md:h-2.5 md:w-2.5"
                  style={{ background: i === active ? 'var(--ink)' : 'var(--line)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCopy({ item }: { item: (typeof projects)[number] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-[#3b82f6] uppercase md:text-[11px]">{item.kicker}</p>
      <h3 className="mt-1 font-display text-2xl font-bold tracking-[-0.04em] md:mt-2 md:text-4xl">{item.name}</h3>
      <p className="mt-2 text-[13px] leading-5 text-[var(--mute)] md:mt-3 md:text-[15px] md:leading-7">{item.summary}</p>
      <ul className="mt-3 hidden space-y-2 md:block">
        {item.points.map((point) => (
          <li key={point.label} className="text-[13px] leading-5">
            <span className="font-semibold tracking-[0.12em] text-[#3b82f6] uppercase">{point.label}. </span>
            <span className="text-[var(--ink)]">{point.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 hidden flex-wrap gap-1.5 md:flex">
        {item.stack.map((tag) => (
          <span key={tag} className="text-[11px] tracking-[0.08em] text-[var(--mute)] uppercase">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-5 text-sm font-semibold">
        {item.live && (
          <a href={item.live} target="_blank" rel="noreferrer" className="text-[#3b82f6] underline underline-offset-4">
            Open live →
          </a>
        )}
        <a href={item.repo} target="_blank" rel="noreferrer" className="underline underline-offset-4">
          GitHub →
        </a>
      </div>
    </div>
  )
}
