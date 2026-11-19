import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";

type ContactField = {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
};

const contactItems: ContactField[] = [
  {
    icon: Phone,
    label: "Telefonas",
    value: "+370 611 11549",
    href: "tel:+37061111549",
  },
  {
    icon: MapPin,
    label: "Adresas",
    value: "H. Manto g. 76, LT-92222 Klaipėda",
  },
  {
    icon: Mail,
    label: "El. paštas",
    value: "info@blumu.eu",
    href: "mailto:info@blumu.eu",
  },
];

export function Contact() {
  return (
    <section id="kontaktai" className="w-full bg-black py-20 md:py-28">
      <Container>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Turite klausimų?
        </h2>
        <p className="mt-4 text-zinc-400">
          Mes visada pasirengę Jums padėti! Susisiekite.
        </p>

        <div className="mt-12 flex flex-col gap-6">
          {contactItems.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E85002]/30 bg-[#E85002]/15">
                <Icon className="h-5 w-5 text-[#E85002]" aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-[#E85002]">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-base text-white underline underline-offset-4 hover:text-[#E85002]"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-base text-white">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
