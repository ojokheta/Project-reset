export function IntroStrip() {
  return (
    <section className="intro-strip" aria-label="Mission and vision" data-reveal="24">
      <div className="intro-strip__inner">
        <p className="intro-strip__eyebrow">What we do every day · Where we’re going</p>
        <div className="intro-strip__grid">
          <article>
            <h2>Mission</h2>
            <p><strong>Prevent, equip, connect.</strong> We reduce substance-misuse harm through credible education, safe early-help pathways, peer support, and warm referrals to professional care—starting at UI.</p>
          </article>
          <article>
            <h2>Vision</h2>
            <p><strong>Healthy, purposeful lives.</strong> A world where young people can seek help with dignity, confidentiality, compassion, and practical support.</p>
          </article>
        </div>
        <div className="intro-strip__actions">
          <a className="primary-button" href="#get-help">RESET Connect</a>
          <a className="outline-button" href="#contact">Talk to us</a>
        </div>
      </div>
    </section>
  )
}
