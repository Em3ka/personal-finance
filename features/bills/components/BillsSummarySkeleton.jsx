export default function BillsSummarySkeleton() {
  const labels = ["Paid Bills", "Total Upcoming", "Due Soon"];

  return (
    <div className="space-y-6 rounded-xl bg-white p-5">
      <h2 className="font-bold">Summary</h2>
      <ul className="divide-y">
        {labels.map((label, i) => (
          <li key={i} className="py-4 first:pt-0 last:pb-0">
            <div className="flex justify-between">
              {/* Static label text */}
              <span
                className={`${
                  label === "Due Soon" ? "text-red-500" : "text-gray-500"
                } text-xs`}>
                {label}
              </span>

              {/* Skeleton placeholder for the value */}
              <div className="h-4 w-24 animate-pulse rounded bg-gray-300/50" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
