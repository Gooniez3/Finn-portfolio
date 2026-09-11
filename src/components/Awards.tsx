import { certs, education } from '../data/site'

export function Awards() {
  return (
    <section id="awards" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] tracking-[0.28em] text-[var(--mute)] uppercase">Recognition</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">Education and certificates</h2>
        <p className="mt-4 max-w-xl text-[var(--mute)]">
          Diploma first. Then Massey at 8.8 / 9. IBM papers on RAG and DevOps on top.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <div key={item.name} className="card p-6">
              <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">{item.kicker}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{item.name}</h3>
              <p className="mt-2 text-[var(--mute)]">{item.detail}</p>
            </div>
          ))}
          {certs.map((cert) => (
            <a key={cert.name} href={cert.href} target="_blank" rel="noreferrer" className="card block p-6 hover:border-[#3b82f6]">
              <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">Certificate</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{cert.name}</h3>
              <p className="mt-6 text-sm">Open PDF →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
