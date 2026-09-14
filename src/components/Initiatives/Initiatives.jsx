// import { initiatives } from '../../data/siteData.js';
// import PlatformCard from '../PlatformCard.jsx';

// export default function Initiatives() {
//   return (
//     <section id="initiatives">
//       <div className="section-title">
//         <div className="kicker">Our Digital Initiatives</div>
//         <h2>Explore All Platforms</h2>
//         <p>The four key initiatives are visible immediately when visitors enter the website.</p>
//       </div>
//       <div className="grid">
//         {initiatives.map((item) => (
//           <PlatformCard
//             key={item.title}
//             icon={item.icon}
//             title={item.title}
//             description={item.description}
//             linkLabel={item.linkLabel}
//             // Use the local dev URL while running under `vite dev`, so
//             // "Open Platform" actually has somewhere to go before the
//             // real production subdomains exist.
//             href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import { initiatives } from '../../data/siteData.js';
import PlatformCard from '../PlatformCard.jsx';

export default function Initiatives() {
  return (
    <section id="initiatives">
      <div className="section-title">
        <div className="kicker">Our Digital Initiatives</div>
        <h2>Explore All Platforms</h2>
        <p>The four key initiatives are visible immediately when visitors enter the website.</p>
      </div>
      <div className="grid">
        {initiatives.map((item) => (
          <PlatformCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            linkedTitle={item.linkedTitle}
            showPlatformLink={item.showPlatformLink}
            description={item.description}
            linkLabel={item.linkLabel}
            // Use the local dev URL while running under `vite dev`, so
            // "Open Platform" actually has somewhere to go before the
            // real production subdomains exist.
            href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
            // SSO is currently disabled for all cards. Preserve a future
            // route here when a platform is ready for SSO.
            // ssoRoute={item.ssoRoute}
          />
        ))}
      </div>
    </section>
  );
}
