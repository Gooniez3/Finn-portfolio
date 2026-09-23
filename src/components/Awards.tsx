import { certs, education } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

export function Awards() {
  return (
    <section id="awards" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <Kicker className="text-[var(--mute)]">Recognition</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text="Education and certificates"
          />
          <p className="mt-4 max-w-xl text-[var(--mute)]">
            Diploma first. Then Massey at 8.39 / 9.00, and Top Student at graduation. IBM papers on RAG and DevOps on top.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08} y={32}>
              <div className="card p-6">
                <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">{item.kicker}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{item.name}</h3>
                <p className="mt-2 text-[var(--mute)]">{item.detail}</p>
              </div>
            </Reveal>
          ))}
          {certs.map((cert, i) => (
            <Reveal key={cert.name} delay={(education.length + i) * 0.08} y={32}>
              <a href={cert.href} target="_blank" rel="noreferrer" className="card block p-6">
                <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">Certificate</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{cert.name}</h3>
                <p className="mt-6 text-sm text-[#93c5fd]">Open PDF →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
