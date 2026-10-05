import '../../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="wrap hero-inner">
        <p className="hero-brand">
          {/* stronger-glow copy that fades in and out over the word (see hero.css) */}
          <span className="hero-brand-glow" aria-hidden="true">Śāstranidhi</span>
          Śāstranidhi
        </p>
        <h1>A Living Treasury of Śāstras</h1>
        <p className="lede">
          One digital platform to explore, analyse, inquire, and learn India’s
          knowledge systems.
        </p>
      </div>
      <div className="gopuram-arch" />
      {/* the sage on both sides, the left one mirrored, framing the heading */}
      <img className="hero-vyasa hero-vyasa-mirror" src="/assets/vyasa-gold.png" alt="" aria-hidden="true" />
      <img className="hero-vyasa" src="/assets/vyasa-gold.png" alt="" aria-hidden="true" />
      <div className="hero-curve" />
    </section>
  );
}