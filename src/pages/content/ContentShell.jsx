import { useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import SiteBubbles from '../../components/SiteBubbles.jsx';
import WhatsAppFloat from '../../components/WhatsAppFloat.jsx';
import { PageHero } from '../../components/PageSections/PageSections.jsx';
import '../../styles/pages.css';
import '../../styles/content.css';

/** Site header/footer around a content page, with an optional page hero. */
export default function ContentShell({ title, hero, lede, children }) {
  useEffect(() => {
    if (title) document.title = `${title} · Sastra Nidhi`;
    return () => {
      document.title = 'Sastra Nidhi — The Treasury of Śāstras';
    };
  }, [title]);

  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        {hero && <PageHero title={hero} lede={lede} />}
        <section className="cx-page">
          <div className="cx-page-wrap">{children}</div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
