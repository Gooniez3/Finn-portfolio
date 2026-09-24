import { profile } from '../data/site'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Kicker, Reveal } from './Reveal'

const channels = [
  { n: '01', label: 'Email', detail: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { n: '02', label: 'GitHub', detail: profile.githubName, href: profile.github, Icon: GitHubIcon, external: true },
  { n: '03', label: 'LinkedIn', detail: 'saw-lwin-htoo', href: profile.linkedin, Icon: LinkedInIcon, external: true },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-12 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <Reveal>
          <Kicker>Contact</Kicker>
          <h2 className="mt-3 font-display text-6xl font-bold leading-[0.86] tracking-[-0.06em] sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            Let’s
            <br />
            work
            <br />
            together
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--mute)] md:text-base">
            Open to junior full-time software engineering and focused freelance builds.
          </p>
        </Reveal>

        <Reveal delay={0.08} y={28}>
          <div className="grid gap-3">
            {channels.map(({ n, label, detail, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl border px-4 py-3 transition hover:border-[#3b82f6]"
                style={{ borderColor: 'var(--line)', background: 'var(--card)' }}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border" style={{ borderColor: 'var(--line)' }}>
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">{label}</span>
                  <span className="mt-0.5 block truncate text-sm font-medium">{detail}</span>
                </span>
                <span className="text-[11px] tracking-[0.14em] text-[var(--mute)]">{n}</span>
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 flex min-h-12 items-center justify-center rounded-full border text-[12px] font-semibold tracking-[0.16em] uppercase transition hover:border-[#3b82f6]"
              style={{ borderColor: 'var(--line)' }}
            >
              Send me a message →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
