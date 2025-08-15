import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { handleLogout } from "@/lib/logout";
import {
  ArrowUpRightIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import BalanceCard from "@/components/dashboard/balance-card";
import ActivityList, { Activity } from "@/components/dashboard/activity-list";
import SendMoneyForm from "@/components/dashboard/send-money-form";
import PrimaryButton from "@/components/buttons/primary-button";
import { useExchangeRates } from "@/hooks/useExchangRate";
import { useToast } from "@/hooks/useToast"; // 🔹 import toast hook
import SampleAd from "@/components/dashboard/sample-ad";

// --- Mock Data ---
export type QuickRecipient = { id: string; name: string; handle: string };
export const quickRecipients: QuickRecipient[] = [
  { id: "1", name: "Tariro M.", handle: "tariro@example.com" },
  { id: "2", name: "Kuda P.", handle: "+263 77 123 4567" },
  { id: "3", name: "Nyasha C.", handle: "nyasha@example.com" },
];

const mockActivity: Activity[] = Array.from({ length: 48 }).map((_, i) => {
  const isSend = Math.random() > 0.5;
  return {
    id: i + 1,
    type: isSend ? "send" : "receive",
    title: isSend ? "Sent Money" : "Received Money",
    meta: `${isSend ? "to" : "from"} John Doe • USD • ${new Date(
      Date.now() - i * 86400000
    ).toLocaleDateString()}`,
    amount: `${isSend ? "-" : "+"}$${(Math.random() * 100 + 5).toFixed(2)}`,
  };
});

export default function PortalHome() {
  const { me, loading } = useAuth();
  const { addToast } = useToast(); // 🔹 useToast instance

  // 🔹 live FX rates
  const {
    rates,
    loading: ratesLoading,
    error: ratesError,
  } = useExchangeRates();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [currency, setCurrency] = useState("GBP");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const balance = useMemo(() => ({ USD: 1842.75, ZWL: 0 }), []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (loading) return null;

  const onQuickPick = (r: QuickRecipient) => {
    setRecipient(r.handle);
  };

  const validate = () => {
    if (!recipient.trim()) return "Recipient is required.";
    const numeric = Number(amount);
    if (!amount || Number.isNaN(numeric) || numeric <= 0) return "Please enter a valid amount.";
    if (numeric > balance.USD) return "Amount exceeds available USD balance.";
    return null;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSuccess(`Successfully sent money to ${recipient}.`);

      addToast({
        title: "Transfer Successful",
        message: `Sent ${amount} ${currency} to ${recipient}`,
        type: "success",
        duration: 4000,
      });

      setAmount("");
      setNote("");
      setRecipient("");
    } catch (err: any) {
      const msg = err?.message || "The transaction failed. Please try again.";
      setError(msg);

      addToast({
        title: "Transfer Failed",
        message: msg,
        type: "error",
        duration: 5000,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-lg border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary-100 flex items-center justify-center">
              <ArrowUpRightIcon className="h-5 w-5 text-primary-brand" />
            </div>
            <span className="font-bold text-lg text-gray-800">MizuCash</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden sm:block text-gray-500">
              {me ? `${me.email}` : "Not signed in"}
            </span>
            <PrimaryButton variant="outline" size="sm" onClick={handleLogout}>
              <PowerIcon className="h-4 w-4 mr-1.5" />
              Logout
            </PrimaryButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8">
            <BalanceCard
              balance={balance.USD}
              onQuickPick={onQuickPick}
              quickRecipients={quickRecipients}
            />
            <ActivityList items={mockActivity} pageSize={15} />
          </div>

          <div className="lg:col-span-2 space-y-4 ">
            <div className="flex flex-col gap-4 sticky top-24">

              <SendMoneyForm
                recipient={recipient}
                setRecipient={setRecipient}
                quickRecipients={quickRecipients}
                amount={amount}
                setAmount={setAmount}
                note={note}
                setNote={setNote}
                currency={currency}
                setCurrency={setCurrency}
                onSubmit={handleSend}
                isLoading={sending || ratesLoading}
                error={error ?? ratesError ?? null}
                success={success}
                fxRates={rates}
                feeBpsByCurrency={{ GBP: 1000, ZAR: 2000 }}
              />

              <SampleAd />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6" />
    </div>
  );
}
