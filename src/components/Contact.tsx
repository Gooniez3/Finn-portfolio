import { useState } from 'react'
import { profile } from '../data/site'
import { ContactLinks } from './Icons'

export function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-16 pb-28 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-[#3b82f6] uppercase">Contact</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] md:text-6xl">Let’s work together</h2>
          <p className="mt-4 max-w-md text-[var(--mute)]">
            Open to full-time software engineering and focused freelance builds. Tap an icon to email, open GitHub, or connect on LinkedIn.
          </p>
          <ContactLinks />
        </div>
        <form
          className="card p-5 md:p-6"
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
            <p className="py-10 font-display text-2xl font-bold">Opening your mail app.</p>
          ) : (
            <>
              <label className="block text-sm">
                Name
                <input required name="name" className="mt-2 mb-4 block min-h-11 w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: 'var(--line)' }} />
              </label>
              <label className="block text-sm">
                Email
                <input required type="email" name="email" className="mt-2 mb-4 block min-h-11 w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: 'var(--line)' }} />
              </label>
              <label className="block text-sm">
                Message
                <textarea required name="message" rows={4} className="mt-2 mb-5 block w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: 'var(--line)' }} />
              </label>
              <button type="submit" className="min-h-12 rounded-full px-5 py-3 text-[11px] tracking-[0.16em] uppercase" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
                Send me a message →
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
