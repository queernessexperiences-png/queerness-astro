# MailerLite + Netlify Forms setup (do after launch, not urgent)

## Status as of 2026-09-06 (done via the MailerLite connector directly)
- [x] Custom fields created: `tour`, `wpath_interests` (`last_name` already existed by default)
- [x] Groups created: "Tour Inquiries", "Group Trip Inquiries", "WPATH Inquiries"
- [x] Three automations created (inactive, need finishing below):
  - "Tour Inquiry — Thank You" — triggers when someone joins Tour Inquiries
  - "Group Trip Inquiry — Thank You" — triggers when someone joins Group Trip Inquiries
  - "WPATH Inquiry — Thank You" — triggers when someone joins WPATH Inquiries (Santi is writing this email herself)
- [x] `netlify/functions/mailerlite-sync.js` updated to add contact-form subscribers to Tour Inquiries, waitlist-form subscribers to Group Trip Inquiries, and wpath-2026-form subscribers to WPATH Inquiries
- [x] New MailerLite API token ("Netlify sync") generated and added to Netlify as `MAILERLITE_API_KEY`
- [ ] Netlify Forms email notification + MailerLite webhook — blocked, Netlify has no deploy credits right now so it hasn't detected the site's forms yet. Revisit once billing is resolved and a deploy goes through (Forms will auto-detect at that point).

## Still needed in the MailerLite dashboard
1. **Authenticate your sender email** — Campaigns → Email settings → verify the address you want to send from. The automations will error until this is done.
2. **Design each automation email** — MailerLite's API can't write the email body, only the trigger and subject. Open each automation and paste in the copy below, using their visual editor.
3. **Activate each automation** once its email content is in and the sender is verified.

### Email copy to paste in — "Tour Inquiry — Thank You" and "Group Trip Inquiry — Thank You"
Subject (both): Got your message! Here are some free Tulum recommendations

> Hi there,
>
> Thanks for reaching out! I'll get back to you ASAP.
>
> In the meantime, check out these free recommendations so you can start planning your trip to Tulum: [Get the free recommendations](https://queernessexperiences.com/blog/queer-tulum-recommendations)
>
> Talk soon,
> Santi

### "WPATH Inquiry — Thank You"
Santi is writing this one herself.

## Step 1 — MailerLite: create the custom fields (do this first)
1. Log into MailerLite → Subscribers → Fields
2. Click "+ New field", add these three (type: Text), one at a time:
   - `tour`
   - `wpath_interests`
   - `last_name`
3. Save each one. (If these don't exist yet, the sync will silently drop that data later.)

## Step 2 — MailerLite: get your API key
1. In MailerLite, click your profile icon (bottom left) → Integrations
2. Find Developer API → Generate new token
3. Name it something like "Netlify site sync", copy the key somewhere safe (you'll paste it once and won't see it again)

## Step 3 — Netlify: add the API key as an environment variable
1. Log into Netlify → open the queernessexperiences site
2. Site configuration → Environment variables → Add a variable
3. Key: `MAILERLITE_API_KEY` — Value: paste the key from Step 2 → Save
4. Trigger a new deploy afterward (Deploys tab → Trigger deploy → Deploy site) so the function picks it up

## Step 4 — Netlify: turn on email notifications (so you get pinged per submission)
1. Site configuration → Forms → Form notifications
2. Add notification → Email notification
3. Set it to your inbox, choose "All form submissions" (or repeat per form: contact, waitlist, work-with-me, wpath-2026) → Save

## Step 5 — Netlify: turn on the MailerLite webhook
1. Same screen → Add notification → Outgoing webhook
2. URL: `https://queernessexperiences.com/.netlify/functions/mailerlite-sync` (swap in the real domain once connected)
3. Event to listen for: New form submission
4. Format: JSON
5. Repeat once per form name (contact, waitlist, work-with-me, wpath-2026), or check if the plan offers an "all forms" option

## Step 6 — Verify it worked
1. Submit a real test entry through one of the site's forms
2. Check: (a) the email arrived, (b) the submission shows up under Forms in Netlify, (c) the person shows up in MailerLite with the `tour`/`wpath_interests` field filled in
