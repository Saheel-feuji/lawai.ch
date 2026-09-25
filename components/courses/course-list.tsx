"use client";

import { ArrowUpRight } from "@/components/icons";
import { PreviewImage, useHoverPreview } from "@/components/hover-preview";
import type { Course } from "@/content/courses";
import type { ResolvedImage } from "@/content/images";

type CourseListProps = {
  courses: Omit<Course, "logo" | "image">[];
  logos: ResolvedImage[];
  images: ResolvedImage[];
  cta: string;
  ctaHref: string;
};

export function CourseList({ courses, logos, images, cta, ctaHref }: CourseListProps) {
  const { active, setActive, onPointerMove, x, y } = useHoverPreview();

  return (
    <>
      <div
        className="border-t border-[var(--line)]"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActive(null)}
      >
        {courses.map((course, index) => (
          <article
            key={course.title}
            onPointerEnter={() => setActive(index)}
            className="group relative grid gap-y-10 border-b border-[var(--line)] py-14 lg:grid-cols-12 lg:gap-x-10 lg:py-20"
          >
            <h2 className="text-feature transition-transform duration-700 ease-[var(--ease-expo)] lg:col-span-6 lg:group-hover:translate-x-5">
              {course.title}
            </h2>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lead">{course.schedule}</p>
              {course.details && (
                <p className="mt-3 text-[var(--muted)]">
                  {course.details.strong && (
                    <strong className="font-medium text-[var(--fg)]">{course.details.strong}</strong>
                  )}
                  {course.details.text}
                </p>
              )}
              {course.note && <p className="mt-3 text-[var(--muted)]">{course.note}</p>}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-8">
                <a
                  href={ctaHref}
                  className="group/cta relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full border border-current/30 px-7 transition-colors duration-500 hover:border-rose hover:text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-[101%] rounded-full bg-rose transition-transform duration-500 ease-[var(--ease-expo)] group-hover/cta:translate-y-0"
                  />
                  <span className="relative">{cta}</span>
                  <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover/cta:rotate-45" />
                </a>
                <a
                  href={course.venueUrl}
                  target="_blank"
                  rel="noopener"
                  className="grid h-32 w-44 place-items-center rounded-2xl bg-white p-4 transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-[1.04] lg:h-36 lg:w-52"
                >
                  <img src={logos[index].src} alt={logos[index].alt} className="max-h-full max-w-full object-contain" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <PreviewImage images={images} active={active} x={x} y={y} />
    </>
  );
}
