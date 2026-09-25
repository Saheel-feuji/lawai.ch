import type { ImageSlot, LogoSlot } from "./images";

// Kurse page text, 1:1 from lawai.ch/uebersicht in the original order.

export type Course = {
  title: string;
  schedule: string;
  /** Extra line under the schedule; `strong` is shown in bold like on the current site */
  details?: { strong?: string; text: string };
  note?: string;
  venueUrl: string;
  logo: LogoSlot;
  image: ImageSlot;
};

export const coursesPage = {
  title: "Hier findest du eine Übersicht über mein Kursangebot",
  cta: "Schreibe mir für mehr Infos.",
  ctaHref: "mailto:pilates@lawai.ch",
};

export const courses: Course[] = [
  {
    title: "Ü50 Pilates-Lektionen",
    schedule: "Jeden Mittwoch immer von 10:00 - 11:00 Uhr in Altendorf",
    venueUrl: "https://www.tanzeria.ch",
    logo: "tanzeria",
    image: "courseUe50",
  },
  {
    title: "Reformer Pilates",
    schedule: "Jeden Dienstag von 17:30 - 18:20 Uhr",
    details: { strong: "Health Art", text: " | Fällmissstrasse 12 | 8832 Wilen bei Wollerau" },
    venueUrl: "https://www.healthart.ch",
    logo: "healthart",
    image: "courseReformer",
  },
  {
    title: "Strength Pilates",
    schedule: "Jeden Mittwoch in der Lintharena Näfels. Immer von 18:00 - 19:00 Uhr",
    venueUrl: "https://www.lintharena.ch/groupfitness",
    logo: "lintharena",
    image: "courseStrength",
  },
  {
    title: "Pilates",
    schedule: "Montags von 18:30 - 19:30 Uhr im TC Lachen oder im Sihlpark.",
    note: "Diese Kurse sind nicht regelmässig, gerne kannst du mir schreiben falls du Interesse hast.",
    venueUrl: "https://www.sihlpark-fitness.ch/reformer-pilates",
    logo: "sihlpark",
    image: "coursePilates",
  },
];
