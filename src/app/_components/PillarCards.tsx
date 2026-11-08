'use client'

import { useState } from 'react'
import { GraduationCap, HandHeart, Shield, Users, type IconComponent } from 'reicon-react'

/**
 * The four pillars, as clickable cards immediately below the hero.
 * Text is clamped to two lines; tapping reveals the full description.
 */
const pillars: { icon: IconComponent; title: string; body: string }[] = [
  { icon: Shield, title: 'Prevention', body: 'Campus campaigns, hall and faculty visits and life-skills education that reach students before harmful use escalates.' },
  { icon: HandHeart, title: 'Early Support', body: 'A confidential, non-judgmental first conversation — a lower-barrier door than professional care, never a substitute for it.' },
  { icon: GraduationCap, title: 'Peer Education', body: 'Trained student advocates who listen safely within scope and connect peers to approved referral pathways.' },
  { icon: Users, title: 'Recovery Communities', body: 'Recovery-friendly peer spaces, healthy routines and mentorship that keep the door open beyond a single conversation.' },
]

export function PillarCards() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <section className="pillars" aria-label="Project RESET pillars">
      {pillars.map(({ icon: Icon, title, body }) => {
        const isOpen = open === title
        return (
          <article
            className={`pillar-card${isOpen ? ' is-open' : ''}`}
            key={title}
            onClick={() => setOpen(isOpen ? null : title)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setOpen(isOpen ? null : title)
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <i><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></i>
            <h3>{title}</h3>
            <p className={isOpen ? undefined : 'line-clamp'} style={isOpen ? undefined : ({ WebkitLineClamp: 2 } as React.CSSProperties)}>{body}</p>
            <span className="card-more-hint" aria-hidden="true">{isOpen ? 'Show less' : 'Tap for more'}</span>
          </article>
        )
      })}
    </section>
  )
}
