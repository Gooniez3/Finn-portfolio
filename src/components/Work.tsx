import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

function ringOffset(index: number, active: number, count: number) {
  let offset = index - active
  if (offset > count / 2) offset -= count
  if (offset < -count / 2) offset += count
  return offset
}

type Project = (typeof projects)[number]

export function Work() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [wide, setWide] = useState(false)
  const dragX = useRef<number | null>(null)
  const swiped = useRef(false)
  const project = projects[active]
  const reduce = useReducedMotion()

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
    <section id="work" className="relative overflow-x-clip scroll-mt-24 px-5 py-12 md:px-8 md:py-24" style={{ overflowAnchor: 'none' }}>
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
          className="mt-8 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)] lg:items-center lg:gap-10"
          onMouseEnter={() => wide && setPaused(true)}
          onMouseLeave={() => wide && setPaused(false)}
          onPointerDown={(event) => {
            if (event.pointerType === 'mouse') return
            dragX.current = event.clientX
          }}
          onPointerUp={(event) => {
            if (dragX.current == null) return
            const delta = event.clientX - dragX.current
            dragX.current = null
            if (delta > 36) {
              swiped.current = true
              step(-1)
            } else if (delta < -36) {
              swiped.current = true
              step(1)
            }
          }}
          onClickCapture={(event) => {
            if (!swiped.current) return
            swiped.current = false
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          <div className="min-w-0 overflow-hidden">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto h-[220px] max-w-6xl [transform-style:preserve-3d] md:h-[380px] lg:h-[420px]"
              style={{ perspective: wide ? '1200px' : '900px' }}
            >
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]/20 blur-3xl lg:h-56 lg:w-56" />
              {projects.map((item, i) => {
                const offset = ringOffset(i, active, projects.length)
                const abs = Math.abs(offset)
                const selected = abs === 0
                const spread = wide ? 168 : 72
                const depth = wide ? 140 : 70
                const hidden = abs > (wide ? 2 : 1)
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.name}
                    onClick={() => go(i)}
                    className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl border shadow-2xl"
                    style={{
                      width: selected ? (wide ? '58%' : '72%') : wide ? '40%' : '54%',
                      height: selected ? '100%' : '76%',
                      borderColor: 'var(--line)',
                      background: 'var(--bg)',
                      transform: `translate(-50%, -50%) translateX(${offset * spread}px) rotateY(${offset * (wide ? -16 : -22)}deg) translateZ(${selected ? 40 : -depth}px) scale(${1 - abs * 0.08})`,
                      zIndex: 20 - abs,
                      opacity: hidden ? 0 : selected ? 1 : 0.72,
                      pointerEvents: hidden ? 'none' : 'auto',
                      transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), width 0.55s cubic-bezier(0.16,1,0.3,1), height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                    }}
                  >
                    <img src={item.image} alt="" className="h-full w-full object-contain" />
                  </button>
                )
              })}
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => step(-1)}
                className="absolute inset-y-0 left-0 z-30 w-[24%]"
              />
              <button
                type="button"
                aria-label="Next project"
                onClick={() => step(1)}
                className="absolute inset-y-0 right-0 z-30 w-[24%]"
              />
            </motion.div>

            <div className="relative mt-4 h-[252px] overflow-hidden md:hidden" style={{ overflowAnchor: 'none' }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={project.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <PhoneCopy item={project} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 lg:mt-5">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => step(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border text-lg lg:hidden"
                style={{ borderColor: 'var(--line)' }}
              >
                ‹
              </button>
              <div className="flex gap-2">
                {projects.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.name}
                    onClick={() => go(i)}
                    className="h-2 w-2 rounded-full lg:h-2.5 lg:w-2.5"
                    style={{ background: i === active ? 'var(--ink)' : 'var(--line)' }}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => step(1)}
                className="grid h-10 w-10 place-items-center rounded-full border text-lg lg:hidden"
                style={{ borderColor: 'var(--line)' }}
              >
                ›
              </button>
            </div>
          </div>

          <motion.div
            className="relative mt-2 hidden min-h-[520px] md:block lg:mt-0"
            style={{ overflowAnchor: 'none' }}
            initial={reduce ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
              <DeskCopy item={project} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PhoneCopy({ item }: { item: Project }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-[#3b82f6] uppercase">{item.kicker}</p>
      <h3 className="mt-1 font-display text-xl font-bold tracking-[-0.03em]">{item.name}</h3>
      <p className="mt-1.5 line-clamp-8 text-[13px] leading-5 text-[var(--mute)]">{item.blurb}</p>
      <Links item={item} className="mt-2" />
    </div>
  )
}

function DeskCopy({ item }: { item: Project }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#3b82f6] uppercase">{item.kicker}</p>
      <h3 className="mt-2 font-display text-4xl font-bold tracking-[-0.04em]">{item.name}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--mute)]">{item.blurb}</p>
      <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {item.points.map((point) => (
          <li key={point.label} className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#3b82f6] uppercase">{point.label}</p>
            <p className="mt-0.5 text-[13px] leading-5 text-[var(--ink)]">{point.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {item.stack.map((tag) => (
          <span key={tag} className="chip px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] uppercase">
            {tag}
          </span>
        ))}
      </div>
      <Links item={item} className="mt-3" />
    </div>
  )
}

function Links({ item, className }: { item: Project; className?: string }) {
  return (
    <div className={`flex gap-4 text-sm font-semibold ${className ?? ''}`}>
      {item.live && (
        <a href={item.live} target="_blank" rel="noreferrer" className="text-[#3b82f6] underline underline-offset-4">
          Open live →
        </a>
      )}
      <a href={item.repo} target="_blank" rel="noreferrer" className="underline underline-offset-4">
        GitHub →
      </a>
    </div>
  )
}
