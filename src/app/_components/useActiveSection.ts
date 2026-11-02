'use client'

import { useEffect, useState } from 'react'

/** Section ids in page order — the single continuous page's nav targets. */
export const SECTION_IDS = ['top', 'about', 'purpose', 'get-help', 'get-involved', 'contact'] as const

/**
 * Scroll-spy: returns the id of the section currently crossing the viewport's
 * upper-middle band. A passive scroll listener measures each section's
 * document position directly (six rect reads per event — cheap, and no rAF
 * dependency, so updates stay instant even where rAF is throttled), handling
 * the very tall pinned Mission/Vision blocks correctly. Falls back to the
 * first section before hydration.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTION_IDS[0])

  useEffect(() => {
    const measure = () => {
      const probe = window.scrollY + window.innerHeight * 0.4
      let current: string = SECTION_IDS[0]
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) current = id
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return active
}
