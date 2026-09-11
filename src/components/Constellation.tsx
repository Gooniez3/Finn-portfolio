import { useMemo, useState } from 'react'
import { graph } from '../data/site'

export function Constellation() {
  const [mouse, setMouse] = useState({ x: 0.62, y: 0.4 })
  const [active, setActive] = useState<string | null>(null)

  const points = useMemo(() => {
    return graph.nodes.map((node) => {
      const dx = mouse.x * 100 - node.x
      const dy = mouse.y * 100 - node.y
      const dist = Math.hypot(dx, dy) || 1
      const pull = Math.min(9, 220 / dist)
      return {
        ...node,
        px: node.x + (dx / dist) * pull,
        py: node.y + (dy / dist) * pull,
      }
    })
  }, [mouse])

  const byId = Object.fromEntries(points.map((p) => [p.id, p]))

  return (
    <div
      className="corners relative aspect-square w-full bg-paper/70"
      onMouseMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect()
        setMouse({
          x: (event.clientX - box.left) / box.width,
          y: (event.clientY - box.top) / box.height,
        })
      }}
      onMouseLeave={() => {
        setMouse({ x: 0.62, y: 0.4 })
        setActive(null)
      }}
    >
      <span className="c-bl" />
      <span className="c-br" />
      <div className="flex items-center justify-between px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.22em] text-mute uppercase">What I work with — connected</p>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-blue" />
        </div>
      </div>
      <svg viewBox="0 0 100 100" className="h-[calc(100%-88px)] w-full">
        {graph.edges.map(([a, b]) => {
          const from = byId[a]
          const to = byId[b]
          const hot = active === a || active === b
          const accent = from.accent || to.accent
          return (
            <line
              key={`${a}-${b}`}
              x1={from.px}
              y1={from.py}
              x2={to.px}
              y2={to.py}
              stroke={hot ? '#2563eb' : accent ? '#93b4f5' : '#c9c6bb'}
              strokeWidth={hot ? 0.55 : 0.28}
            />
          )
        })}
        {points.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer"
          >
            <circle
              cx={node.px}
              cy={node.py}
              r={active === node.id ? 1.7 : 1.15}
              fill={node.accent ? '#2563eb' : '#111215'}
            />
            <text
              x={node.px + 2.4}
              y={node.py - 1.6}
              fontSize="2.6"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.12"
              fill={node.accent || active === node.id ? '#2563eb' : '#111215'}
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.18em] text-mute uppercase">Frontend → IoT</p>
        <p className="font-mono text-[10px] tracking-[0.18em] text-blue uppercase">Move your cursor — it reacts</p>
      </div>
    </div>
  )
}
