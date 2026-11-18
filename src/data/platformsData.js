// Extra cards for the home page platform carousel (Initiatives.jsx),
// shown after the four initiatives in siteData.js. Built from what the
// site already offers; swap for API data later (see services/platformsFeed.js).
//
// Same fields as `initiatives`, plus an optional `tag` ribbon. An `href`
// starting with "/" stays on the site; anything else opens in a new tab.

import { bhagavatamSeries, courses } from './siteData.js';

export const extraPlatforms = [
  {
    icon: 'Purāṇatilakam',
    shortLabel: 'Purāṇatilakam',
    title: 'Read the Bhāgavatam',
    description:
      'Śrīmad-Bhāgavatam with commentaries, grammar, recitation and statistics, verse by verse.',
    moreTo: '/initiatives/visleshaka',
    href: 'https://vislesaka.sastranidhi.org/puranatilakam/',
  },
  {
    icon: 'Bhāgavatam',
    shortLabel: 'Bhāgavatam As It Is',
    title: `Skandhas 1–${bhagavatamSeries.courses.length}`,
    description:
      'A systematic study of Śrīmad-Bhāgavatam, canto by canto, with the original text, purports and commentaries.',
    moreTo: '/courses#bhagavatam',
    href: bhagavatamSeries.courses[0].href,
    tag: 'New',
  },
  {
    icon: 'Courses',
    shortLabel: 'Courses',
    title: `${courses.length} self-paced courses`,
    description: courses.map((c) => c.title).join(' · '),
    moreTo: '/courses',
    href: courses[0].href,
    tag: 'Enrolling',
  },
  {
    icon: 'Events',
    shortLabel: 'Launch Event',
    title: 'Śāstra Nidhi Digital Platform',
    description:
      'The grand launch of the digital platform, 27–31 December 2026. Register to attend.',
    moreTo: '/events',
    href: '/launch-registration',
    tag: '27–31 Dec',
  },
  {
    icon: 'Publications',
    shortLabel: 'Publications',
    title: 'Books & Research',
    description: 'Books, articles, translations, reports and educational resources.',
    moreTo: '/research',
    href: '/research',
  },
];

// ribbons for the four core initiatives, keyed by shortLabel
export const initiativeTags = {
  Pravacana: 'Live',
};

// Each card's accent colour, keyed by shortLabel. The names map to colour
// sets in initiatives.css (`.tablet[data-accent=…]`), so a colour is changed
// in one place there.
export const platformAccents = {
  Svādhyāya: 'violet',
  Viśleṣaka: 'teal',
  Paripraśna: 'maroon',
  Pravacana: 'saffron',
  Purāṇatilakam: 'indigo',
  'Bhāgavatam As It Is': 'plum',
  Courses: 'emerald',
  'Launch Event': 'gold',
  Publications: 'navy',
};
