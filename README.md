# Bloomies by Aadar — Phase 1

Next.js App Router + TypeScript storefront for discovering handcrafted gifts and preparing WhatsApp order inquiries. This project is a standard Next.js application and **has not been deployed**. The source of truth is https://github.com/ZOD-IAC/Bloomies.

## Run locally

Requires Node.js 22.18+ (Node 24 recommended).

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For production locally: `npm run build && npm start`.

## Implemented

- Homepage, searchable/filterable/sortable shop, six collection pages, eight dynamic product pages, cart, about, contact, and custom bouquet coming-soon page.
- Rose/lavender visual system inspired by the supplied Lovable reference; rounded navigation and hero; bold locally optimized type; layered photographic collage; animated headings, drawn underline, floating tags, scroll reveals, marquee, route entrances and hover transitions. Light/dark persistence, responsive layouts, keyboard Escape dismissal, focus indicators, skip link and reduced-motion support.
- Typed sample catalog, async catalog adapter, product wrap options, optional personalization, quantities, locally persistent inquiry bag.
- WhatsApp message construction with complete line items, options, notes, quantities, totals, and inquiry disclaimer. Correct URL encoding; verified number required before linking.
- Web3Forms native form validation, honeypot, loading, success/error handling. Sending disabled honestly until configured.
- Next Image for owner-supplied reference imagery and original sample SVG illustrations, Next local-font optimization with bundled licensed URW fonts, page metadata and not-found route.
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

## Photo distribution

Owner-supplied JPEG photographs are included only in the private downloadable project. Their publication to this public repository was blocked by automatic approval review pending explicit owner approval for public disclosure. The public source deliberately excludes those files. Every photo component falls back to a clearly described sample illustration if a photo is absent, so the public checkout remains functional. Copy approved photos into `public/images` using the filenames in `public/images/ASSETS.md` to enable the photo composition locally. The downloaded full project already includes them.

## Design revision

The owner rejected the first, overly traditional design. The second pass follows the authenticated reference's rounded surfaces, bold sans-serif typography and pastel gradient accents while adding a photo collage and restrained motion. The supplied reference was inspected in the browser without editing it. Existing sample catalog values are not taken as confirmed business facts.
