import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactVisual } from "@/components/contact/contact-visual";
import { FadeUp, SplitText } from "@/components/reveal";
import { contactPage } from "@/content/contact";
import { getImage } from "@/content/images";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: site.titles.contact },
  alternates: { canonical: "/kontakt/" },
};

export default function ContactPage() {
  const [firstLine, secondLine] = contactPage.titleLines;

  return (
    <section data-section-theme="dark" className="relative grid min-h-svh bg-ink text-cream lg:grid-cols-2">
      <ContactVisual image={getImage("contact")} />

      <div className="container-x flex flex-col justify-center pt-14 pb-[14vh] lg:px-[5.5vw] lg:pt-44">
        <h1 className="text-display lg:text-[clamp(4rem,1.4rem+5vw,8rem)]">
          <SplitText as="span" text={firstLine} delay={0.35} className="block" />
          <SplitText as="span" text={secondLine} delay={0.5} className="block italic" />
        </h1>
        <FadeUp delay={0.5}>
          <p className="mt-8 font-serif text-[clamp(1.5rem,1.1rem+1.2vw,2.4rem)] text-cream/70 italic">
            {contactPage.lead}
          </p>
        </FadeUp>
        <FadeUp delay={0.65}>
          <ContactForm fields={contactPage.fields} submit={contactPage.submit} className="mt-16" />
        </FadeUp>
      </div>
    </section>
  );
}
