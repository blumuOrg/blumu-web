"use client";

import { useEffect } from "react";

type HashRedirectProps = {
  hash: string;
};

/** Full navigation so the URL fragment is preserved (next/navigation redirect drops #). */
export function HashRedirect({ hash }: HashRedirectProps) {
  useEffect(() => {
    const fragment = hash.startsWith("#") ? hash : `#${hash}`;
    window.location.replace(`/${fragment}`);
  }, [hash]);

  return null;
}
