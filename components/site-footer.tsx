import { getLogo } from "@/content/images";
import { site } from "@/content/site";
import { InstagramIcon } from "./icons";
import { Magnetic } from "./magnetic";

export function SiteFooter() {
  const logo = getLogo("brand");
  const year = new Date().getFullYear();

  return (
    <footer data-section-theme="dark" className="relative overflow-hidden bg-ink text-cream">
      <div className="container-x pt-[18vh] pb-8">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <img src={logo.src} alt={logo.alt} className="size-20 rounded-full lg:size-24" />
            <p className="mt-14 max-w-[17ch] text-display">{site.footer.tagline}</p>
            <p className="mt-12 text-lead text-cream/70">
              <a href={site.phone.href} className="transition-colors duration-300 hover:text-rose">
                {site.phone.display}
              </a>
              {" | "}
              <a href={`mailto:${site.email}`} className="transition-colors duration-300 hover:text-rose">
                {site.email}
              </a>
            </p>
          </div>

          <div className="lg:col-span-3 lg:justify-self-end">
            <Magnetic strength={0.4}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="grid size-24 place-items-center rounded-full border border-cream/25 transition-colors duration-500 hover:border-rose hover:bg-rose hover:text-ink lg:size-32"
              >
                <InstagramIcon className="size-7" />
              </a>
            </Magnetic>
          </div>
        </div>

        <p className="mt-[14vh] border-t border-cream/15 pt-6 text-sm text-cream/55">
          © {year} {site.footer.copyright}{" "}
          <span className="text-cream/45">
            {site.footer.creditPrefix}{" "}
            <a
              href={site.footer.creditUrl}
              target="_blank"
              rel="noopener"
              className="underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              {site.footer.creditName}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
