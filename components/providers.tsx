"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** Smooth scrolling (Lenis), reduced-motion support and per-section page colours. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true, anchors: true, autoRaf: true }}>
      <MotionConfig reducedMotion="user">
        <RouteEffects />
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}

function RouteEffects() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPath = useRef(pathname);

  // A new page always starts at the top.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  // Whichever section crosses the middle of the screen sets the page colours (dark / light).
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            document.body.dataset.theme = (entry.target as HTMLElement).dataset.sectionTheme;
          }
        }
      },
      { rootMargin: "-49% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
