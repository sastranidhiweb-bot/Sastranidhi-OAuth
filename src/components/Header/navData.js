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
      { to: '/institutes#sri', label: 'Śāstra Nidhi Research Institute (SRI)' },
      { to: '/institutes#mudgala', label: 'Mudgala Rishikulam' },
      { to: '/institutes#gargi', label: 'Gargi Rishikulam' },
      { to: '/institutes#geetha', label: 'Gita Samskrita Gurukulam' },
      { to: '/institutes#visvanatha', label: 'Viśvanātha Bhagavata Vidyapitha' },
      { to: '/institutes#siksha', label: 'School of Indian Knowledge Systems and Heritage Applications (SIKSHA)' },
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
  { to: '/research', label: 'Publications' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];
