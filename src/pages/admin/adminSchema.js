// What each content type looks like in the admin: list columns, the form
// fields, and the blank record a "New" form starts from.

export const CATEGORY_OPTIONS = [
  ['article', 'Article'],
  ['story', 'Story'],
  ['research', 'Research'],
  ['culture', 'Culture'],
  ['saints', 'Saints'],
  ['sanskrit', 'Sanskrit'],
  ['tirtha', 'Tīrtha (holy place)'],
  ['festival', 'Festival'],
];

const STATUS_OPTIONS = [
  ['draft', 'Draft (not visible)'],
  ['published', 'Published'],
];

export const TYPES = {
  articles: {
    label: 'Articles',
    singular: 'article',
    titleField: 'title',
    viewUrl: (doc) => (doc.status === 'published' ? `/articles/${doc.slug}` : null),
    columns: [
      ['title', 'Title'],
      ['category', 'Category'],
      ['status', 'Status'],
      ['publishedAt', 'Published'],
    ],
    blank: { title: '', excerpt: '', body: '', category: 'article', topics: [], coverImage: '', coverAlt: '', author: 'Sastra Nidhi', featured: false, status: 'draft', publishedAt: '' },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, maxLength: 160 },
      { name: 'excerpt', label: 'Short summary', type: 'textarea', rows: 2, maxLength: 320, help: 'Shown on cards and under the title.' },
      { name: 'category', label: 'Category', type: 'select', options: CATEGORY_OPTIONS, half: true },
      { name: 'author', label: 'Author', type: 'text', half: true },
      { name: 'topics', label: 'Topics', type: 'topics' },
      { name: 'coverImage', label: 'Cover image', type: 'image', help: 'A web address (https://…) or a site path (/images/…). Leave empty for the generated violet cover.' },
      { name: 'coverAlt', label: 'Cover image description', type: 'text', help: 'Describes the picture for screen readers.' },
      {
        name: 'body',
        label: 'Article text',
        type: 'textarea',
        rows: 16,
        help: 'Leave a blank line between paragraphs. Start a line with "## " for a sub-heading, or "> " for a quotation.',
      },
      { name: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, half: true },
      { name: 'publishedAt', label: 'Publish date', type: 'datetime', half: true, help: 'Empty = now. A future date schedules it.' },
      { name: 'featured', label: 'Feature as the lead story on the home page', type: 'checkbox' },
    ],
  },

  videos: {
    label: 'Videos',
    singular: 'video',
    titleField: 'title',
    viewUrl: (doc) => (doc.youtubeId ? `https://www.youtube.com/watch?v=${doc.youtubeId}` : null),
    columns: [
      ['title', 'Title'],
      ['source', 'Added'],
      ['status', 'Status'],
      ['publishedAt', 'Published'],
    ],
    blank: { youtube: '', title: '', speaker: '', duration: '', description: '', topics: [], featured: false, status: 'published', publishedAt: '' },
    fields: [
      { name: 'youtube', label: 'YouTube link', type: 'text', required: true, help: 'Paste the video’s address, e.g. https://www.youtube.com/watch?v=…' },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'speaker', label: 'Speaker', type: 'text', half: true },
      { name: 'duration', label: 'Length', type: 'text', half: true, placeholder: 'e.g. 32 min' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { name: 'topics', label: 'Topics', type: 'topics' },
      { name: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, half: true },
      { name: 'publishedAt', label: 'Date', type: 'datetime', half: true },
      { name: 'featured', label: 'Show first in Featured Videos', type: 'checkbox' },
    ],
  },

  topics: {
    label: 'Topics',
    singular: 'topic',
    titleField: 'name',
    viewUrl: (doc) => (doc.slug ? `/topics/${doc.slug}` : null),
    columns: [
      ['name', 'Name'],
      ['popular', 'On home page'],
      ['order', 'Order'],
    ],
    blank: { name: '', description: '', image: '', popular: true, order: 0 },
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, maxLength: 80 },
      { name: 'description', label: 'Description', type: 'textarea', rows: 2, maxLength: 300 },
      { name: 'image', label: 'Image', type: 'image', help: 'Optional. Without one, the tile shows the first letter in gold.' },
      { name: 'order', label: 'Order', type: 'number', half: true, help: 'Lower numbers come first.' },
      { name: 'popular', label: 'Show in Popular Topics and Trending', type: 'checkbox' },
    ],
  },

  slokas: {
    label: 'Ślokas',
    singular: 'śloka',
    titleField: 'source',
    columns: [
      ['source', 'Source'],
      ['scheduledFor', 'Pinned to'],
      ['active', 'In rotation'],
    ],
    blank: { devanagari: '', transliteration: '', translation: '', source: '', scheduledFor: '', active: true },
    fields: [
      { name: 'devanagari', label: 'Śloka (Devanāgarī)', type: 'textarea', rows: 3, required: true, lang: 'sa' },
      { name: 'transliteration', label: 'Transliteration (IAST)', type: 'textarea', rows: 2 },
      { name: 'translation', label: 'Translation', type: 'textarea', rows: 3, required: true },
      { name: 'source', label: 'Source', type: 'text', required: true, placeholder: 'e.g. Bhagavad-gītā 2.47', half: true },
      { name: 'scheduledFor', label: 'Show on a particular day', type: 'date', half: true, help: 'Optional. Otherwise ślokas take turns, one a day.' },
      { name: 'active', label: 'Include in the daily rotation', type: 'checkbox' },
    ],
  },
};
