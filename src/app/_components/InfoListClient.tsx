'use client'

import { useState } from 'react'
import type { InfoSectionData } from './InfoPage'

export function InfoListClient({ section }: { section: InfoSectionData }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="info-section" data-reveal="36">
      <div>
        <h2 className="info-group">{section.heading}</h2>
        {section.intro && (
          <p className="section-intro">
            <span className={open === -1 ? undefined : 'line-clamp'} style={open === -1 ? undefined : ({ WebkitLineClamp: 2 } as React.CSSProperties)}>
              {section.intro}
            </span>{' '}
            <button type="button" className="expand-toggle" onClick={() => setOpen(open === -1 ? null : -1)} aria-expanded={open === -1}>
              {open === -1 ? 'Less' : 'More'}
            </button>
          </p>
        )}
      </div>
      <div className="info-list" data-reveal-group="">
        {section.items.map((item, index) => {
          const isOpen = open === index
          return (
            <article
              key={item.title}
              data-reveal-child=""
              className={isOpen ? 'is-open' : ''}
              onClick={() => setOpen(isOpen ? null : index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen(isOpen ? null : index)
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
            >
              <span data-anime-icon="">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>
                <span className={isOpen ? undefined : 'line-clamp'} style={isOpen ? undefined : ({ WebkitLineClamp: 2 } as React.CSSProperties)}>
                  {item.body}
                </span>
              </p>
              <span className="card-more-hint" aria-hidden="true">{isOpen ? 'Show less' : 'Tap for more'}</span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
