import { profile } from '../data/site'
import { SocialIcons } from './Icons'

export function Footer() {
  return (
    <footer className="relative px-5 py-10 pb-[max(5.5rem,env(safe-area-inset-bottom))] md:px-8 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--mute)]">
          {profile.name} · {profile.city}
        </p>
        <SocialIcons className="sm:mr-44" />
      </div>
    </footer>
  )
}
