import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Cursor } from "@/components/cursor";
import { Preloader } from "@/components/preloader";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getImage, getLogo } from "@/content/images";
import { site } from "@/content/site";
import { INTRO_STORAGE_KEY } from "@/lib/constants";
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

// Skip the preloader for the rest of the visit (runs before the first paint).
const introScript = `try{if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))document.documentElement.dataset.intro="skip"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const logo = getLogo("brand").src;

  return (
    <html lang="de-CH" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <Script id="intro-skip" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: introScript }} />
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
