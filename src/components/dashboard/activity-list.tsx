import React, { useMemo, useState } from "react";
import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";

// ---------- Types ----------
export type Activity = {
  id: string | number;
  type: "send" | "receive";
  title: string;
  meta: string;     // e.g. "USD • 12 Aug"
  amount: string;   // e.g. "- $45.00" or "+ $100.00"
};

type ActivityListProps = {
  items: Activity[];
  pageSize?: number; // default 15
};

// ---------- Item ----------
function ActivityItem({ item }: { item: Activity }) {
  const isOutbound = item.type === "send";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-4 transition-all hover:bg-gray-50 hover:shadow-sm">
      <div
        className={[
          "h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center",
          isOutbound ? "bg-gray-100 text-gray-600" : "bg-primary-100 text-primary-brand",
        ].join(" ")}
        aria-hidden="true"
      >
        {isOutbound ? <ArrowUpRightIcon className="h-5 w-5" /> : <ArrowDownLeftIcon className="h-5 w-5" />}
      </div>

      <div className="flex-grow min-w-0">
        <p className="font-medium text-gray-800 truncate">{item.title}</p>
        <p className="text-xs text-gray-500">{item.meta}</p>
      </div>

      <p className={`text-sm font-semibold tabular-nums flex-shrink-0 ${isOutbound ? "text-gray-900" : "text-primary-700"}`}>
        {item.amount}
      </p>
    </div>
  );
}

// ---------- Pagination UI ----------
function Pager({
  page,
  totalPages,
  onPage,
  showingFrom,
  showingTo,
  totalItems,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
  showingFrom: number;
  showingTo: number;
  totalItems: number;
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // Compact window of page numbers
  const window = 3; // how many numbers on each side of current
  const start = Math.max(1, page - window);
  const end = Math.min(totalPages, page + window);
  const numbers = [];
  for (let i = start; i <= end; i++) numbers.push(i);

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{showingFrom}</span>–<span className="font-medium">{showingTo}</span> of{" "}
        <span className="font-medium">{totalItems}</span>
      </div>

      <nav className="inline-flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPage(1)}
          disabled={!canPrev}
          className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 disabled:opacity-40 hover:bg-gray-50"
        >
          First
        </button>
        <button
          type="button"
          onClick={() => onPage(page - 1)}
          disabled={!canPrev}
          className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 disabled:opacity-40 hover:bg-gray-50"
        >
          Prev
        </button>

        {start > 1 && <span className="px-2 text-sm text-gray-500">…</span>}

        {numbers.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPage(n)}
            aria-current={n === page ? "page" : undefined}
            className={[
              "px-3 h-9 rounded-lg border text-sm",
              n === page
                ? "border-primary-600 text-white bg-primary-600"
                : "border-gray-200 text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            {n}
          </button>
        ))}

        {end < totalPages && <span className="px-2 text-sm text-gray-500">…</span>}

        <button
          type="button"
          onClick={() => onPage(page + 1)}
          disabled={!canNext}
          className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => onPage(totalPages)}
          disabled={!canNext}
          className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 disabled:opacity-40 hover:bg-gray-50"
        >
          Last
        </button>
      </nav>
    </div>
  );
}

// ---------- List (with pagination) ----------
export default function ActivityList({ items, pageSize = 15 }: ActivityListProps) {
  const [page, setPage] = useState(1);

  // Enforce minimum of 15 per spec
  const size = Math.max(15, pageSize);
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const safePage = Math.min(page, totalPages);

  const pageSlice = useMemo(() => {
    const startIdx = (safePage - 1) * size;
    const endIdx = startIdx + size;
    return items.slice(startIdx, endIdx);
  }, [items, safePage, size]);

  const showingFrom = items.length === 0 ? 0 : (safePage - 1) * size + 1;
  const showingTo = Math.min(items.length, safePage * size);

  if (!items?.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
        <h3 className="font-semibold text-gray-800">No activity yet</h3>
        <p className="text-sm text-gray-500 mt-1">Your transfers will show up here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm font-medium text-primary-700 hover:text-primary-900">View all</button>
      </div>

      <div className="space-y-3">
        {pageSlice.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </div>

      <Pager
        page={safePage}
        totalPages={totalPages}
        onPage={setPage}
        showingFrom={showingFrom}
        showingTo={showingTo}
        totalItems={items.length}
      />
    </div>
  );
}
