'use client'

import { useEffect, useState } from 'react'
import type { InfoSectionData } from './InfoPage'

export function InfoListClient({ section }: { section: InfoSectionData }) {
  const [sectionOpen, setSectionOpen] = useState(false)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(min-width: 761px)').matches) setSectionOpen(true)
  }, [])

  return (
    <section className={`info-section info-section--collapsible${sectionOpen ? ' is-open' : ''}`} data-reveal="36">
      <div>
        <button
          type="button"
          className="info-group-toggle"
          onClick={() => setSectionOpen((v) => !v)}
          aria-expanded={sectionOpen}
        >
          <span className="info-group">{section.heading}</span>
          <span className="info-group-meta" aria-hidden="true">
            <span className="info-group-count">{section.items.length}</span>
            <span className="info-group-chevron">{sectionOpen ? '−' : '+'}</span>
          </span>
        </button>
        {section.intro && (
          <p className="section-intro">
            <span className={sectionOpen && open === -1 ? undefined : 'line-clamp'} style={sectionOpen && open === -1 ? undefined : ({ WebkitLineClamp: 2 } as React.CSSProperties)}>
              {section.intro}
            </span>{' '}
            {sectionOpen ? (
              <button type="button" className="expand-toggle" onClick={() => setOpen(open === -1 ? null : -1)} aria-expanded={open === -1}>
                {open === -1 ? 'Less' : 'More'}
              </button>
            ) : null}
          </p>
        )}
      </div>
      {sectionOpen ? (
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
      ) : (
        <button type="button" className="section-peek" onClick={() => setSectionOpen(true)}>
          Tap to view {section.items.length} item{section.items.length === 1 ? '' : 's'}
        </button>
      )}
    </section>
  )
}
