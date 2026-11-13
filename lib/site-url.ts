/** Set NEXT_PUBLIC_SITE_URL before the build. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://blumu.eu";
