"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { InstagramIcon } from "./icons";
import { Magnetic } from "./magnetic";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const easeQuart = [0.76, 0, 0.24, 1] as const;
// The menu grows out of the menu button as a circle.
const ORIGIN = "at calc(100% - clamp(48px, 3.6vw + 28px, 92px)) 48px";

export function SiteHeader({ logo }: { logo: string }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const background = [document.getElementById("main"), document.querySelector("footer")];
    background.forEach((element) => element?.setAttribute("inert", ""));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      lenis?.start();
      background.forEach((element) => element?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-700",
          open ? "text-cream" : "text-[var(--fg)]",
        )}
      >
        <div className="container-x flex h-24 items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} aria-label="la wai Pilates – Home" className="block">
            <motion.img
              src={logo}
              alt="la wai Pilates"
              className="size-12 rounded-full lg:size-14"
              whileHover={{ rotate: -12, scale: 1.06 }}
              transition={{ duration: 0.6, ease: easeExpo }}
            />
          </Link>

          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              className="grid size-14 place-items-center rounded-full border border-current/25 transition-colors duration-500 hover:border-current lg:size-16"
            >
              <span aria-hidden="true" className="relative block h-2.5 w-6">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[65] flex flex-col bg-ink text-cream"
            initial={{ clipPath: `circle(0% ${ORIGIN})` }}
            animate={{ clipPath: `circle(150% ${ORIGIN})` }}
            exit={{ clipPath: `circle(0% ${ORIGIN})` }}
            transition={{ duration: 0.95, ease: easeQuart }}
          >
            <nav aria-label="Menü" className="container-x flex flex-1 flex-col justify-center">
              <ul>
                {site.nav.map((item, index) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%" }}
                      transition={{ duration: 0.9, ease: easeExpo, delay: 0.25 + index * 0.08 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        className="group inline-flex items-center gap-[0.12em] text-mega transition-colors duration-500 hover:text-rose aria-[current=page]:text-rose"
                      >
                        <span className="inline-block transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-[0.12em]">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="container-x flex items-center justify-between pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="grid size-14 place-items-center rounded-full border border-cream/25 transition-colors duration-500 hover:bg-cream hover:text-ink"
              >
                <InstagramIcon className="size-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
