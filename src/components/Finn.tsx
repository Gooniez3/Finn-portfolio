import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/site'
import { answerFinn, prompts } from '../lib/finn'

type Msg = { role: 'user' | 'finn'; text: string }

export function Finn({
  open,
  onOpen,
  onClose,
}: {
  open: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [wide, setWide] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'finn', text: `I'm Finn AI — ask about Saw's work, stack, or whether he'd fit a role.` },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const ask = (question: string) => {
    const q = question.trim()
    if (!q || busy) return
    setInput('')
    const full = answerFinn(q)
    setMessages((prev) => [...prev, { role: 'user', text: q }, { role: 'finn', text: '' }])
    setBusy(true)
    let i = 0
    if (timer.current) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      i += 3
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last?.role === 'finn') next[next.length - 1] = { role: 'finn', text: full.slice(0, i) }
        return next
      })
      if (i >= full.length) {
        if (timer.current) window.clearInterval(timer.current)
        setBusy(false)
      }
    }, 12)
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={onOpen}
          className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full p-2 text-sm font-semibold shadow-lg sm:right-6 sm:bottom-6 sm:px-4 sm:py-3"
          aria-label="Ask Finn AI"
          style={{ background: 'var(--ink)', color: 'var(--bg)' }}
        >
          <img src={profile.photo} alt="" className="h-8 w-8 rounded-full object-cover object-top sm:h-7 sm:w-7" />
          <span className="hidden sm:inline">Ask Finn AI</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close Finn"
              className="fixed inset-0 z-[110] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              initial={wide ? { x: 40 } : { y: '-100%' }}
              animate={wide ? { x: 0 } : { y: 0 }}
              exit={wide ? { x: 40 } : { y: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed z-[120] flex flex-col overflow-hidden border max-md:inset-x-0 max-md:top-0 max-md:h-[100dvh] max-md:border-b md:inset-y-0 md:right-0 md:h-auto md:w-full md:max-w-md md:border-l"
              style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
            >
              <div className="border-b pt-[max(0.5rem,env(safe-area-inset-top))]" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4">
                  <img src={profile.photo} alt="" className="h-10 w-10 rounded-full object-cover object-top" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold">Finn AI</p>
                    <p className="text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">Ask anything about Saw</p>
                  </div>
                  <button type="button" onClick={onClose} className="min-h-11 px-2 text-[11px] uppercase">
                    Close
                  </button>
                </div>
              </div>
              <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 md:px-5 md:py-5">
                {messages.map((msg, i) => (
                  <div key={`${msg.role}-${i}`} className={msg.role === 'user' ? 'text-right' : ''}>
                    <p className="text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">{msg.role === 'finn' ? 'Finn' : 'You'}</p>
                    <p
                      className={`mt-1 rounded-2xl px-3.5 py-2.5 text-left text-[15px] leading-6 md:text-sm ${
                        msg.role === 'user' ? 'inline-block max-w-[85%]' : 'block w-full md:max-w-[92%]'
                      }`}
                      style={{ background: msg.role === 'user' ? '#2563eb' : 'var(--card)', color: msg.role === 'user' ? '#fff' : 'var(--ink)' }}
                    >
                      {msg.text}
                      {busy && i === messages.length - 1 && msg.role === 'finn' ? '▍' : ''}
                    </p>
                  </div>
                ))}
              </div>
              <div className="shrink-0 border-t px-4 py-3 md:px-5" style={{ borderColor: 'var(--line)' }}>
                <div className="flex flex-wrap gap-2">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => ask(prompt)}
                      className="rounded-full border px-3 py-2 text-left text-[12px]"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <form
                className="flex shrink-0 border-t pb-[max(0.5rem,env(safe-area-inset-bottom))]"
                style={{ borderColor: 'var(--line)' }}
                onSubmit={(event) => {
                  event.preventDefault()
                  ask(input)
                }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about Saw…"
                  className="min-h-12 flex-1 bg-transparent px-4 py-3 outline-none md:px-5 md:py-4"
                />
                <button type="submit" className="min-h-12 px-4 text-[11px] tracking-[0.16em] text-[#3b82f6] uppercase md:px-5">
                  Send
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
