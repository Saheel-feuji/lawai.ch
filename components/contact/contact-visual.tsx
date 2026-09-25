"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ResolvedImage } from "@/content/images";
import { useIntroDone } from "@/lib/intro";

/** Photo that opens up from a circle once the page has loaded. */
export function ContactVisual({ image }: { image: ResolvedImage }) {
  const introDone = useIntroDone();

  return (
    <div className="relative h-[62svh] overflow-hidden lg:sticky lg:top-0 lg:h-svh lg:self-start">
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={introDone ? { clipPath: "circle(75% at 50% 50%)" } : undefined}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.3 }}
          animate={introDone ? { scale: 1 } : undefined}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="photo-bw object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink/20" />
      </motion.div>
    </div>
  );
}
