import { ArrowRight } from 'reicon-react'
import { Marquee } from './_components/Marquee'
import { Float } from './_components/Motion'
import { SiteFooter } from './_components/SiteFooter'
import { InfoSections } from './_components/InfoPage'
import AccordionGallery from './_components/AccordionGallery'
import { IntroStrip } from './_components/IntroStrip'
import { CoreAreas } from './_components/CoreAreas'
import { HighlightsAccordion, Milestones } from './_components/HighlightsAccordion'
import { ContactSection } from './_components/ContactSection'
import { FaqSection } from './_components/FaqSection'
import { HeroPhoto } from './_components/HeroPhoto'
import { HeroStickers } from './_components/HeroStickers'
import type { InfoSectionData } from './_components/InfoPage'

const problemItems = [
  { title: 'The Shift', body: '<strong>Changing patterns.</strong> Misuse of prescription meds, vaping, shisha, and other substances is rising—often tied to pressure, peer influence, insomnia, and self-medication.' },
  { title: 'The Barriers', body: '<strong>Help feels risky.</strong> Fear of sanctions, stigma, confidentiality concerns, and low awareness keep students from seeking care early.' },
  { title: 'The Peer Solution', body: '<strong>Peers bridge the gap.</strong> Trained student advocates listen without judgment and connect peers to qualified, CDCC-approved support.' },
]

const aboutSections: InfoSectionData[] = [
  {
    heading: 'How RESET works',
    intro: 'A student-led partnership with CDCC (Student Affairs, UI). RESET is the first-contact bridge—not a clinic.',
    items: [
      { title: 'Student-led advocacy', body: '<strong>Peer frontline.</strong> Honest, dignity-first education and support across halls and faculties.' },
      { title: 'Confidential first contact', body: '<strong>Low barrier.</strong> Private conversations via QR codes, online forms, and digital channels.' },
      { title: 'Professional referral & oversight', body: '<strong>Safe scope.</strong> CDCC-approved protocols, clear boundaries, escalation, and supervision; clinical care stays with professionals.' },
    ],
  },
]

const helpSections: InfoSectionData[] = [
  {
    heading: 'How RESET Connect works',
    intro: 'A confidential, anonymous first step for UI students.',
    items: [
      { title: 'Reach out safely', body: '<strong>Your choice.</strong> QR posters, online forms, anonymous question box, WhatsApp/social, or a peer volunteer.' },
      { title: 'A peer listens first', body: '<strong>No judgment.</strong> Private support within CDCC-approved boundaries—no diagnosis or lecture.' },
      { title: 'Choose the next step', body: '<strong>Warm referral.</strong> When needed, we connect you to CDCC, University Health Services, or approved care.' },
    ],
  },
  {
    heading: 'What to expect',
    items: [
      { title: 'Confidential', body: '<strong>Privacy-first.</strong> Only necessary information is handled through approved systems; safeguarding limits are explained upfront.' },
      { title: 'Clear limits', body: '<strong>Not clinical care.</strong> Peer volunteers listen and refer; emergencies/high-risk cases are escalated to professionals.' },
      { title: 'Always voluntary', body: '<strong>You’re in control.</strong> Share only what you want; engagement is respectful and non-punitive.' },
    ],
  },
]

const structureHighlights = [
  { title: 'Peer Volunteers', body: '<strong>Frontline.</strong> Awareness, listening within scope, and safe referral under CDCC oversight.' },
  { title: 'Peer Support Lead', body: '<strong>Supervision.</strong> Referral protocols and coordination with professional oversight.' },
  { title: 'Programme & Operations Lead', body: '<strong>Delivery.</strong> Scheduling and logistics for activations, talks, and campaigns.' },
]
const structureRest = [
  { title: 'Movement / Project Lead', body: 'Overall strategy, partnerships, and accountability.' },
  { title: 'Research & Impact Lead', body: 'Data, evaluation, impact reporting, and needs assessments.' },
  { title: 'Communications & Media Lead', body: 'Campaigns, content, and public education.' },
  { title: 'Partnerships Lead', body: 'Institutional, NGO, and professional relationships.' },
  { title: 'Faculty / Hall Coordinators', body: 'Local mobilisation across halls and faculties.' },
]

const curriculumHighlights = [
  { title: 'Substance use & addiction basics', body: '<strong>Understand.</strong> Use, misuse, dependence—and how to talk without stigma.' },
  { title: 'Active listening & safe response', body: '<strong>Support.</strong> Listen, respond without judgment, and stay within scope.' },
  { title: 'Confidentiality, referral & escalation', body: '<strong>Protect.</strong> Consent/safeguarding limits and clear pathways to CDCC/UHS/professionals.' },
]
const curriculumRest = [
  { title: 'Risk recognition', body: 'Identify indicators and respond safely.' },
  { title: 'Stigma, language & ethics', body: 'Health-centred, dignity-first advocacy.' },
  { title: 'Digital safety', body: 'Anonymous engagement and privacy boundaries.' },
  { title: 'Campaigns & public speaking', body: 'Deliver prevention activations responsibly.' },
  { title: 'Documentation & reporting', body: 'Record only what’s necessary; escalate incidents.' },
  { title: 'Self-care & wellbeing', body: 'Burnout prevention and supervision support.' },
  { title: 'Volunteer wellbeing off-ramps', body: 'Clear steps to pause or step back safely.' },
]

