'use client'

import { useState } from 'react'
import { InfoListClient } from './InfoListClient'

type Item = { title: string; body: string }
export type InfoSectionData = { heading: string; intro?: string; items: Item[] }

export function InfoSections({ id, title, lede, photo, children, after, sections }: { id: string; title: string; lede: string; photo?: React.ReactNode; children?: React.ReactNode; after?: React.ReactNode; sections: InfoSectionData[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div id={id} className="page-band">
      <section className={`inner-hero${photo ? ' inner-hero--photo' : ''}`} data-reveal="30" {...(photo ? { 'data-reveal-pop-root': '' } : {})}>
        <h1>{title}</h1>
        <p className="inner-hero__lede">
          <span className={open ? undefined : 'line-clamp'} style={open ? undefined : ({ WebkitLineClamp: 2 } as React.CSSProperties)}>{lede}</span>{' '}
          <button type="button" className="expand-toggle expand-toggle--light" onClick={() => setOpen((v) => !v)} aria-expanded={open}>{open ? 'Less' : 'More'}</button>
        </p>
        <div className="hero-actions hero-actions--light"><a className="primary-button" href="#get-help">RESET Connect</a><a className="outline-button outline-button--light" href="#contact">Talk to us</a></div>
        {photo}
      </section>
      {children}
      {sections.map((section) => (
        <InfoListClient key={section.heading} section={section} />
      ))}
      {after}
    </div>
  )
}
