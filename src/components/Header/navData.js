// Header navigation, mirroring the static site's <nav class="links">.
// Items with `menu` render as hover/focus dropdowns (.nav-dd); the last
// entry in each menu is the "View all →" link back to the parent route.
export const headerNav = [
  {
    to: '/initiatives',
    label: 'Initiatives',
    menu: [
      { to: '/initiatives/svadhyaya', label: 'Svādhyāya · Study & Search' },
      { to: '/initiatives/visleshaka', label: 'Viśleṣaka · Purāṇatilakam' },
      { to: '/initiatives/pariprasna', label: 'Paripraśna · Inquire & Clarify' },
      { to: '/initiatives/pravacana', label: 'Pravacana · Courses & Discourses' },
    ],
  },
  {
    to: '/institutes',
    label: 'Institutes',
    menu: [
      { to: '/institutes/sri', label: 'Śāstra Nidhi Research Institute (SRI)' },
      { to: '/institutes/mudgala', label: 'Mudgala Rishikulam' },
      { to: '/institutes/gargi', label: 'Gārgī Gurukulam' },
      { to: '/institutes/geetha', label: 'Gita Samskrita Gurukulam' },
      { to: '/institutes/visvanatha', label: 'Viśvanātha Bhāgavata Vidyāpīṭha' },
      { to: '/institutes/siksha', label: 'School of Indian Knowledge Systems and Heritage Applications (SIKSHA)' },
      { to: '/institutes/silpa', label: 'ŚILPA' },
      { to: '/institutes/bhaskara', label: 'BHĀSKARA' },
    ],
  },
  {
    to: '/courses',
    label: 'Courses',
    menu: [
      { to: '/courses#sanskrit-shastric', label: 'Sanskrit for Śāstric Study' },
      { to: '/courses#iks-intro', label: 'Introduction to Indian Knowledge Systems' },
      { to: '/courses#gita-gaudiya', label: 'Bhagavad-gītā with Gauḍīya Commentaries' },
      { to: '/courses#bhagavatam', label: 'Bhāgavatam As It Is (Skandhas 1–3)' },
      { to: '/courses#course-includes', label: 'What every course includes' },
      { to: '/courses#course-faq', label: 'Before you enrol' },
    ],
  },
  { to: '/events', label: 'Events' },
  { to: '/collaborate', label: 'Collaborate' },
  {
    to: '/research',
    label: 'Publications',
    menu: [{ to: '/#subscribe', label: 'Śāstra-Cakṣu eMagazine' }],
  },
  {
    to: '/about',
    label: 'About',
    menu: [{ to: '/about#team', label: 'Our Team' }],
  },
  { to: '/support', label: 'Support' },
  { to: '/contact', label: 'Contact' },
];
