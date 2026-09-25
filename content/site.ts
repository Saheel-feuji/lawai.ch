// Text 1:1 from lawai.ch (header, footer, page titles).

export const site = {
  url: "https://lawai.ch",
  titles: {
    home: "la wai | Pilates – Mind & Body Balance",
    courses: "Übersicht – la wai | Pilates",
    contact: "Contact – la wai | Pilates",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Kurse", href: "/kurse/" },
    { label: "Kontakt", href: "/kontakt/" },
  ],
  footer: {
    tagline: "Gruppenkurse und Privatunterricht bei dir/euch zu Hause oder im Büro",
    copyright: "by lawai.ch | Alle Rechte vorbehalten |",
    creditPrefix: "Webseite erstellt von",
    creditName: "Ivo von Mühlenen",
    creditUrl: "https://ivovm.ch/",
  },
  phone: { display: "+41 79 255 58 65", href: "tel:+41792555865" },
  email: "pilates@lawai.ch",
  instagram: "https://www.instagram.com/lawai_pilates",
} as const;
