# Bloomies by Aadar — Phase 1

Next.js App Router + TypeScript storefront for discovering handcrafted gifts and preparing WhatsApp order inquiries. This project is a standard Next.js application and **has not been deployed**. The source of truth is https://github.com/ZOD-IAC/Bloomies.

## Run locally

Requires Node.js 24.x, matching the configured Vercel runtime.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For production locally: `npm run build && npm start`.

## Implemented

- Homepage, searchable/filterable/sortable shop, six collection pages, twelve dynamic product pages, cart, about, contact, and custom bouquet coming-soon page.
- Rose/lavender visual system inspired by the supplied Lovable reference; rounded navigation and hero; bold locally optimized type; layered photographic collage; animated headings, drawn underline, floating tags, scroll reveals, marquee, route entrances and hover transitions. Light/dark persistence, responsive layouts, keyboard Escape dismissal, focus indicators, skip link and reduced-motion support.
- Typed sample catalog, async catalog adapter, product wrap options, optional personalization, quantities, locally persistent inquiry bag.
- WhatsApp message construction with complete line items, options, notes, quantities, totals, and inquiry disclaimer. Correct URL encoding; verified number required before linking.
- Web3Forms native form validation, honeypot, loading, success/error handling. Owner-supplied public key configured; no test inquiry sent.
- Next Image for owner-supplied reference imagery and six AI-generated product concepts (optimized WebP), with original SVG fallbacks, Next local-font optimization with bundled licensed URW fonts, page metadata and not-found route.
- Small customized shadcn-style Button using Radix Slot + CVA; no full UI kit or state management library.

## Configure the real business

Public storefront integrations are configured in `src/lib/business.ts`: WhatsApp +91 8527246489 and the owner-supplied Web3Forms access key. Optional build-time overrides in `.env.local` take precedence; restart/rebuild after changes:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: verified international WhatsApp number, digits only, country code included; no plus or spaces.
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`: the site's Web3Forms public access key. Configure destination/domain protections in Web3Forms. This key is client-visible by design; never use a private API secret here.

WhatsApp inquiry links and the contact form are enabled. No test email or WhatsApp inquiry was sent during implementation. Actual delivery still requires a live end-to-end check by the owner. No messages are sent automatically.

Replace `src/data/products.ts` with confirmed product names, prices, availability, images, variants, and contents. Add actual images under `public/images`; supplied photos are marked as inspiration references until their catalog correspondence and ownership are verified. See `public/images/ASSETS.md`. Remaining illustrations are original placeholders. No stock or delivery promises, invented reviews, or payment flow are included. Confirm actual contact details, service area, turnaround times, delivery charges, cancellation/returns policy, privacy notice, founder biography and logo before release. Instagram could not be fetched during implementation, so categories use the supplied brief.

Prices and availability on the current site are explicitly unconfirmed samples. The sample inquiry message is not a purchase. Remove sample wording only after all business information is approved.

## Architecture

- `src/app`: server-rendered routes, metadata, shared layout and design tokens.
- `src/types/product.ts`: product/cart contracts.
- `src/data/products.ts`: manually managed catalog and categories.
- `src/lib/catalog.ts`: async data-access adapter. Replace methods with CMS queries in Phase 2; keep their return contracts.
- `src/lib/checkout.ts`: WhatsApp message and URL integration.
- `src/components`: interactive navigation, cart store, product options, shop controls and form. Routes pass catalog records into interactive components.
- `src/components/ui/button.tsx`: customized composable button.

Cart storage key: `bloomies-cart-v1`. Items merge only when product, variant and personalization match. Quantities are limited to 1–99. Multiple tabs receive storage changes; malformed stored rows are discarded. Browser storage must be enabled for persistence. Real stock, pricing and order validation belong in the future backend, not this local bag.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The focused Node tests cover inquiry encoding, Unicode and punctuation, quantities and totals, disclaimers, and invalid phone numbers. No additional test library is installed.

Browser automation was unavailable in this environment. Desktop/mobile visual inspection, actual local-storage interaction, keyboard navigation and live Web3Forms/WhatsApp end-to-end tests remain to be done. The build and automated checks do not establish visual correctness or live integration delivery.

Manual review: 390px and 1440px viewports; both themes; open/close navigation and Escape; search/price/category/sort; add distinct personalization lines; refresh and change quantities; remove last item; inspect encoded inquiry; submit invalid and valid contact forms after configuration; check reduced motion and keyboard focus.

## GitHub source of truth

Repository: https://github.com/ZOD-IAC/Bloomies. Do not publicly deploy until business and visual review are complete. Clone this repository for further work:

```bash
git clone https://github.com/ZOD-IAC/Bloomies.git
cd Bloomies
npm ci
npm run dev
```

The downloadable ZIP excludes dependencies, build output and local environment secrets. `.env.example` documents optional public integration overrides. The public Web3Forms key is deliberately client-visible; it is not a private authentication secret. Never add private API credentials to client code.

## Catalog images and review content

The owner explicitly approved publishing all seven supplied photos to the public GitHub repository. They are included under `public/images`, unmodified, and retain their inspiration-reference labeling where appropriate. Six additional AI images are in `public/images/ai`; two replace the original illustration-only products and four accompany new product concepts. The catalog now contains 12 sample products.

AI images are labeled on cards and product pages and identified in the generated WhatsApp inquiry. They are visual concepts, not photos of stocked products. Confirm designs, prices, contents and availability with the owner before accepting orders. See `public/images/ASSETS.md` and `public/images/ai/PROMPTS.md` for provenance and the exact generation prompts. Generation used the built-in image tool; WebP derivatives are resized/compressed for the web.

## Design revision

The owner rejected the first, overly traditional design. The second pass follows the authenticated reference's rounded surfaces, bold sans-serif typography and pastel gradient accents while adding a photo collage and restrained motion. The supplied reference was inspected in the browser without editing it. Existing sample catalog values are not taken as confirmed business facts.

## Owner review on Vercel

1. In Vercel, import `ZOD-IAC/Bloomies` from GitHub and select `main`.
2. Framework Preset: **Next.js**. Root Directory: **./** (the repository root, not `src` or a `bloomies` subfolder).
3. Node.js version: **24.x** (also set by `package.json`). Use the detected build command `npm run build`; installation can use `npm ci`. Leave the output directory at its Next.js default; do not set it to `public` or `out`.
4. WhatsApp and the public Web3Forms key are configured already. Optional overrides are `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Redeploy after changing build-time variables.
5. Deploy from your Vercel account when ready and share the resulting URL for owner review.

