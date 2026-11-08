'use client'

import { useState } from 'react'

const areas = [
  {
    title: 'Prevention',
    lead: 'Reach students early—before harm escalates.',
    points: [
      '<strong>Education:</strong> campaigns, hall/faculty visits, workshops, and life skills.',
      '<strong>Advocacy:</strong> stigma-reducing, health-centred messaging.',
      '<strong>Recovery:</strong> peer communities and routines alongside professional care.',
    ],
  },
  {
    title: 'Peer Support & RESET Connect',
    lead: 'A safer first step, linked to real care.',
    points: [
      '<strong>Peer advocates:</strong> trained to listen within scope—no diagnosis or pressure.',
      '<strong>Low-barrier access:</strong> confidential, anonymous QR/online/peer entry points.',
      '<strong>Warm referrals:</strong> CDCC, University Health Services, and approved pathways.',
    ],
  },
  {
    title: 'Research & Scale',
    lead: 'Learn what works and grow responsibly.',
    points: [
      '<strong>Evidence:</strong> ethical needs assessments, outcome tracking, annual reviews.',
      '<strong>Digital access:</strong> verified referral directories and practical resources.',
      '<strong>Partnerships:</strong> university units, NGOs, health professionals, and agencies.',
    ],
  },
]

export function CoreAreas() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="core-areas" data-reveal="30" aria-label="Core areas">
      <div className="core-areas__head">
        <h2 className="info-group">Core areas</h2>
        <p className="section-intro">Strategy and programmes, streamlined into three focus areas.</p>
      </div>
      <div className="core-areas__grid">
        {areas.map((a, i) => {
          const isOpen = open === i
          return (
            <article key={a.title} className={`core-area${isOpen ? ' is-open' : ''}`}>
              <button type="button" className="core-area__toggle" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span className="core-area__title">{a.title}</span>
                <span className="core-area__icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <p className="core-area__lead">{a.lead}</p>
              {isOpen ? (
                <ul className="core-area__points">
                  {a.points.map((p) => (
                    <li key={p} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </ul>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
