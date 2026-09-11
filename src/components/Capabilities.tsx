import { capabilities, skills } from '../data/site'

export function Capabilities() {
  return (
    <section id="what-i-can-do" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.28em] text-[#3b82f6] uppercase">My capabilities</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          One ecosystem.
          <span className="mt-1 block text-[var(--mute)]">Every layer.</span>
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-[var(--mute)]">
          Full-stack, data, AI, cloud, and IoT — the same person from the interface to the till, the agent, and the deploy.
        </p>

        <div className="mt-12 space-y-6 border-t pt-2" style={{ borderColor: 'var(--line)' }}>
          {Object.entries(skills).map(([group, items], i) => (
            <div
              key={group}
              className="grid gap-3 border-b py-5 md:grid-cols-[10rem_1fr] md:items-start"
              style={{ borderColor: 'var(--line)' }}
            >
              <p className="text-[11px] tracking-[0.18em] text-[#3b82f6] uppercase">
                {String(i + 1).padStart(2, '0')} {group}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: 'var(--line)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {capabilities.map((card) => (
            <article key={card.n} className="card p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="font-display text-3xl font-bold text-[var(--mute)]">{card.n}</p>
                <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">{card.kicker}</p>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mute)]">{card.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="rounded-full border px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase" style={{ borderColor: 'var(--line)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
