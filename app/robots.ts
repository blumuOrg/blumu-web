import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (process.env.BLUMU_NOINDEX === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/payment/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
