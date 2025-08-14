import React, { useMemo } from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "@/components/buttons/primary-button";
import PrimaryInput from "../inputs/primary-input";
import { currencies, Currency } from "@/utils/country-currencies";
import { QuickRecipient } from "@/pages/portal";
import RecipientInput from "../inputs/receipt-input";
import AmountInput from "../inputs/amount-input";

interface SendMoneyFormProps {
  recipient: string;
  setRecipient: (value: string) => void;
  quickRecipients: QuickRecipient[];
  amount: string; // e.g. "12.34"
  setAmount: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  minUSD?: number;
  maxUSD?: number;
  fxRates?: Record<string, number>;         
  feeBpsByCurrency?: Record<string, number>;
}

function toCents(input: string): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return 0;
  return Math.ceil(n * 100);
}

function centsToDisplay(cents: number) {
  return (cents / 100).toFixed(2);
}

function calcFeeCents(amountCents: number, feeBps: number): number {
  return Math.ceil((amountCents * feeBps) / 10000);
}

function convertCentsUSDTo(usdCents: number, fxRate: number): number {
  const major = (usdCents / 100) * fxRate;
  return Math.ceil(major * 100);
}

const SendMoneyForm: React.FC<SendMoneyFormProps> = ({
  recipient,
  setRecipient,
  quickRecipients,
  amount,
  setAmount,
  note,
  setNote,
  currency,
  setCurrency,
  onSubmit,
  isLoading,
  error,
  success,
  minUSD = 1,
  maxUSD = 5000,
  fxRates = { GBP: 0.78, ZAR: 18.0, USD: 1 },
  feeBpsByCurrency = { GBP: 1000, ZAR: 2000 },
}) => {
  // Treat AmountInput's currency picker as the RECIPIENT currency selector
  const selectedCurrencyObject =
    currencies.find((c) => c.code === currency) ||
    ({ code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" } as Currency);

  const handleCurrencyChange = (c: Currency) => setCurrency(c.code);

  const {
    validAmount,
    amountUsdCents,
    feeCentsUSD,
    amountAfterFeeUsdCents,
    fxRate,
    recipientReceiveCents,
    validationError,
  } = useMemo(() => {
    const usdCents = toCents(amount || "0");
    const amt = Number(amount);
    const minC = Math.ceil(minUSD * 100);
    const maxC = Math.ceil(maxUSD * 100);
    const rate = fxRates[currency] ?? 1;

    // validation
    if (!amount || !Number.isFinite(amt) || amt <= 0) {
      return {
        validAmount: false,
        amountUsdCents: 0,
        feeCentsUSD: 0,
        amountAfterFeeUsdCents: 0,
        fxRate: rate,
        recipientReceiveCents: 0,
        validationError: null, // don't warn before typing
      };
    }
    if (usdCents < minC) {
      return {
        validAmount: false,
        amountUsdCents: usdCents,
        feeCentsUSD: 0,
        amountAfterFeeUsdCents: 0,
        fxRate: rate,
        recipientReceiveCents: 0,
        validationError: `Minimum amount is $${minUSD.toFixed(2)}.`,
      };
    }
    if (usdCents > maxC) {
      return {
        validAmount: false,
        amountUsdCents: usdCents,
        feeCentsUSD: 0,
        amountAfterFeeUsdCents: 0,
        fxRate: rate,
        recipientReceiveCents: 0,
        validationError: `Maximum amount is $${maxUSD.toFixed(2)}.`,
      };
    }

    // fees + fx
    const feeBps = feeBpsByCurrency[currency] ?? 0;
    const feeCents = calcFeeCents(usdCents, feeBps);
    const afterFee = usdCents - feeCents;
    const receiveCents = convertCentsUSDTo(afterFee, rate);

    return {
      validAmount: true,
      amountUsdCents: usdCents,
      feeCentsUSD: feeCents,
      amountAfterFeeUsdCents: afterFee,
      fxRate: rate,
      recipientReceiveCents: receiveCents,
      validationError: null as string | null,
    };
  }, [amount, currency, minUSD, maxUSD, fxRates, feeBpsByCurrency]);

  const feePct = ((feeBpsByCurrency[currency] ?? 0) / 100).toFixed(2) + "%";
  const topError = validationError || error;

  return (
    <div className="sticky top-24">
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Send Money</h2>
        <p className="text-sm text-gray-600 mt-0.5">Instantly send to an email or phone number.</p>

        <form onSubmit={onSubmit} className="mt-6">
          <fieldset disabled={isLoading || !!success} className="space-y-5">
            {success && (
              <div className="rounded-lg bg-primary-50 p-4 text-sm text-primary-800 flex items-start gap-3">
                <CheckCircleIcon className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Success</h3>
                  <p className="mt-1">{success}</p>
                </div>
              </div>
            )}

            {topError && (
              <div className="rounded-lg bg-secondary-50 p-4 text-sm text-secondary-900 flex items-start gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Attention needed</h3>
                  <p className="mt-1">{topError}</p>
                </div>
              </div>
            )}

            {/* Recipient (with quick picks) */}
            <RecipientInput
              label="Recipient"
              recipient={recipient}
              setRecipient={setRecipient}
              quickRecipients={quickRecipients}
            />

            {/* AmountInput: amount is USD; currency picker = RECIPIENT currency */}
            <AmountInput
              label="You send"
            //   hint="Amount entered is in USD. Use the currency picker to choose recipient currency."
              amount={amount}
              setAmount={setAmount}
              selectedCurrency={selectedCurrencyObject}
              setSelectedCurrency={handleCurrencyChange}
            />

            {/* Note */}
            <PrimaryInput
              label="Note (optional)"
              placeholder="What’s this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Summary */}
            {validAmount && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">You send</span>
                  <span className="font-medium text-gray-800">${centsToDisplay(amountUsdCents)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee ({feePct}) • payout in {currency}</span>
                  <span className="font-medium text-gray-800">-${centsToDisplay(feeCentsUSD)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">After fees</span>
                  <span className="font-medium text-gray-800">${centsToDisplay(amountAfterFeeUsdCents)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FX rate</span>
                  <span className="font-medium text-gray-800">1 USD ≈ {fxRate.toFixed(4)} {currency}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Recipient gets</span>
                  <span className="text-primary-700 font-bold text-base">
                    {currencies.find((c) => c.code === currency)?.flag} {centsToDisplay(recipientReceiveCents)} {currency}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  All amounts rounded <span className="font-medium">up</span> to the smallest unit.
                </p>
              </div>
            )}

            <div className="pt-2">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                className="w-full"
                size="lg"
                disabled={!!validationError || !recipient}
              >
                {isLoading ? "Sending..." : "Confirm and Send"}
              </PrimaryButton>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SendMoneyForm;
