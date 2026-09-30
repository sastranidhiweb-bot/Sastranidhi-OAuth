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
        <h1>THE TREASURY OF ŚĀSTRAS</h1>
        <p className="lede">
          A unified digital home for scripture, research, philosophical inquiry,
          Indian Knowledge Systems education and service.
        </p>
      </div>
      <div className="gopuram-arch" />
      <img className="hero-vyasa" src="/assets/vyasa-gold.png" alt="" aria-hidden="true" />
      <div className="hero-curve" />
    </section>
  );
}