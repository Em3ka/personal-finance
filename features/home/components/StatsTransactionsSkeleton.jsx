export default function StatsTransactionsSkeleton() {
  return (
    <div className="rounded-xl bg-white px-5 py-6 md:p-8">
      <div className="mb-5 text-xl font-bold">Transactions</div>

      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`border-grey-500/15 border-t ${i === 0 ? "mt-0 border-t-0 pt-0" : "mt-3 pt-3"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-grey-300/50 size-8 animate-pulse rounded-full"></div>
              <div className="bg-grey-300/50 h-3.5 w-20 animate-pulse rounded"></div>
            </div>

            <div className="space-y-1">
              <div className="bg-grey-300/50 h-3.5 w-20 animate-pulse rounded"></div>
              <div className="bg-grey-300/50 h-3.5 w-20 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
