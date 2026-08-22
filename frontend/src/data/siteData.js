export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#initiatives', label: 'Initiatives' },
  { href: '#about', label: 'About Us' },
  { href: '#courses', label: 'Courses' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' },
];

// `href` is the real production platform URL. `devHref` (used only when
// Vite's import.meta.env.DEV is true) points at wherever that app runs
// locally instead — set once that app exists. Right now only Paripraśna
// has a registered OAuth client (client_id PARIPRASHNA, redirect_uri
// http://localhost:3001/callback — see the backend's create-client.js
// output), so it's the only card that can complete a real login locally;
// the other three will 404/connection-refused on :3001-style ports until
// their own dev servers exist and are registered as clients too.
export const initiatives = [
  {
    icon: '📖',
    title: 'Purāṇa Tilakam',
    description:
      'Śrīmad-Bhāgavatam texts, commentaries, translations, cross-references and research tools.',
    linkLabel: 'Open Platform →',
    href: 'https://puranatilakam.sastranidhi.org',
    devHref: 'http://localhost:3002',
  },
  {
    icon: '🏛️',
    title: 'Sastranidhi Web EBook Library',
    description:
      'Institutional information, research, publications, events, projects and scholar initiatives.',
    linkLabel: 'Open Platform →',
    href: 'https://www.ebook-lib.sastranidhi.org',
    devHref: 'http://localhost:3003',
  },
  {
    icon: '❓',
    title: 'Paripraśna',
    description:
      'Philosophical questions and answers grounded in authentic Indian knowledge traditions.',
    linkLabel: 'Open Platform →',
    href: 'https://pariprashna.sastranidhi.org',
    devHref: 'http://localhost:3000',
  },
  {
    icon: '🎓',
    title: 'IKS-LMS',
    description:
      'Courses, lessons, assessments, certificates and guided Indian Knowledge Systems programs.',
    linkLabel: 'View Courses →',
    href: 'https://lms.sastranidhi.org',
    devHref: 'http://localhost:3004',
  },
];

export const stats = [
  { value: '100+', label: 'Commentaries' },
  { value: '18,000+', label: 'Ślokas' },
  { value: '50+', label: 'Scholars & Contributors' },
  { value: '4', label: 'Digital Platforms' },
];

export const courses = [
  {
    topLabel: 'Introduction to Indian Philosophy',
    lessons: '12 Lessons',
    level: 'Beginner',
    title: 'Indian Philosophy Foundations',
    description:
      'Understand the major darśanas, central questions and foundational terminology.',
    href: 'https://lms.sastranidhi.org',
  },
  {
    topLabel: 'Bhagavad-gītā Study',
    lessons: '18 Lessons',
    level: 'Intermediate',
    title: 'Bhagavad-gītā: Text and Meaning',
    description:
      'A structured study of selected verses with traditional explanations.',
    href: 'https://lms.sastranidhi.org',
  },
  {
    topLabel: 'Sanskrit for Beginners',
    lessons: '20 Lessons',
    level: 'Beginner',
    title: 'Reading Sanskrit Scriptures',
    description:
      'Build the skills required to read simple Sanskrit verses and terminology.',
    href: 'https://lms.sastranidhi.org',
  },
];

export const researchFeatures = [
  {
    title: '🔎 Research Projects',
    description: 'Textual, comparative, manuscript and digital humanities projects.',
  },
  {
    title: '📰 Publications',
    description: 'Books, articles, translations, reports and educational resources.',
  },
  {
    title: '🗓️ Events',
    description: 'Lectures, seminars, workshops, launches and conferences.',
  },
  {
    title: '👥 Scholars',
    description: 'Profiles of teachers, researchers, contributors and institutional partners.',
  },
];

export const footerPlatforms = [
  { href: 'https://puranatilakam.sastranidhi.org', label: 'Purāṇa Tilakam' },
  { href: 'https://www.sastranidhi.org', label: 'Vedic Digital Library' },
  { href: 'https://pariprashna.sastranidhi.org', label: 'Paripraśna' },
  { href: 'https://lms.sastranidhi.org', label: 'IKS-LMS' },
];

export const footerInstitution = [
  { href: '#about', label: 'About Us' },
  { href: '#research', label: 'Research' },
  { href: '#courses', label: 'Courses' },
  { href: '#contact', label: 'Contact' },
];
