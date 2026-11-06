'use client'

import { useEffect, useRef } from 'react'

type VantaEffect = { destroy: () => void }
type BirdsFactory = (options: Record<string, unknown>) => VantaEffect

/**
 * The UMD bundle exports `{ default: factory }`, but bundler interop may hand
 * back the callable already unwrapped — dig for the function instead of
 * trusting a single shape.
 */
function unwrapFactory(mod: unknown): BirdsFactory | null {
  let candidate: unknown = mod
  for (let depth = 0; depth < 3; depth += 1) {
    if (typeof candidate === 'function') return candidate as BirdsFactory
    if (!candidate || typeof candidate !== 'object') return null
    candidate = (candidate as Record<string, unknown>).default
  }
  return null
}

/**
 * Site-wide atmosphere: the Vanta birds flock, on a fixed layer behind all
 * content.
 *
 * The flock is only *visible* through the green bands. Each of them swaps its
 * opaque gradient for a translucent brand-green scrim while this effect is
 * running, so the motion reads as depth behind the copy rather than replacing
 * it. Light bands (info sections, marquee, contact) paint themselves opaque,
 * because the WebGL canvas fills the viewport and would otherwise show green
 * behind them.
 *
 * That swap is gated on `html[data-vanta]`, which is set only after the effect
 * actually constructs. No JS, reduced motion, or a machine without WebGL all
 * leave the attribute absent and every band keeps the opaque gradient it has
 * today — the page degrades to its pre-Vanta appearance, not a broken one.
 */
export function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let effect: VantaEffect | null = null

    const start = async () => {
      // three has to be on `window` *before* the birds bundle is evaluated:
      // the bundle captures `window.THREE` at module scope, so importing the
      // two in parallel leaves the flock with nothing to build its scene from.
      const THREE = await import('three')
      if (cancelled || !ref.current) return
      ;(window as Window & { THREE?: unknown }).THREE = THREE

      const BIRDS = unwrapFactory(await import('vanta/dist/vanta.birds.min'))
      if (cancelled || !BIRDS || !ref.current) return

      // The flock is ambient; half the population on a phone keeps the GPU cost
      // down without changing what anyone sees.
      const small = window.innerWidth < 700

      try {
        effect = BIRDS({
          el: ref.current,
          THREE,
          // Bound to `window`, not the canvas, so they still track the pointer
          // even though this layer sits behind everything at pointer-events: none.
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x106c33,
          color1: 0x7800ff,
          color2: 0xfffff0,
          birdNumber: small ? 35 : 70,
          birdSize: 1.1,
          wingSpan: 27.0,
          speedLimit: 4.0,
          separation: 28.0,
          alignment: 46.0,
        })
      } catch {
        return // no WebGL context available — stay on the opaque gradients
      }

      if (!cancelled) document.documentElement.dataset.vanta = 'on'
    }

    void start()

    return () => {
      cancelled = true
      effect?.destroy()
      delete document.documentElement.dataset.vanta
      delete (window as Window & { THREE?: unknown }).THREE
    }
  }, [])

  return <div ref={ref} className="vanta-layer" aria-hidden="true" />
}
