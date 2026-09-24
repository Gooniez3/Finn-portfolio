import { motion, useReducedMotion } from 'framer-motion'
import { currently, profile, stats } from '../data/site'
import { CountUp, Kicker, Reveal } from './Reveal'

const titleWords = ['Full-Stack', 'Developer', '&', 'AI']
const titleEase = [0.16, 1, 0.3, 1] as const

function AboutTitle() {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">
        Full-Stack Developer & AI
      </h2>
    )
  }

  return (
    <motion.h2
      className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl"
      aria-label="Full-Stack Developer & AI"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
    >
      {titleWords.map((word, i) => (
        <span key={word} className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.55, delay: 0.15 + i * 0.14, ease: titleEase } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

const about = [
  'Friends call me Finn. I earned a Diploma in InfoComm Technology from PSB Academy, followed by a Bachelor of Information Sciences at Massey University, majoring in Computer Science and Information Technology, with an 8.39/9.00 GPA and recognition as a Top Student in the 2025–2026 class.',
  'I ship complete products: SG BusFlow, NetScope, a shop point-of-sale system, StudyMate AI, Dairy Flat Air, and this site. I’m a continuous learner, and I enjoy working in a team with others.',
]

const nowIcons = [
  <svg key="build" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="m8 8-3 4 3 4M16 8l3 4-3 4M13 6l-2 12" />
  </svg>,
  <svg key="explore" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="M9 3h6M10 3v5.2L6.2 17.2A3 3 0 0 0 9 22h6a3 3 0 0 0 2.8-4.8L14 8.2V3" />
    <path d="M8.5 14h7" />
  </svg>,
  <svg key="open" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <circle cx="12" cy="8" r="3" />
    <path d="M5.5 19.5c1.2-2.6 3.4-4 6.5-4s5.3 1.4 6.5 4" />
  </svg>,
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <Kicker className="text-[var(--mute)]">About me</Kicker>
        </Reveal>
        <AboutTitle />

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
                <span className="grid h-10 w-10 place-items-center rounded-full border text-[#93c5fd]" style={{ borderColor: 'var(--line)' }}>
                  {nowIcons[i]}
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
