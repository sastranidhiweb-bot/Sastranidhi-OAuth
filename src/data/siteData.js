export const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#institutes', label: 'Institutes' },
  { href: '/#platforms', label: 'Initiatives' },
  { href: '/#courses', label: 'Courses' },
  { href: '/#research', label: 'Research' },
  { href: '/#about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export const initiatives = [
  {
    icon: 'Svādhyāya',
    title: 'Study & Search',
    shortLabel: 'Svādhyāya',
    description:
      'A digital platform to study, search, and explore Vedic literature and Indian Knowledge Systems.',
    // "More…" link target: the matching row on /initiatives
    moreTo: '/initiatives#svadhyaya',
    href: 'https://reader.sastranidhi.org/homePage',
    devHref: 'https://reader.sastranidhi.org/homePage',
  },
  {
    icon: 'Viśleṣaka',
    title: 'Analyze & Assimilate',
    // second title line; only the `subtitleUnderlined` part is underlined
    subtitle: 'Bhagavatam :',
    subtitleUnderlined: 'Puranatilakam',
    subtitleHref: 'https://puranatilakam.com/',
    shortLabel: 'Viśleṣaka',
    description:
      'Analyse sacred texts through commentaries, grammar, recitation, and statistics.',
    moreTo: '/initiatives#visleshaka',
    href: 'https://puranatilakam.com/',
    devHref: 'https://puranatilakam.com/',
  },
  {
    icon: 'Paripraśna',
    title: 'Inquire & Clarify',
    shortLabel: 'Paripraśna',
    description:
      'Ask questions and receive scholarly answers on Vedic literature and Indian Knowledge Systems.',
    moreTo: '/initiatives#pariprasna',
    href: 'https://qna.sastranidhi.org/',
    devHref: 'https://qna.sastranidhi.org/',
  },
  {
    icon: 'Pravacana',
    title: 'Courses & Discourses',
    shortLabel: 'Pravacana',
    description:
      'Courses, discourses, guided study, assessments, and certification in Indian Knowledge Systems.',
    moreTo: '/initiatives#pravacana',
    href: 'https://sastranidhi.edmingle.com/',
    devHref: 'https://sastranidhi.edmingle.com/',
  },
];

export const stats = [
  { icon: '🌐', value: '250,000+', label: 'Website Hits' },
  { icon: '👥', value: '10,000+', label: 'Users' },
  { icon: '📜', value: '500+', label: 'Śāstras' },
  { icon: '🎓', value: '3+', label: 'Courses' },
  { icon: '📚', value: '1', label: 'Publications' },
];

export const courses = [
  // The courses (shown on /courses and the home page). `id` is the
  // matching detail row on /courses. No lesson count or level yet, so the
  // card shows a "New course" badge and where it runs instead.
  {
    id: 'sanskrit-shastric',
    isNew: true,
    topLabel: 'Sanskrit for Śāstra',
    lessons: 'Online · IKS-LMS',
    level: 'New course',
    title: 'Sanskrit for Śāstric Study',
    description:
      'Learn Sanskrit with a focused approach to reading, understanding, and studying Śāstric texts.',
    href: 'https://sastranidhi.edmingle.com/',
  },
  {
    id: 'iks-intro',
    isNew: true,
    topLabel: 'Indian Knowledge Systems',
    lessons: 'Online · IKS-LMS',
    level: 'New course',
    title: 'Introduction to Indian Knowledge Systems',
    description:
      'Discover the foundations, scope, disciplines, and continuing relevance of India’s vast knowledge traditions.',
    href: 'https://sastranidhi.edmingle.com/',
  },
  {
    id: 'gita-gaudiya',
    isNew: true,
    topLabel: 'Bhagavad-gītā',
    lessons: 'Online · IKS-LMS',
    level: 'New course',
    title: 'Bhagavad-gītā with Gauḍīya Commentaries',
    description:
      'Study the Bhagavad-gītā through the rich philosophical and devotional insights of the Gauḍīya Vaiṣṇava commentarial tradition.',
    href: 'https://sastranidhi.edmingle.com/',
  },
];

// "Bhāgavatam As It Is": a course series, one course per Skandha (canto).
// Shown under its own heading on /courses (#bhagavatam) and as a banner
// below the courses on the home page. `id` is each course's detail row.
export const bhagavatamSeries = {
  title: 'Bhāgavatam As It Is',
  intro:
    'A systematic study of Śrīmad-Bhāgavatam, canto by canto, combining the original text, Śrīla Prabhupāda’s Bhaktivedanta purports, traditional Vaiṣṇava commentarial insights, thematic study, recitation, presentations, and structured learning resources.',
  courses: [
    {
      id: 'bhagavatam-1',
      isNew: true,
      topLabel: 'Skandha 1',
      lessons: 'Online · IKS-LMS',
      level: 'Course series',
      title: 'Bhāgavatam As It Is — Skandha 1',
      description:
        'Enter the world of Śrīmad-Bhāgavatam through its foundational teachings, personalities, questions, and the circumstances that lead to the narration of the Bhāgavata.',
      href: 'https://sastranidhi.edmingle.com/',
    },
    {
      id: 'bhagavatam-2',
      isNew: true,
      topLabel: 'Skandha 2',
      lessons: 'Online · IKS-LMS',
      level: 'Course series',
      title: 'Bhāgavatam As It Is — Skandha 2',
      description:
        'A focused study of the universal form, creation, meditation, the process of hearing, and the deeper philosophical structure of Śrīmad-Bhāgavatam.',
      href: 'https://sastranidhi.edmingle.com/',
    },
    {
      id: 'bhagavatam-3',
      isNew: true,
      topLabel: 'Skandha 3',
      lessons: 'Online · IKS-LMS',
      level: 'Course series',
      title: 'Bhāgavatam As It Is — Skandha 3',
      description:
        'Explore creation, cosmology, Varāha-līlā, the teachings of Kapiladeva, and the profound journey of Kardama Muni and Devahūti.',
      href: 'https://sastranidhi.edmingle.com/',
    },
  ],
};

export const researchFeatures = [
  {
    title: 'Research Projects',
    description: 'Textual, comparative, manuscript and digital humanities projects.',
  },
  {
    title: 'Publications',
    description: 'Books, articles, translations, reports and educational resources.',
  },
  {
    title: 'Events',
    description: 'Lectures, seminars, workshops, launches and conferences.',
  },
  {
    title: 'Scholars',
    description: 'Profiles of teachers, researchers, contributors and institutional partners.',
  },
];

export const footerPlatforms = [
  { href: '#', label: 'Purāṇa Tilakam' },
  { href: '#', label: 'Vedic Digital Library' },
  { href: '#', label: 'Paripraśna' },
];

export const footerInstitution = [
  { to: '/institutes', label: 'Institutes' },
  { to: '/research', label: 'Publications' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];