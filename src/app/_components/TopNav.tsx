'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { Chat } from 'reicon-react'
import { useActiveSection } from './useActiveSection'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'purpose', label: 'Purpose' },
  { id: 'get-help', label: 'Get help' },
  { id: 'get-involved', label: 'Get involved' },
] as const

/**
 * Desktop pill navigation for the single continuous page.
 *
 * - Fixed to the top, floating as a frosted "pill" (backdrop-blur) that stays
 *   persistent while scrolling; it condenses its shadow once you leave the top.
 * - Links are same-page hash anchors (`#about`, …); the browser smooth-scrolls
 *   (`scroll-behavior: smooth` on <html>) and `scroll-padding-top` clears the
 *   fixed bar. The active link is driven by the shared `useActiveSection`
 *   scroll-spy, so it updates instantly as the user scrolls either direction.
 * - The sequential intro (brand → links → CTA) is pure CSS driven by the `--i`
 *   index on each `[data-intro]` child, so it works before hydration and can
 *   never leave the nav invisible if JavaScript fails.
 * - Hidden below 761px, where the floating bottom dock takes over.
 */
export function TopNav() {
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`topnav${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary">
      <div className="topnav__pill">
        <a href="#top" className="topnav__brand" data-intro style={{ '--i': 0 } as CSSProperties}>
          <span>PROJECT</span>
          <strong>
            RE<em>S</em>ET
          </strong>
        </a>

        <div className="topnav__links">
          {LINKS.map((link, i) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-intro
                style={{ '--i': i + 1 } as CSSProperties}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <a
          href="#contact"
          className={`outline-button topnav__cta${active === 'contact' ? ' is-active' : ''}`}
          data-intro
          style={{ '--i': LINKS.length + 1 } as CSSProperties}
        >
          Talk to us
          <Chat size={16} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>
    </nav>
  )
}
