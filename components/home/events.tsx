import { RevealImage } from "@/components/reveal";
import { home } from "@/content/home";
import { getImage, getLogo } from "@/content/images";

export function Events() {
  const image = getImage("events");
  const logos = [getLogo("hcww"), getLogo("gc")];

  return (
    <section data-section-theme="dark" className="relative py-[18vh]">
      <div className="container-x grid gap-y-20 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <div className="flex gap-4 lg:gap-6">
            {logos.map((logo) => (
              <div
                key={logo.src}
                className="grid size-28 place-items-center rounded-full bg-cream p-6 transition-transform duration-700 ease-[var(--ease-expo)] hover:-rotate-6 lg:size-40 lg:p-8"
              >
                <img src={logo.src} alt={logo.alt} className="max-h-full w-auto object-contain" />
              </div>
            ))}
          </div>

          <p className="mt-16 text-statement">{home.events.text}</p>
          <p className="mt-14 max-w-[38rem] text-lead text-[var(--muted)]">{home.events.references}</p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <RevealImage image={image} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[3/4]" />
        </div>
      </div>
    </section>
  );
}
