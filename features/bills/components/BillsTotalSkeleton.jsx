import RecurringBillsIcon from "@/assets/icon-recurring-bills.svg";

export default function BillsTotalSkeleton() {
  return (
    <div className="bg-grey-900 flex items-center gap-x-5 gap-y-8 rounded-xl px-5 py-6 md:flex-col md:items-start">
      <div className="flex size-10 items-center justify-center">
        <RecurringBillsIcon aria-hidden="true" />
      </div>

      <div className="space-y-3 text-white">
        <p className="text-sm">Total bills</p>
        <div className="h-10 w-32 animate-pulse rounded bg-gray-500/40" />
      </div>
    </div>
  );
}
