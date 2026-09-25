"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { INTRO_STORAGE_KEY } from "@/lib/constants";
import { markIntroDone } from "@/lib/intro";

/**
 * First visit per session: the logo is drawn in a circle, then the screen closes
 * into the centre – where the hero circle grows out of.
 */
export function Preloader({ logo }: { logo: string }) {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Private mode – the intro simply plays again next time.
    }
    const skip =
      document.documentElement.dataset.intro === "skip" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      markIntroDone();
      return;
    }
    const timer = window.setTimeout(markIntroDone, 1550);
    return () => window.clearTimeout(timer);
  }, []);

  if (finished) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ delay: 1.5, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setFinished(true)}
    >
      <div className="relative size-36 lg:size-44">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="49" fill="none" stroke="rgb(236 229 220 / 0.14)" strokeWidth="0.6" />
          <motion.circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="#c17a8a"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
        <motion.img
          src={logo}
          alt=""
          className="absolute inset-[13%] size-[74%] rounded-full"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}
