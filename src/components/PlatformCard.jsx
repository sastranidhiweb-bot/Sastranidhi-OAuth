export default function PlatformCard({
  icon,
  title,
  linkedTitle,
  description,
  href,
  linkLabel,
}) {
  return (
    <div className="tablet">
      <div className="icon">{icon}</div>
      <h3>
        {title}
        {linkedTitle && (
          <>
            {' '}
            <span style={{ textDecoration: 'underline' }}>{linkedTitle}</span>
          </>
        )}
      </h3>
      <p>{description}</p>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {linkLabel}
      </a>
    </div>
  );
}
