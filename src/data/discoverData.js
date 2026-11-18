// MOCK content for the home page "Discover" section (Discover.jsx).
// Articles, stories and view counts below are placeholders until a real
// content API exists; contentFeed.js is the only file that reads them, so
// swapping in an API means changing that service, not the component.
//
// `daysAgo` keeps the feed looking current: the service turns it into a
// real date relative to today.

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'article', label: 'Articles' },
  { id: 'story', label: 'Stories' },
  { id: 'research', label: 'Research' },
  { id: 'culture', label: 'Culture' },
];

// `glyph` is the Devanagari letter drawn on the topic's cover art
export const TOPICS = [
  { id: 'gita', label: 'Bhagavad-gītā', glyph: 'गी' },
  { id: 'bhagavatam', label: 'Bhāgavatam', glyph: 'भा' },
  { id: 'upanishad', label: 'Upaniṣads', glyph: 'उ' },
  { id: 'purana', label: 'Purāṇas', glyph: 'पु' },
  { id: 'sanskrit', label: 'Sanskrit', glyph: 'सं' },
  { id: 'iks', label: 'Indian Knowledge Systems', short: 'IKS', glyph: 'ज्ञा' },
];

export const ARTICLES = [
  {
    id: 'gita-relevance',
    category: 'article',
    topic: 'gita',
    featured: true,
    title: 'The Eternal Relevance of the Bhagavad-gītā',
    excerpt: 'Timeless principles for a purposeful and peaceful life in the modern world.',
    daysAgo: 1,
    readMins: 8,
    views: 4820,
  },
  {
    id: 'bhagavatam-questions',
    category: 'article',
    topic: 'bhagavatam',
    featured: true,
    title: 'Six Questions at Naimiṣāraṇya',
    excerpt: 'How the sages’ questions to Sūta Gosvāmī frame the whole of Śrīmad-Bhāgavatam.',
    daysAgo: 2,
    readMins: 9,
    views: 3910,
  },
  {
    id: 'manuscript-heritage',
    category: 'research',
    topic: 'iks',
    featured: true,
    title: 'India’s Manuscript Heritage, Digitised',
    excerpt: 'Preserving palm-leaf and paper manuscripts as searchable texts for future generations.',
    daysAgo: 3,
    readMins: 6,
    views: 3120,
  },
  {
    id: 'dhruva',
    category: 'story',
    topic: 'bhagavatam',
    title: 'The Determination of Dhruva Mahārāja',
    excerpt: 'A five-year-old’s unwavering resolve, and what it teaches about steadiness.',
    daysAgo: 4,
    readMins: 6,
    views: 2760,
  },
  {
    id: 'living-temples',
    category: 'culture',
    topic: 'purana',
    title: 'The Living Temples of Bhārata',
    excerpt: 'Architecture, ritual and community: how temples carry the Purāṇas into daily life.',
    daysAgo: 5,
    readMins: 7,
    views: 2410,
  },
  {
    id: 'upanishad-wisdom',
    category: 'article',
    topic: 'upanishad',
    title: 'Svādhyāya and Pravacana in the Taittirīya Upaniṣad',
    excerpt: 'Why the teacher’s parting instruction puts study and teaching side by side.',
    daysAgo: 6,
    readMins: 6,
    views: 2240,
  },
  {
    id: 'sanskrit-sandhi',
    category: 'article',
    topic: 'sanskrit',
    title: 'Reading Sandhi Without Fear',
    excerpt: 'A practical first step for students moving from grammar books to real Śāstric texts.',
    daysAgo: 7,
    readMins: 5,
    views: 1980,
  },
  {
    id: 'narada',
    category: 'story',
    topic: 'bhagavatam',
    title: 'Nārada Muni: The Eternal Teacher',
    excerpt: 'Lessons from the life of the sage who carries the vīṇā across the worlds.',
    daysAgo: 8,
    readMins: 7,
    views: 1840,
  },
  {
    id: 'commentary-tradition',
    category: 'research',
    topic: 'gita',
    title: 'Reading the Gītā Through Its Commentators',
    excerpt: 'Comparing how Gauḍīya ācāryas explain the same verse, line by line.',
    daysAgo: 9,
    readMins: 11,
    views: 1620,
  },
  {
    id: 'gurukula',
    category: 'culture',
    topic: 'iks',
    title: 'The Gurukula Tradition and Its Relevance Today',
    excerpt: 'How a traditional system of learning shapes character as well as knowledge.',
    daysAgo: 10,
    readMins: 8,
    views: 1510,
  },
  {
    id: 'purana-geography',
    category: 'research',
    topic: 'purana',
    title: 'The Sacred Geography of the Purāṇas',
    excerpt: 'Mapping the tīrthas, rivers and mountains named across the Purāṇic corpus.',
    daysAgo: 12,
    readMins: 9,
    views: 1290,
  },
  {
    id: 'prahlada',
    category: 'story',
    topic: 'bhagavatam',
    title: 'Prahlāda and the Pillar',
    excerpt: 'Faith under pressure: the boy who would not be moved.',
    daysAgo: 14,
    readMins: 6,
    views: 1170,
  },
];

// MOCK "just published" pieces: contentFeed.subscribeToNewArticles pushes
// these one at a time to simulate a live feed (a real API would poll or
// use a socket and push whatever the server returns).
export const INCOMING_ARTICLES = [
  {
    id: 'kapila-teachings',
    category: 'article',
    topic: 'bhagavatam',
    title: 'Kapiladeva’s Teachings to Devahūti',
    excerpt: 'Sāṅkhya as a path of devotion: a mother’s questions and a son’s answers.',
    readMins: 8,
    views: 12,
  },
  {
    id: 'dhatupatha',
    category: 'research',
    topic: 'sanskrit',
    title: 'Mapping the Dhātupāṭha Digitally',
    excerpt: 'Building a searchable index of verbal roots for students of Śāstric Sanskrit.',
    readMins: 7,
    views: 8,
  },
  {
    id: 'markandeya',
    category: 'story',
    topic: 'purana',
    title: 'Mārkaṇḍeya and the Endless Ocean',
    excerpt: 'The sage who glimpsed the whole cosmos inside a child resting on a banyan leaf.',
    readMins: 6,
    views: 5,
  },
];

// One śloka is shown per day (see contentFeed.getSlokaOfTheDay)
export const SLOKAS = [
  {
    source: 'Bhagavad-gītā 2.47',
    devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    translation:
      'You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results, and never be attached to not doing your duty.',
  },
  {
    source: 'Bhagavad-gītā 4.7',
    devanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
    translation:
      'Whenever and wherever there is a decline in dharma, O descendant of Bharata, and a rise of adharma, at that time I manifest Myself.',
  },
  {
    source: 'Śrīmad-Bhāgavatam 1.2.6',
    devanagari: 'स वै पुंसां परो धर्मो यतो भक्तिरधोक्षजे ।\nअहैतुक्यप्रतिहता ययात्मा सुप्रसीदति ॥',
    translation:
      'The supreme dharma for all humanity is that by which one attains loving devotion to the transcendent Lord — unmotivated and uninterrupted — which completely satisfies the self.',
  },
  {
    source: 'Taittirīya Upaniṣad 1.11.1',
    devanagari: 'सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ।',
    translation: 'Speak the truth. Practise dharma. Do not neglect your study.',
  },
  {
    source: 'Bhagavad-gītā 18.66',
    devanagari: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
    translation:
      'Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions; do not fear.',
  },
];
