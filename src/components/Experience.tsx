import { experience } from '../data/site'

export function Experience() {
  return (
    <section id="path" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.28em] text-[#3b82f6] uppercase">Path</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          From computing fundamentals
          <span className="mt-1 block text-[var(--mute)]">to AI-native products.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[var(--mute)]">
          Diploma, then Massey at 8.8 / 9. Then a shop till, a live AI app, and a booking system.
        </p>
        <div className="relative mt-12">
          <div className="absolute top-2 bottom-2 left-[7px] w-px" style={{ background: 'var(--line)' }} />
          <div className="space-y-10">
            {experience.map((item) => (
              <article key={item.title} className="flex gap-4 md:gap-6">
                <span
                  className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                  style={{ borderColor: item.n === '06' ? '#3b82f6' : 'var(--ink)', background: 'var(--bg)' }}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
