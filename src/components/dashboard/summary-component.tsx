import React from "react";
import { currencies } from "@/utils/country-currencies";

interface TransferSummaryProps {
  amountUsdCents: number;
  feeCentsUSD: number;
  amountAfterFeeUsdCents: number;
  fxRate: number;
  currency: string;
  recipientReceiveCents: number;
  feePct: string; // already formatted like "10%" or "20%"
}

function centsToDisplay(cents: number) {
  return (cents / 100).toFixed(2);
}

const TransferSummary: React.FC<TransferSummaryProps> = ({
  amountUsdCents,
  feeCentsUSD,
  amountAfterFeeUsdCents,
  fxRate,
  currency,
  recipientReceiveCents,
  feePct,
}) => {
  return (
    <section
      aria-label="Transfer summary"
      className="rounded-2xl border border-gray-200 bg-zinc-50 p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Summary</h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-700">
            Fee {feePct}
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700">
            1 USD ≈ {fxRate.toFixed(4)} {currency}
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">You send</span>
          <span className="font-medium text-gray-900 tabular-nums">
            ${centsToDisplay(amountUsdCents)}{" "}
            <span className="text-gray-500">USD</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Fee</span>
          <span className="font-medium text-gray-900 tabular-nums">
            -${centsToDisplay(feeCentsUSD)}{" "}
            <span className="text-gray-500">USD</span>
          </span>
        </div>

        <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">After fees</span>
          <span className="font-medium text-gray-900 tabular-nums">
            ${centsToDisplay(amountAfterFeeUsdCents)}{" "}
            <span className="text-gray-500">USD</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">FX conversion</span>
          <span className="font-medium text-gray-900 tabular-nums">
            × {fxRate.toFixed(4)}{" "}
            <span className="text-gray-500">{currency}</span>
          </span>
        </div>
      </div>

      {/* Recipient gets */}
      <div className="mt-4 rounded-xl bg-primary-50/60 p-3 sm:p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-gray-800">Recipient gets</span>
          <span className="text-lg sm:text-xl font-bold text-primary-700 tabular-nums">
            {currencies.find((c) => c.code === currency)?.flag}{" "}
            {centsToDisplay(recipientReceiveCents)} {currency}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-gray-600">
          Amounts are rounded <span className="font-medium">up</span> to the smallest unit.
        </p>
      </div>
    </section>
  );
};

export default TransferSummary;
