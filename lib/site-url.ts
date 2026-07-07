/** Canonical public site URL — set NEXT_PUBLIC_SITE_URL in Vercel env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://blumu.eu";
