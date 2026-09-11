import { profile } from '../data/site'
import { scrollToId } from '../hooks/useLenis'
import { SocialIcons } from './Icons'

const facts = [
  { label: 'Focus', value: profile.focus },
  { label: 'Based', value: profile.city },
  { label: 'Open to', value: profile.openTo },
]

function Portrait({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[1.75rem] border" style={{ borderColor: 'var(--line)', background: 'var(--card)' }}>
        <img
          src={profile.photo}
          alt={`${profile.name}, full-stack developer`}
          className="aspect-[4/5] w-full object-cover object-[center_12%]"
        />
      </div>
    </div>
  )
}

export function Hero({ onAsk }: { onAsk: () => void }) {
  return (
    <section id="hero" className="relative px-5 pt-28 pb-16 md:px-8 md:pt-32 md:pb-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.28em] text-[#3b82f6] uppercase">Who I am</p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[var(--ink)]">
            Saw Lwin Htoo
          </h1>
          <p className="mt-5 font-display text-lg text-[var(--ink)] md:text-xl">{profile.role}</p>

          <Portrait className="mx-auto mt-8 w-[180px] sm:w-[200px] lg:hidden" />

          <p className="mt-8 max-w-[38rem] text-[15px] leading-7 text-[var(--mute)] md:mt-6 md:text-base md:leading-8">{profile.line}</p>

          <dl className="mt-10 max-w-[38rem] space-y-4 border-t pt-8" style={{ borderColor: 'var(--line)' }}>
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 sm:grid-cols-[6.5rem_1fr]">
                <dt className="text-[11px] tracking-[0.16em] text-[var(--mute)] uppercase">{fact.label}</dt>
                <dd className="text-sm font-medium leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToId('work')}
              className="min-h-11 rounded-full px-6 py-2.5 text-sm font-semibold"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
            >
              See the work
            </button>
            <button
              type="button"
              onClick={onAsk}
              className="min-h-11 rounded-full border px-6 py-2.5 text-sm"
              style={{ borderColor: 'var(--line)' }}
            >
              Ask Finn AI
            </button>
            <SocialIcons className="sm:ml-2" />
          </div>
        </div>

        <Portrait className="hidden lg:block lg:pt-8" />
      </div>
    </section>
  )
}
