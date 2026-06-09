"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BlumuLogo } from "@/components/layout/BlumuLogo";
import { images } from "@/lib/image-paths";
import { cn } from "@/lib/utils";
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
  bordered = false,
}: {
  src: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center transition hover:opacity-80",
        bordered && sheetIconBtnClass,
      )}
    >
      <Image
        src={src}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9"
      />
    </a>
  );
}

function StoreButtons({
  className,
  iconClassName = "h-9 w-9",
  iconSize = 36,
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

type NavbarProps = {
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-50 w-full",
        overlay
          ? "absolute inset-x-0 top-0"
          : "relative border-b border-white/10 bg-black/80 backdrop-blur-md",
      )}
    >
      <div className="flex min-h-14 w-full items-center justify-between px-5 py-2 md:h-[6rem] md:py-0 md:pl-8 md:pr-6 lg:pl-14 lg:pr-10 xl:pl-20 xl:pr-12">
        <Link href="/" className="shrink-0 pl-1 md:pl-0">
          <BlumuLogo size="lg" className="md:hidden" />
          <BlumuLogo size="md" className="hidden md:block" />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Pagrindinė navigacija"
        >
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-white/85 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <StoreButtons className="flex items-center gap-3" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <StoreIconLink src={images.navbarAppStore} label="App Store" />
          <StoreIconLink src={images.navbarGooglePlay} label="Google Play" />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className={sheetIconBtnClass}
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
                <button
                  type="button"
                  className={sheetIconBtnClass}
                  aria-label="Uždaryti meniu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-4 w-4 text-white" strokeWidth={2.5} />
                </button>
              </div>

              <nav className="mt-5 flex flex-col" aria-label="Mobilus meniu">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-3.5 text-base font-medium text-white transition hover:text-[#E85002]"
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