const milestones2026 = [
  { title: 'Align & approve', body: '<strong>CDCC alignment.</strong> Confirm scope, oversight, workspace/intake, roles, and safeguarding/referral protocols before peer support begins.' },
  { title: 'Prepare & train', body: '<strong>Ready the team.</strong> Finalise materials, map halls/faculties, run orientation/training, and set monitoring/baseline measures.' },
  { title: 'Launch & learn', body: '<strong>First activation.</strong> Launch initial awareness after approvals, collect feedback, and report early impact.' },
]

export default function Home() {
  return <main>
    <header className="header"><a className="logo" href="#top"><img src="/images/logo.jpeg" alt="Project RESET" width={2560} height={1438} /></a><nav><a href="#about">About</a><a href="#purpose">Purpose</a><a href="#get-help">Get help</a><a href="#get-involved">Get involved</a></nav><a className="outline-button" href="#contact">Talk to us</a></header>
    <section id="top" className="hero"><div className="hero-copy"><h1 data-intro style={{ '--i': 0 } as React.CSSProperties}>Reset your choices.<br /><em>Rebuild your life.</em></h1><p data-intro style={{ '--i': 1 } as React.CSSProperties}><strong>Project RESET</strong> is a student-led UI movement for prevention, early support, peer education, and warm referrals—so help feels safe, private, and possible.</p><div className="hero-actions" data-intro style={{ '--i': 2 } as React.CSSProperties}><a href="#get-help" className="primary-button">RESET Connect <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /></a><a href="#contact" className="outline-button">Talk to us</a></div></div><div className="hero-art" data-parallax="-46"><Float className="hero-float"><div className="orb orb-one"/><div className="orb orb-two"/><img className="hero-girl" src="/images/WhatsApp_Image_2026-11-02_at_10.45.24_AM__1_-removebg-preview.png" alt="A smiling University of Ibadan student holding books" width={500} height={500} fetchPriority="high" /><div className="hero-card"><span>PROJECT RESET</span><strong>Renewal, courage, prevention &amp; second chances.</strong><small>RESET · REBUILD · RECOVER · RISE</small></div><HeroStickers /></Float></div></section>
    <IntroStrip />
    <Marquee />
    <InfoSections id="about" title="Student-led, dignity-first support at UI." lede="We make the first step smaller: practical prevention, confidential peer listening, and clear links to professional care." sections={aboutSections} after={<section className="problem-grid" data-reveal="30" aria-label="The problem we are responding to"><div className="problem-grid__head"><h2 className="info-group">Why RESET exists</h2></div><div className="problem-grid__items">{problemItems.map((item, i) => <article key={item.title}><span data-anime-icon="">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p dangerouslySetInnerHTML={{ __html: item.body }} /></article>)}</div></section>} photo={<HeroPhoto src="/images/life-class.jpeg" alt="A student studying in class" caption="Student life, University of Ibadan" rotate={5} />} />
    <div id="purpose" className="page-band">
      <CoreAreas />
    </div>
    <InfoSections id="get-help" title="Ask for help without being defined by it." lede="RESET isn’t a clinic. We offer a private first conversation with a trained peer and a clear path to approved professional care." sections={helpSections} after={<FaqSection />} photo={<HeroPhoto src="/images/life-park.jpeg" alt="Students relaxing and playing on a green field" caption="Recovery-friendly community" rotate={-4} />} />
    <div id="get-involved" className="page-band">
      <section className="inner-hero" data-reveal="30"><h1>Be someone others can talk to.</h1><p>Trained peer advocates listen within scope and refer safely—always under CDCC-approved protocols. <a className="inline-cta" href="#contact">Talk to us</a></p></section>
      <HighlightsAccordion heading="Volunteer structure" intro="CDCC-approved roles with clear boundaries, supervision, and escalation." highlights={structureHighlights} restLabel="View full structure" rest={structureRest} />
      <HighlightsAccordion heading="Volunteer training curriculum" intro="Core training completed before peer-support activity (CDCC oversight)." highlights={curriculumHighlights} restLabel="View full curriculum" rest={curriculumRest} />
      <Milestones heading="2026 action plan" intro="Three milestone phases (24–28 Aug 2026 focus) to launch responsibly." milestones={milestones2026} />
    </div>
    <AccordionGallery height={460} items={[
      { image: '/images/image1.webp', label: 'Phase 1 — Foundation (2026–2027)' },
      { image: '/images/image2.webp', label: 'Phase 2 — Campus Expansion (2027–2028)' },
      { image: '/images/image3.webp', label: 'Phase 3 — Nigeria Network (2028–2029)' },
      { image: '/images/image4.webp', label: 'Phase 4 — Africa & Global (2029–2030+)' },
    ]} />
    <ContactSection />
    <SiteFooter />
  </main>
}
