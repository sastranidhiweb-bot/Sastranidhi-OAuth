import { isValidElement } from 'react';
import { Link } from 'react-router-dom';

// Building blocks shared by the inner pages (About, Institutes, Initiatives,
// Courses, Research). Styles live in src/styles/pages.css.

export function PageHero({ title, lede }) {
  return (
    <section className="hero page-hero" id="top">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="wrap hero-inner">
        <span className="hero-emblem-wrap">
          <img className="hero-emblem" src="/assets/logo-mark.png" alt="" />
        </span>
        <div className="hero-text">
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
        </div>
      </div>
      {/* same as the home hero: the sage on both sides, the left one mirrored */}
      <img className="hero-vyasa hero-vyasa-mirror" src="/assets/vyasa-gold.png" alt="" aria-hidden="true" />
      <img className="hero-vyasa" src="/assets/vyasa-gold.png" alt="" aria-hidden="true" />
      <div className="hero-curve" />
    </section>
  );
}

// Internal paths ("/contact") use client-side routing; full URLs open in a new tab.
export function ActionLink({ to, children }) {
  if (to.startsWith('/')) {
    return (
      <Link className="btn-outline" to={to}>
        {children}
      </Link>
    );
  }
  return (
    <a className="btn-outline" href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function TickList({ items }) {
  return (
    <ul className="ticks">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// One block of DetailRow body text: a string is a paragraph,
// { heading } a subheading, { verse: [lines] } a quoted verse, and a React
// element (e.g. a <p> with <strong> phrases) is rendered as given.
function DetailBlock({ block }) {
  if (typeof block === 'string') return <p>{block}</p>;
  if (isValidElement(block)) return block;
  if (block.heading) return <h3 className="detail-subhead">{block.heading}</h3>;
  return (
    <blockquote className="detail-verse">
      {block.verse.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </blockquote>
  );
}

// `list` / `paragraphsAfter` (optional): a bulleted list after the paragraphs,
// and more paragraphs after that list. `feature` (optional): an element shown
// between the heading and the paragraphs (e.g. a featured book card).
// `actionInTitle` (optional): put the `action` button beside the heading
// instead of after the body text. `className` / `watermark` (optional): extra
// classes on the row, and text drawn as a faint backdrop (data-watermark).
export function DetailRow({
  id,
  kicker,
  title,
  titleHref,
  feature,
  paragraphs = [],
  list,
  paragraphsAfter = [],
  ticks,
  action,
  actionInTitle = false,
  className,
  watermark,
  note,
  card,
}) {
  const heading = (
    <h2>
      {titleHref ? (
        <a className="detail-title-link" href={titleHref} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      ) : (
        title
      )}
    </h2>
  );

  return (
    <div
      className={className ? `detail-row reveal ${className}` : 'detail-row reveal'}
      id={id}
      data-watermark={watermark}
    >
      <div>
        {kicker && <div className="kicker">{kicker}</div>}
        {action && actionInTitle ? (
          <div className="detail-title-row">
            {heading}
            <ActionLink to={action.to}>{action.label}</ActionLink>
          </div>
        ) : (
          heading
        )}
        {feature}
        {paragraphs.map((block, i) => (
          <DetailBlock key={i} block={block} />
        ))}
        {list && <TickList items={list} />}
        {paragraphsAfter.map((block, i) => (
          <DetailBlock key={i} block={block} />
        ))}
        {ticks && <TickList items={ticks} />}
        {action && !actionInTitle && <ActionLink to={action.to}>{action.label}</ActionLink>}
        {note && <p className="detail-note">{note}</p>}
      </div>
      {card && (
        <div className={card.dark ? 'info-card dark' : 'info-card'}>
          <h3 className="info-card-title">{card.title}</h3>
          {card.text && <p>{card.text}</p>}
          {card.items && <TickList items={card.items} />}
        </div>
      )}
    </div>
  );
}

export function Steps({ items }) {
  return (
    <ol className="steps stagger">
      {items.map((step) => (
        <li className="step" key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

// Single-column long-form text (Privacy Policy, Terms of Use).
// sections: [{ title, body: [paragraph string | { list: [items] }] }]
export function LegalDocument({ sections }) {
  return (
    <div className="legal-doc">
      {sections.map((section) => (
        <div className="legal-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.body.map((block, i) =>
            typeof block === 'string' ? (
              <p key={i}>{block}</p>
            ) : (
              <ul key={i}>
                {block.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

export function CtaBand({ title, text, action }) {
  return (
    <section className="cta-band">
      <div className="wrap reveal">
        <h2>{title}</h2>
        <p>{text}</p>
        <ActionLink to={action.to}>{action.label}</ActionLink>
      </div>
    </section>
  );
}
