import { useEffect, useState } from 'react'
import { useTheme } from '../context/theme'
import { nav, profile } from '../data/site'
import { scrollToId } from '../hooks/useLenis'

export function Nav({ onAsk }: { onAsk: () => void }) {
  const { dark, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    document.body.style.overflow = ''
    window.setTimeout(() => scrollToId(id), 60)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border px-2 py-2 backdrop-blur-md sm:px-3"
        style={{ background: 'var(--nav)', borderColor: 'var(--line)' }}
      >
        <button type="button" onClick={() => go('hero')} className="flex min-w-0 items-center gap-2 pl-1">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[var(--ink)] font-display text-sm font-bold text-[var(--bg)]">
            S
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-[0.12em]">{profile.handle.toUpperCase()}</span>
        </button>

        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="text-[11px] tracking-[0.14em] text-[var(--mute)] uppercase hover:text-[var(--ink)]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button type="button" aria-label="Toggle theme" onClick={toggle} className="grid h-11 w-11 place-items-center rounded-full">
            {dark ? '☀' : '☾'}
          </button>
          <button
            type="button"
            onClick={() => go('contact')}
            className="hidden min-h-11 rounded-full bg-[var(--ink)] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--bg)] uppercase sm:inline"
          >
            Hire Me
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mx-auto mt-2 max-h-[min(80vh,28rem)] max-w-6xl overflow-y-auto rounded-3xl border p-3 lg:hidden"
          style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
        >
          {nav.map((item) => (
            <button key={item.id} type="button" onClick={() => go(item.id)} className="block min-h-12 w-full py-3 text-left text-base">
              {item.label}
            </button>
          ))}
          <button type="button" className="block min-h-12 w-full py-3 text-left" onClick={() => go('contact')}>
            Hire Me
          </button>
          <button
            type="button"
            className="block min-h-12 w-full py-3 text-left"
            onClick={() => {
              setOpen(false)
              onAsk()
            }}
          >
            Finn AI
          </button>
        </div>
      )}
    </header>
  )
}
