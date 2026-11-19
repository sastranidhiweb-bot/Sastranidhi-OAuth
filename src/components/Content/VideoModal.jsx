import { useEffect } from 'react';

// Plays a YouTube video in a popup over the page (privacy-enhanced embed).
// Closes with ×, Esc or a click on the backdrop.
export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className="cx-video-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cx-video-modal" role="dialog" aria-modal="true" aria-label={video.title}>
        <button type="button" className="popup-close" onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="cx-video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="cx-video-caption">
          <h3>{video.title}</h3>
          <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
        </div>
      </div>
    </div>
  );
}
