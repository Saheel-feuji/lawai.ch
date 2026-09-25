type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash placeholders are resized by Unsplash's CDN.
 * Your own photos in /public/images are served as they are – export them at
 * roughly 2400px on the long edge (JPG, ~80% quality).
 */
export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    return url.toString();
  }

  if (/^https?:\/\//.test(src)) return src;

  // The width parameter is ignored by static hosts but keeps each srcset entry unique.
  return `${src}?w=${width}`;
}
