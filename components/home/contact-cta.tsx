import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { FadeUp } from "@/components/reveal";

/** The KONTAKT button from the current site – as one giant link. */
export function ContactCta({ label }: { label: string }) {
  return (
    <section data-section-theme="light" className="relative py-[16vh]">
      <div className="container-x">
        <FadeUp>
          <Link
            href="/kontakt/"
            className="group relative block overflow-hidden border-y border-[var(--line)] py-[5vh] lg:py-[7vh]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-rose transition-[clip-path] duration-[1.1s] ease-[var(--ease-quart)] [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(75%_at_50%_50%)]"
            />
            <span className="relative flex items-center justify-between gap-6 px-[2vw]">
              <span className="text-mega text-[clamp(3rem,13.5vw,17rem)]">
                {label}
              </span>
              <ArrowUpRight className="size-[9vw] shrink-0 transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:rotate-45 lg:size-[7vw]" />
            </span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
