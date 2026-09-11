import { motion } from 'framer-motion'
import { aiCards } from '../data/site'

export function AI() {
  return (
    <section id="ai" className="relative scroll-mt-24 border-t border-line px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <p className="font-mono text-[11px] tracking-[0.22em] text-blue uppercase">04 — AI</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">
          Agents with a job, not a chat box.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-mute">
          The proof is StudyMate AI — live at studymateai.app. Workflows, retrieval, and streaming, not a wrapper around a single prompt.
        </p>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {aiCards.map((card, i) => (
            <motion.article
              key={card.n}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="corners bg-paper p-6"
            >
              <span className="c-bl" />
              <span className="c-br" />
              <p className="font-mono text-[11px] tracking-[0.18em] text-blue">{card.n}</p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em]">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{card.body}</p>
            </motion.article>
          ))}
        </div>
        <a
          href="https://studymateai.app"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex bg-ink px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-bg uppercase"
        >
          Open StudyMate AI →
        </a>
      </div>
    </section>
  )
}
