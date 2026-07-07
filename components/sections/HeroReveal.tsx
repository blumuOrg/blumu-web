"use client";

import { useEffect, useState } from "react";

const DESKTOP_ASSETS = [
  "/images/hero_bg.webp",
  "/images/hero_mobile.webp",
] as const;

const MOBILE_ASSETS = [
  "/images/hero_bg_mobile.webp",
  "/images/hero_mobile.webp",
] as const;

const REVEAL_TIMEOUT_MS = 5000;

function preloadImages(urls: readonly string[]): Promise<void> {
  return new Promise((resolve) => {
    let settled = 0;
    const finish = () => {
      settled++;
      if (settled >= urls.length) resolve();
    };

    for (const src of urls) {
      const img = new window.Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    }
  });
}

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const urls = window.matchMedia("(min-width: 1024px)").matches
      ? DESKTOP_ASSETS
      : MOBILE_ASSETS;

    const timeout = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, REVEAL_TIMEOUT_MS);

    preloadImages(urls).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative">
      {!ready && (
        <div
          className="absolute inset-0 z-30 flex min-h-[min(90vh,820px)] items-center justify-center bg-black"
          role="status"
          aria-label="Kraunama"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#E85002]" />
        </div>
      )}

      <div
        className={
          ready
            ? "opacity-100 transition-opacity duration-300 ease-out"
            : "pointer-events-none opacity-0"
        }
        aria-hidden={!ready}
      >
        {children}
      </div>
    </div>
  );
}
