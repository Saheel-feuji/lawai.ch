"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Fragment, useRef, type ReactNode } from "react";
import type { ResolvedImage } from "@/content/images";
import { cn } from "@/lib/cn";
import { useIntroDone } from "@/lib/intro";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const easeQuart = [0.76, 0, 0.24, 1] as const;

const motionTags = {
  h1: motion.h1,
  span: motion.span,
} as const;

/* ── Page titles: words slide up into place once the page has loaded ──── */

type SplitTextProps = {
  text: string;
  as?: keyof typeof motionTags;
  className?: string;
  delay?: number;
};

export function SplitText({ text, as = "h1", className, delay = 0 }: SplitTextProps) {
  const introDone = useIntroDone();
  const Component = motionTags[as];
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 1.15, ease: easeExpo } },
  };
  const words = text.split(" ");

  return (
    <Component className={className} variants={container} initial="hidden" animate={introDone ? "show" : "hidden"}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((piece, index) => (
          <Fragment key={index}>
            <span className="-mt-[0.14em] -mb-[0.1em] inline-block overflow-hidden pt-[0.14em] pb-[0.1em] align-top">
              <motion.span className="inline-block" variants={word}>
                {piece}
              </motion.span>
            </span>
            {index < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Component>
  );
}

/* ── Quiet fade-in for section headlines ─────────────────────────────── */

export function FadeUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: easeExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Photo that is unveiled from the bottom and drifts while scrolling ─ */

type RevealImageProps = {
  image: ResolvedImage;
  sizes: string;
  className?: string;
  /** Vertical drift in percent */
  parallax?: number;
  priority?: boolean;
};

export function RevealImage({ image, sizes, className, parallax = 9, priority }: RevealImageProps) {
  // Observe an unclipped wrapper: a fully clipped element never counts as "in view".
  const ref = useRef<HTMLDivElement>(null);
  // Start unveiling slightly before the photo enters the screen, so it never sits empty.
  const inView = useInView(ref, { once: true, margin: "0px 0px 20% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        className="absolute inset-0 overflow-hidden bg-ink-2"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.25, ease: easeQuart }}
      >
        <motion.div className="absolute inset-x-0 -inset-y-[14%]" style={{ y }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            className="photo-bw object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
