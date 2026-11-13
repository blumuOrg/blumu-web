import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";

const [base, revision, release, attempts = "15"] = process.argv.slice(2);
assert(base && revision && release, "Usage: check-health.mjs URL REVISION RELEASE [ATTEMPTS]");
assert(Number.isInteger(Number(attempts)) && Number(attempts) > 0);

async function request(path) {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(5000),
    redirect: "error",
    cache: "no-store",
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}

for (let attempt = 1; ; attempt++) {
  try {
    const health = await (await request(`/health?release=${encodeURIComponent(release)}`)).json();
    assert.deepEqual(health, { status: "ok", service: "blumu-web", revision, release });
    const page = await request("/");
    assert.match(page.headers.get("x-robots-tag") ?? "", /noindex/);
    const html = await page.text();
    assert.match(html, /<html[^>]*lang="lt"/);
    const asset = html.match(/(?:src|href)="([^"\s]*\/_next\/static\/[^"\s]+\.js)"/);
    assert(asset, "The page must reference a JavaScript asset");
    await request(asset[1]);
    await request("/privacy");
    await request("/checkout");
    const image = await request("/_next/image?url=%2Fimages%2Fhero_mobile.webp&w=256&q=75");
    assert.match(image.headers.get("content-type") ?? "", /^image\//);
    assert.match(await (await request("/robots.txt")).text(), /Disallow: \/(?:\r?\n|$)/);
    console.log(`Healthy: ${base} (${release})`);
    break;
  } catch (error) {
    if (attempt >= Number(attempts)) throw error;
    await setTimeout(2000);
  }
}
