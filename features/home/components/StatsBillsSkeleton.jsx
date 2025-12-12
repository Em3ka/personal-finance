export default function StatsBillsSkeleton() {
  return (
    <div className="rounded-xl bg-white px-5 py-6 md:p-8">
      <div className="mb-5 text-xl font-bold">Recurring Bills</div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-beige-100 flex items-center justify-between rounded-lg border-l-4 px-4 py-5">
            <div className="bg-grey-300/50 h-3.5 w-10 animate-pulse rounded"></div>
            <div className="bg-grey-300/50 h-3.5 w-10 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
