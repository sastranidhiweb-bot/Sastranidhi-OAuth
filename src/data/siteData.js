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
      'Svādhyāya is a comprehensive digital knowledge platform for studying, searching, and exploring Vedic literature and the wider universe of Indian Knowledge Systems.',
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
      'Viśleṣaka is an advanced scriptural analysis platform that examines major sacred texts through commentaries, grammar, recitation, presentations, statistics, and multiple dimensions of study.',
    moreTo: '/initiatives#visleshaka',
    href: 'https://puranatilakam.com/',
    devHref: 'https://puranatilakam.com/',
  },
  {
    icon: 'Paripraśna',
    title: 'Questions & Answers',
    shortLabel: 'Paripraśna',
    description:
      'Paripraśna is an interactive question-and-answer platform where seekers can ask, explore, and receive scholarly answers on Vedic literature and Indian Knowledge Systems.',
    moreTo: '/initiatives#pariprasna',
    href: 'https://qna.sastranidhi.org/',
    devHref: 'https://qna.sastranidhi.org/',
  },
  {
    icon: 'Pravacana',
    title: 'Courses & Discourses',
    shortLabel: 'Pravacana',
    description:
      'Pravacana is SASTRANIDHI’s comprehensive learning platform for courses, discourses, guided study, assessments, and certification in Vedic literature and Indian Knowledge Systems.',
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
];

export const courses = [
  {
    topLabel: 'Introduction to Indian Philosophy',
    lessons: '12 Lessons',
    level: 'Beginner',
    title: 'Indian Philosophy Foundations',
    description:
      'Understand the major darśanas, central questions and foundational terminology.',
    href: 'https://sastranidhi.edmingle.com/',
  },
  {
    topLabel: 'Bhagavad-gītā Study',
    lessons: '18 Lessons',
    level: 'Intermediate',
    title: 'Bhagavad-gītā: Text and Meaning',
    description:
      'A structured study of selected verses with traditional explanations.',
    href: 'https://sastranidhi.edmingle.com/',
  },
  {
    topLabel: 'Sanskrit for Beginners',
    lessons: '20 Lessons',
    level: 'Beginner',
    title: 'Reading Sanskrit Scriptures',
    description:
      'Build the skills required to read simple Sanskrit verses and terminology.',
    href: 'https://sastranidhi.edmingle.com/',
  },
];

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
  { href: '#', label: 'IKS-LMS' },
];

export const footerInstitution = [
  { to: '/institutes', label: 'Institutes' },
  { to: '/research', label: 'Research' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];