import { useEffect, useId, useState } from 'react';

export default function PlatformCard({
  icon,
  shortLabel,
  title,
  subtitle,
  subtitleUnderlined,
  subtitleHref,
  description,
  href,
  more,
}) {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  // briefly shows "Opening…" on the name badge after it is clicked
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = setTimeout(() => setOpening(false), 1500);
    return () => clearTimeout(timer);
  }, [opening]);

  return (
    // a data attribute, not a class: the scroll-reveal code adds its own
    // class to this element, which a className change would wipe
    <div className="tablet" data-open={open ? '' : undefined}>
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
        {more && (
          <button
            type="button"
            className="tablet-more"
            aria-expanded={open}
            aria-controls={moreId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Less' : 'More'}
          </button>
        )}
      </div>
      {more && open && (
        <div className="tablet-more-text" id={moreId}>
          <p>{more}</p>
        </div>
      )}
    </div>
  );
}
