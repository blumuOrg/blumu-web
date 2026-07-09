import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { BlumuLogo } from "@/components/layout/BlumuLogo";
import { Container } from "@/components/layout/Container";

const footerLinks = [
  { href: "/privacy", label: "Privatumo politika" },
  { href: "/terms", label: "Taisyklės ir sąlygos" },
  { href: "/#ikainiai", label: "Įkainiai" },
  { href: "/#kontaktai", label: "Kontaktai" },
  { href: "/#duk", label: "D.U.K." },
] as const;

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <BlumuLogo size="sm" priority={false} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Blumu – platforma, jungianti klientus ir meistrus. Raskite arba
              gaukite užsakymus greitai, patogiai ir be tarpininkų.
            </p>
            <p className="mb-3 mt-6 text-sm text-zinc-500">Sekite mus:</p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1877F2] text-white transition hover:scale-105"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#E1306C] text-white transition hover:scale-105"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-display font-semibold text-[#E85002]">
              Nuorodos
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-300 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-display font-semibold text-[#E85002]">
              Rekvizitai
            </h3>
            {/* TODO: pakeisti į galutinius MB duomenis po registracijos */}
            <ul className="flex flex-col gap-2 text-sm text-zinc-300">
              <li>info@blumu.eu</li>
              <li>+370 611 11549</li>
              <li>MB "Blumu"</li>
              <li>H. Manto g. 76, LT-92222 Klaipėda</li>
              <li>307861634</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          © 2026 MB Blumu. Visos teisės saugomos.
        </p>
      </Container>
    </footer>
  );
}
