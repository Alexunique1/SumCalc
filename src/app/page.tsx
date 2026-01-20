'use client';

import { useEffect, useMemo, useState } from "react";

type Mode = "pay" | "receive";
type Rates = { usdRub: number; usdtRub: number; updatedAt: string };

function parseNumberLoose(input: string): number | null {
  const cleaned = input
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, ".")
    .replace(/[^\d.]/g, "");

  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return n;
}

function formatRubInt(value: number): string {
  const rounded = Math.round(value);
  return new Intl.NumberFormat("ru-RU").format(rounded);
}

function formatUsdt2(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function getCommissionRateUsd(amountUsd: number): number {
  if (amountUsd < 100) return 1.25;
  if (amountUsd <= 600) return 1.2;
  return 1.15;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("pay");
  const [usdInput, setUsdInput] = useState("");
  const [rubInput, setRubInput] = useState("");
  const [rates, setRates] = useState<Rates | null>(null);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const wallet =
    process.env.NEXT_PUBLIC_USDT_TRC20_WALLET ||
    "TL6AWf77sdAYJBeKKiaWiNxKSm4GxU33PC";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setRatesError(null);
        const res = await fetch("/api/rates", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as Rates;
        if (!cancelled) setRates(json);
      } catch {
        if (!cancelled) setRatesError("Не удалось загрузить курс. Проверьте настройки.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const computed = useMemo(() => {
    if (!rates) return { error: "Загружаем курс…" as string | null };

    if (mode === "pay") {
      const amountUsd = parseNumberLoose(usdInput);
      if (amountUsd == null) return { error: null as string | null };
      if (amountUsd <= 0) return { error: "Сумма должна быть больше 0." };
      if (amountUsd > 10_000) return { error: "Максимум 10 000 USDT (в эквиваленте)." };

      const commissionRate = getCommissionRateUsd(amountUsd);
      const rubToPay = amountUsd * rates.usdRub * commissionRate;
      return {
        error: null as string | null,
        rubToPay: Math.round(rubToPay),
        commissionRate,
      };
    }

    const amountRub = parseNumberLoose(rubInput);
    if (amountRub == null) return { error: null as string | null };
    if (amountRub <= 0) return { error: "Сумма должна быть больше 0." };

    const usdtBase = amountRub / rates.usdtRub;
    if (usdtBase > 10_000) return { error: "Максимум 10 000 USDT (в эквиваленте)." };

    // Комиссия фиксируется в USDT: считаем базу в USDT по курсу, затем добавляем 10% в USDT.
    const usdtToPay = usdtBase * 1.1;
    const rubWithCommission = usdtToPay * rates.usdtRub;

    return {
      error: null as string | null,
      usdtToPay,
      rubWithCommission: Math.round(rubWithCommission),
    };
  }, [mode, rates, usdInput, rubInput]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  const primaryBtn =
    "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors";
  const secondaryBtn =
    "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-4 py-2 rounded-lg transition-colors border border-emerald-200";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Калькулятор суммы</h1>
        {rates?.updatedAt && (
          <p className="text-xs text-gray-500 mt-1">Курс обновлён: {new Date(rates.updatedAt).toLocaleString("ru-RU")}</p>
        )}
        {ratesError && <p className="text-sm text-red-600 mt-2">{ratesError}</p>}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex gap-2 mb-4">
          <button
            className={mode === "pay" ? primaryBtn : secondaryBtn}
            onClick={() => setMode("pay")}
          >
            Оплата
          </button>
          <button
            className={mode === "receive" ? primaryBtn : secondaryBtn}
            onClick={() => setMode("receive")}
          >
            Прием платежей
          </button>
        </div>

        {mode === "pay" ? (
          <div className="space-y-3">
            <label className="block">
              <div className="text-sm font-medium text-gray-700 mb-1">Сумма в USD</div>
              <input
                value={usdInput}
                onChange={(e) => setUsdInput(e.target.value)}
                inputMode="decimal"
                placeholder="Например: 120"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>

            {computed?.error && <div className="text-sm text-red-600">{computed.error}</div>}

            {"rubToPay" in computed && computed.rubToPay != null && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <div className="text-sm text-gray-700">
                  К оплате: <span className="font-bold">{formatRubInt(computed.rubToPay)} ₽</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block">
              <div className="text-sm font-medium text-gray-700 mb-1">Сумма в RUB</div>
              <input
                value={rubInput}
                onChange={(e) => setRubInput(e.target.value)}
                inputMode="decimal"
                placeholder="Например: 49 900"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>

            {computed?.error && <div className="text-sm text-red-600">{computed.error}</div>}

            {"usdtToPay" in computed && computed.usdtToPay != null && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-3">
                <div className="text-sm text-gray-700">
                  К оплате{" "}
                  <span className="font-bold">{formatUsdt2(computed.usdtToPay)} USDT</span>{" "}
                  <span className="text-gray-500">
                    ({formatRubInt(computed.rubWithCommission ?? 0)} ₽)
                  </span>
                </div>

                <div className="text-sm text-gray-700">
                  Адрес для оплаты (USDT TRC20):{" "}
                  <span className="font-mono break-all">{wallet}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className={primaryBtn}
                    onClick={() =>
                      copy(
                        `К оплате ${formatUsdt2(computed.usdtToPay)} USDT\nАдрес для оплаты (USDT TRC20): ${wallet}`
                      )
                    }
                  >
                    Скопировать
                  </button>
                </div>

                <div className="text-xs text-gray-500">Только сеть TRC20.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}