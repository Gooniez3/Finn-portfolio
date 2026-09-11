import Lenis from 'lenis'
import { useEffect } from 'react'

let lenis: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -24 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
