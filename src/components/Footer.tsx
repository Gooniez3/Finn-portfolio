import { nav, profile } from '../data/site'
import { scrollToId } from '../hooks/useLenis'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Reveal } from './Reveal'

const socials = [
  { href: `mailto:${profile.email}`, label: 'Email', detail: profile.email, Icon: MailIcon, external: false },
  { href: profile.github, label: 'GitHub', detail: profile.githubName, Icon: GitHubIcon, external: true },
  { href: profile.linkedin, label: 'LinkedIn', detail: 'saw-lwin-htoo', Icon: LinkedInIcon, external: true },
]

const live = [
  { label: 'CapyTech POS', detail: 'Live on a shop PC' },
  { label: 'StudyMate AI', detail: 'studymateai.app', href: 'https://studymateai.app' },
  { label: 'Dairy Flat Air', detail: 'Live on Vercel', href: 'https://dairy-flat-air-booking.vercel.app' },
  { label: 'Finn Portfolio', detail: 'finn-portfolio-blush.vercel.app', href: 'https://finn-portfolio-blush.vercel.app' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t px-5 pt-16 pb-[max(6.75rem,env(safe-area-inset-bottom))] md:px-8 md:pt-20 md:pb-12"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b pb-12 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'var(--line)' }}>
          <Reveal y={24} blur={false}>
            <p className="text-[11px] tracking-[0.2em] text-[var(--mute)] uppercase">Explore</p>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="text-sm text-[var(--ink)] transition hover:text-[#3b82f6]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={24} delay={0.06} blur={false}>
            <p className="text-[11px] tracking-[0.2em] text-[var(--mute)] uppercase">Connect</p>
            <ul className="mt-4 space-y-3">
              {socials.map(({ href, label, detail, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 text-sm transition hover:text-[#3b82f6]"
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border" style={{ borderColor: 'var(--line)' }}>
                      <Icon />
                    </span>
                    <span>
                      <span className="block text-[10px] tracking-[0.14em] text-[var(--mute)] uppercase">{label}</span>
                      <span className="font-medium">{detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={24} delay={0.12} blur={false}>
            <p className="text-[11px] tracking-[0.2em] text-[var(--mute)] uppercase">Shipped</p>
            <ul className="mt-4 space-y-3">
              {live.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="block transition hover:text-[#3b82f6]">
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-[var(--mute)]">{item.detail}</span>
                    </a>
                  ) : (
                    <span className="block">
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-[var(--mute)]">{item.detail}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={24} delay={0.18} blur={false}>
            <p className="text-[11px] tracking-[0.2em] text-[var(--mute)] uppercase">Currently</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-[var(--mute)]">Building</span>
                <span className="font-medium">Full-stack and AI products</span>
              </li>
              <li>
                <span className="block text-[var(--mute)]">Based</span>
                <span className="font-medium">{profile.city}</span>
              </li>
              <li>
                <span className="block text-[var(--mute)]">Open to</span>
                <span className="font-medium">Software engineering roles</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-sm text-[var(--mute)]">
            <p>
              © {year} {profile.name}. Designed & built by {profile.handle}.
            </p>
            <p className="mt-2 font-medium text-[var(--ink)]">Full-Stack Developer · AI Builder · Continuous Learner</p>
          </div>
          <button type="button" onClick={() => scrollToId('hero')} className="text-left text-sm text-[var(--ink)] transition hover:text-[#3b82f6] sm:text-right">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
