import { MarketingShell } from "@/components/layout/MarketingShell";
import { LegalArticle } from "@/components/sections/LegalArticle";

export const metadata = {
  title: "Privatumo politika | BLUMU",
  description:
    "Sužinokite, kaip BLUMU renka, naudoja ir saugo Jūsų asmens duomenis pagal BDAR.",
};

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <LegalArticle filename="privacy.md" />
    </MarketingShell>
  );
}
