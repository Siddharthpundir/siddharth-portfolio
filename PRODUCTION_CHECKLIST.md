# Production Checklist

Last verified: 2026-06-03

## Build And Code Quality

- [x] `npm run build` passes.
  - Verified with Next.js 16.2.6 production build.
  - Build output includes static routes for `/`, `/thanks`, `/robots.txt`, and `/sitemap.xml`.
- [x] No TypeScript errors.
  - Verified by `next build`.
  - Verified separately with `npx tsc --noEmit`.
- [x] No ESLint errors.
  - Verified with `npm run lint`.

## Routes And Internal Links

- [x] Homepage `/` returns `200`.
- [x] Thank-you page `/thanks` returns `200`.
- [x] `robots.txt` returns `200`.
- [x] `sitemap.xml` returns `200`.
- [x] Resume PDF returns `200`.
- [x] Favicon and profile image assets return `200`.
- [x] In-page anchors resolve:
  - `#main-content`
  - `#home`
  - `#about`
  - `#projects`
  - `#blog`
  - `#resume`
  - `#contact`
- [ ] Dedicated `/blog` route exists.
  - Current state: blog content is an in-page section at `/#blog`; `/blog` is not currently a route.

## Mobile Responsiveness

- [x] Responsive CSS breakpoints exist for tablet and mobile layouts.
  - `max-width: 980px`
  - `max-width: 640px`
- [x] Header switches to a mobile navigation button.
- [x] Hero, about, projects/blog, stats, contact form, and footer collapse for smaller screens.
- [ ] Visual mobile screenshot audit completed.
  - Current limitation: local headless browser screenshot capture did not produce files in this environment.

## Accessibility

- [x] Skip link exists and targets `#main-content`.
- [x] Main landmark exists.
- [x] Primary navigation has an accessible label.
- [x] Mobile navigation button exposes `aria-expanded` and `aria-controls`.
- [x] Theme toggle has an accessible name.
- [x] Social icon links have accessible names.
- [x] Contact inputs are associated with labels.
- [x] Checked theme contrast pairs are above WCAG AA thresholds.

## Images And Static Assets

- [x] Main profile image uses `next/image`.
- [x] Profile image has explicit width and height.
- [x] Profile image has `priority` because it is above the fold.
- [x] Open Graph/Twitter image asset exists and returns `200`.
- [ ] Consider creating a dedicated 1200x630 Open Graph image before launch.

## Metadata And SEO

- [x] `metadataBase` points to `https://siddharthpundir.com`.
- [x] Homepage title renders.
- [x] Homepage meta description renders.
- [x] Canonical URL renders as `https://siddharthpundir.com`.
- [x] Open Graph title, description, URL, site name, locale, type, and image render.
- [x] Twitter card metadata renders.
- [x] `robots.txt` allows `/`, disallows `/thanks`, and points to the sitemap.
- [x] `sitemap.xml` includes the homepage.
- [x] `/thanks` page is marked noindex.

## Contact Form

- [x] Contact form posts to FormSubmit.
- [x] Required name, email, and message fields exist.
- [x] FormSubmit `_next` redirect points to `https://siddharthpundir.com/thanks`.
- [ ] Live FormSubmit delivery verified.
  - Not submitted during this audit to avoid sending a test email.
  - Confirm FormSubmit activation for `siddharthpundir.dev@gmail.com` before launch.

## Vercel Deployment Settings

- [x] Project uses standard Next.js scripts:
  - Build command: `npm run build`
  - Start command: `npm run start`
- [x] No custom `vercel.json` is required for the current setup.
- [x] No workspace `.vercel/project.json` is present.
- [ ] In Vercel dashboard, confirm:
  - Framework preset: Next.js
  - Build command: `npm run build`
  - Output directory: default / unset
  - Install command: default / `npm install`
  - Production domain: `siddharthpundir.com`
  - Environment variable: `NEXT_PUBLIC_SITE_URL=https://siddharthpundir.com`

## Safe Pre-Launch Improvements

- [ ] Add a dedicated `/blog` route only if blog posts are ready to publish.
- [ ] Replace the profile-photo social image with a dedicated 1200x630 Open Graph image.
- [ ] Verify FormSubmit live email delivery once.
- [ ] Run a final mobile visual check in a real browser before deployment.
