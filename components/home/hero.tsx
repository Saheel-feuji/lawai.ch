"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useEffect, useRef, type ReactNode } from "react";
import type { ResolvedImage } from "@/content/images";
import { useIntroDone } from "@/lib/intro";

const easeExpo = [0.16, 1, 0.3, 1] as const;

/**
 * "Stärke beginnt in der Mitte": the photo grows out of a circle in the centre
 * while the quote lights up word by word as you scroll.
 */
export function Hero({ image, quote }: { image: ResolvedImage; quote: string }) {
  const trackRef = useRef<HTMLElement>(null);
  const introDone = useIntroDone();
  const intro = useMotionValue(0);

  useEffect(() => {
    if (!introDone) return;
    const controls = animate(intro, 1, { duration: 1.8, ease: easeExpo });
    return () => controls.stop();
  }, [introDone, intro]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const scrollRadius = useTransform(scrollYProgress, [0, 0.72], [23, 142]);
  const radius = useTransform(() => scrollRadius.get() * intro.get());
  const clipPath = useMotionTemplate`circle(${radius}vmin at 50% 50%)`;
  const imageScale = useTransform(scrollYProgress, [0, 0.72], [1.28, 1]);
  const shade = useTransform(scrollYProgress, [0, 0.72], [0.32, 0.56]);

  const text = `“${quote}”`;
  const words = text.split(" ");
  const start = 0.03;
  const step = (0.68 - start) / words.length;

  return (
    <section
      ref={trackRef}
      data-section-theme="dark"
      aria-labelledby="hero-title"
      className="hero-track relative h-[250svh] bg-ink text-cream"
    >
      <div className="hero-stage sticky top-0 h-svh overflow-hidden">
        <motion.div className="hero-circle absolute inset-0" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
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
          <motion.div aria-hidden="true" className="absolute inset-0 bg-ink" style={{ opacity: shade }} />
        </motion.div>

        <div className="container-x relative z-10 flex h-full items-center justify-center">
          <h1 id="hero-title" className="max-w-[21ch] text-center text-display">
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
              {words.map((word, index) => (
                <Fragment key={index}>
                  <span className="-mt-[0.12em] -mb-[0.1em] inline-block overflow-hidden pt-[0.12em] pb-[0.1em] align-top">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "115%" }}
                      animate={introDone ? { y: "0%" } : undefined}
                      transition={{ duration: 1.25, ease: easeExpo, delay: 0.35 + index * 0.028 }}
                    >
                      <HeroWord progress={scrollYProgress} range={[start + index * step, start + (index + 1) * step]}>
                        {word}
                      </HeroWord>
                    </motion.span>
                  </span>
                  {index < words.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          </h1>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden bg-cream/20"
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <span className="scroll-hint absolute inset-0 block text-cream" />
        </motion.div>
      </div>
    </section>
  );
}

function HeroWord({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0.24, 1]);
  return (
    <motion.span className="hero-word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}
