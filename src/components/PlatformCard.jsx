export default function PlatformCard({
  icon,
  shortLabel,
  title,
  subtitle,
  subtitleUnderlined,
  description,
  href,
  linkLabel,
}) {
  return (
    <div className="tablet">
      <div className="icon icon-pill">{shortLabel || icon}</div>
      <h3>
        {title}
        {(subtitle || subtitleUnderlined) && (
          <span className="tablet-subtitle">
            {subtitle}{' '}
            <span style={{ textDecoration: 'underline' }}>{subtitleUnderlined}</span>
          </span>
        )}
      </h3>
      <p>{description}</p>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {linkLabel}
      </a>
    </div>
  );
}
