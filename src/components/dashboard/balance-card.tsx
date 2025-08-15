import { ArrowDownLeftIcon, ArrowUpRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/buttons/primary-button";

function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function BalanceCard({ balance, onQuickPick, quickRecipients }: {
  balance: number;
  onQuickPick: (recipient: any) => void;
  quickRecipients: Array<{ id: string; name: string; handle: string }>;
}) {
  return (
    <div className="relative font-sans">
      {/* Main balance card */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-br from-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/10 to-transparent pointer-events-none" />
        
        {/* Floating action button */}
        <button 
          className="md:flex hidden cursor-pointer absolute bottom-5 right-5 h-11 w-11 items-center justify-center rounded-full bg-secondary-brand hover:bg-secondary-600 active:scale-95 transition-all text-gray-700 shadow-md hover:shadow-lg border border-secondary-600"
          aria-label="Add new recipient"
        >
          <UserPlusIcon className="h-5 w-5" />
        </button>

        <div className="relative z-10 space-y-8">
          {/* Balance section */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-200 text-sm font-medium mb-1">Available Balance</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                <span className="ml-2 text-primary-200 text-base font-medium">USD</span>
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <PrimaryButton 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-primary-600/20 hover:text-white backdrop-blur-sm border border-primary-400/20"
              >
                <ArrowDownLeftIcon className="h-4 w-4 mr-1.5" /> Add
              </PrimaryButton>
              <PrimaryButton 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-primary-600/20 hover:text-white backdrop-blur-sm border border-primary-400/20"
              >
                <ArrowUpRightIcon className="h-4 w-4 mr-1.5" /> Withdraw
              </PrimaryButton>
            </div>
          </div>

          {/* Quick Send section */}
          <div>
            <p className="text-primary-200 text-sm font-medium mb-3">Quick Send</p>
            <div className="flex flex-wrap gap-2">
              {quickRecipients.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onQuickPick(r)}
                  className="flex items-center gap-2 rounded-xl bg-primary-600/20 hover:bg-primary-600/30 active:bg-primary-600/10 transition-all px-3 py-2 backdrop-blur-sm w-full sm:w-auto border border-primary-400/20"
                >
                  <span className="h-8 w-8 rounded-full bg-primary-500/30 flex-shrink-0 flex items-center justify-center text-sm font-semibold">
                    {initials(r.name)}
                  </span>
                  <div className="text-left overflow-hidden min-w-0">
                    <div className="text-sm font-medium text-white truncate">{r.name}</div>
                    <div className="text-xs text-primary-200 truncate">@{r.handle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}