import '../../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-clouds" aria-hidden="true">
        <span className="hero-cloud" />
        <span className="hero-cloud" />
        <span className="hero-cloud" />
      </div>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="wrap hero-inner">
        <h1>A Living Treasury of Śāstras</h1>
        <p className="lede">
          One digital platform to explore, analyse, inquire, and learn India’s
          knowledge traditions.
        </p>
      </div>
      <div className="gopuram-arch" />
      <img className="hero-vyasa" src="/assets/vyasa-gold.png" alt="" aria-hidden="true" />
      <div className="hero-curve" />
    </section>
  );
}