import { useState, type FormEvent } from 'react'
import { profile } from '../data/site'
import { ContactCompact, ContactLinks } from './Icons'
import { Headline, Kicker, Reveal } from './Reveal'

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio — ${name}`)}&body=${encodeURIComponent(`${message}\n\n${email}`)}`
    setSent(true)
  }

  if (sent) {
    return <p className="py-6 font-display text-xl font-bold">Opening your mail app.</p>
  }

  const field = 'mt-1.5 block w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none'

  return (
    <form onSubmit={submit}>
      <label className="block text-xs tracking-[0.08em] text-[var(--mute)] uppercase">
        Name
        <input required name="name" className={`${field} min-h-10`} style={{ borderColor: 'var(--line)' }} />
      </label>
      <label className="mt-3 block text-xs tracking-[0.08em] text-[var(--mute)] uppercase">
        Email
        <input required type="email" name="email" className={`${field} min-h-10`} style={{ borderColor: 'var(--line)' }} />
      </label>
      <label className="mt-3 block text-xs tracking-[0.08em] text-[var(--mute)] uppercase">
        Message
        <textarea required name="message" rows={compact ? 3 : 4} className={field} style={{ borderColor: 'var(--line)' }} />
      </label>
      <button
        type="submit"
        className="btn-glow mt-4 min-h-11 rounded-full px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase"
        style={{ background: 'var(--ink)', color: 'var(--bg)' }}
      >
        Send me a message →
      </button>
    </form>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-10 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl md:hidden">
        <Kicker>Contact</Kicker>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em]">Let’s work together</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--mute)]">Open to junior full-time software engineering and focused freelance builds.</p>
        <div className="mt-4">
          <ContactCompact />
        </div>
        <div className="panel mt-3 p-4">
          <ContactForm compact />
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl gap-10 md:grid lg:grid-cols-2">
        <Reveal>
          <Kicker>Contact</Kicker>
          <Headline className="mt-3 font-display text-6xl font-bold tracking-[-0.04em]" text="Let’s work together" />
          <p className="mt-4 max-w-md text-[var(--mute)]">
            Open to junior full-time software engineering and focused freelance builds. Tap an icon to email, open GitHub, or connect on LinkedIn.
          </p>
          <ContactLinks />
        </Reveal>
        <Reveal delay={0.12} y={40}>
          <div className="card p-6">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
