import { cn } from "@/utils/helpers";

export default function TableSkeleton({ columns = [], rowCount = 5 }) {
  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="border-grey-100 border-b">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 ${i === columns.length - 1 ? "flex justify-end" : ""}`}>
                  {i === 0 ? (
                    <div className="bg-grey-300/50 h-4 w-34 animate-pulse rounded-xl" />
                  ) : (
                    <div className="bg-grey-300/50 h-4 w-32 animate-pulse rounded-xl" />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <tr key={i} className="border-grey-100 border-b last:border-0">
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div
                      className={cn(
                        "flex items-center",
                        colIndex === columns.length - 1 ? "justify-end" : "justify-start",
                      )}>
                      {colIndex === 0 ? (
                        <div className="flex items-center gap-4">
                          <div className="bg-grey-300/50 size-10 animate-pulse rounded-full" />
                          <div className="bg-grey-300/50 h-4 w-36 animate-pulse rounded-xl" />
                        </div>
                      ) : (
                        <div className="bg-grey-300/50 h-4 w-32 animate-pulse rounded-xl" />
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
        {Array.from({ length: rowCount }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex justify-between">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={`h-4 w-24 animate-pulse rounded bg-gray-300 ${
                    col === columns[columns.length - 1] ? "text-end" : "text-left"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
