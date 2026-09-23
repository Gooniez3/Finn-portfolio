import { useEffect } from 'react'
import { certs, profile, projects, skills } from '../data/site'

export function Recruiter({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-bg">
      <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-blue uppercase">Recruiter mode</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.05em]">Sixty-second brief</h2>
          </div>
          <button type="button" onClick={onClose} className="border border-ink px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase">
            Close
          </button>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <img src={profile.photo} alt="" className="h-16 w-14 object-cover object-[center_18%]" />
          <div>
            <p className="font-display text-xl font-extrabold">{profile.name}</p>
            <p className="text-sm text-mute">
              {profile.role} · {profile.city}
            </p>
          </div>
        </div>

        <p className="mt-8 leading-relaxed">{profile.line} Shipped systems, all real:</p>
        <ol className="mt-5 space-y-3">
          {projects.map((project) => (
            <li key={project.id} className="grid grid-cols-[28px_1fr] gap-3">
              <span className="font-mono text-[11px] text-blue">{project.n}</span>
              <span>
                <strong>{project.name}</strong> — {project.blurb}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mute uppercase">Stack</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(skills)
            .flat()
            .slice(0, 16)
            .map((item) => (
              <span key={item} className="border border-line px-2 py-1 font-mono text-[10px] uppercase">
                {item}
              </span>
            ))}
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mute uppercase">Education & certs</p>
        <p className="mt-2">Massey University — Bachelor of Information Sciences, CS + IT. 8.39 / 9.00 GPA. Top Student Award, class of 2025–2026.</p>
        <div className="mt-2 flex flex-col gap-1">
          {certs.map((cert) => (
            <a key={cert.name} href={cert.href} target="_blank" rel="noreferrer" className="text-blue hover:underline">
              {cert.name}
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="bg-ink px-4 py-2.5 font-mono text-[11px] text-[#faf9f5] uppercase">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="border border-ink px-4 py-2.5 font-mono text-[11px] uppercase">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="border border-ink px-4 py-2.5 font-mono text-[11px] uppercase">
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
