import { FadeUp, RevealImage } from "@/components/reveal";
import { home } from "@/content/home";
import { getImage } from "@/content/images";

export function About() {
  const portrait = getImage("about");
  const { about } = home;

  return (
    <section id="ueber-mich" data-section-theme="light" className="relative py-[18vh]">
      <div className="container-x">
        <FadeUp>
          <h2 className="text-mega">{about.title}</h2>
        </FadeUp>

        <div className="mt-[12vh] grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RevealImage image={portrait} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5]" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-[8vh]">
            <h3 className="text-display italic">{about.greeting}</h3>
            <p className="mt-12 text-statement">{about.paragraphs[0]}</p>

            <div className="mt-16 grid gap-8 text-lead text-[var(--muted)] sm:grid-cols-2">
              <p>{about.paragraphs[1]}</p>
              <p>{about.paragraphs[2]}</p>
            </div>

            <div className="mt-24 border-t border-[var(--line)] pt-12">
              <p className="text-display">{about.goal}</p>
            </div>
            <p className="mt-12 max-w-[34rem] text-lead">{about.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