No Vercel deployment was created by the assistant. Once a Git-connected Vercel project exists, future pushes to its configured production branch can trigger deployments. Review both themes on desktop and mobile, add differently personalized items, reload the cart, inspect the WhatsApp draft, and submit a contact inquiry only when ready to test actual delivery. Confirm Web3Forms domain restrictions in the owner account for the chosen Vercel/custom domain.

Official references: https://vercel.com/docs/git , https://vercel.com/docs/frameworks/full-stack/nextjs , https://vercel.com/docs/functions/runtimes/node-js/node-js-versions .

## Owner introduction and theme correction

The shared `OwnerSection` component appears on Home and About, using the owner name Arpita Prajapati and the supplied original portrait. No founder quotation, biography, experience claims or credentials were invented. Pink and lilac collection cards now derive their text from theme-aware colors; their descriptive text opacity was also raised for legibility. Peach/sage cards retain dark text on their pale backgrounds in both themes.

## Dependency audit status

Run `npm audit` for the full development tree and `npm run audit:production` for production dependencies. Both now report **zero vulnerabilities**. A version-scoped npm alias replaces only the Next.js ESLint plugin's `fast-glob` implementation with the compatible `globSync` API from `tinyglobby@0.2.17`, which was already in the lint dependency graph. This removes the unpatched braces chain while keeping Next.js 16 and all official lint rules. No audit findings are suppressed. The compatibility rationale, tests and upgrade/removal instructions are in `docs/dependency-security.md`. An independent ESLint deprecation warning may remain until its peer-dependent lint plugins support the newer major.

The owner explicitly approved public GitHub upload of the supplied portrait on 2026-10-20. The image is included at `public/images/owner/arpita-prajapati.jpg`; accessible AP initials remain as a fallback if a future replacement fails to load.

## Updating the owner section

Edit `src/data/owner.ts` to update the name, role, paragraphs, or portrait path. Home and About share this record. To change the photo, add a new file such as `public/images/owner/arpita-v2.jpg` and set `portrait` to `/images/owner/arpita-v2.jpg`. A new filename avoids cached images. For framing, adjust `.owner-portrait img` → `object-position` in `src/app/globals.css`. Commit and push the changes to `main`; the connected Vercel project can rebuild automatically. Use photos approved for public use.

## FAQ and WhatsApp product references

Edit the questions and answers in `src/data/faqs.ts`. The homepage's FAQ is rendered using accessible native details/summary elements. No delivery guarantees, refund policy or fees were invented. The footer links directly to it.

WhatsApp messages now include a stable reference (`BLM-001` etc.) and an absolute link to each selected product, alongside quantity, wrap, personalization and estimated total. The reference appears on the product page too. Product IDs should remain stable when the catalog is updated. Links use the production URL from `src/lib/site.ts`.

## SEO and favicon

Default production origin: `https://bloomies-omega.vercel.app`. Set `NEXT_PUBLIC_SITE_URL` in Vercel when moving to a custom domain, then redeploy; the origin is used for canonical URLs, sitemap, social previews, structured data and WhatsApp product links.

Each main page and collection has its own title, description, canonical URL, Open Graph and Twitter metadata. Organization, WebSite and owner Person JSON-LD use supplied business facts only. The cart and coming-soon builder have `noindex, follow`. Products with `availability: 'sample'` also have `noindex, follow` and are excluded from the sitemap; changing a confirmed product's availability enables its inclusion. Do not mark a concept as confirmed merely for indexing. No fabricated Product offers, ratings or stock schema is emitted. The sitemap is `/sitemap.xml`, and crawler guidance is `/robots.txt`. Product social previews remain available even for sample pages.

Favicon source: `public/brand/mark.svg`, with a flower/B monogram that matches the palette. Generated assets: `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`. Social card source/output: `public/brand/social-preview.svg` / `.png`. To revise them, edit the source SVGs and run `node scripts/generate-brand-assets.mjs` after `npm ci`. The helper uses sharp already installed by Next.js; it does not run during normal builds. No new application dependencies were added.

After the Vercel deployment is ready, verify the sitemap, robots, canonicals, share preview and favicon against the live domain. Add the site to Google Search Console yourself, complete ownership verification and submit `/sitemap.xml`. Rankings, indexing times and rich-result display cannot be guaranteed. No Search Console account changes were made by the assistant.

## Inquiry-bag addition feedback

A successful product addition immediately changes the button to “Added to inquiry bag” and displays the quantity/product name with a “View inquiry bag” link. The same selection cannot be accidentally submitted repeatedly; a synchronous guard covers repeat submissions before the button re-renders. To add it again intentionally, choose “Add more of this gift” or change the selected options/quantity. The feedback uses an accessible live status region and supports both themes.
