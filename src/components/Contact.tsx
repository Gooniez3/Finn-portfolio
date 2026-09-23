import { useState } from 'react'
import { profile } from '../data/site'
import { ContactInline } from './Icons'
import { Headline, Kicker, Reveal } from './Reveal'

const field =
  'mt-1 block w-full border-0 border-b bg-transparent px-0 py-2 text-sm outline-none focus:border-[#3b82f6]'

export function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <Kicker>Contact</Kicker>
          <Headline
            className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-5xl"
            text="Let’s work together"
          />
          <p className="mt-3 text-sm leading-relaxed text-[var(--mute)] md:text-base">
            Open to junior full-time software engineering and focused freelance builds.
          </p>
          <ContactInline className="mt-6" />
        </Reveal>

        <Reveal delay={0.08} y={20}>
          <form
            className="mt-8 text-left"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              const name = String(data.get('name') || '')
              const email = String(data.get('email') || '')
              const message = String(data.get('message') || '')
              window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio — ${name}`)}&body=${encodeURIComponent(`${message}\n\n${email}`)}`
              setSent(true)
            }}
          >
            {sent ? (
              <p className="py-6 text-center font-display text-2xl font-bold">Opening your mail app.</p>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-[11px] tracking-[0.14em] text-[var(--mute)] uppercase">
                    Name
                    <input required name="name" className={field} style={{ borderColor: 'var(--line)' }} />
                  </label>
                  <label className="block text-[11px] tracking-[0.14em] text-[var(--mute)] uppercase">
                    Email
                    <input required type="email" name="email" className={field} style={{ borderColor: 'var(--line)' }} />
                  </label>
                </div>
                <label className="mt-4 block text-[11px] tracking-[0.14em] text-[var(--mute)] uppercase">
                  Message
                  <textarea required name="message" rows={3} className={field} style={{ borderColor: 'var(--line)' }} />
                </label>
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="btn-glow min-h-11 rounded-full px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase"
                    style={{ background: 'var(--ink)', color: 'var(--bg)' }}
                  >
                    Send me a message →
                  </button>
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
