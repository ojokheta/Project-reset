'use client'

import { useState } from 'react'
import type { InfoSectionData } from './InfoPage'

export function HighlightsAccordion({ heading, intro, highlights, restLabel, rest }: { heading: string; intro?: string; highlights: { title: string; body: string }[]; restLabel: string; rest: { title: string; body: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="highlights" data-reveal="30">
      <div className="highlights__head">
        <h2 className="info-group">{heading}</h2>
        {intro ? <p className="section-intro">{intro}</p> : null}
      </div>
      <div className="highlights__list">
        {highlights.map((item, i) => (
          <article key={item.title} className="highlights__item">
            <span data-anime-icon="">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
      {rest.length ? (
        <details className="highlights__more" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
          <summary>{open ? 'Hide details' : restLabel}</summary>
          <div className="highlights__list highlights__list--rest">
            {rest.map((item, i) => (
              <article key={item.title} className="highlights__item">
                <span data-anime-icon="">{String(i + 1 + highlights.length).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </details>
      ) : null}
    </section>
  )
}

export function Milestones({ heading, intro, milestones }: { heading: string; intro?: string; milestones: { title: string; body: string }[] }) {
  return (
    <section className="milestones" data-reveal="30">
      <div className="milestones__head">
        <h2 className="info-group">{heading}</h2>
        {intro ? <p className="section-intro">{intro}</p> : null}
      </div>
      <ol className="milestones__list">
        {milestones.map((m, i) => (
          <li key={m.title}>
            <b>Phase {i + 1}</b>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
