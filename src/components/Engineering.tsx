import { useState } from 'react'
import { skills } from '../data/site'

export function Engineering() {
  const groups = Object.entries(skills)
  const [hot, setHot] = useState<string | null>(null)

  return (
    <section id="engineering" className="relative scroll-mt-24 border-t border-line px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <p className="font-mono text-[11px] tracking-[0.22em] text-blue uppercase">03 — Engineering</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">
          The stack is a system, not a list.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-mute">
          TypeScript full-stack is the through-line. AI sits on top of real data stores, not instead of them.
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map(([group, items]) => (
            <div key={group} className="corners bg-paper p-5">
              <span className="c-bl" />
              <span className="c-br" />
              <h3 className="font-mono text-[11px] tracking-[0.18em] text-blue uppercase">{group}</h3>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseEnter={() => setHot(item)}
                      onMouseLeave={() => setHot(null)}
                      className={`text-left text-sm transition-all ${
                        hot === item ? 'translate-x-1 text-blue' : hot ? 'text-mute' : 'text-ink'
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
