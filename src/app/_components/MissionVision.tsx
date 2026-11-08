'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BLOCKS = [
  {
    id: 'mission',
    kicker: 'What we do every day',
    title: 'MISSION',
    heading: 'Prevent, equip and connect',
    body: 'To prevent substance misuse, reduce stigma, equip young people with credible knowledge and life skills, create safe pathways to early help, strengthen peer support and connect affected students to appropriate professional care — beginning at the University of Ibadan and expanding through partnerships across Nigeria, Africa and the world.',
    img: '/images/mission-bg.jpeg',
    flip: false,
  },
  {
    id: 'vision',
    kicker: 'Where we are going',
    title: 'VISION',
    heading: 'Healthy, purposeful lives',
    body: 'To build a world where students and young people can choose healthy, purposeful lives free from the destructive effects of substance misuse and addiction — and where seeking help is met with dignity, confidentiality, compassion and practical support.',
    img: '/images/vision-bg.jpeg',
    flip: true,
  },
]

function MaskedWords({ text, open }: { text: string; open: boolean }) {
  return (
    <p className={`mv-copy__body${open ? ' is-open' : ''}`}>
      <span className={open ? undefined : 'line-clamp'} style={open ? undefined : ({ WebkitLineClamp: 2 } as React.CSSProperties)}>
        {text.split(' ').map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? ' ' : ''}
            <span className="mv-word">
              <span className="mv-word__in" data-mv-word="">
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    </p>
  )
}

export function MissionVision() {
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 760px)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-mv-block]').forEach((block) => {
        const title = block.querySelector('[data-mv-title]')
        const words = block.querySelectorAll('[data-mv-word]')
        const meta = block.querySelectorAll('[data-mv-meta]')
        const bg = block.querySelector('[data-mv-bg]')
        if (!title || !words.length) return

        gsap
          .timeline({
            scrollTrigger: { trigger: block, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
          })
          .fromTo(title, { yPercent: 42, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'none' }, 0)
          .fromTo(bg, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'none' }, 0)
          .fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'none', stagger: 0.35 / words.length }, 0.25)
          .fromTo(meta, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'none', stagger: 0.12 }, 0.35)
          .to(bg, { autoAlpha: 0, duration: 0.25, ease: 'none' }, 1.35)
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="mv" ref={root}>
      {BLOCKS.map((block) => (
        <section className={`mv-block${block.flip ? ' mv-block--flip' : ''}`} data-mv-block="" key={block.id} aria-label={block.title}>
          <div className="mv-sticky">
            <div className="mv-bg" style={{ backgroundImage: `url(${block.img})` }} data-mv-bg="" aria-hidden="true" />
            <div className="mv-row">
              <div className="mv-copy">
                <span className="mv-kicker" data-mv-meta="">
                  {block.kicker}
                </span>
                <h3 className="mv-heading" data-mv-meta="">
                  {block.heading}
                </h3>
                <MaskedWords text={block.body} open={!!open[block.id]} />
                <button
                  type="button"
                  className="expand-toggle expand-toggle--light mv-more"
                  data-mv-meta=""
                  onClick={() => setOpen((s) => ({ ...s, [block.id]: !s[block.id] }))}
                  aria-expanded={!!open[block.id]}
                >
                  {open[block.id] ? 'Less' : 'More'}
                </button>
              </div>
              <h2 className="mv-title" data-mv-title="">
                {block.title}
              </h2>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
