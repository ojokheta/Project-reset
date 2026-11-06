/**
 * Three floating trust stickers for the hero art column — the mirror
 * counterpart to the `.hero-card` in the bottom-right corner.
 *
 * Shapes reuse the footer banner's sticker language (see `.sticker--burst`,
 * `--round`, `--pill` in globals.css); `.hero-sticker-*` only re-places them
 * and sizes them down for the tighter hero column.
 *
 * Each sticker is a bare positioning wrapper around the shape itself, which
 * keeps three transform owners from ever colliding: the wrapper takes the
 * entry pop (`--i` staggers it) and ScrollFx's `.is-past` scroll-away state,
 * the inner element takes the idle bob, and the `Float` wrapper and GSAP
 * parallax above stay free to own their own transforms. Reduced-motion and
 * no-JS visitors get the static tilted set in its resting position.
 */
const STICKERS = [
  { key: 'peer', cls: 'burst', node: <span>Peer<br />Support</span> },
  { key: 'conf', cls: 'round', node: <><strong>100%</strong><span>Confidential</span></> },
  { key: 'safe', cls: 'pill', node: <span>Safe Space</span> },
]

export function HeroStickers() {
  return (
    <>
      {STICKERS.map(({ key, cls, node }, i) => (
        <div key={key} className={`hero-sticker hero-sticker--${cls}`} style={{ '--i': i } as React.CSSProperties}>
          <div className={`sticker sticker--${cls}`}>{node}</div>
        </div>
      ))}
    </>
  )
}
