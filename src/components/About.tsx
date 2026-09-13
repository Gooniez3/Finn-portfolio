import { currently, profile, stats } from '../data/site'
import { CountUp, Headline, Kicker, Reveal } from './Reveal'

const about = [
  'Friends call me Finn. I started with a Diploma in InfoComm Technology at PSB Academy and continued with a Bachelor of Information Sciences at Massey University, studying Computer Science and Information Technology.',
  'I build products from idea to production — from thoughtful interfaces and reliable backends to databases, cloud infrastructure, and AI-powered features. Along the way, I’ve built a real POS system, an AI learning platform with RAG, and a flight booking system built around real scheduling and timezone logic.',
  'I’m also a first-principles learner. I like understanding how things work, picking up technologies I haven’t used before, and figuring out how to turn an idea into something people can actually use. I work with AI as part of my engineering workflow — not just to generate code, but to research, prototype, debug, experiment, and move from idea to implementation faster.',
  'I’m still learning. I’m still building. And that’s the part I enjoy most.',
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <Kicker className="text-[var(--mute)]">About me</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
            text="Full-Stack Developer & AI"
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-start">
          <Reveal y={28}>
            <img
              src={profile.photo}
              alt=""
              className="h-24 w-24 rounded-full object-cover object-[center_18%] ring-4 ring-[#3b82f6]/20 md:h-36 md:w-36"
            />
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em]">
              {profile.name.toUpperCase()}
            </h3>
            <div className="mt-4 flex flex-wrap gap-8">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">{item.label}</p>
                  <CountUp value={item.value} className="mt-1 font-display text-2xl font-bold text-[#93c5fd]" />
                </div>
              ))}
            </div>
            <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-[var(--mute)]">
              {about.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-[var(--mute)]">
              Want the repos?{' '}
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-[var(--ink)] underline underline-offset-4">
                GitHub {profile.githubName}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <p className="text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">Currently</p>
        </Reveal>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {currently.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} y={24} blur={false}>
              <div className="flex items-start gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: 'var(--line)' }}>
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#3b82f6] opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-[#3b82f6]" />
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-[var(--mute)]">{item.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
