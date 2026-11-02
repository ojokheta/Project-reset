import type { ComponentType } from 'react'
import { Qr } from 'reicon-react'

/**
 * Site footer — the shared footer of the single continuous page.
 *
 * Structure mirrors the reference layout: a deep brand-green container with a
 * multi-column grid of plain column headers + content, a meta row, and — at
 * the very bottom — a full-width two-tone wave banner (vibrant green under
 * lime) carrying the UI gate sticker and three secondary stickers.
 *
 * Every sticker carries `data-reveal-pop="<from-rotation>"`, which ScrollFx
 * animates with GSAP + ScrollTrigger (springy scale/rotate pop as it scrolls
 * into view). Under `prefers-reduced-motion` ScrollFx no-ops and the stickers
 * simply render in their final state.
 */

/** Column 2 — the same destinations as the top navigation. */
const explore: [string, string][] = [
  ['About', '#about'],
  ['Purpose', '#purpose'],
  ['Get help', '#get-help'],
  ['Get involved', '#get-involved'],
  ['Contact', '#contact'],
]

/** Column 3 — approved support pathways (the three resource cards on Home). */
const pathways: [string, string][] = [
  ['RESET Connect', '#get-help'],
  ['CDCC Counselling', '#get-help'],
  ['University Health Services', '#get-help'],
]

/**
 * Column 4 — social icons.
 *
 * All three open in a new tab; `rel="noopener noreferrer"` closes the opener
 * reference. WhatsApp goes straight to Godswill's direct line.
 */
type SocialIcon = ComponentType<{ size?: number; className?: string }>

const socials: { label: string; href: string; Icon: SocialIcon }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/1projectreset?psln=MXhtMGV5Y2gxY2M2eQ==', Icon: InstagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@1projectreset', Icon: TikTokIcon },
  { label: 'WhatsApp', href: 'https://wa.me/2347047027605', Icon: WhatsAppIcon },
]

/** Brand glyphs as inline SVGs (reicon-react ships no TikTok/WhatsApp marks). */
function InstagramIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function TikTokIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          {/* ── brand ─────────────────────────────────────────────────── */}
          <div className="site-footer__col site-footer__brand">
            <a className="logo" href="#top">
              PROJECT <strong>RE<span>S</span>ET</strong>
            </a>
            <p className="site-footer__blurb">
              A long-term, student-led movement for substance-misuse prevention,
              early support, peer education and referral linkage — originating at
              the University of Ibadan with the CDCC, Student Affairs Division.
            </p>
            <p className="site-footer__motto">RESET · REBUILD · RECOVER · RISE</p>
          </div>

          {/* ── explore ───────────────────────────────────────────────── */}
          <div className="site-footer__col">
            <span className="site-footer__tag">explore</span>
            <ul className="site-footer__links">
              {explore.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── pathways ──────────────────────────────────────────────── */}
          <div className="site-footer__col">
            <span className="site-footer__tag">pathways</span>
            <ul className="site-footer__links">
              {pathways.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
              <li>
                <a href="#get-help" className="site-footer__qr">
                  <Qr size={15} strokeWidth={2} aria-hidden="true" />
                  QR-to-RESET
                </a>
              </li>
            </ul>
          </div>

          {/* ── connect ───────────────────────────────────────────────── */}
          <div className="site-footer__col">
            <span className="site-footer__tag">connect</span>
            <p className="site-footer__note">
              Messages go to the RESET coordination desk — private,
              non-judgmental, never posted publicly.
            </p>
            <div className="site-footer__social">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── meta ────────────────────────────────────────────────────── */}
        <div className="site-footer__meta">
          <p>© 2026 Project RESET · University of Ibadan · CDCC, Student Affairs Division</p>
          <p>In an emergency, contact campus security or local emergency services immediately.</p>
        </div>
      </div>

      {/* ── wavy banner + stickers (decorative) ───────────────────────── */}
      <div className="site-footer__banner" data-reveal-pop-root="" aria-hidden="true">
        <svg
          className="site-footer__wave"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          focusable="false"
        >
          {/* back layer — vibrant brand green */}
          <path
            d="M0,96 C180,34 330,150 540,120 C760,88 900,8 1120,52 C1262,80 1362,112 1440,86 L1440,240 L0,240 Z"
            fill="#15803D"
          />
          {/* front layer — lime accent (contrast against the deep green footer) */}
          <path
            d="M0,152 C200,96 360,198 600,168 C842,138 982,72 1200,110 C1312,130 1382,152 1440,138 L1440,240 L0,240 Z"
            fill="#A3E635"
          />
        </svg>

        {/* main sticker — the UI gate cut-out, framed like a photo sticker */}
        <div className="site-footer__stage">
          <div className="sticker sticker--tower" data-reveal-pop="-7">
            <img
              src="/images/WhatsApp_Image_2026-10-13_at_4.31.43_PM__1_-removebg-preview.png"
              alt=""
              width={532}
              height={469}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* secondary sticker — lime starburst */}
        <div className="sticker sticker--burst" data-reveal-pop="-26">
          <span>
            Student-
            <br />
            led
          </span>
        </div>

        {/* secondary sticker — round badge */}
        <div className="sticker sticker--round" data-reveal-pop="24">
          <strong>100%</strong>
          <span>confidential</span>
        </div>

        {/* secondary sticker — white pill */}
        <div className="sticker sticker--pill" data-reveal-pop="-14">
          non-judgmental · no sanctions
        </div>
      </div>
    </footer>
  )
}
