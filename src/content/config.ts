import { defineCollection, z } from 'astro:content';

// Blog content collection — every post is a Markdown file in src/content/blog/
// The frontmatter (title, description, etc.) is validated against this schema.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),              // shows as the H1 and the SEO <title>
    description: z.string(),        // meta description — write it to sell the click, include the keyword
    keyword: z.string(),           // the ONE primary keyword this post targets
    pubDate: z.date(),             // publish date
    updatedDate: z.date().optional(), // update this when you refresh the post
    heroImage: z.string().optional(),  // path like /images/post-hero.jpg
    heroAlt: z.string().optional(),    // alt text with keyword
    draft: z.boolean().default(false), // true = won't publish
    // Optional FAQ pairs, output as FAQPage structured data so AI answer
    // engines (ChatGPT, Perplexity, Google AI Overviews) can parse and
    // cite them directly. Keep these in sync with the ### FAQ section
    // in the post body — this doesn't replace that, it just makes the
    // same Q&A machine-readable.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

export const collections = { blog };
