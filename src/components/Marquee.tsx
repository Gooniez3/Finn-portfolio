import { marquee } from '../data/site'

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="relative overflow-hidden border-y py-3" style={{ borderColor: 'var(--line)' }} aria-hidden>
      <div className="skill-track gap-10 pr-10">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 text-[12px] tracking-[0.22em] text-[var(--mute)] uppercase">
            {item}
            <span className="text-[#3b82f6]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
