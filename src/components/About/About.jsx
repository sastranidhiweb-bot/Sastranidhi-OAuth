export default function About() {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="reveal">
          <div
            className="kicker"
            style={{
              color: 'var(--violet-deep)',
              fontSize: '13px',
              letterSpacing: '3px',
              fontWeight: 700,
              marginBottom: '10px',
            }}
          >
            ABOUT SASTRANIDHI
          </div>
          <h2>Preserving Śāstra. Enabling Research. Inspiring Learning.</h2>
          <p>
            Sastranidhi is dedicated to the study, preservation and dissemination of
            India's scriptural and knowledge traditions. Through research repositories,
            educational programs, publications, technology platforms and scholar
            collaboration, the institution makes authentic learning accessible to
            present and future generations.
          </p>
          <a href="#contact" className="btn-primary">
            Connect With Us
          </a>
        </div>
        <div className="vision-card reveal">
          <h3>Our Guiding Vision</h3>
          <p>
            To create a trusted and accessible digital ecosystem where traditional
            scholarship and modern technology work together in service of dharma,
            education and research.
          </p>
          <p className="quote">"Where there is Dharma, there is victory."</p>
        </div>
      </div>
    </section>
  );
}
