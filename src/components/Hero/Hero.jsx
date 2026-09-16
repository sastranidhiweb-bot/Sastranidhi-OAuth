import { initiatives } from '../../data/siteData.js';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="wrap hero-inner">
        <div className="pillars">
          <span />
          <span />
          <span />
        </div>
        <div className="eyebrow">SASTRANIDHI KNOWLEDGE ECOSYSTEM</div>
        <h1>The Treasury of Śāstras</h1>
        <p className="lede">
          A unified digital home for scripture, research, philosophical inquiry,
          Indian Knowledge Systems education and service.
        </p>

        <div className="platform-links reveal">
          {initiatives.map((item) => (
            <a
              key={item.title}
              href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.shortLabel || item.title}
            </a>
          ))}
        </div>
      </div>
      <div className="gopuram-arch" />
    </section>
  );
}