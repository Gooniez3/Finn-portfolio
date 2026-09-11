import { useEffect, useState } from 'react'
import { profile } from '../data/site'

const facts = [
  { n: '01', title: 'CapyTech POS', detail: 'Live on a shop PC' },
  { n: '02', title: 'StudyMate AI', detail: 'studymateai.app' },
  { n: '03', title: 'Dairy Flat Air', detail: 'Live on Vercel' },
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
        <p className="shrink-0 text-[11px] tracking-[0.18em] text-[var(--mute)] uppercase">
          {profile.city} · {time || '--:--'}
        </p>
        <div className="grid flex-1 gap-x-8 gap-y-3 sm:grid-cols-3 md:max-w-3xl">
          {facts.map((fact) => (
            <div key={fact.n} className="flex items-baseline gap-3">
              <span className="text-[11px] tracking-[0.14em] text-[#3b82f6]">{fact.n}</span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold">{fact.title}</p>
                <p className="text-xs text-[var(--mute)]">{fact.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
