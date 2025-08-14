import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/solid";

function ActivityItem({ item }:any) {
  const isOutbound = item.type === 'send';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-4 transition-all hover:bg-gray-50 hover:shadow-sm">
      <div className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center ${
          isOutbound ? 'bg-gray-100 text-gray-600' : 'bg-primary-100 text-primary-brand'
        }`}
      >
        {isOutbound ? (
          <ArrowUpRightIcon className="h-5 w-5" />
        ) : (
          <ArrowDownLeftIcon className="h-5 w-5" />
        )}
      </div>
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{item.title}</p>
        <p className="text-xs text-gray-500">{item.meta}</p>
      </div>
      <p className={`text-sm font-semibold flex-shrink-0 ${isOutbound ? 'text-gray-900' : 'text-primary-700'}`}>
        {item.amount}
      </p>
    </div>
  );
}

export default function ActivityList({ items }:any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm font-medium text-primary-700 hover:text-primary-900">
          View all
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item:any) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}