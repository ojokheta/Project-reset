import { GraduationCap, HandHeart, Shield, Users, type IconComponent } from 'reicon-react'

/**
 * The four pillars, as four cards immediately below the hero — the first thing
 * a visitor sees after the headline, so the fold answers "what is this" before
 * the long-form bands start.
 *
 * Copy is drawn from the strategic pillars in the Purpose band, condensed to
 * one line each.
 */
const pillars: { icon: IconComponent; title: string; body: string }[] = [
  { icon: Shield, title: 'Prevention', body: 'Campus campaigns, hall and faculty visits and life-skills education that reach students before harmful use escalates.' },
  { icon: HandHeart, title: 'Early Support', body: 'A confidential, non-judgmental first conversation — a lower-barrier door than professional care, never a substitute for it.' },
  { icon: GraduationCap, title: 'Peer Education', body: 'Trained student advocates who listen safely within scope and connect peers to approved referral pathways.' },
  { icon: Users, title: 'Recovery Communities', body: 'Recovery-friendly peer spaces, healthy routines and mentorship that keep the door open beyond a single conversation.' },
]

export function PillarCards() {
  return (
    <section className="pillars" aria-label="Project RESET pillars">
      {pillars.map(({ icon: Icon, title, body }) => (
        <article className="pillar-card" key={title}>
          <i><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></i>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </section>
  )
}
