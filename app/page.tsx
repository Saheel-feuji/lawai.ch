import { About } from "@/components/home/about";
import { ContactCta } from "@/components/home/contact-cta";
import { Events } from "@/components/home/events";
import { Hero } from "@/components/home/hero";
import { WhatIsPilates } from "@/components/home/pilates";
import { Principles } from "@/components/home/principles";
import { home } from "@/content/home";
import { getImage } from "@/content/images";

export default function HomePage() {
  return (
    <>
      <Hero image={getImage("hero")} quote={home.quote} />
      <About />
      <Events />
      <WhatIsPilates />
      <Principles />
      <ContactCta label={home.contactButton} />
    </>
  );
}
