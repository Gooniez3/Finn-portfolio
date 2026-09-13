import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const
const spring = { type: 'spring' as const, stiffness: 90, damping: 18 }

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  style,
  blur = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  style?: CSSProperties
  blur?: boolean
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, scale: 0.96, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -6% 0px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function Headline({
  text,
  className,
  delay = 0,
  as: Tag = 'h2',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3'
}) {
  const reduce = useReducedMotion()
  const lines = text.split('\n')
  const MotionTag = motion[Tag]

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, lineIndex) => (
          <span key={line} className={lineIndex > 0 ? 'mt-1 block text-[var(--mute)]' : 'block'}>
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      aria-label={text.replace(/\n/g, ' ')}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
    >
      {lines.map((line, lineIndex) => (
        <span key={line} className={lineIndex > 0 ? 'mt-1 block text-[var(--mute)]' : 'block'}>
          {line.split(' ').map((word, i) => (
            <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '110%' },
                  show: { y: '0%', transition: { duration: 0.6, ease, delay: lineIndex * 0.08 } },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}

export function SplitChars({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  return (
    <h1 className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={`${ch}-${i}`} className="inline-block overflow-hidden align-bottom">
          {reduce ? (
            ch === ' ' ? '\u00A0' : ch
          ) : (
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.55, delay: delay + i * 0.035, ease }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          )}
        </span>
      ))}
    </h1>
  )
}

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-[11px] tracking-[0.28em] text-[#3b82f6] uppercase ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#3b82f6] opacity-50" />
        <span className="relative h-2 w-2 rounded-full bg-[#3b82f6]" />
      </span>
      {children}
    </p>
  )
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [shown, setShown] = useState(reduce ? value : '')

  useEffect(() => {
    if (reduce || !inView) return
    const numeric = Number.parseFloat(value)
    if (Number.isNaN(numeric)) {
      setShown(value)
      return
    }
    const suffix = value.replace(/^[\d.]+/, '')
    const decimals = (value.split('.')[1] || '').replace(/\D.*/, '').length
    const start = performance.now()
    const duration = 1100
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setShown(`${(numeric * eased).toFixed(decimals)}${suffix}`)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, value])

  return (
    <p ref={ref} className={className}>
      {shown || value}
    </p>
  )
}
