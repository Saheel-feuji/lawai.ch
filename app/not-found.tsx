import Link from "next/link";

export default function NotFound() {
  return (
    <section data-section-theme="dark" className="container-x flex min-h-svh flex-col justify-center pt-24 pb-16">
      <p className="text-mega">404</p>
      <Link href="/" className="mt-12 text-lead underline underline-offset-8 transition-colors hover:text-rose">
        Home
      </Link>
    </section>
  );
}
