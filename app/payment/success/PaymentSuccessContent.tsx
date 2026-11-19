"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentStatusView } from "@/components/payment/PaymentStatusView";
import { getApiBaseUrl } from "@/lib/api";

type SessionStatusResponse = {
  status?: string;
  ready?: boolean;
  paymentFailed?: boolean;
};

type ViewState = "loading" | "success" | "timeout" | "failed" | "missing";

const POLL_INTERVAL_MS = 2000;
const TIMEOUT_MS = 30000;
const REQUEST_TIMEOUT_MS = 5000;
const APP_SUCCESS_URL = "blumu://payment/success";

function isSessionActive(data: SessionStatusResponse): boolean {
  return data.ready === true || data.status === "ACTIVE";
}

export function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [viewState, setViewState] = useState<ViewState>(
    sessionId ? "loading" : "missing",
  );

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let cancelled = false;
    let lastRead: SessionStatusResponse | null = null;
    const startedAt = Date.now();

    const end = () =>
      setViewState(lastRead?.paymentFailed === true ? "failed" : "timeout");

    const poll = async () => {
      while (!cancelled) {
        if (Date.now() - startedAt >= TIMEOUT_MS) {
          end();
          return;
        }

        // AbortSignal.timeout needs Safari 16 and Chrome 103.
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
          const response = await fetch(
            `${getApiBaseUrl()}/payments/session-status/${encodeURIComponent(sessionId)}`,
            { cache: "no-store", signal: controller.signal },
          );

          if (response.status === 429) {
            end();
            return;
          }

          if (response.ok) {
            lastRead = (await response.json()) as SessionStatusResponse;
            if (isSessionActive(lastRead)) {
              setViewState("success");
              return;
            }
          }
        } catch {
          // Keep polling until timeout.
        } finally {
          clearTimeout(timer);
        }

        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      }
    };

    void poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (viewState === "missing") {
    return (
      <PaymentStatusView
        title="Klaida"
        message="Trūksta mokėjimo sesijos identifikatoriaus."
        actionHref={APP_SUCCESS_URL}
        actionLabel="Grįžti į programėlę"
      />
    );
  }

  if (viewState === "loading") {
    return (
      <PaymentStatusView
        title="Mokėjimas"
        message="Tikriname mokėjimo būseną..."
        loading
      />
    );
  }

  if (viewState === "success") {
    return (
      <PaymentStatusView
        title="Prenumerata aktyvi"
        message="Kortelė pridėta."
        actionHref={APP_SUCCESS_URL}
        actionLabel="Grįžti į programėlę"
      />
    );
  }

  if (viewState === "failed") {
    return (
      <PaymentStatusView
        title="Mokėjimas nepavyko"
        message="Kortelė išsaugota, bet mokėjimo nuskaityti nepavyko. Pridėk kitą kortelę arba susisiek su savo banku."
        actionHref={APP_SUCCESS_URL}
        actionLabel="Grįžti į programėlę"
      />
    );
  }

  return (
    <PaymentStatusView
      title="Apdorojama, grįžk į programėlę"
      message="Mokėjimas vis dar apdorojamas. Gali saugiai grįžti į programėlę."
      actionHref={APP_SUCCESS_URL}
      actionLabel="Grįžti į programėlę"
    />
  );
}
