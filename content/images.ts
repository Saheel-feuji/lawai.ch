import fs from "node:fs";
import path from "node:path";

/*
 * Every photo and logo has a "slot".
 * Drop a file into /public/images using the slot's file name (e.g. public/images/hero.jpg)
 * and it replaces the placeholder automatically – no code changes needed.
 *
 * Placeholders: photos are free Unsplash images, logos are loaded from the current lawai.ch.
 * Copy the real logo files into /public/images before the old WordPress site is switched off.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
const current = (file: string) => `https://lawai.ch/wp-content/uploads/${file}`;

type Slot = { file: string; alt: string; placeholder: string; position?: string };

export const imageSlots = {
  hero: { file: "hero", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747238415033-b74eec07eb59"), position: "50% 60%" },
  about: { file: "ueber-mich", alt: "Sabrina", placeholder: unsplash("1747239202356-764770773c9a"), position: "50% 30%" },
  events: { file: "events", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1680543254008-7033f4612451"), position: "50% 40%" },
  pilates: { file: "was-ist-pilates", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1717500252709-05a73fc4f1da"), position: "55% 60%" },
  pilatesDetail: { file: "was-ist-pilates-detail", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747237602396-20cb5331ee7b"), position: "50% 35%" },

  feature1: { file: "merkmal-1", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747239069226-55382c570116") },
  feature2: { file: "merkmal-2", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1651912026785-830ca2ce1a4f") },
  feature3: { file: "merkmal-3", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747240549807-fc3962949818") },
  feature4: { file: "merkmal-4", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1661307987465-1db8d7a8796f") },
  feature5: { file: "merkmal-5", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747240031720-dced770be260") },

  principle1: { file: "prinzip-1", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1661307987465-1db8d7a8796f"), position: "50% 50%" },
  principle2: { file: "prinzip-2", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747237602396-20cb5331ee7b"), position: "55% 60%" },
  principle3: { file: "prinzip-3", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1613063373939-fad101bf3ecc"), position: "50% 55%" },
  principle4: { file: "prinzip-4", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1651912026785-830ca2ce1a4f"), position: "50% 60%" },
  principle5: { file: "prinzip-5", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1709797617764-fd21d5dc7dec"), position: "55% 60%" },
  principle6: { file: "prinzip-6", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747239069226-55382c570116"), position: "55% 60%" },
  principle7: { file: "prinzip-7", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1767611094402-2b28863b834f"), position: "50% 60%" },

  coursesHero: { file: "kurse", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747239685045-fcbcf98985db"), position: "45% 60%" },
  courseUe50: { file: "kurs-ue50", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747302653805-02f28829388d") },
  courseReformer: { file: "kurs-reformer", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747239891485-0f98c4ee9c76") },
  courseStrength: { file: "kurs-strength", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1613063373939-fad101bf3ecc") },
  coursePilates: { file: "kurs-pilates", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1767611094402-2b28863b834f") },

  contact: { file: "kontakt", alt: "Sabrina, Pilates am Zürichsee", placeholder: unsplash("1747239891485-0f98c4ee9c76"), position: "50% 50%" },
} satisfies Record<string, Slot>;

export const logoSlots = {
  brand: { file: "logo", alt: "la wai Pilates", placeholder: current("2024/10/Logo-klein-1.png") },
  hcww: { file: "partner/white-wolves", alt: "HC White Wolves Wollerau", placeholder: current("2025/10/logo_hcww_web_trans.png") },
  gc: { file: "partner/gc-zuerich", alt: "Grasshopper Club Zürich", placeholder: current("2025/10/Grasshoppers_Club_Zuerich_Logo.svg") },
  tanzeria: { file: "partner/tanzeria", alt: "la wai × Tanzeria", placeholder: current("2024/12/lawai-tanzeria.png") },
  healthart: { file: "partner/healthart", alt: "la wai × Health Art", placeholder: current("2026/02/lawai-healthart.png") },
  lintharena: { file: "partner/lintharena", alt: "la wai × Lintharena", placeholder: current("2025/10/logo-lintharena.png") },
  sihlpark: { file: "partner/sihlpark", alt: "la wai × Sihlpark Wellness", placeholder: current("2025/10/Sihlpark-Wellness-Logo.gif") },
} satisfies Record<string, Slot>;

export type ImageSlot = keyof typeof imageSlots;
export type LogoSlot = keyof typeof logoSlots;
export type ResolvedImage = { src: string; alt: string; position?: string };

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".webp", ".avif", ".png"];
const LOGO_EXTENSIONS = [".svg", ".png", ".webp", ".gif", ".jpg"];

function findLocal(name: string, extensions: string[]): string | null {
  for (const ext of extensions) {
    if (fs.existsSync(path.join(IMAGES_DIR, `${name}${ext}`))) return `/images/${name}${ext}`;
  }
  return null;
}

export function getImage(slot: ImageSlot): ResolvedImage {
  const { file, alt, placeholder, position } = imageSlots[slot] as Slot;
  return { src: findLocal(file, PHOTO_EXTENSIONS) ?? placeholder, alt, position };
}

export function getLogo(slot: LogoSlot): ResolvedImage {
  const { file, alt, placeholder } = logoSlots[slot] as Slot;
  return { src: findLocal(file, LOGO_EXTENSIONS) ?? placeholder, alt };
}
