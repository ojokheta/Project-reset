'use client'

import { useState } from 'react'

const faqs = [
  ['Is RESET confidential?', 'Yes. Conversations are handled privately. Safeguarding limits—where escalation to qualified professionals is required—are explained upfront before you share anything.'],
  ['Do I need to have a "serious" problem to reach out?', 'No. You can reach out with a question, a concern about a friend, or simply to understand your options. RESET makes the first step smaller.'],
  ['Is this an emergency or clinical service?', 'No. Peer volunteers listen and refer; they do not diagnose or provide clinical treatment. In immediate danger, contact campus security or local emergency services first.'],
  ['What substances does RESET cover?', 'All substance-related concerns—including misuse of prescription medicines, nicotine vaping, shisha, synthetic cannabinoids, alcohol and illicit psychoactive substances, as well as issues linked to academic pressure, insomnia and self-medication.'],
  ['Will I face sanctions if I reach out?', 'RESET is a student-led support and prevention movement, not a disciplinary body. Our purpose is to help, not to report or punish. Speak to us confidentially.'],
]

/** FAQ accordion — the closing block of the `#get-help` band. */
export function FaqSection() {
  const [open, setOpen] = useState(-1)
  return (
    <section className="faq" data-reveal="28" aria-label="Frequently asked questions">
      <h2>Questions deserve straight answers.</h2>
      {faqs.map(([q, a], i) => (
        <article key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {q}
            <b>{open === i ? '−' : '+'}</b>
          </button>
          {open === i && <p>{a}</p>}
        </article>
      ))}
    </section>
  )
}
