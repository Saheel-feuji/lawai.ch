"use client";

import { useState, type FormEvent } from "react";
import { Magnetic } from "@/components/magnetic";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/*
 * A static site has no mail server, so:
 * - NEXT_PUBLIC_FORM_ENDPOINT set (e.g. a Formspree / Web3Forms URL) → messages are sent directly.
 * - not set → the visitor's e-mail app opens with the message filled in.
 */
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = { name?: string; email?: string };
type Status = { state: "idle" } | { state: "sending" } | { state: "done" | "error"; message: string };

export function ContactForm({ fields, submit, className }: { fields: Fields; submit: string; className?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const nextErrors: Errors = {};
    if (!String(data.get("name") ?? "").trim()) nextErrors.name = "Bitte gib deinen Namen ein.";
    if (!EMAIL_PATTERN.test(String(data.get("email") ?? "").trim()))
      nextErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    setErrors(nextErrors);

    const firstInvalid = nextErrors.name ? "name" : nextErrors.email ? "email" : null;
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLInputElement | null)?.focus();
      return;
    }
    if (data.get("website")) return; // honeypot – only bots fill this in

    if (!endpoint) {
      const subject = String(data.get("subject") || "lawai.ch");
      const body = `${data.get("name")}\n${data.get("email")}\n\n${data.get("message") ?? ""}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ state: "done", message: "Dein E-Mail-Programm wurde geöffnet – bitte sende die Nachricht dort ab." });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const response = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus({ state: "done", message: "Vielen Dank! Deine Nachricht wurde gesendet." });
    } catch {
      setStatus({ state: "error", message: `Leider hat das nicht geklappt. Bitte schreibe direkt an ${site.email}.` });
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("grid gap-x-10 gap-y-8 sm:grid-cols-2", className)}>
      <Field name="name" placeholder={fields.name} autoComplete="name" error={errors.name} className="sm:col-span-2" />
      <Field name="email" type="email" placeholder={fields.email} autoComplete="email" error={errors.email} />
      <Field name="subject" placeholder={fields.subject} />
      <Field name="message" placeholder={fields.message} multiline className="sm:col-span-2" />

      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center justify-between gap-8 pt-6 sm:col-span-2">
        <p role="status" aria-live="polite" className={cn("max-w-[24rem] text-sm", status.state === "error" ? "text-rose" : "text-cream/70")}>
          {"message" in status ? status.message : ""}
        </p>
        <Magnetic strength={0.4}>
          <button
            type="submit"
            disabled={status.state === "sending"}
            className="group relative grid size-32 shrink-0 place-items-center overflow-hidden rounded-full bg-rose text-ink disabled:opacity-60 lg:size-40"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 scale-0 rounded-full bg-cream transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-100"
            />
            <span className="relative font-wide text-lg tracking-[-0.02em] lg:text-xl">{submit}</span>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

type FieldProps = {
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
  className?: string;
};

function Field({ name, placeholder, type = "text", autoComplete, multiline, error, className }: FieldProps) {
  const id = `f-${name}`;
  const shared = {
    id,
    name,
    placeholder,
    autoComplete,
    maxLength: multiline ? 2000 : 400,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: cn(
      "block w-full border-0 border-b bg-transparent px-0 py-4 text-[clamp(1.25rem,1rem+0.7vw,1.75rem)] font-light tracking-[-0.02em] text-cream outline-none transition-colors duration-500 placeholder:text-cream/45 focus:border-cream",
      error ? "border-rose" : "border-cream/20",
    ),
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      {multiline ? <textarea {...shared} rows={4} className={cn(shared.className, "resize-none")} /> : <input {...shared} type={type} />}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose">
          {error}
        </p>
      )}
    </div>
  );
}
