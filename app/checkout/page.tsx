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

function problemMessage(status: number, body: unknown): string | null {
  if (status < 400 || status > 499 || typeof body !== "object" || body === null) {
    return null;
  }
  const { code, detail } = body as { code?: unknown; detail?: unknown };
  if (typeof detail !== "string" || typeof code !== "string") return null;
  return code.startsWith("PAYMENT_") || code === "TOO_MANY_REQUESTS" ? detail : null;
}

function isStripeCheckoutUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "checkout.stripe.com";
  } catch {
    return false;
  }
}

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
    const body: unknown = await response.json().catch(() => null);
    return (
      <MarketingShell>
        <PaymentStatusView
          title="Klaida"
          message={
            problemMessage(response.status, body) ??
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
    if (isStripeCheckoutUrl(data.url)) {
      redirect(data.url);
    }
    let host = "invalid";
    try {
      host = new URL(data.url).host;
    } catch {}
    console.error(`Checkout redirect blocked, host: ${host}`);
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
