"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scrolls to #section after client navigations to / (Next.js often skips native hash scroll). */
export function HashScrollOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return null;
}
