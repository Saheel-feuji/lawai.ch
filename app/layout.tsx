import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { Preloader } from "@/components/preloader";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getImage, getLogo } from "@/content/images";
import { site } from "@/content/site";
import "./globals.css";

// Fonts are bundled at build time and served from lawai.ch itself (no requests to Google).
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { absolute: site.titles.home },
  description: site.footer.tagline,
  openGraph: {
    type: "website",
    locale: "de_CH",
    title: site.titles.home,
    description: site.footer.tagline,
    images: [{ url: getImage("hero").src }],
  },
};

export const viewport: Viewport = {
  themeColor: "#110e0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const logo = getLogo("brand").src;

  return (
    <html lang="de-CH" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Preloader logo={logo} />
          <Cursor />
          <SiteHeader logo={logo} />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
