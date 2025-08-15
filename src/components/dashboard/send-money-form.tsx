import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "@/components/buttons/primary-button";
import PrimaryInput from "../inputs/primary-input";
import { currencies, Currency } from "@/utils/country-currencies";
import { QuickRecipient } from "@/pages/portal";
import RecipientInput from "../inputs/receipt-input";
import AmountInput from "../inputs/amount-input";
import { calcFeeCents, centsToDisplay, convertCentsUSDTo, toCents } from "@/utils/money-helpers";
import TransferSummary from "./summary-component";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const alertVariants = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

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
     <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className=""
    >
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-900">Send Money</h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Instantly send to an email or phone number.
          </p>
        </motion.div>

        <form onSubmit={onSubmit} className="mt-6">
          <fieldset disabled={isLoading || !!success} className="space-y-5">
            <AnimatePresence mode="wait">
              {success && (
                <motion.div
                  key="success"
                  variants={alertVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="rounded-lg bg-primary-50 p-4 text-sm text-primary-800 flex items-start gap-3"
                >
                  <CheckCircleIcon className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Success</h3>
                    <p className="mt-1">{success}</p>
                  </div>
                </motion.div>
              )}

              {topError && !success && (
                <motion.div
                  key="error"
                  variants={alertVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="rounded-lg bg-secondary-50 p-4 text-sm text-secondary-900 flex items-start gap-3"
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Attention needed</h3>
                    <p className="mt-1">{topError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recipient (with quick picks) */}
            <motion.div variants={itemVariants}>
              <RecipientInput
                label="Recipient"
                recipient={recipient}
                setRecipient={setRecipient}
                quickRecipients={quickRecipients}
              />
            </motion.div>

            {/* AmountInput */}
            <motion.div variants={itemVariants}>
              <AmountInput
                label="You send"
                amount={amount}
                setAmount={setAmount}
                selectedCurrency={selectedCurrencyObject}
                setSelectedCurrency={handleCurrencyChange}
              />
            </motion.div>

            {/* Note */}
            <motion.div variants={itemVariants}>
              <PrimaryInput
                label="Note (optional)"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </motion.div>

            <AnimatePresence>
              {validAmount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TransferSummary
                    amountUsdCents={amountUsdCents}
                    feeCentsUSD={feeCentsUSD}
                    amountAfterFeeUsdCents={amountAfterFeeUsdCents}
                    fxRate={fxRate}
                    currency={currency}
                    recipientReceiveCents={recipientReceiveCents}
                    feePct={"feePctLabel"}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="pt-2">
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                className="w-full"
                size="lg"
                disabled={!!validationError || !recipient}
                // whileTap={{ scale: 0.98 }}
              >
                {isLoading ? "Sending..." : "Confirm and Send"}
              </PrimaryButton>
            </motion.div>
          </fieldset>
        </form>
      </motion.div>
    </motion.div>
    );
};

export default SendMoneyForm;
