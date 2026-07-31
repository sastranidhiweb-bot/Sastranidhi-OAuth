import { useModal } from '../../context/ModalContext.jsx';
import SearchCard from './SearchCard.jsx';
import Initiatives from '../Initiatives/Initiatives.jsx';

export default function Hero() {
  const { open } = useModal();

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
              <button className="btn outline" onClick={() => open('signup')}>
                Create Account
              </button>
            </div>
          </div>
          <SearchCard />
        </div>

        <Initiatives />
      </div>
    </section>
  );
}
