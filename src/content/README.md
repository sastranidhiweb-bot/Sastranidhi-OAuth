# Website content

Everything in the home page's "Today in the library" section, and on the
`/articles`, `/topics` and `/videos` pages, comes from this folder. It is built
into the website, so a change goes live with the next deploy of `main`.

The home page picks a new lead story and new picks every day at midnight
(Indian time), from all published articles. The newest four always show
under "Latest Articles".

## Add an article

Make a new file in `articles/`. The file name becomes the web address, so use
lowercase words joined by hyphens: `articles/the-glory-of-govardhana.md` opens
at `/articles/the-glory-of-govardhana`.

```
---
title: "The Glory of Govardhana"
date: 2026-11-20
category: story
topics: [puranas, indian-culture]
excerpt: "Why Kṛṣṇa lifted the hill, and what it teaches."
cover: /media/articles/govardhana.webp
coverAlt: "Kṛṣṇa lifting Govardhana Hill"
author: "Sastra Nidhi"
---

The first paragraph.

## A sub-heading

Another paragraph.

> A quotation, shown highlighted.
```

- **date**: the day it appears. A future date keeps it hidden until that day.
- **category**: one of `article`, `story`, `research`, `culture`, `saints`,
  `sanskrit`, `tirtha`, `festival`.
- **topics**: slugs from `topics.json` (for example `bhagavad-gita`, `puranas`).
- **cover**: a picture in `public/media/` (put new ones in `public/media/articles/`);
  leave it empty to get a drawn violet-and-gold cover. Wide pictures (3:2) work best.
- Optional: `featured: true` puts it in the lead spot for its first two days;
  `draft: true` hides it.
- **The text**: leave a blank line between paragraphs. A line starting with
  `## ` is a sub-heading, `> ` a quotation.

To remove an article, delete its file.

## Topics: `topics.json`

`slug` (used in addresses and in articles' `topics`), `name`, `description`,
`image` (a picture in `public/media/`). The order in the file is the order on
the page; the first ten also appear in the Trending bar.

## Śloka of the Day: `slokas.json`

Each entry: `devanagari`, `transliteration`, `translation`, `source`. Use `\n`
for a line break. They take turns, one per day. To show one on a particular
day, add `"date": "2026-12-25"` to it.

## Videos: `videos.json`

```json
[
  {
    "title": "Bhagavad-gītā, Chapter 2",
    "youtube": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
    "speaker": "Speaker name",
    "duration": "58:20",
    "date": "2026-11-20",
    "topics": ["bhagavad-gita"],
    "featured": true
  }
]
```

While the list is empty, the home page shows "Discourses are on their way".
