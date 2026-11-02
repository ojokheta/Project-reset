type Item = { title: string; body: string }

export type InfoSectionData = { heading: string; intro?: string; items: Item[] }

/**
 * One named band of the single continuous page: a full-bleed `inner-hero`
 * banner followed by the heading + definition-list sections. Rendered inside a
 * plain wrapper `<div id={id}>` (not `<section>`) so the `.info-section`
 * `:nth-of-type(even)` striping keeps counting from each band's own hero.
 * No <main>/header/footer here — those exist once on the page.
 */
export function InfoSections({ id, title, lede, photo, children, after, sections }: { id: string; title: string; lede: string; photo?: React.ReactNode; children?: React.ReactNode; after?: React.ReactNode; sections: InfoSectionData[] }) {
  return <div id={id} className="page-band"><section className={`inner-hero${photo ? ' inner-hero--photo' : ''}`} data-reveal="30" {...(photo ? { 'data-reveal-pop-root': '' } : {})}><h1>{title}</h1><p>{lede}</p>{photo}</section>{children}{sections.map((section) => <section className="info-section" key={section.heading} data-reveal="36"><div><h2 className="info-group">{section.heading}</h2>{section.intro && <p className="section-intro">{section.intro}</p>}</div><div className="info-list" data-reveal-group="">{section.items.map((item, index) => <article key={item.title} data-reveal-child=""><span data-anime-icon="">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>)}{after}</div>
}
