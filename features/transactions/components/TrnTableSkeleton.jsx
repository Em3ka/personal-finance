export default function TrnTableSkeleton({ columns = 4, rowCount = 5 }) {
  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="border-grey-100 border-b">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div
                    className={`flex ${i === columns - 1 ? "justify-end" : "justify-start"}`}>
                    <div className="bg-grey-300/50 h-4 w-24 animate-pulse rounded-full" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <tr key={i} className="border-grey-100 border-b last:border-0">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div
                      className={`flex items-center ${colIndex === columns - 1 ? "justify-end" : "justify-start"}`}>
                      {colIndex === 0 ? (
                        <div className="flex items-center gap-4">
                          <div className="bg-grey-300/50 size-10 animate-pulse rounded-full" />
                          <div className="bg-grey-300/50 h-4 w-24 animate-pulse rounded-md" />
                        </div>
                      ) : (
                        <div className="bg-grey-300/50 h-4 w-24 animate-pulse rounded-md" />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile skeleton */}
      <div className="divide-grey-100 divide-y md:hidden">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="size-10 animate-pulse rounded-full bg-gray-300" />

              <div className="space-y-1">
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-300" />
                <div className="h-4 w-20 animate-pulse rounded-md bg-gray-300" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="h-4 w-20 animate-pulse rounded-md bg-gray-300" />
              <div className="h-4 w-20 animate-pulse rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
