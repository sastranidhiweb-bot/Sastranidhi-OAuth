import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlatformCard({
  icon,
  shortLabel,
  title,
  subtitle,
  subtitleUnderlined,
  subtitleHref,
  description,
  href,
  moreTo,
}) {
  // briefly shows "Opening…" on the name badge after it is clicked
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = setTimeout(() => setOpening(false), 1500);
    return () => clearTimeout(timer);
  }, [opening]);

  return (
    <div className="tablet">
      <div className="tablet-main">
        <div className="tablet-head">
          <a
            className="icon icon-pill"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpening(true)}
          >
            {opening ? 'Opening…' : shortLabel || icon}
            <span className="pill-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <h3>
          {title}
          {(subtitle || subtitleUnderlined) && (
            <span className="tablet-subtitle">
              {subtitle}{' '}
              {subtitleHref ? (
                <a
                  className="tablet-subtitle-link"
                  href={subtitleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {subtitleUnderlined}
                </a>
              ) : (
                <span style={{ textDecoration: 'underline' }}>{subtitleUnderlined}</span>
              )}
            </span>
          )}
        </h3>
        <p>{description}</p>
        {moreTo && (
          <Link className="tablet-more" to={moreTo}>
            More…
          </Link>
        )}
      </div>
    </div>
  );
}
