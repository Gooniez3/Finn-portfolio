import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function Cursor() {
  const [on, setOn] = useState(false)
  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 })
  const sx = useSpring(0, { stiffness: 180, damping: 22, mass: 0.6 })
  const sy = useSpring(0, { stiffness: 180, damping: 22, mass: 0.6 })
  const scale = useSpring(1, { stiffness: 300, damping: 24 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setOn(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      sx.set(e.clientX)
      sy.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      const hit = t?.closest('a, button, input, textarea')
      scale.set(hit ? 2.1 : 1)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [scale, sx, sy, x, y])

  if (!on) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-ink"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 rounded-full border border-ink/40"
        style={{ x: sx, y: sy, scale, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
