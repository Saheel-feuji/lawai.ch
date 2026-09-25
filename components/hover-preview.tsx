"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import type { ResolvedImage } from "@/content/images";

const easeExpo = [0.16, 1, 0.3, 1] as const;

/** Tracks which row is hovered and where the mouse is. */
export function useHoverPreview() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const onPointerMove = (event: PointerEvent) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return { active, setActive, onPointerMove, x: springX, y: springY };
}

/** Floating photo that follows the mouse over a list (desktop only). */
export function PreviewImage({
  images,
  active,
  x,
  y,
}: {
  images: ResolvedImage[];
  active: number | null;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[25rem] w-[19rem] overflow-hidden hover-fine:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.5 : 1 }}
      transition={{ duration: 0.5, ease: easeExpo }}
    >
      {images.map((image, index) => (
        <motion.div
          key={`${image.src}-${index}`}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.2 }}
          transition={{ duration: 0.7, ease: easeExpo }}
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes="19rem"
            className="photo-bw object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
