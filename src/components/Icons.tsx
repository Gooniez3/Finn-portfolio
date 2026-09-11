import { profile } from '../data/site'

export function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  )
}

export function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 9h3v12h-3V9Zm6 0h2.87v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V21h-3v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.68-2.49 3.42V21h-3V9Z" />
    </svg>
  )
}

const links = [
  { href: `mailto:${profile.email}`, label: 'Email', detail: profile.email, Icon: MailIcon, external: false },
  { href: profile.github, label: 'GitHub', detail: profile.githubName, Icon: GitHubIcon, external: true },
  { href: profile.linkedin, label: 'LinkedIn', detail: 'saw-lwin-htoo', Icon: LinkedInIcon, external: true },
]

export function SocialIcons({ className = '' }: { className?: string }) {
  const item =
    'grid h-10 w-10 place-items-center rounded-full border transition hover:border-[#3b82f6] hover:text-[#3b82f6]'
  return (
    <div className={`flex gap-3 ${className}`}>
      {links.map(({ href, label, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={item}
          style={{ borderColor: 'var(--line)' }}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}

export function ContactLinks() {
  return (
    <div className="mt-8 grid gap-3">
      {links.map(({ href, label, detail, Icon, external }) => (
        <a
          key={label}
          href={href}
          className="flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 transition hover:border-[#3b82f6]"
          style={{ borderColor: 'var(--line)', background: 'var(--card)' }}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border" style={{ borderColor: 'var(--line)' }}>
            <Icon />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">{label}</span>
            <span className="mt-0.5 block truncate text-sm font-medium">{detail}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
