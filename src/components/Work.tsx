import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

  const step = (dir: number) => {
    setActive((i) => (i + dir + projects.length) % projects.length)
    setPaused(true)
  }

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
          className="mt-8 md:mt-12"
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
            if (delta > 36) step(-1)
            else if (delta < -36) step(1)
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto h-[230px] max-w-6xl [transform-style:preserve-3d] sm:h-[280px] md:h-[400px] lg:h-[440px]"
            style={{ perspective: wide ? '1200px' : '900px' }}
          >
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]/20 blur-3xl md:h-56 md:w-56" />
            {projects.map((item, i) => {
              const offset = ringOffset(i, active, projects.length)
              const abs = Math.abs(offset)
              const selected = abs === 0
              const spread = wide ? 250 : 78
              const depth = wide ? 160 : 70
              const hidden = abs > (wide ? 2 : 1)
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  onClick={() => {
                    setActive(i)
                    setPaused(true)
                  }}
                  className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl border shadow-2xl"
                  style={{
                    width: selected ? (wide ? 'min(58%, 640px)' : '70%') : wide ? 'min(46%, 400px)' : '54%',
                    height: selected ? '100%' : '76%',
                    borderColor: 'var(--line)',
                    background: 'var(--bg)',
                    transform: `translate(-50%, -50%) translateX(${offset * spread}px) rotateY(${offset * (wide ? -12 : -22)}deg) translateZ(${selected ? 36 : -depth}px) scale(${1 - abs * 0.08})`,
                    zIndex: 20 - abs,
                    opacity: hidden ? 0 : selected ? 1 : 0.7,
                    pointerEvents: hidden ? 'none' : 'auto',
                    transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), width 0.55s cubic-bezier(0.16,1,0.3,1), height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                  }}
                >
                  <img src={item.image} alt="" className="h-full w-full object-contain" />
                </button>
              )
            })}
          </motion.div>

          <div className="relative mt-4 h-[132px] md:hidden" style={{ overflowAnchor: 'none' }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={project.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#3b82f6] uppercase">{project.kicker}</p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-[-0.03em]">{project.name}</h3>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[var(--mute)]">{project.blurb}</p>
                <div className="mt-2 flex gap-4 text-sm font-semibold">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="text-[#3b82f6] underline underline-offset-4">
                      Open live →
                    </a>
                  )}
                  <a href={project.repo} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    GitHub →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 hidden md:block" style={{ overflowAnchor: 'none' }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCopy item={project} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center justify-center gap-3 md:mt-8">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => step(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border text-lg md:hidden"
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
                  onClick={() => {
                    setActive(i)
                    setPaused(true)
                  }}
                  className="h-2 w-2 rounded-full md:h-2.5 md:w-2.5"
                  style={{ background: i === active ? 'var(--ink)' : 'var(--line)' }}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => step(1)}
              className="grid h-10 w-10 place-items-center rounded-full border text-lg md:hidden"
              style={{ borderColor: 'var(--line)' }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCopy({ item }: { item: (typeof projects)[number] }) {
  return (
    <div className="mx-auto mt-12 max-w-4xl text-center">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#3b82f6] uppercase">{item.kicker}</p>
      <h3 className="mt-3 font-display text-5xl font-bold tracking-[-0.05em] text-balance md:text-6xl">{item.name}</h3>
      <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 font-medium text-balance text-[var(--ink)] md:text-[22px] md:leading-9">{item.blurb}</p>
      {item.gallery.length > 0 && (
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3">
          {item.gallery.map((src) => (
            <img
              key={src}
              src={src}
              alt={`${item.name} screenshot`}
              className="h-40 w-full rounded-xl object-contain md:h-48"
              style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}
            />
          ))}
        </div>
      )}
      <ul className="mt-9 grid gap-3 text-left sm:grid-cols-2">
        {item.points.map((point) => (
          <motion.li
            key={point.label}
            className="card px-4 py-4"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          >
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#3b82f6] uppercase">{point.label}</p>
            <p className="mt-2 text-[15px] leading-6 text-[var(--ink)]">{point.text}</p>
          </motion.li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {item.stack.map((tag) => (
          <span key={tag} className="chip px-3 py-1 text-[11px] font-medium tracking-[0.08em] uppercase">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-6 text-sm font-semibold">
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
