// Fixed, full-page ambient silver/gold bubble layer used across every
// page, matching the reference site's .site-bubbles element.
export default function SiteBubbles() {
  return (
    <div className="site-bubbles" aria-hidden="true">
      <span />
      <span className="gold" />
      <span />
      <span className="gold" />
      <span />
      <span className="gold" />
      <span />
      <span className="gold" />
      <span />
      <span className="gold" />
      <span />
      <span className="gold" />
    </div>
  );
}
