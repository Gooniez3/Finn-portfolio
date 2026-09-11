import { motion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [delta, setDelta] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: delta.x, y: delta.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.4 }}
      onMouseMove={(event) => {
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        setDelta({
          x: (event.clientX - box.left - box.width / 2) * 0.28,
          y: (event.clientY - box.top - box.height / 2) * 0.28,
        })
      }}
      onMouseLeave={() => setDelta({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  )
}
