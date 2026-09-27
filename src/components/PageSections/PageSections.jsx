import { Link } from 'react-router-dom';

// Building blocks shared by the inner pages (About, Institutes, Initiatives,
// Courses, Research). Styles live in src/styles/pages.css.

export function PageHero({ crumb, title, lede }) {
  return (
    <section className="hero page-hero" id="top">
      <div className="hero-clouds" aria-hidden="true">
        <span className="hero-cloud" />
        <span className="hero-cloud" />
        <span className="hero-cloud" />
      </div>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="wrap hero-inner">
        <span className="hero-emblem-wrap">
          <img className="hero-emblem" src="/assets/logo-mark.png" alt="" />
        </span>
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
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

export function DetailRow({ kicker, title, paragraphs = [], ticks, action, card }) {
  return (
    <div className="detail-row reveal">
      <div>
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {ticks && <TickList items={ticks} />}
        {action && <ActionLink to={action.to}>{action.label}</ActionLink>}
      </div>
      {card && (
        <div className={card.dark ? 'info-card dark' : 'info-card'}>
          <h3 className="info-card-title">{card.title}</h3>
          <TickList items={card.items} />
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
