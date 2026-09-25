"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { ResolvedImage } from "@/content/images";

type Principle = { title: string; text: string };

/** The 7 principles slide sideways while the page scrolls down (pinned section). */
export function HorizontalTrack({ items, images }: { items: Principle[]; images: ResolvedImage[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const distance = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const measure = () => {
      const overflow = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(overflow);
      section.style.height = `calc(100svh + ${overflow}px)`;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: "100svh" }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.ol
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 px-[clamp(20px,3.6vw,64px)] pt-10 lg:gap-8"
        >
          {items.map((item, index) => (
            <li key={item.title} className="flex h-[74svh] w-[84vw] shrink-0 flex-col sm:w-[58vw] lg:w-[31vw]">
              <div className="relative min-h-0 flex-1 overflow-hidden bg-ink-2">
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, 84vw"
                  className="photo-bw object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] hover:scale-105"
                  style={images[index].position ? { objectPosition: images[index].position } : undefined}
                />
              </div>
              <div className="grid grid-cols-[3.25rem_1fr] gap-x-4 pt-6 lg:grid-cols-[4.5rem_1fr]">
                <span className="font-serif text-5xl leading-[0.8] text-rose lg:text-7xl">{index + 1}</span>
                <div>
                  <h3 className="font-wide text-lg leading-snug font-normal tracking-[-0.02em] lg:text-xl">{item.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--muted)]">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </motion.ol>

        <div
          aria-hidden="true"
          className="absolute right-[clamp(20px,3.6vw,64px)] bottom-6 left-[clamp(20px,3.6vw,64px)] h-px bg-[var(--line)]"
        >
          <motion.div className="h-full origin-left bg-rose" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  );
}
