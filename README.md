# KESH — Unisex Hair & Beauty Studio

Concept website for a unisex salon, built by S7 Labs. Nude-beige editorial
look: Playfair Display + DM Sans, a close-up hero photo with a torn,
foundation-smear edge, and a dark ink band for offers and the footer.
The page is `noindex` and the footer marks it as a concept.

## Run

```bash
npm install
npm run dev        # http://localhost:5196/KESH/
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/
```

## Hosting

GitHub Pages at https://suyash2504.github.io/KESH/, deployed by
`.github/workflows/deploy.yml` on every push to `main`. Vite `base` is
`/KESH/` to match. The site is one page with hash links, so it needs no SPA
404 fallback.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Framer Motion (LazyMotion) ·
Lucide React · self-hosted fonts via Fontsource.

## Structure

```
src/
  booking.tsx    booking state shared by Services, Stylists and Booking
  components/    Nav, Footer, Button, Reveal, SectionHead, Social, TornImage
  sections/      Hero, Studio, Services, Stylists, Gallery, Offers, Reviews,
                 Booking, Visit
  data/          services.ts (menu + prices), content.ts (team, gallery,
                 offers, reviews, hours, contact), photos.ts
_samples/        design samples: directions A–D (D picked), hero motion (6 picked),
                 logos (03 Scissor K picked). Not part of the build.
```

Hero motion (`sections/useHeroMotion.ts`): once the photo decodes, the smear and photo swipe in; the headline word cycles (`WordCycle`); the photo drifts with the cursor on fine pointers; on scroll the torn edge slides left and, on desktop, the copy lifts away. Reduced motion skips all of it.

`TornImage` draws the torn edge with an SVG mask roughened by
`feTurbulence`, so it stays sharp at any size and can face left or right.

## Booking

Pick services (from the menu or step 1), a stylist, a date and a half-hour
slot, then name and WhatsApp number. Slots in the past and a fixed
"already booked" pattern are disabled. Submitting validates the form and
shows a confirmation. Nothing is sent anywhere; wire it to WhatsApp Business,
a calendar or a booking backend before real use.

## Before launch

- Photos are Unsplash-licence placeholders hotlinked from images.unsplash.com.
  Replace them with the salon's own shoot.
- Address, phone (`+91 98XXX XXX07`), email, prices and team are placeholders.
