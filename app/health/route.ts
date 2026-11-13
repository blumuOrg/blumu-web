export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "blumu-web",
      revision: process.env.BLUMU_REVISION ?? "local",
      release: process.env.BLUMU_RELEASE_ID ?? "local",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
