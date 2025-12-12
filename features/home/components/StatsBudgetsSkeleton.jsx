export default function StatsBudgetsSkeleton() {
  return (
    <div className="rounded-xl bg-white px-5 py-6 md:p-8">
      <div className="mb-5 text-xl font-bold">Budgets</div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] @max-[380px]:grid-cols-1">
        <div className="bg-grey-300/50 size-[280px] animate-pulse justify-self-center rounded-full" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 @max-[380px]:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="bg-grey-300/50 h-4 w-24 animate-pulse items-center rounded" />
              <div className="bg-grey-300/50 h-5 w-16 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
