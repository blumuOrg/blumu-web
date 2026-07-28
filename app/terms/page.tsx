import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { LegalArticle } from "@/components/sections/LegalArticle";

export const metadata: Metadata = {
  title: "Taisyklės ir sąlygos | BLUMU",
  description: "BLUMU platformos naudojimosi taisyklės ir nuostatos.",
  alternates: {
    canonical: "https://blumu.eu/terms",
  },
};

export default function TermsPage() {
  return (
    <MarketingShell>
      <LegalArticle filename="terms.md" />
    </MarketingShell>
  );
}
