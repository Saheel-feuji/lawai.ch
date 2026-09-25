"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SplitText } from "@/components/reveal";
import type { ResolvedImage } from "@/content/images";

export function CoursesHero({ image, title }: { image: ResolvedImage; title: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);

  return (
    <section
      ref={ref}
      data-section-theme="dark"
      className="relative h-svh min-h-[620px] overflow-hidden bg-ink text-cream"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="photo-bw object-cover"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/25" />

      <div className="container-x relative flex h-full flex-col justify-end pb-[11vh]">
        <SplitText
          text={title}
          delay={0.25}
          className="max-w-[13ch] text-display lg:text-[clamp(4rem,1.6rem+5.4vw,8.25rem)]"
        />
      </div>
    </section>
  );
}
