import { FadeUp, RevealImage } from "@/components/reveal";
import { home } from "@/content/home";
import { getImage } from "@/content/images";
import { FeatureList } from "./feature-list";

export function WhatIsPilates() {
  const { pilates } = home;
  const wide = getImage("pilates");
  const detail = getImage("pilatesDetail");
  const featureImages = [
    getImage("feature1"),
    getImage("feature2"),
    getImage("feature3"),
    getImage("feature4"),
    getImage("feature5"),
  ];

  return (
    <section id="pilates" data-section-theme="light" className="relative py-[18vh]">
      <div className="container-x">
        <FadeUp>
          <h2 className="max-w-[9ch] text-mega">{pilates.title}</h2>
        </FadeUp>

        <div className="mt-[12vh] grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="hidden lg:col-span-3 lg:block">
            <RevealImage image={detail} sizes="22vw" className="aspect-[3/4]" />
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-statement">{pilates.intro}</p>
          </div>
        </div>
      </div>

      <RevealImage image={wide} sizes="100vw" parallax={12} className="mt-[16vh] h-[62svh] w-full lg:h-[78svh]" />

      <div className="container-x mt-[16vh]">
        <h3 className="max-w-[15ch] text-display">{pilates.featuresTitle}</h3>
        <FeatureList features={pilates.features} images={featureImages} />
      </div>
    </section>
  );
}
