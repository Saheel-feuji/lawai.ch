# la wai | Pilates – website

Redesign of [lawai.ch](https://lawai.ch) with the **exact content of the current site** (all three pages, same texts, same order).

**Stack:** Next.js 16 (React 19, App Router, static export) · Tailwind CSS 4 · Motion · Lenis smooth scrolling.
Fonts (Archivo, Instrument Serif) are bundled at build time – no requests to Google.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run build      # → static site in out/
```

Upload the contents of `out/` to any web host (the current WordPress hosting works; no Node server needed).
`out/.htaccess` (Apache) redirects the old WordPress URLs `/uebersicht/` → `/kurse/` and `/contact/` → `/kontakt/`.

## Where things live

| What | File |
| --- | --- |
| Home texts (1:1 from lawai.ch) | `content/home.ts` |
| Kurse texts | `content/courses.ts` |
| Kontakt texts & form labels | `content/contact.ts` |
| Footer, menu, phone, e-mail, page titles | `content/site.ts` |
| Photos & logos (slots) | `content/images.ts` |
| Colours, type sizes, animations | `app/globals.css` |

## Photos – just drop files in

Put a photo into `public/images/` with one of these names and it **replaces the placeholder automatically**
(`.jpg`, `.jpeg`, `.webp`, `.avif` or `.png`; ~2400 px long edge, JPG ~80 %). All photos are shown in black & white.

| File name | Where |
| --- | --- |
| `hero` | Home – circle that grows into the full screen |
| `ueber-mich` | Home – «Über mich» portrait (4:5) |
| `events` | Home – events / teams (3:4) |
| `was-ist-pilates-detail` | Home – small photo next to the intro (3:4) |
| `was-ist-pilates` | Home – full-width photo |
| `merkmal-1` … `merkmal-5` | Home – photo that follows the mouse over Kontrolle, Atmung, … |
| `prinzip-1` … `prinzip-7` | Home – the 7 principle cards |
| `kurse` | Kurse – full-screen header |
| `kurs-ue50`, `kurs-reformer`, `kurs-strength`, `kurs-pilates` | Kurse – photo that follows the mouse over each course |
| `kontakt` | Kontakt – left half |

The crop focus of each photo can be tuned with `position` in `content/images.ts`.

**Logos:** `public/images/logo.(svg|png)` and `public/images/partner/…` (`white-wolves`, `gc-zuerich`, `tanzeria`,
`healthart`, `lintharena`, `sihlpark`). Until these files exist, the logos are loaded from the current lawai.ch –
**copy them into `public/images` before the old WordPress site is switched off.**

The placeholder photos are free Unsplash images – replace them (especially the «Über mich» portrait) before going live.

## Contact form

A static site has no mail server:

- Set `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a Formspree or Web3Forms URL) in `.env.local`, rebuild → messages are sent directly.
- Without it, «Send» opens the visitor's e-mail app with the message filled in (to pilates@lawai.ch).

## Notes

- Texts are kept exactly as on lawai.ch, including small quirks: «Vereine .», «WAS IST PILATES ?», button «Send».
- The intro (logo + circle) plays once per visit; later page views start directly.
- All animations respect the system setting «reduce motion».
