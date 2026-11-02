'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, stagger } from 'animejs'

/** Defensive stop for an anime.js v4 animation (API still settling across patches). */
const stopAnime = (anim: { pause?: () => void; revert?: () => void }) => {
  try {
    anim.pause?.()
    anim.revert?.()
  } catch {
    /* animation already finished/disposed */
  }
}

/**
 * Scroll-driven choreography for the whole site.
 *
 * GSAP + ScrollTrigger:
 * - `[data-reveal]`             → fade + rise as the element enters the viewport
 * - `[data-reveal-pop="<from°>"]` → springy sticker pop (scale 0 → 1 with a
 *                                  rotation swing) for the footer banner graphics
 *                                  and hero polaroids; grouped per closest
 *                                  `[data-reveal-pop-root]`
 * - `[data-reveal-group]`        → children marked `[data-reveal-child]` stagger
 *                                  in (opacity only, so React Spring owns the
 *                                  transforms on interactive cards — no fighting
 *                                  over the same style property)
 * - `[data-parallax="<px>"]`     → scrubbed vertical drift (negative = up)
 *
 * Everything is created inside `gsap.context()` so a single `ctx.revert()`
 * tears down every tween and ScrollTrigger when the route changes or the
 * component unmounts — no leaked triggers between pages.
 *
 * anime.js:
 * - `[data-anime-icon]` → micro-icon reveal: a springy scale/rotate "pop"
 *   (outBack) staggered across the page. Transform-only, so it can never flash
 *   content in from opacity 0 or fight CSS hover transforms.
 *
 * Under `prefers-reduced-motion` the whole module no-ops and content simply
 * renders in its final state.
 */
export function ScrollFx() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ── Reveals ──────────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: Number(el.dataset.reveal) || 32,
          autoAlpha: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        })
      })

      // ── Staggered groups (opacity only — transforms belong to React Spring) ─
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const children = group.querySelectorAll('[data-reveal-child]')
        if (!children.length) return
        gsap.from(children, {
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: 'top 84%', toggleActions: 'play none none none' },
        })
      })

      // ── Sticker pops ───────────────────────────────────────────────────
      // Graphics scale up from 0 with a rotation swing as their container
      // scrolls into view. Pops are grouped by their closest
      // `[data-reveal-pop-root]` so independent groups (footer banner, hero
      // polaroids) each get their own trigger; a pop without an explicit root
      // uses itself. Each attribute value is that sticker's starting rotation
      // in degrees; its own CSS transform is the resting state GSAP animates
      // back to.
      //
      // The trigger is deliberately the *container*, never the sticker itself:
      // the from-tween scales the sticker to 0, which collapses its own
      // ScrollTrigger rect to a point and makes the start position unreliable.
      const popGroups = new Map<HTMLElement, HTMLElement[]>()
      gsap.utils.toArray<HTMLElement>('[data-reveal-pop]').forEach((el) => {
        const root = el.closest<HTMLElement>('[data-reveal-pop-root]') || el
        const group = popGroups.get(root)
        if (group) group.push(el)
        else popGroups.set(root, [el])
      })
      popGroups.forEach((els, root) => {
        gsap.from(els, {
          scale: 0,
          rotate: (_i, target: HTMLElement) => Number(target.dataset.revealPop) || -18,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'back.out(1.9)',
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: 'top bottom', toggleActions: 'play none none none' },
        })
      })

      // ── Parallax ─────────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const distance = Number(el.dataset.parallax) || -40
        gsap.to(el, {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })
    })

    // Layout can shift after fonts/late content settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    ScrollTrigger.refresh()

    // ── anime.js micro-icon reveals (route-scoped) ─────────────────────────
    const icons = document.querySelectorAll('[data-anime-icon]')
    let iconAnim: { pause?: () => void; revert?: () => void } | null = null
    if (icons.length) {
      iconAnim = animate(icons, {
        scale: [0.7, 1],
        rotate: [-8, 0],
        delay: stagger(90, { start: 320 }),
        duration: 850,
        ease: 'outBack',
      }) as unknown as { pause?: () => void; revert?: () => void }
    }

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert() // kills every tween + ScrollTrigger created above
      if (iconAnim) stopAnime(iconAnim)
    }
  }, [pathname])

  return null
}
