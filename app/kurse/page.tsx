import type { Metadata } from "next";
import { CourseList } from "@/components/courses/course-list";
import { CoursesHero } from "@/components/courses/courses-hero";
import { courses, coursesPage } from "@/content/courses";
import { getImage, getLogo } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: site.titles.courses },
  alternates: { canonical: "/kurse/" },
};

export default function CoursesPage() {
  return (
    <>
      <CoursesHero image={getImage("coursesHero")} title={coursesPage.title} />
      <section data-section-theme="light" className="relative py-[16vh]">
        <div className="container-x">
          <CourseList
            courses={courses.map(({ title, schedule, details, note, venueUrl }) => ({
              title,
              schedule,
              details,
              note,
              venueUrl,
            }))}
            logos={courses.map((course) => getLogo(course.logo))}
            images={courses.map((course) => getImage(course.image))}
            cta={coursesPage.cta}
            ctaHref={coursesPage.ctaHref}
          />
        </div>
      </section>
    </>
  );
}
