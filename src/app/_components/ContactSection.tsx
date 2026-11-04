'use client'

import { useState, type FormEvent } from 'react'

/** Formspree endpoint. Also the form's `action`, so submissions still work with JS off. */
const ENDPOINT = 'https://formspree.io/f/mjyylrvg'

export function ContactSection() {
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        setSending(true)

        try {
            // `Accept: application/json` is what makes Formspree answer with JSON
            // instead of redirecting to its hosted thank-you page.
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            })
            if (!response.ok) throw new Error(`Formspree responded ${response.status}`)
            setSent(true)
            form.reset()
        } catch {
            // Leave the form open so the message isn't silently lost.
        } finally {
            setSending(false)
        }
    }

    const inputClass = 'w-full rounded-xl border-none bg-neutral-100/70 px-4 py-3.5 text-[15px] text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5'

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
                    <div className="rounded-2xl bg-neutral-50 p-10">
                        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Thank you — your message is with the coordination desk.</h2>
                        <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
                            Someone will reply from the RESET desk. If this is urgent, please
                            also use campus emergency channels or contact University Health
                            Services directly.
                        </p>
                        <button type="button" className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 text-[14px] font-medium text-white transition hover:scale-[1.02]" onClick={() => setSent(false)}>
                            Write another message
                        </button>
                    </div>
                ) : (
                    <form action={ENDPOINT} method="POST" onSubmit={onSubmit} className="rounded-2xl bg-neutral-50 p-8 sm:p-10 space-y-5">
                        <input type="hidden" name="_subject" value="Project RESET - New Message" />
                        <input type="hidden" name="_captcha" value="false" />
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-xs font-medium text-neutral-500">Name</span>
                                <input name="name" autoComplete="name" placeholder="How should we address you?" required className={inputClass} />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-xs font-medium text-neutral-500">Email</span>
                                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={inputClass} />
                            </label>
                        </div>
                        <label className="block">
                            <span className="mb-2 block text-xs font-medium text-neutral-500">I am</span>
                            <div className="relative">
                                <select name="category" defaultValue="student" className={`${inputClass} appearance-none pr-10`}>
                                    <option value="student">A student seeking support</option>
                                    <option value="friend">A friend or peer</option>
                                    <option value="volunteer">Interested in volunteering</option>
                                    <option value="partner">An institutional partner</option>
                                    <option value="press">Media or research enquiry</option>
                                </select>
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">▾</span>
                            </div>
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-xs font-medium text-neutral-500">Message</span>
                            <textarea name="message" placeholder="Share as much or as little as you want. You do not have to identify anyone." required rows={5} className={`${inputClass} resize-none`} />
                        </label>
                        <p className="flex items-start gap-2 text-xs leading-relaxed text-neutral-400">
                            <span aria-hidden="true">🔒</span>
                            <span>Only what is necessary is collected, and it is handled through approved systems. Do not include medical details you would not want recorded. In an emergency, contact campus security or University Health Services directly.</span>
                        </p>
                        <button className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[14px] font-medium text-white transition hover:scale-[1.02] disabled:opacity-60" type="submit" disabled={sending}>
                            {sending ? 'Sending...' : 'Send secure message →'}
                        </button>
                    </form>
                )}

                <aside className="rounded-2xl bg-neutral-50 p-8">
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900">What happens next</h2>
                    <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-500">
                        <li>Messages are read by the <strong className="font-medium text-neutral-900">RESET coordination desk</strong>, not a public inbox.</li>
                        <li>You hear back from a trained volunteer or lead — <strong className="font-medium text-neutral-900">never auto-published, never shared onward</strong>.</li>
                        <li>Where professional care is the right step, we make the <strong className="font-medium text-neutral-900">introduction to CDCC or University Health Services</strong> rather than handling it ourselves.</li>
                        <li>On campus: <strong className="font-medium text-neutral-900">Career Development & Counselling Centre</strong>, Student Affairs Division, University of Ibadan.</li>
                    </ul>
                </aside>
            </section>
        </div>
    )
}
