import { NextResponse } from "next/server";

type RatesResponse = {
  usdRub: number;
  usdtRub: number;
  source: {
    usdRub: "openexchangerates";
    usdtRub: "derived_usd";
  };
  updatedAt: string;
};

const CACHE_TTL_MS = 60_000;
let cached:
  | {
      data: RatesResponse;
      expiresAt: number;
    }
  | undefined;

async function fetchUsdRubFromOpenExchangeRates(appId: string): Promise<number> {
  const url = new URL("https://openexchangerates.org/api/latest.json");
  url.searchParams.set("app_id", appId);
  url.searchParams.set("symbols", "RUB");
  url.searchParams.set("prettyprint", "false");

  const res = await fetch(url.toString(), {
    // cache on Next.js side as well (best-effort)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`OpenExchangeRates error: ${res.status}`);
  }

  const json = (await res.json()) as { rates?: Record<string, number> };
  const rub = json.rates?.RUB;
  if (typeof rub !== "number" || !Number.isFinite(rub) || rub <= 0) {
    throw new Error("OpenExchangeRates: invalid RUB rate");
  }
  return rub;
}

export async function GET() {
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return NextResponse.json(cached.data);
  }

  const appId = process.env.OPENEXCHANGERATES_APP_ID;
  if (!appId) {
    return NextResponse.json(
      { error: "Missing OPENEXCHANGERATES_APP_ID" },
      { status: 500 }
    );
  }

  const usdRub = await fetchUsdRubFromOpenExchangeRates(appId);

  // USDT/RUB is derived via USD/RUB (USDT ~= USD for a simple calculator).
  // This avoids relying on a RUB pair availability on exchanges and stays fully automatic.
  const usdtRub = usdRub;

  const data: RatesResponse = {
    usdRub,
    usdtRub,
    source: { usdRub: "openexchangerates", usdtRub: "derived_usd" },
    updatedAt: new Date().toISOString(),
  };

  cached = { data, expiresAt: now + CACHE_TTL_MS };
  return NextResponse.json(data);
}

