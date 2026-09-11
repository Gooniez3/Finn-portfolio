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
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'finn', text: `I'm Finn AI — ask about Saw's work, stack, or whether he'd fit a role.` },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold shadow-lg sm:right-6 sm:bottom-6 sm:px-4"
          aria-label="Ask Finn AI"
          style={{ background: 'var(--ink)', color: 'var(--bg)' }}
        >
          <img src={profile.photo} alt="" className="h-7 w-7 rounded-full object-cover object-top" />
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
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              exit={{ x: 40 }}
              className="fixed inset-y-0 right-0 z-[120] flex w-full max-w-md flex-col border-l"
              style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
            >
              <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--line)' }}>
                <img src={profile.photo} alt="" className="h-10 w-10 rounded-full object-cover object-top" />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold">Finn AI</p>
                  <p className="text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">Ask anything about Saw</p>
                </div>
                <button type="button" onClick={onClose} className="text-[11px] uppercase">
                  Close
                </button>
              </div>
              <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {messages.map((msg, i) => (
                  <div key={`${msg.role}-${i}`} className={msg.role === 'user' ? 'text-right' : ''}>
                    <p className="text-[10px] tracking-[0.16em] text-[var(--mute)] uppercase">{msg.role === 'finn' ? 'Finn' : 'You'}</p>
                    <p
                      className="mt-1 inline-block max-w-[92%] rounded-2xl px-3 py-2 text-left text-sm leading-relaxed"
                      style={{ background: msg.role === 'user' ? '#2563eb' : 'var(--card)', color: msg.role === 'user' ? '#fff' : 'var(--ink)' }}
                    >
                      {msg.text}
                      {busy && i === messages.length - 1 && msg.role === 'finn' ? '▍' : ''}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 border-t px-5 py-3" style={{ borderColor: 'var(--line)' }}>
                {prompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => ask(prompt)} className="rounded-full border px-3 py-1 text-left text-[11px]" style={{ borderColor: 'var(--line)' }}>
                    {prompt}
                  </button>
                ))}
              </div>
              <form
                className="flex border-t"
                style={{ borderColor: 'var(--line)' }}
                onSubmit={(event) => {
                  event.preventDefault()
                  ask(input)
                }}
              >
                <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Saw…" className="flex-1 bg-transparent px-5 py-4 outline-none" />
                <button type="submit" className="px-5 text-[11px] tracking-[0.16em] text-[#3b82f6] uppercase">
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
