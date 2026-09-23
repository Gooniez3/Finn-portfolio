import { useEffect, useState } from 'react'
import { profile } from '../data/site'
import { Reveal } from './Reveal'

const facts = [
  { n: '01', title: 'SG BusFlow', detail: 'Buses, journeys, Ask BusFlow' },
  { n: '02', title: 'NetScope', detail: 'Desktop network diagnostics' },
  { n: '03', title: 'CapyTech POS', detail: 'Live on a shop PC' },
  { n: '04', title: 'StudyMate AI', detail: 'studymateai.app' },
  { n: '05', title: 'Dairy Flat Air', detail: 'Live on Vercel' },
  { n: '06', title: 'Finn Portfolio', detail: 'This site' },
]

export function Now() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('en-SG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Singapore',
        }).format(new Date()),
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative border-y px-5 py-6 md:px-8" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <Reveal y={16}>
          <p className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-[var(--mute)] uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e] opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            </span>
            {profile.city} · {time || '--:--'}
          </p>
        </Reveal>
        <div className="grid flex-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal key={fact.n} delay={0.08 * i} y={20}>
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] tracking-[0.14em] text-[#3b82f6]">{fact.n}</span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold">{fact.title}</p>
                  <p className="text-xs text-[var(--mute)]">{fact.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
