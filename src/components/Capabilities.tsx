import { motion, useReducedMotion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { DiAws, DiJava } from 'react-icons/di'
import { LuBrain, LuPackage, LuShield } from 'react-icons/lu'
import {
  SiCloudflare,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiDotnet,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiHaskell,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiLangchain,
  SiLanggraph,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenrouter,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiRedis,
  SiSharp,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si'
import { capabilities, skills, strongest } from '../data/site'
import { Headline, Kicker, Reveal } from './Reveal'

const groups = Object.entries(skills)

const logos: Record<string, IconType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  Expo: SiExpo,
  'React Native': SiReact,
  Vite: SiVite,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  HTML: SiHtml5,
  CSS: SiCss,
  'C#': SiSharp,
  'ASP.NET Core': SiDotnet,
  Python: SiPython,
  FastAPI: SiFastapi,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  Java: DiJava,
  'C++': SiCplusplus,
  Kotlin: SiKotlin,
  Haskell: SiHaskell,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  SQLite: SiSqlite,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Prisma: SiPrisma,
  LangChain: SiLangchain,
  LangGraph: SiLanggraph,
  Gemini: SiGooglegemini,
  OpenRouter: SiOpenrouter,
  AWS: DiAws,
  Cloudflare: SiCloudflare,
  Vercel: SiVercel,
  Git: SiGit,
  GitHub: SiGithub,
  'GitHub Actions': SiGithubactions,
  Docker: SiDocker,
  'Raspberry Pi': SiRaspberrypi,
}

const proofs = [
  { Icon: LuPackage, accent: '#60a5fa', wash: 'rgb(59 130 246 / 0.14)', edge: '#3b82f6' },
  { Icon: LuBrain, accent: '#c084fc', wash: 'rgb(168 85 247 / 0.14)', edge: '#a855f7' },
  { Icon: LuShield, accent: '#4ade80', wash: 'rgb(34 197 94 / 0.14)', edge: '#22c55e' },
]

const proofEase = [0.16, 1, 0.3, 1] as const

const proofBadge = {
  hidden: { opacity: 0, scale: 0.55, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 16 } },
}

const proofLine = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: proofEase } },
}

const proofRule = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.6, ease: proofEase } },
}

function Chip({ name, delay }: { name: string; delay: number }) {
  const core = strongest.has(name)
  const hasLogo = Object.hasOwn(logos, name)
  const Logo = logos[name]
  const reduce = useReducedMotion()
  return (
    <motion.span
      className="chip inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px]"
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {hasLogo ? (
        <span className={`inline-flex rounded-full ${core ? 'p-0.5 ring-2 ring-[#22c55e]' : ''}`}>
          <Logo aria-hidden className="text-[14px]" style={core ? { color: '#22c55e' } : undefined} />
        </span>
      ) : null}
      {core && hasLogo ? <span className="sr-only">shipped in production</span> : null}
      {name}
    </motion.span>
  )
}

function ProofCard({ card, index }: { card: (typeof capabilities)[number]; index: number }) {
  const reduce = useReducedMotion()
  const { Icon, accent, wash, edge } = proofs[index]
  return (
    <motion.article
      className="relative h-full py-1 pl-6 md:pl-8"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.12,
            ease: proofEase,
            staggerChildren: 0.08,
            delayChildren: 0.08,
          },
        },
      }}
    >
      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-0.5 origin-top"
        style={{ background: edge }}
        variants={proofRule}
      />
      <motion.span
        className="grid h-10 w-10 place-items-center rounded-xl"
        style={{ background: wash, color: accent }}
        variants={proofBadge}
      >
        <Icon aria-hidden className="text-[18px]" />
      </motion.span>
      <motion.p className="mt-4 text-[11px] tracking-[0.16em] uppercase" style={{ color: accent }} variants={proofLine}>
        {card.n} · {card.kicker}
      </motion.p>
      <motion.h3 className="mt-1.5 font-display text-lg font-semibold" variants={proofLine}>
        {card.title}
      </motion.h3>
      <motion.p className="mt-2 max-w-[36ch] text-sm leading-7 text-[var(--mute)]" variants={proofLine}>
        {card.body}
      </motion.p>
    </motion.article>
  )
}

export function Capabilities() {
  return (
    <section id="what-i-can-do" className="relative scroll-mt-24 px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>My capabilities</Kicker>
          <Headline className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl" text={'One ecosystem.\nEvery layer.'} />
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--mute)] md:text-base">
            Full-stack, data, AI, cloud, and IoT — the same person from the interface to the till, the agent, and the deploy.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {groups.map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.06} y={32}>
              <article className="panel px-4 py-3">
                <p className="text-[11px] tracking-[0.18em] text-[#3b82f6] uppercase">
                  {String(i + 1).padStart(2, '0')} {group}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {items.map((item, chip) => (
                    <Chip key={item} name={item} delay={0.04 * chip} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {capabilities.map((card, i) => (
            <ProofCard key={card.n} card={card} index={i} />
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--mute)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[#22c55e]" /> A green ring marks my strongest languages and tools.
        </p>
      </div>
    </section>
  )
}
