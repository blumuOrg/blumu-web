import { MarketingShell } from "@/components/layout/MarketingShell";
import { LegalArticle } from "@/components/sections/LegalArticle";

export const metadata = {
  title: "Taisyklės ir sąlygos | BLUMU",
  description: "BLUMU platformos naudojimosi taisyklės ir nuostatos.",
};

export default function TermsPage() {
  return (
    <MarketingShell>
      <LegalArticle filename="terms.md" />
    </MarketingShell>
  );
}
