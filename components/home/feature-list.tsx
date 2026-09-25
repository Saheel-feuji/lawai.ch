"use client";

import type { ResolvedImage } from "@/content/images";
import { PreviewImage, useHoverPreview } from "../hover-preview";

type Feature = { title: string; text: string };

/** The five characteristics as large rows: ink fills the row on hover, a photo follows the mouse. */
export function FeatureList({ features, images }: { features: Feature[]; images: ResolvedImage[] }) {
  const { active, setActive, onPointerMove, x, y } = useHoverPreview();

  return (
    <>
      <ul
        className="mt-16 border-t border-[var(--line)]"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActive(null)}
      >
        {features.map((feature, index) => (
          <li
            key={feature.title}
            className="group relative overflow-hidden border-b border-[var(--line)]"
            onPointerEnter={() => setActive(index)}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
            />
            <div className="relative grid gap-4 py-9 transition-colors duration-500 group-hover:text-cream lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12">
              <h4 className="text-feature transition-transform duration-700 ease-[var(--ease-expo)] lg:col-span-7 lg:group-hover:translate-x-6">
                {feature.title}
              </h4>
              <p className="max-w-[30rem] text-lead lg:col-span-5">{feature.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <PreviewImage images={images} active={active} x={x} y={y} />
    </>
  );
}
