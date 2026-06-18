"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "rounded-xl border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 focus-visible:border-[#E85002] focus-visible:ring-1 focus-visible:ring-[#E85002]";

type ContactField = {
  icon: typeof Phone;
  label: string;
  value: string;
};

const contactItems: ContactField[] = [
  { icon: Phone, label: "Telefonas", value: "+370 611 11549" },
  {
    icon: MapPin,
    label: "Adresas",
    value: "H. Manto g. 76, LT-92222 Klaipėda",
  },
  { icon: Mail, label: "El. paštas", value: "info@blumu.eu" },
];

const FORMSPREE_URL = "https://formspree.io/f/xpqewadl";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitted(false);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setSubmitError(
        "Nepavyko išsiųsti žinutės. Bandykite dar kartą arba rašykite į info@blumu.eu.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontaktai" className="w-full bg-black py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Turite klausimų?
            </h2>
            <p className="mt-4 text-zinc-400">
              Mes visada pasirengę Jums padėti! Susisiekite.
            </p>

            {/* TODO: pakeisti į realius kontaktus po MB registracijos */}
            <div className="mt-12 flex flex-col gap-6">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E85002]/30 bg-[#E85002]/15">
                    <Icon className="h-5 w-5 text-[#E85002]" aria-hidden />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#E85002]">
                      {label}
                    </span>
                    <span className="text-base text-white">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div>
                <Label htmlFor="contact-name" className="mb-2 block text-sm text-white">
                  Vardas
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={fieldClass}
                  placeholder="Jūsų vardas"
                />
              </div>
              <div>
                <Label htmlFor="contact-email" className="mb-2 block text-sm text-white">
                  El. paštas
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={fieldClass}
                  placeholder="vardas@pastas.lt"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contact-subject" className="mb-2 block text-sm text-white">
                  Tema
                </Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className={fieldClass}
                  placeholder="Temos pavadinimas"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contact-message" className="mb-2 block text-sm text-white">
                  Pranešimas
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className={`${fieldClass} min-h-32`}
                  placeholder="Jūsų žinutė..."
                />
              </div>

              {submitted && (
                <div
                  className="md:col-span-2 rounded-lg border border-[#E85002]/30 bg-[#E85002]/10 p-4 text-[#E85002]"
                  role="status"
                >
                  Ačiū! Žinutė išsiųsta — susisieksime greitai.
                </div>
              )}

              {submitError && (
                <div
                  className="md:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400"
                  role="alert"
                >
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-full bg-[#E85002] px-8 text-base font-semibold text-white transition hover:bg-[#d04600] disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
              >
                {isSubmitting ? "Siunčiama..." : "Siųsti užklausą"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
