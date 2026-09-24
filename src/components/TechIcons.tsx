import type { ReactNode } from 'react'
import { strongest } from '../data/site'

function Mark({ name, children }: { name: string; children: ReactNode }) {
  const core = strongest.has(name)
  return (
    <div title={name} className="grid aspect-square place-items-center rounded-2xl border" style={{ borderColor: 'var(--line)', background: 'var(--card)' }}>
      <span className="relative grid h-11 w-11 place-items-center">
        {children}
        {core ? <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#22c55e]" /> : null}
      </span>
      <span className="sr-only">{name}{core ? ', strongest' : ''}</span>
    </div>
  )
}

export function TechGrid() {
  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
      <Mark name="React">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
        </svg>
      </Mark>
      <Mark name="Next.js">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#111" />
          <path fill="#fff" d="M8 8h2.2v5.2L15.6 8H18l-4.2 5.4V16H11.4v-2.2L8 8Z" />
        </svg>
      </Mark>
      <Mark name="TypeScript">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path fill="#fff" d="M5 10.2h6.2v1.6H9.2V19H7.2v-7.2H5v-1.6Zm8.2 0H19v1.7h-1.9c-.2 2.2-.7 3.4-1.8 3.4-.5 0-.8-.2-.8-.7h-1.8c.1 1.6 1.2 2.5 2.8 2.5 2 0 3.3-1.3 3.6-3.8H19V10.2h-5.8Z" />
        </svg>
      </Mark>
      <Mark name="JavaScript">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path fill="#111" d="M8.2 17.6c.4.7 1 1.3 2.1 1.3 1 0 1.6-.4 1.6-1.1 0-.7-.5-1-1.6-1.4l-.6-.2c-1.6-.6-2.6-1.4-2.6-3 0-1.5 1.2-2.7 3-2.7 1.3 0 2.2.4 2.9 1.6l-1.6 1c-.3-.6-.7-.9-1.3-.9-.6 0-1 .4-1 .9 0 .6.4.9 1.5 1.3l.6.2c1.8.7 2.8 1.5 2.8 3.1 0 1.8-1.4 2.8-3.3 2.8-1.6 0-2.6-.7-3.3-1.8l1.8-1.1Zm6.2-.2c.3.5.6.9 1.3.9.6 0 1-.3 1-1.3v-6h2v6.1c0 2-1.2 2.9-2.9 2.9-1.6 0-2.6-.8-3.1-1.8l1.7-.8Z" />
        </svg>
      </Mark>
      <Mark name="Node.js">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#5FA04E" d="M12 2 3 7v10l9 5 9-5V7L12 2Zm0 2.2 6.8 3.8v7.6L12 19.4 5.2 15.6V8L12 4.2Z" />
          <path fill="#5FA04E" d="M11.2 8.2h1.6v7.6h-1.6V8.2Z" />
        </svg>
      </Mark>
      <Mark name="Python">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#3776AB" d="M12 3c-2.8 0-2.6 1.2-2.6 1.2v2h2.7v.8H7.2S4.5 6.6 4.5 10.2 7 13 7 13h1.6V11s-.1-2.2 2.4-2.2h4.2s2.3.1 2.3-2.2V5.2S15 3 12 3Zm-1.4 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z" />
          <path fill="#FFD43B" d="M12 21c2.8 0 2.6-1.2 2.6-1.2v-2h-2.7v-.8h4.9s2.7.4 2.7-3.2-2.5-2.8-2.5-2.8h-1.6V13s.1 2.2-2.4 2.2H8.8s-2.3-.1-2.3 2.2v1.4S9 21 12 21Zm1.4-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z" />
        </svg>
      </Mark>
      <Mark name="C#">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <rect width="24" height="24" rx="4" fill="#68217A" />
          <path fill="#fff" d="M10.6 8.2c-2.2 0-3.8 1.7-3.8 3.8s1.6 3.8 3.8 3.8c1.4 0 2.4-.6 3.1-1.6l-1.2-.8c-.4.6-.9.9-1.7.9-1.2 0-2-1-2-2.3s.8-2.3 2-2.3c.7 0 1.2.3 1.6.8l1.2-.8c-.6-.9-1.6-1.5-3-1.5Zm5.2.4h1.2v2.2h2.2v1.2h-2.2v2.2h-1.2v-2.2H13.6V10.8h2.2V8.6Z" />
        </svg>
      </Mark>
      <Mark name="PostgreSQL">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <ellipse cx="12" cy="7" rx="5" ry="3" fill="#4169E1" />
          <path fill="#4169E1" d="M7 8.2v6.2c0 2.4 2.2 3.6 5 3.6s5-1.2 5-3.6V8.2c-1.2.8-3 .1-5 1.2-2-1.1-3.8-.4-5-1.2Z" />
          <path fill="#fff" d="M11.2 10.2h1.6v4.2h-1.6z" />
        </svg>
      </Mark>
      <Mark name="MongoDB">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#47A248" d="M12.4 2s-4.2 4.6-4.2 9.2c0 3.2 1.6 5.4 3.2 6.6.3 2.2.6 3.4.6 3.4s.5-1.2.8-3.2c1.8-1.1 3.6-3.4 3.6-6.8C16.4 6.4 12.4 2 12.4 2Zm.2 13.6c-1.2-.6-2.2-2.2-2.2-4.4 0-2.6 1.6-5.4 2.2-6.6.6 1.2 2.2 4 2.2 6.6 0 2.2-1 3.8-2.2 4.4Z" />
        </svg>
      </Mark>
      <Mark name="Tailwind CSS">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#38BDF8" d="M12 6c-2.2 0-3.6 1.1-4.2 3.3 1.1-1.1 2.3-1.5 3.6-1.2.8.2 1.3.7 1.9 1.3.9.9 2 2 4.3 2 2.2 0 3.6-1.1 4.2-3.3-1.1 1.1-2.3 1.5-3.6 1.2-.8-.2-1.3-.7-1.9-1.3C15.4 7 14.3 6 12 6Zm-4.2 6c-2.2 0-3.6 1.1-4.2 3.3 1.1-1.1 2.3-1.5 3.6-1.2.8.2 1.3.7 1.9 1.3.9.9 2 2 4.3 2 2.2 0 3.6-1.1 4.2-3.3-1.1 1.1-2.3 1.5-3.6 1.2-.8-.2-1.3-.7-1.9-1.3-.9-1-2-2-4.3-2Z" />
        </svg>
      </Mark>
      <Mark name="Docker">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#2496ED" d="M4 11h2.2V8.8H4V11Zm2.8 0h2.2V8.8H6.8V11Zm2.8 0H12V8.8H9.6V11Zm2.8 0h2.2V8.8H12.4V11ZM6.8 8.2h2.2V6H6.8v2.2Zm2.8 0H12V6H9.6v2.2Zm2.8 0h2.2V6h-2.2v2.2ZM9.6 5.4h2.2V3.2H9.6v2.2ZM3.2 12.2c0 2.6 1.8 4.2 4.4 4.6.4 1.2 1.4 2 2.8 2.2l.8-.8c-1.2-.4-1.8-1.2-2-2.2 3.2-.2 5.4-1.6 6.2-4.2h2.2c.8 0 1.6-.6 1.8-1.4-.6-.2-1.2-.6-1.4-1.2l-.6.4c-.4.2-.8.2-1.2 0l-.6-.4v1.2H3.2v1.8Z" />
        </svg>
      </Mark>
      <Mark name="Git">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <circle cx="6" cy="18" r="2.2" fill="#F05032" />
          <circle cx="6" cy="6" r="2.2" fill="#F05032" />
          <circle cx="17" cy="8" r="2.2" fill="#F05032" />
          <path stroke="#F05032" strokeWidth="1.6" d="M6 8.2v7.6M8 7.2c2.2.4 4.2.2 6.6-.8" />
        </svg>
      </Mark>
      <Mark name="Vite">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#646CFF" d="m13.2 2-8 4.2L7 14.2 13.2 2Z" />
          <path fill="#FFD43B" d="m14.2 2 6.6 12.2-8.8 7.2 2.2-19.4Z" />
        </svg>
      </Mark>
      <Mark name="Redis">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path fill="#FF4438" d="m4 8 8-3 8 3-8 3-8-3Zm0 3.2 8 3 8-3v2.2l-8 3-8-3V11.2Zm0 4.2 8 3 8-3V18l-8 3-8-3v-2.6Z" />
        </svg>
      </Mark>
      <Mark name="GitHub">
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden>
          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
        </svg>
      </Mark>
      <Mark name="LangGraph">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <circle cx="6" cy="16" r="2.2" fill="#86EFAC" />
          <circle cx="12" cy="6" r="2.2" fill="#86EFAC" />
          <circle cx="18" cy="16" r="2.2" fill="#86EFAC" />
          <path stroke="#86EFAC" strokeWidth="1.4" d="M8 14.6 10.4 8.2M13.6 8.2 16 14.6M8.2 16h7.6" />
        </svg>
      </Mark>
    </div>
  )
}
