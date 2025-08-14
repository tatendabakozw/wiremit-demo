import { ArrowDownLeftIcon, ArrowUpRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/buttons/primary-button";

// Helper function (can be moved to a utils file)
function initials(name: any) {
  return name.split(" ").map((n:any) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function BalanceCard({ balance, onQuickPick, quickRecipients }:any) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 text-white shadow-xl shadow-primary-500/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-primary-200 text-sm">Available Balance</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            <span className="ml-2 text-primary-200 text-base font-medium">USD</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          {/* TODO: Implement Add Money/Withdraw functionality */}
          <PrimaryButton variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <ArrowDownLeftIcon className="h-4 w-4 mr-1.5" /> Add
          </PrimaryButton>
          <PrimaryButton variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <ArrowUpRightIcon className="h-4 w-4 mr-1.5" /> Withdraw
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-primary-200 text-sm mb-3">Quick Send</p>
        <div className="flex flex-wrap gap-3">
          {quickRecipients.map((r:any) => (
            <button
              key={r.id}
              onClick={() => onQuickPick(r)}
              className="group flex items-center gap-3 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/5 transition-all px-3 py-2"
            >
              <span className="h-8 w-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-sm font-semibold">
                {initials(r.name)}
              </span>
              <div className="text-left">
                <div className="text-sm font-medium text-white">{r.name}</div>
                <div className="text-xs text-primary-200 truncate">{r.handle}</div>
              </div>
            </button>
          ))}
          {/* TODO: Implement Add New Recipient Modal */}
          <button className="h-10 px-3 flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/5 transition-colors text-sm">
            <UserPlusIcon className="h-4 w-4" /> Add New
          </button>
        </div>
      </div>
    </div>
  );
}