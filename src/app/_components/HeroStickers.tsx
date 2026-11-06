/**
 * Three floating trust stickers for the hero art column — the mirror
 * counterpart to the `.hero-card` in the bottom-right corner.
 *
 * Shapes reuse the footer banner's sticker language (see `.sticker--burst`,
 * `--round`, `--pill` in globals.css); `.hero-sticker-*` only re-places them
 * and sizes them down for the tighter hero column.
 *
 * Each sticker is a bare positioning wrapper with the bob animation on the
 * inner element, so the drift never fights the wrapper's own offset. The bob
 * is CSS keyframes, which composes with the React-Spring `Float` wrapper and
 * GSAP parallax on ancestors; reduced-motion users get the static tilted set.
 */
const STICKERS = [
  { key: 'peer', cls: 'burst', node: <span>Peer<br />Support</span> },
  { key: 'conf', cls: 'round', node: <><strong>100%</strong><span>Confidential</span></> },
  { key: 'safe', cls: 'pill', node: <span>Safe Space</span> },
]

export function HeroStickers() {
  return (
    <>
      {STICKERS.map(({ key, cls, node }) => (
        <div key={key} className={`hero-sticker hero-sticker--${cls}`}>
          <div className={`sticker sticker--${cls}`}>{node}</div>
        </div>
      ))}
    </>
  )
}
