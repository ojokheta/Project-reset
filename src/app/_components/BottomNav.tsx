'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { Chat, HandHeart, Home, Lightbulb, Target, Users, type IconComponent } from 'reicon-react'
import { useActiveSection } from './useActiveSection'

type DockItem = { id: string; label: string; Icon: IconComponent }

/* Icons from Reicon (reicon.dev) — MIT-licensed outline set on a 24px grid,
   matching the reference dock's light stroke weight. */
const ITEMS: DockItem[] = [
  { id: 'top', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: Lightbulb },
  { id: 'purpose', label: 'Purpose', Icon: Target },
  { id: 'get-help', label: 'Get help', Icon: HandHeart },
  { id: 'get-involved', label: 'Get involved', Icon: Users },
]

/**
 * Floating bottom dock — mobile only (hidden from 761px up, where the desktop
 * pill nav takes over).
 *
 * Items are same-page hash anchors into the continuous page. The active chip
 * is a single absolutely-positioned element that slides between items: its
 * x/width are measured when the active section changes (via the shared
 * `useActiveSection` scroll-spy), when the item's entrance animation ends,
 * when the pill resizes, or on viewport resize — never per frame on scroll —
 * and CSS carries the motion with an overshoot easing, so it glides like a
 * spring without a per-frame loop.
 */
export function BottomNav() {
  const active = useActiveSection()
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [chip, setChip] = useState({ x: 0, w: 0, ready: false })

  useLayoutEffect(() => {
    const el = itemRefs.current[active]
    const list = listRef.current
    if (!el || !list) return

    const measure = () => {
      const box = el.getBoundingClientRect()
      const base = list.getBoundingClientRect()
      setChip({ x: box.left - base.left, w: box.width, ready: true })
    }

    measure()

    // The item's entrance animation scales it (0.85 → 1), so its box is wrong
    // while that runs — re-measure the moment it ends.
    const onAnimationEnd = () => measure()
    el.addEventListener('animationend', onAnimationEnd)

    // …and whenever the pill itself changes size (fonts, scrollbar, layout),
    // plus once after everything has settled as a fallback.
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    const t = window.setTimeout(measure, 900)
    window.addEventListener('resize', measure)

    return () => {
      el.removeEventListener('animationend', onAnimationEnd)
      ro.disconnect()
      window.clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [active])

  return (
    <nav className="mdock" aria-label="Primary">
      <div className="mdock__pill" ref={listRef}>
        <span
          className="mdock__chip"
          aria-hidden="true"
          style={{ transform: `translateX(${chip.x}px)`, width: chip.w, opacity: chip.ready ? 1 : 0 }}
        />
        {ITEMS.map((item, i) => {
          const isActive = item.id === active
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              ref={(el) => {
                itemRefs.current[item.id] = el
              }}
              className={`mdock__item${isActive ? ' is-active' : ''}`}
              aria-label={item.label}
              title={item.label}
              aria-current={isActive ? 'true' : undefined}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="mdock__icon" aria-hidden="true">
                <item.Icon size={22} strokeWidth={1.7} />
              </span>
            </a>
          )
        })}
      </div>

      <a
        href="#contact"
        className={`mdock__fab${active === 'contact' ? ' is-active' : ''}`}
        aria-label="Talk to us"
        title="Talk to us"
      >
        <Chat size={21} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </nav>
  )
}
