# Queerness Experiences — Astro Site

Static site for queer travelers, queer families, and queer destination weddings in Tulum.

## Structure
- `src/layouts/Layout.astro` — shared header, footer, global styles. Edit the nav/footer ONCE here.
- `src/pages/index.astro` — homepage
- `src/pages/tours.astro` — tours page
- `src/pages/group-trips.astro` — group trips & retreats
- `src/pages/free-recommendations.astro` — free recommendations blog post (funnel to Gumroad)
- `src/styles/global.css` — colors, fonts, spacing scale, shared components
- `public/fonts/` — drop the Cheddar Gothic Stencil font file here
- `public/images/` — drop real photos here, then replace the PHOTO placeholders

## Run locally
```
npm install
npm run dev
```
Opens at localhost:4321

## Deploy (GitHub + Netlify)
1. Create a new GitHub repo, push this folder to it.
2. In Netlify: New site from Git, pick the repo. Build command `npm run build`, publish dir `dist` (already set in netlify.toml).
3. Netlify auto-deploys on every push.
4. Point queernessexperiences.com DNS at Netlify.

## Still to do
- Self-host Cheddar Gothic Stencil: add the font file to public/fonts and update the @font-face url in global.css
- Replace all PHOTO placeholders with real images
- Wire forms to MailerLite (keep our on-brand forms; use Netlify Forms or MailerLite embed — see LAUNCH-CHECKLIST.md step 4)
- Rescue existing contacts: export CSVs from Mailchimp AND Wix before anything else, import to MailerLite
- Fill in the 3 review cards with real Google reviews
- Add real links to Gumroad, Instagram, Google reviews
- Blog lives separately on Ghost (blog.queernessexperiences.com)

## Blog (built into Astro — no Ghost needed)
The blog lives on your main domain for maximum SEO, at `queernessexperiences.com/blog`.

**To write a new post:** create a Markdown file in `src/content/blog/`, e.g. `my-new-post.md`, with this frontmatter at the top:
```
---
title: "Your Post Title With The Keyword"
description: "Meta description that sells the click and includes the keyword."
keyword: "your primary keyword"
pubDate: 2026-02-01
draft: false
---

Your post content in Markdown. Answer the question in the first two sentences.

## Use H2 headings with keywords

Write short paragraphs. First person. Specific local detail.

## FAQ

### An exact question people search
Your 2-3 sentence answer.
```
The post auto-appears on `/blog` and gets its own page at `/blog/my-new-post`. It's automatically fast and SEO-structured.

**Two pillar posts are already started** (fill in the bracketed sections):
- `is-tulum-safe-for-queer-trans-travelers.md`
- `is-tulum-queer-trans-friendly.md`

**Optional visual editor:** if writing Markdown + GitHub feels clunky, add Decap CMS later for a Ghost-like editor that saves into this repo. Ask Claude Code to set it up.
