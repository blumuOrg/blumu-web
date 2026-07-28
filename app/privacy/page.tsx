import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { LegalArticle } from "@/components/sections/LegalArticle";

export const metadata: Metadata = {
  title: "Privatumo politika | BLUMU",
  description:
    "Sužinokite, kaip BLUMU renka, naudoja ir saugo Jūsų asmens duomenis pagal BDAR.",
  alternates: {
    canonical: "https://blumu.eu/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <LegalArticle filename="privacy.md" />
    </MarketingShell>
  );
}
