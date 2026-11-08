'use client'

import { useState, type ReactNode } from 'react'

export function ExpandableText({
  text,
  lines = 2,
  className = '',
  as: Tag = 'p',
}: {
  text: string
  lines?: number
  className?: string
  as?: 'p' | 'div'
}) {
  const [open, setOpen] = useState(false)
  return (
    <Tag className={className}>
      <span
        className={open ? undefined : 'line-clamp'}
        style={open ? undefined : ({ WebkitLineClamp: lines } as React.CSSProperties)}
      >
        {text}
      </span>{' '}
      <button type="button" className="expand-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? 'Less' : 'More'}
      </button>
    </Tag>
  )
}

export function ExpandableCard({
  children,
  expanded,
  onToggle,
  className = '',
  label,
}: {
  children: ReactNode
  expanded: ReactNode
  onToggle: () => void
  className?: string
  label: string
}) {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen((v) => !v)
    onToggle()
  }
  return (
    <article
      className={`${className}${open ? ' is-open' : ''}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={label}
    >
      {children}
      {open ? expanded : null}
      <span className="card-more-hint" aria-hidden="true">{open ? 'Show less' : 'Tap for more'}</span>
    </article>
  )
}
