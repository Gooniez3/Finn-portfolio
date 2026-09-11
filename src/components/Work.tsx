import { useEffect, useState } from 'react'
import { projects } from '../data/site'

export function Work() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const project = projects[active]

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % projects.length), 5600)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <section id="work" className="relative overflow-x-clip scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.28em] text-[#3b82f6] uppercase">Selected work</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">Shipped products</h2>
        <p className="mt-3 max-w-xl text-[var(--mute)]">Three systems with users. Not a gallery of demos.</p>

        <div className="mt-10 space-y-8 md:hidden">
          {projects.map((item) => (
            <article key={item.id} className="card overflow-hidden">
              <div className="bg-[var(--bg)] px-2 pt-2">
                <img src={item.image} alt={item.name} className="aspect-[16/9] w-full object-contain" />
              </div>
              <ProjectCopy item={item} compact />
            </article>
          ))}
        </div>

        <div
          className="mt-12 hidden md:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto h-[400px] max-w-6xl lg:h-[440px]" style={{ perspective: '1200px' }}>
            {projects.map((item, i) => {
              const offset = i - active
              const abs = Math.abs(offset)
              const selected = abs === 0
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActive(i)
                    setPaused(true)
                  }}
                  className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl border shadow-2xl"
                  style={{
                    width: selected ? 'min(58%, 640px)' : 'min(46%, 400px)',
                    height: selected ? '100%' : '78%',
                    borderColor: 'var(--line)',
                    background: 'var(--bg)',
                    transform: `translate(-50%, -50%) translateX(${offset * 320}px) rotateY(${offset * -14}deg) translateZ(${selected ? 48 : -160}px) scale(${1 - abs * 0.1})`,
                    zIndex: 20 - abs,
                    opacity: abs > 2 ? 0 : selected ? 1 : 0.72,
                    pointerEvents: abs > 2 ? 'none' : 'auto',
                    transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), width 0.55s cubic-bezier(0.16,1,0.3,1), height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                  }}
                >
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </button>
              )
            })}
          </div>

          <ProjectCopy item={project} />

          <div className="mt-8 flex justify-center gap-2">
            {projects.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  onClick={() => setActive(i)}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: i === active ? 'var(--ink)' : 'var(--line)' }}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCopy({
  item,
  compact = false,
}: {
  item: (typeof projects)[number]
  compact?: boolean
}) {
  return (
    <div className={compact ? 'p-5' : 'mx-auto mt-12 max-w-4xl text-center'}>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#3b82f6] uppercase">{item.kicker}</p>
      <h3
        className={
          compact
            ? 'mt-2 font-display text-2xl font-bold tracking-[-0.03em]'
            : 'mt-3 font-display text-5xl font-bold tracking-[-0.05em] text-balance md:text-6xl'
        }
      >
        {item.name}
      </h3>
      <p
        className={
          compact
            ? 'mt-3 text-[15px] leading-7 text-[var(--ink)]'
            : 'mx-auto mt-5 max-w-2xl text-xl leading-8 font-medium text-balance text-[var(--ink)] md:text-[22px] md:leading-9'
        }
      >
        {item.blurb}
      </p>
      <ul className={compact ? 'mt-5 grid gap-3 text-left' : 'mt-9 grid gap-3 text-left sm:grid-cols-2'}>
        {item.points.map((point) => (
          <li
            key={point.label}
            className="rounded-2xl border px-4 py-4"
            style={{ borderColor: 'var(--line)', background: 'var(--card)' }}
          >
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#3b82f6] uppercase">{point.label}</p>
            <p className="mt-2 text-[15px] leading-6 text-[var(--ink)]">{point.text}</p>
          </li>
        ))}
      </ul>
      <div className={compact ? 'mt-4 flex flex-wrap gap-2' : 'mt-7 flex flex-wrap justify-center gap-2'}>
        {item.stack.map((tag) => (
          <span key={tag} className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.08em] uppercase" style={{ borderColor: 'var(--line)' }}>
            {tag}
          </span>
        ))}
      </div>
      <div className={compact ? 'mt-4 flex flex-wrap gap-3 text-sm font-semibold' : 'mt-6 flex justify-center gap-6 text-sm font-semibold'}>
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
