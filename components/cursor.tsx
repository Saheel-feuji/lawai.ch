"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorState = "hidden" | "idle" | "active";

/** Soft follower dot that grows over links (desktop mice only). */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });
  const [state, setState] = useState<CursorState>("hidden");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target.closest("a, button, [data-cursor]") : null;
      setState(target ? "active" : "idle");
    };
    const onLeave = () => setState("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  const size = state === "active" ? 76 : 10;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[95] rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{ width: size, height: size, opacity: state === "hidden" ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
