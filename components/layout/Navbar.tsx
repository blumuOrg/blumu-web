"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BlumuLogo } from "@/components/layout/BlumuLogo";
import { images } from "@/lib/image-paths";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/#apie", label: "Apie" },
  { href: "/#privalumai", label: "Privalumai" },
  { href: "/#ikainiai", label: "Įkainiai" },
  { href: "/#duk", label: "D.U.K." },
  { href: "/#kontaktai", label: "Kontaktai" },
] as const;

const sheetIconBtnClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition hover:bg-white/10";

function StoreIconLink({
  src,
  label,
  size = 24,
}: {
  src: string;
  label: string;
  size?: number;
}) {
  return (
    <a href="#" aria-label={label} className={sheetIconBtnClass}>
      <Image src={src} alt="" width={size} height={size} className="h-6 w-6" />
    </a>
  );
}

function StoreButtons({
  className,
  iconClassName = "h-11 w-11",
  iconSize = 44,
}: {
  className?: string;
  iconClassName?: string;
  iconSize?: number;
}) {
  return (
    <div className={className}>
      <a
        href="#"
        aria-label="App Store"
        className="shrink-0 transition hover:opacity-80"
      >
        <Image
          src={images.navbarAppStore}
          alt="App Store"
          width={iconSize}
          height={iconSize}
          className={iconClassName}
        />
      </a>
      <a
        href="#"
        aria-label="Google Play"
        className="shrink-0 transition hover:opacity-80"
      >
        <Image
          src={images.navbarGooglePlay}
          alt="Google Play"
          width={iconSize}
          height={iconSize}
          className={iconClassName}
        />
      </a>
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md">
        <Link href="/" className="shrink-0">
          <BlumuLogo />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Pagrindinė navigacija"
        >
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <StoreButtons className="flex items-center gap-3" />
        </div>

        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition hover:border-white/25 hover:bg-white/10"
                  aria-label="Atidaryti meniu"
                />
              }
            >
              <Menu className="h-5 w-5 text-white" strokeWidth={2.5} />
            </SheetTrigger>

            <SheetContent
              side="top"
              showCloseButton={false}
              className="gap-0 border-white/10 bg-black p-4 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/"
                  className="shrink-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <BlumuLogo size="sm" priority={false} />
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                  <StoreIconLink
                    src={images.navbarAppStore}
                    label="App Store"
                  />
                  <StoreIconLink
                    src={images.navbarGooglePlay}
                    label="Google Play"
                  />
                  <button
                    type="button"
                    className={sheetIconBtnClass}
                    aria-label="Uždaryti meniu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <nav className="mt-5 flex flex-col" aria-label="Mobilus meniu">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-3.5 text-base text-white transition hover:text-[#E85002]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
