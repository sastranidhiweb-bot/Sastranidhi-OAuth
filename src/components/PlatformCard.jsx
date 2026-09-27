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
      <a className="icon" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title}`}>
        {icon}
      </a>
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
