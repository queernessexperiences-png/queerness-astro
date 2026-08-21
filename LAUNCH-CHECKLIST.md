# LAUNCH CHECKLIST — Get Live & Ranking in a Week

Work top to bottom. The ⚠️ items are the ones that protect your #1 ranking and your email.

## 1. Get it running locally (Claude Code)
- [ ] Unzip project, open in Claude Code
- [ ] `npm install`
- [ ] `npm run dev` → open localhost:4321, click through every page
- [ ] If anything errors, paste the error to Claude and fix before continuing

## 2. Fill in real content
- [ ] Replace every PHOTO placeholder with real images (drop files in /public/images/, update the src)
- [ ] Add alt text to every image, each with a keyword (e.g. alt="queer cenote tour tulum")
- [ ] Paste your 3-4 best Google reviews into the review cards on the homepage
- [ ] Fill in the bracketed [ ] sections in the two pillar blog posts
- [ ] Fill in the money-exchange place name in the recommendations post
- [ ] Add real links: Gumroad, Instagram, Google reviews page, WhatsApp

## 3. Self-host the font
- [ ] Download Cheddar Gothic Stencil, put the .woff2 in /public/fonts/
- [ ] Update the @font-face url in src/styles/global.css to /fonts/yourfile.woff2
- [ ] (Right now it loads from a CDN that may be unreliable — self-hosting fixes it)

## 4. Email list + forms (MailerLite — recommended over Mailchimp)

### First: rescue your existing contacts (do this TODAY, before anything else)
- [ ] Log into Mailchimp → export your audience as a CSV → save the file
- [ ] Log into Wix → export any contacts there as a CSV → save the file
- [ ] Once you have both CSV files saved, your contacts are safe forever no matter what
- [ ] Later, in MailerLite: Subscribers → Import → upload those CSVs (you keep everyone)

### Set up MailerLite
- [ ] Create a free MailerLite account (free up to 1,000 subscribers, includes automation)
- [ ] Create a "group" (their word for a tagged list) for each source: homepage, tours, guidebook, gjww
- [ ] Decide which inbox form-notifications go to (your business email or gmail — pick one)

### Wire OUR forms to MailerLite (keep the on-brand design — don't use MailerLite's default form)
Our contact forms are already coded to match the site. You just need to connect them so
submissions land in MailerLite. A static Astro site needs a "handler" to catch the submission —
here are the two easy ways, pick ONE:

**Option A — Netlify Forms (simplest, no extra service):**
- [ ] In index.astro and tours.astro, add `netlify` and `name="contact"` to each `<form>` tag
      (e.g. `<form name="contact" method="POST" netlify>`)
- [ ] Add one hidden input inside each form: `<input type="hidden" name="form-name" value="contact" />`
- [ ] Netlify auto-detects the form on deploy and collects every submission (see them in Netlify dashboard)
- [ ] Connect Netlify → MailerLite with a free Zapier/Make automation, OR just get email
      notifications from Netlify and add people to MailerLite. Simplest to launch with.

**Option B — MailerLite embed (fully automated into MailerLite, slightly more wiring):**
- [ ] In MailerLite, create a form, copy its embed/action URL and field names
- [ ] In Claude Code, tell it: "connect my existing contact form to this MailerLite form"
      and paste the MailerLite details — it will map our fields to MailerLite's endpoint
- [ ] Test a real submission lands in the right MailerLite group, tagged by page

### Test before you rely on it
- [ ] Submit each form yourself, confirm it arrives (Netlify dashboard or MailerLite)
- [ ] ⚠️ Don't assume the form works the instant the site is live — connecting it is a
      deliberate step. Do it and test it before running any ads.

## 5. ⚠️ EMAIL — do this BEFORE moving DNS
- [ ] Find your current MX records (in Wix DNS settings) — screenshot them
- [ ] Your Google email (hello@queernessexperiences.com) runs on these MX records
- [ ] When you move DNS, you MUST re-create these exact MX records at the new DNS host
- [ ] OR move email to Google Workspace directly first, then migrate DNS
- [ ] DO NOT point DNS at Netlify without handling MX records — your email will stop working

## 6. Push to GitHub + deploy to Netlify
- [ ] Create a GitHub repo, push this project
- [ ] Netlify → New site from Git → pick the repo (build settings auto-detected from netlify.toml)
- [ ] Netlify gives you a temporary URL — test the whole site there first

## 7. ⚠️ 301 REDIRECTS — this protects your ranking
- [ ] In Google Search Console, export your current indexed URLs (Coverage report)
- [ ] For every old Wix URL, add a redirect line in /public/_redirects
- [ ] Homepage stays at / so it needs no redirect (protects your #1 "queer Tulum" ranking)
- [ ] Push the updated _redirects, verify old URLs redirect correctly on Netlify

## 8. ⚠️ DNS cutover (do email first, per step 5)
- [ ] Point your domain's A record / CNAME at Netlify (Netlify gives exact instructions)
- [ ] Re-add your MX records so email survives
- [ ] Wait for DNS to propagate (can take a few hours)

## 9. Post-launch SEO
- [ ] In Google Search Console, submit your new sitemap: queernessexperiences.com/sitemap-index.xml
- [ ] Request re-indexing of your homepage and key pages
- [ ] Check that redirects resolved — search site:queernessexperiences.com after a few days
- [ ] Watch Search Console for crawl errors for 2 weeks

## Timeline reality check
Steps 1-4 (content) are the real work — budget most of your week there.
Steps 5-8 (deploy + DNS + email) is one focused afternoon, done carefully.
Ranking recovers over 2-4 weeks if redirects are clean. Don't panic at a temporary dip.
