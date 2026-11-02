'use client'

import { useState, type FormEvent } from 'react'

/**
 * The `#contact` band of the continuous page — hero banner plus the
 * contact-layout form and "what happens next" aside. Messages are handled
 * client-side only; no data leaves the browser.
 */
export function ContactSection() {
    const [sent, setSent] = useState(false)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSent(true)
    }

    return (
        <div id="contact" className="page-band">
            <section className="inner-hero" data-reveal="30">
                <h1>Write to us. <em>We treat it as private.</em></h1>
                <p>
                    For a confidential first conversation, volunteering or partnership.
                    Messages are reviewed by the RESET coordination desk — never posted
                    publicly, never shared onward.
                </p>
            </section>

            <section className="contact-layout" data-reveal="30">
                {sent ? (
                    <div className="sent" role="status">
                        <h2>Thank you — your message is with the coordination desk.</h2>
                        <p>
                            Someone will reply from the RESET desk. If this is urgent, please
                            also use campus emergency channels or contact University Health
                            Services directly.
                        </p>
                        <p>
                            <button type="button" className="outline-button" onClick={() => setSent(false)}>
                                Write another message
                            </button>
                        </p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <label>
                            Name
                            <input name="name" autoComplete="name" placeholder="How should we address you?" required />
                        </label>
                        <label>
                            Email
                            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                        </label>
                        <label>
                            I am
                            <select name="role" defaultValue="student">
                                <option value="student">A student seeking support</option>
                                <option value="friend">A friend or peer</option>
                                <option value="volunteer">Interested in volunteering</option>
                                <option value="partner">An institutional partner</option>
                                <option value="press">Media or research enquiry</option>
                            </select>
                        </label>
                        <label>
                            Message
                            <textarea
                                name="message"
                                placeholder="Share as much or as little as you want. You do not have to identify anyone."
                                required
                            />
                        </label>
                        <p className="note">
                            Only what is necessary is collected, and it is handled through
                            approved systems. Do not include medical details you would not
                            want recorded. In an emergency, contact campus security or
                            University Health Services directly.
                        </p>
                        <button className="primary-button" type="submit">Send message →</button>
                    </form>
                )}

                <aside>
                    <h2>What happens next</h2>
                    <ul>
                        <li>
                            Messages are read by the <strong>RESET coordination desk</strong>,
                            not a public inbox.
                        </li>
                        <li>
                            You hear back from a trained volunteer or lead —{' '}
                            <strong>never auto-published, never shared onward</strong>.
                        </li>
                        <li>
                            Where professional care is the right step, we make the{' '}
                            <strong>introduction to CDCC or University Health Services</strong>{' '}
                            rather than handling it ourselves.
                        </li>
                        <li>
                            On campus: <strong>Career Development & Counselling Centre</strong>,
                            Student Affairs Division, University of Ibadan.
                        </li>
                    </ul>
                </aside>
            </section>
        </div>
    )
}
