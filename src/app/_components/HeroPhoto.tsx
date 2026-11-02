/**
 * Polaroid-style photo floated inside a band's inner-hero banner.
 *
 * - Pops in with a springy scale/rotate via `[data-reveal-pop]` (ScrollFx),
 *   grouped under the banner's `[data-reveal-pop-root]` so each band triggers
 *   its own photos.
 * - CSS carries the hover lift/straighten — transform-only, so it never
 *   fights the entrance animation.
 *
 * Hidden on mobile (see `.hero-photo` in globals.css).
 */
export function HeroPhoto({ src, alt, caption, rotate = 4 }: { src: string; alt: string; caption: string; rotate?: number }) {
  return (
    <figure className="hero-photo" data-reveal-pop={rotate}>
      <img src={src} alt={alt} width={400} height={300} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
