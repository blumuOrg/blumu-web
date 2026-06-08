import { redirect } from "next/navigation";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PaymentStatusView } from "@/components/payment/PaymentStatusView";
import { getApiBaseUrl } from "@/lib/api";

type CheckoutPageProps = {
  searchParams: Promise<{ token?: string }>;
};

type SetupFromTokenResponse = {
  url?: string;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <MarketingShell>
        <PaymentStatusView
          title="Klaida"
          message="Atidaryk per programėlę"
        />
      </MarketingShell>
    );
  }

  let response: Response;

  try {
    response = await fetch(`${getApiBaseUrl()}/payments/setup-from-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });
  } catch {
    return (
      <MarketingShell>
        <PaymentStatusView
          title="Klaida"
          message="Nepavyko prisijungti prie mokėjimo sistemos. Bandyk dar kartą vėliau."
        />
      </MarketingShell>
    );
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    return (
      <MarketingShell>
        <PaymentStatusView
          title="Klaida"
          message={
            errorText.trim() ||
            "Nepavyko sukurti mokėjimo sesijos. Bandyk dar kartą vėliau."
          }
        />
      </MarketingShell>
    );
  }

  let data: SetupFromTokenResponse;

  try {
    data = (await response.json()) as SetupFromTokenResponse;
  } catch {
    return (
      <MarketingShell>
        <PaymentStatusView
          title="Klaida"
          message="Gautas neteisingas atsakymas iš serverio."
        />
      </MarketingShell>
    );
  }

  if (data.url) {
    redirect(data.url);
  }

  return (
    <MarketingShell>
      <PaymentStatusView
        title="Klaida"
        message="Nepavyko gauti mokėjimo nuorodos. Bandyk dar kartą vėliau."
      />
    </MarketingShell>
  );
}
