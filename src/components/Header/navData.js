// Header navigation, mirroring the static site's <nav class="links">.
// Items with `menu` render as hover/focus dropdowns (.nav-dd); the last
// entry in each menu is the "View all →" link back to the parent route.
export const headerNav = [
  {
    to: '/initiatives',
    label: 'Initiatives',
    menu: [
      { to: '/initiatives#svadhyaya', label: 'Svādhyāya · Study & Search' },
      { to: '/initiatives#visleshaka', label: 'Viśleṣaka · Purāṇatilakam' },
      { to: '/initiatives#pariprasna', label: 'Paripraśna · Inquire & Clarify' },
      { to: '/initiatives#pravacana', label: 'Pravacana · Courses & Discourses' },
    ],
  },
  {
    to: '/institutes',
    label: 'Institutes',
    menu: [
      { to: '/institutes#sri', label: 'Mudgala Rishikulam' },
      { to: '/institutes#isil', label: 'Institute of Sanskrit & Indic Languages' },
      { to: '/institutes#cds', label: 'Centre for Digital Śāstra' },
    ],
  },
  {
    to: '/courses',
    label: 'Courses',
    menu: [
      { to: '/courses#philosophy', label: 'Indian Philosophy Foundations' },
      { to: '/courses#gita', label: 'Bhagavad-gītā: Text and Meaning' },
      { to: '/courses#sanskrit', label: 'Reading Sanskrit Scriptures' },
      { to: '/courses#course-includes', label: 'What every course includes' },
      { to: '/courses#course-faq', label: 'Before you enrol' },
    ],
  },
  { to: '/research', label: 'Research' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];
