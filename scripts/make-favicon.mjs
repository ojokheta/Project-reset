/**
 * Build the favicon from the official PROJECT RESET wordmark
 * (public/images/logo.jpeg, 2560x1438, 16:9).
 *
 * A 16:9 source letterboxes badly in a square favicon slot, so the tile is
 * extended to a square by mirroring its own top/bottom gradient bands — the
 * gradient and ripple pattern continue instead of ending on a hard colour
 * seam — then scaled down to a 512x512 PNG.
 *
 * Run: node scripts/make-favicon.mjs   (sharp ships with Next.js)
 */
import sharp from 'sharp'

const SRC = 'public/images/logo.jpeg'
const OUT = 'public/favicon.png'
const SIZE = 512

const { width: w, height: h } = await sharp(SRC).metadata()
const band = Math.round((w - h) / 2) // extra height needed to reach a square

const top = await sharp(SRC)
  .extract({ left: 0, top: 0, width: w, height: band })
  .flip()
  .png()
  .toBuffer()
const bottom = await sharp(SRC)
  .extract({ left: 0, top: h - band, width: w, height: band })
  .flip()
  .png()
  .toBuffer()

await sharp(SRC)
  .extend({ top: band, bottom: band, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .composite([
    { input: top, top: 0, left: 0 },
    { input: bottom, top: band + h, left: 0 },
  ])
  .resize(SIZE, SIZE)
  .png()
  .toFile(OUT)

console.log(`wrote ${OUT} (${SIZE}x${SIZE} from ${w}x${h})`)