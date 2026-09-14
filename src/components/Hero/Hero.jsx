import SearchCard from './SearchCard.jsx';

export default function Hero() {
  return (
    <section className="home-screen" id="home">
      <div className="container home-inner">
        <div className="hero">
          <div>
            <div className="kicker">Sastranidhi Knowledge Ecosystem</div>
            <h1>The Treasury of Śāstras</h1>
            <p>
              A unified digital home for scripture, research, philosophical inquiry,
              Indian Knowledge Systems education and service.
            </p>
            <div className="hero-buttons">
              <a className="btn primary" href="#initiatives">
                Explore Initiatives
              </a>
              {/* "Create Account" button commented out as requested */}
              {/*
              <a className="btn outline" href="/signup">
                Create Account
              </a>
              */}
            </div>
          </div>
          <SearchCard />
        </div>
      </div>
    </section>
  );
}