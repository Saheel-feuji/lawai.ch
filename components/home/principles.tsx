import { home } from "@/content/home";
import { getImage, type ImageSlot } from "@/content/images";
import { HorizontalTrack } from "./horizontal-track";

const slots: ImageSlot[] = [
  "principle1",
  "principle2",
  "principle3",
  "principle4",
  "principle5",
  "principle6",
  "principle7",
];

export function Principles() {
  const { principles } = home;

  return (
    <section id="prinzipien" data-section-theme="dark" className="relative pt-[18vh] pb-[8vh]">
      <div className="container-x">
        <p className="max-w-[62rem] text-statement">{principles.intro}</p>
      </div>
      <HorizontalTrack items={principles.items} images={slots.map(getImage)} />
    </section>
  );
}
